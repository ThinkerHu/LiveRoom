package com.bvc.liveroom.ui.main

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.ComponentActivity
import androidx.appcompat.widget.AppCompatTextView
import androidx.lifecycle.lifecycleScope
import com.bvc.common.tools.logE
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.liveroom.R
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.repository.GameRepository
import com.bvc.liveroom.ui.webview.GameWebView
import kotlinx.coroutines.launch
import java.net.URLDecoder

class MainActivity : ComponentActivity() {
    private lateinit var console: AppCompatTextView
    private var token: String = ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_main)
        findViewById<Button>(R.id.btn_start_webview).onClick {
            onStartGame()
        }
        findViewById<Button>(R.id.btn_fetch_token).onClick {
            fetchToken()
        }

        findViewById<Button>(R.id.btn_fetch_user_info).onClick {
            fetchUserInfo()
        }

        console = findViewById(R.id.tv_console)
    }

    private fun fetchUserInfo() {
        lifecycleScope.launch {
            updateConsole("fetchUserInfo")
            GameRepository.fetchUserInfo(token).let {
                when (it) {
                    is ApiResult.Error -> {
                        updateConsole(it.apiException.msg)
                    }

                    is ApiResult.Success -> {
                        updateConsole(it.data.toString())
                    }
                }
            }
        }
    }

    private fun fetchToken() {
        lifecycleScope.launch {
            GameRepository.login("18100000000", "123456").let {
                when (it) {
                    is ApiResult.Error -> {
                        it.apiException.msg.toast(this@MainActivity)
                    }

                    is ApiResult.Success -> {
                        token = it.data.getRequestToken()
                        updateConsole(it.data.getRequestToken())
                    }
                }
            }
        }
    }

    private fun updateConsole(msg: String) {
        runOnUiThread {
            console.text = msg
        }
    }

    private fun onStartGame() {
        //https://games.leadercc.com/test/index.html?uid=1&token=2&lang=zh-CN&roomid=1   // 游戏地址以接入为准
        val gameUrl =
            "https://gztest.leadercc.com/pokavoice_games/wheel/index.html?uid=100&GameId=1&roomid=1&lang=ms-MY"
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
        Intent(this, GameWebView::class.java).apply {
            putExtra("extra_url", gameUrl)
            this@MainActivity.startActivity(this)
        }
    }
}