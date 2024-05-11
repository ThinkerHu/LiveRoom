package com.bvc.liveroom.ui.main

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.ComponentActivity
import com.bvc.liveroom.R
import com.bvc.liveroom.ui.webview.GameWebView
import java.net.URLDecoder

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_main)
        findViewById<Button>(R.id.btn_start_game).setOnClickListener {
            onStartGame()
        }
        findViewById<Button>(R.id.btn_start_webview).setOnClickListener {

            this@MainActivity.apply {
                Intent(this, GameWebView::class.java).apply {
                    val urlPath = "file:///android_asset/html/game.html"
                    putExtra("extra_url", urlPath)
                    this@MainActivity.startActivity(this)
                }
            }
        }
    }

    private fun onStartGame() {
        //test url
        val gameUrl = "https://games.leadercc.com/test/index.html?uid=1&token=2&lang=zh-CN&roomid=1"
        val url = URLDecoder.decode(gameUrl, "UTF-8")
        val params = url.split("?").getOrNull(1)
        params?.split("&")?.forEach { param ->
            val keyValue = param.split("=")
            if (keyValue.size == 2) {
                val key = keyValue[0]
                val value = keyValue[1]
                println("Parameter: $key = $value")
            }
        }
        //
    }
}