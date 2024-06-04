package com.bvc.liveroom.ui.webview


import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.ProgressBar
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.hide
import com.bvc.common.tools.logD
import com.bvc.common.tools.onClick
import com.bvc.common.tools.show
import com.bvc.liveroom.R
import com.bvc.liveroom.ui.recharge.RechargeListActivity


open class GameWebView : BaseActivity() {
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar

    @SuppressLint("SetJavaScriptEnabled")
    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        title = "WebView"
        setContentView(R.layout.layout_game_webview)
        webView = findViewById(R.id.wv_game)
        progressBar = findViewById(R.id.progressBar)
        webView.apply {
            addJavascriptInterface(JSBridge(this@GameWebView), "LingxianAndroid")
            webChromeClient = object : WebChromeClient() {
                override fun onProgressChanged(view: WebView?, newProgress: Int) {
                    super.onProgressChanged(view, newProgress)
                    progressBar.progress = newProgress
                }
            }
            webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    progressBar.show()
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    progressBar.hide()
                }
            }
        }
        webView.settings.apply {
            javaScriptEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mediaPlaybackRequiresUserGesture = true
        }
        intent.getStringExtra("extra_url")?.apply {
            webView.loadUrl(this)
        }

        findViewById<Button>(R.id.btn_call_js_update_coin).onClick {
            val functionName = "updateCoin()"
            val script = "javascript:$functionName"
            webView.evaluateJavascript(script) {
                it.logD()
            }
        }

        findViewById<Button>(R.id.btn_js_universal_interface).onClick {
            val str = "alert('Hello from Android call js code');"
            callJSCode(str)
        }
    }

    fun closeGame() {
        AlertDialog.Builder(this).apply {
            setTitle(R.string.exit_game)
            setMessage(R.string.sure_exit_game)
            setNegativeButton(
                R.string.cancel
            ) { dialog, _ -> dialog?.dismiss() }
            setPositiveButton(
                R.string.sure
            ) { _, _ -> this@GameWebView.finish() }
            create()
        }.show()
    }

    fun pay() {
        Intent(this@GameWebView, RechargeListActivity::class.java).apply {
            this@GameWebView.startActivity(this)
        }
    }

    private fun callJSCode(code: String) {
        runOnUiThread {
            webView.loadUrl("javascript:$code")
        }
    }
}

class JSBridge(private var gameWebView: GameWebView?) {

    @JavascriptInterface
    fun closeGame() {
        gameWebView?.apply {
            runOnUiThread {
                this.closeGame()
            }
        }
    }

    @JavascriptInterface
    fun pay() {
        gameWebView?.apply {
            runOnUiThread {
                this.pay()
            }
        }
    }
}