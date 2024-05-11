package com.bvc.liveroom.ui.webview


import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.ProgressBar
import android.widget.Toast
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.hide
import com.bvc.common.tools.onClick
import com.bvc.common.tools.show
import com.bvc.liveroom.R
import com.bvc.liveroom.ui.pay.PayActivity


class GameWebView : BaseActivity() {
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        title = "WebView"
        setContentView(R.layout.layout_game_webview)
        webView = findViewById(R.id.wv_game)
        progressBar = findViewById(R.id.progressBar)
        webView.apply {
            addJavascriptInterface(JSBridge(this@GameWebView), "Android")
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

        findViewById<Button>(R.id.btn_call_js_method).onClick {
            val functionName = "updateCoin"
            val message = "Android call JS method:${functionName}"
            val script = "javascript:$functionName('$message');"
            webView.evaluateJavascript(script, null)
        }
    }

    fun closeGame() {
        AlertDialog.Builder(this).apply {
            setTitle(R.string.exit_game)
            setMessage(R.string.sure_exit_game)
            setNegativeButton(R.string.cancel, object : DialogInterface.OnClickListener {
                override fun onClick(dialog: DialogInterface?, which: Int) {
                    dialog?.dismiss()
                }

            })
            setPositiveButton(R.string.sure, object : DialogInterface.OnClickListener {
                override fun onClick(dialog: DialogInterface?, which: Int) {
                    this@GameWebView.finish()
                }

            })
            create()
        }.show()
    }

    fun pay(userID: String) {
        Intent(this@GameWebView, PayActivity::class.java).apply {
            this@GameWebView.startActivity(this)
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
    fun pay(userID: String) {
        gameWebView?.apply {
            runOnUiThread {
                this.pay(userID)
            }
        }
    }

    @JavascriptInterface
    fun showToast(msg: String) {
        gameWebView?.apply {
            runOnUiThread {
                Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
            }
        }
    }
}