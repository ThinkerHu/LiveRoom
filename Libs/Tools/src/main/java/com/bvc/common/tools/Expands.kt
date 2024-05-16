package com.bvc.common.tools

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.res.Resources
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.view.*
import android.view.animation.Animation
import android.view.animation.TranslateAnimation
import android.view.inputmethod.InputMethodManager
import android.widget.*
import androidx.activity.result.ActivityResultCallback
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContract
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.LifecycleOwner
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayout.OnTabSelectedListener
import com.google.gson.Gson
import com.orhanobut.logger.Logger
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.io.InputStream
import java.io.OutputStream
import java.lang.reflect.ParameterizedType
import java.lang.reflect.Type
import java.math.BigInteger
import java.nio.charset.Charset
import java.security.MessageDigest
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.atomic.AtomicInteger


inline fun <reified T> String.fromJsonToList(): List<T> =
    Gson().fromJson(this, ParameterizedTypeImpl(T::class.java))

inline fun <reified T : Any> String.fromJson(): T {
    return Gson().fromJson(this, T::class.java)
}

inline fun Any.toJson(): String = Gson().toJson(this)

class ParameterizedTypeImpl(val clz: Class<*>) : ParameterizedType {
    override fun getActualTypeArguments(): Array<Type> {
        return arrayOf(clz)
    }

    override fun getRawType(): Type = List::class.java

    override fun getOwnerType(): Type? {
        return null
    }
}


fun Long.toDate(pattern: String = "HH:mm:ss"): String {

    val date = Date(this)
    val format = SimpleDateFormat(pattern)
    return format.format(date)
}

fun Long.toFullDate(): String {
    val date = Date(this)
    val pattern = "yyyy:MM:dd HH:mm:ss"
    val format = SimpleDateFormat(pattern)
    return format.format(date)
}

fun Long.isToday(): Boolean {
    val pattern = "yyyy:MM:dd"
    val format = SimpleDateFormat(pattern)
    return format.format(Date(this)) == format.format(Date())
}

const val TOAST_DEFAULT = 0
const val TOAST_ERROR = 1

fun String.toast(context: Context, style: Int = TOAST_DEFAULT, duration: Int = Toast.LENGTH_SHORT) {
    if (this.isEmpty()) {
        return
    }
    val applicationContext = context.applicationContext
    MainScope().launch {
        val view: View =
            LayoutInflater.from(applicationContext).inflate(R.layout.custom_toast, null, false)
        val type: ImageView = view.findViewById(R.id.iv_toast_type)
        val content: TextView = view.findViewById(R.id.tv_toast_content)
        content.text = this@toast
        when (style) {
            TOAST_ERROR -> {
                type.visibility = View.VISIBLE
                type.setImageResource(R.mipmap.ic_error)
            }

            TOAST_DEFAULT -> {
                type.visibility = View.GONE
            }
        }
        val toast = Toast(applicationContext).apply {
            setGravity(
                Gravity.TOP,
                0,
                10
            )
            this.duration = duration
            setView(view)
        }
        toast.show()
    }
}

fun Int.toast(context: Context, style: Int = TOAST_ERROR, duration: Int = Toast.LENGTH_SHORT) {
    context.getString(this).toast(context, style, duration)
}

fun String.logD() {
    Logger.d(this)
}

fun String.logW() {
    Logger.w(this)
}

fun String.logE() {
    Logger.e(this)
}

fun String.logJson() {
    Logger.json(this)
}

fun String.toPercent(): String {
    return (this.toDouble() * 100).toInt().toString().plus("%")
}

fun String.fromAssets(context: Context): String {
    try {
        val inputStream = context.resources.assets.open(this)
        val length = inputStream.available()
        val buffer = ByteArray(length)
        inputStream.read(buffer)
        return String(buffer, 0, buffer.size, Charset.forName("utf-8"))
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return ""
}


fun String.toMD5(): String {
    val md = MessageDigest.getInstance("MD5")
    val byteArray = md.digest(this.toByteArray())
    val bigInteger = BigInteger(1, byteArray)
    var md5 = bigInteger.toString(16)

    while (md5.length < 32) {
        md5 = "0$md5"
    }
    return md5
}


private val nextLocalRequestCode = AtomicInteger()

fun <I, O> FragmentActivity.startContractForResult(
    contract: ActivityResultContract<I, O>,
    input: I,
    callback: ActivityResultCallback<O>
) {
    val key = "activity_rq_for_result#${nextLocalRequestCode.getAndIncrement()}"
    val registry = activityResultRegistry
    var launcher: ActivityResultLauncher<I>? = null
    val observer = object : LifecycleEventObserver {
        override fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event) {
            if (Lifecycle.Event.ON_DESTROY == event) {
                launcher?.unregister()
                lifecycle.removeObserver(this)
            }
        }
    }
    lifecycle.addObserver(observer)
    val newCallback = ActivityResultCallback<O> {
        launcher?.unregister()
        lifecycle.removeObserver(observer)
        callback.onActivityResult(it)
    }
    launcher = registry.register(key, contract, newCallback)
    launcher.launch(input)
}

fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })
}

fun EditText.isPassword(isPassword: Boolean) {
    if (isPassword) {
        this.inputType = InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
    } else {
        this.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD
    }
}

@SuppressLint("ClickableViewAccessibility")
fun View.onTouchMove(finish: () -> Unit) {
    var lastY = 0
    this.setOnTouchListener { _, event ->
        val y = event.y.toInt()

        when (event.action) {
            MotionEvent.ACTION_DOWN -> {
                lastY = y
            }

            MotionEvent.ACTION_MOVE -> {
                //计算移动的距离
                val offY: Int = y - lastY
                if (offY > 0) {
                    this.apply {
                        layout(
                            left, top + offY,
                            right, bottom + offY
                        )
                    }
                }
            }

            MotionEvent.ACTION_UP -> {
                val translateAnimation = TranslateAnimation(0f, 0f, this.y, this.height.toFloat())
                translateAnimation.duration = 300
                translateAnimation.setAnimationListener(object : Animation.AnimationListener {
                    override fun onAnimationStart(animation: Animation?) {
                    }

                    override fun onAnimationEnd(animation: Animation?) {
                        finish()
                    }

                    override fun onAnimationRepeat(animation: Animation?) {
                    }

                })
                this.startAnimation(translateAnimation)
            }
        }
        return@setOnTouchListener true
    }
}

val Float.dp: Float                 // [xxhdpi](360 -> 1080)
    get() = android.util.TypedValue.applyDimension(
        android.util.TypedValue.COMPLEX_UNIT_DIP, this, Resources.getSystem().displayMetrics
    )

val Int.dp: Int
    get() = android.util.TypedValue.applyDimension(
        android.util.TypedValue.COMPLEX_UNIT_DIP,
        this.toFloat(),
        Resources.getSystem().displayMetrics
    ).toInt()


val Float.sp: Float                 // [xxhdpi](360 -> 1080)
    get() = android.util.TypedValue.applyDimension(
        android.util.TypedValue.COMPLEX_UNIT_SP, this, Resources.getSystem().displayMetrics
    )


val Int.sp: Int
    get() = android.util.TypedValue.applyDimension(
        android.util.TypedValue.COMPLEX_UNIT_SP,
        this.toFloat(),
        Resources.getSystem().displayMetrics
    ).toInt()


fun View.show() {
    this.visibility = View.VISIBLE
}

fun View.onClick(listener: View.OnClickListener) {
    setOnClickListener {
        listener.onClick(it)
    }
}

fun View.hide() {
    this.visibility = View.INVISIBLE
}

fun View.gone() {
    this.visibility = View.GONE
}

inline fun InputStream.copyTo2(
    out: OutputStream,
    bufferSize: Int = DEFAULT_BUFFER_SIZE,
    progress: (Long) -> Unit
): Long {
    var bytesCopied: Long = 0
    val buffer = ByteArray(bufferSize)
    var bytes = read(buffer)
    while (bytes >= 0) {
        out.write(buffer, 0, bytes)
        bytesCopied += bytes
        bytes = read(buffer)

        progress(bytesCopied)
    }
    return bytesCopied
}

fun String.copyToClipboard(context: Context) {
    ClipData.newPlainText("Label", this).apply {
        val copyClipboard: ClipboardManager =
            context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        copyClipboard.setPrimaryClip(this)
    }
}

fun TabLayout.afterTabChange(afterTabSelectedChanged: (tab: TabLayout.Tab?) -> Unit): OnTabSelectedListener {
    val tabSelectedListener = object : OnTabSelectedListener {
        override fun onTabSelected(tab: TabLayout.Tab?) {
            afterTabSelectedChanged(tab)
        }

        override fun onTabUnselected(tab: TabLayout.Tab?) {

        }

        override fun onTabReselected(tab: TabLayout.Tab?) {

        }

    }
    this.addOnTabSelectedListener(tabSelectedListener)
    return tabSelectedListener
}

fun Activity.hideKeyboard() {
    val inputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    currentFocus?.let {
        inputMethodManager.hideSoftInputFromWindow(it.windowToken, 0)
    }
}

