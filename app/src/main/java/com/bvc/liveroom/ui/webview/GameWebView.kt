package com.bvc.liveroom.ui.webview

import android.graphics.Bitmap
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.hide
import com.bvc.common.tools.show
import com.bvc.liveroom.R


class GameWebView : BaseActivity() {
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        setContentView(R.layout.layout_game_webview)
        webView = findViewById(R.id.wv_game)
        progressBar = findViewById(R.id.progressBar)
        webView.settings.apply {
            cacheMode = WebSettings.LOAD_DEFAULT
            mediaPlaybackRequiresUserGesture = true
        }
        webView.apply {
            addJavascriptInterface(JSBridge(this@GameWebView), "JSBride")
            webChromeClient = object : WebChromeClient() {
                override fun onProgressChanged(view: WebView?, newProgress: Int) {
                    super.onProgressChanged(view, newProgress)
                    progressBar.progress = newProgress
                }
            }
            webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    progressBar.hide()
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    progressBar.show()
                }
            }
        }
        intent.getStringExtra("extra_url")?.apply {
            webView.loadUrl(this)
        }
    }
}

class JSBridge(private var context: GameWebView?) {
    private var shared: JSBridge? = this

    @JavascriptInterface
    fun closeGame() {
        context?.runOnUiThread {

        }
    }

    @JavascriptInterface
    fun pay() {
        context?.runOnUiThread {

        }
    }
}