package com.bvc.liveroom.ui.main

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.ComponentActivity
import androidx.appcompat.widget.AppCompatTextView
import androidx.lifecycle.lifecycleScope
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.liveroom.R
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.model.RequestToken
import com.bvc.liveroom.data.model.User
import com.bvc.liveroom.data.repository.GameRepository
import com.bvc.liveroom.ui.webview.GameWebView
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    private lateinit var console: AppCompatTextView
    private var token: RequestToken? = null
    private var user: User? = null
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

        findViewById<Button>(R.id.btn_start_local_test_webpage).onClick {
            onStartLocalTestHtmlPage()
        }

        console = findViewById(R.id.tv_console)
    }

    private fun fetchUserInfo() {
        lifecycleScope.launch {
            updateConsole("fetchUserInfo")
            token?.getRequestToken().let { userToken ->
                GameRepository.fetchUserInfo(userToken!!).let {
                    when (it) {
                        is ApiResult.Error -> {
                            updateConsole(it.apiException.msg)
                        }

                        is ApiResult.Success -> {
                            updateConsole(it.data.toString())
                            user = it.data
                        }
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
                        token = it.data
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
        //https://games.leader cc.com/test/index.html?uid=1&token=2&lang=zh-CN&roomid=1   // 游戏地址以接入为
        val gameOriginUrl = "https://gztest.leadercc.com/pokavoice_games/wheel/index.html"
        user?.apply {
            val gameUrl =
                formatGameUrl(
                    gameOriginUrl, uid = id, gameToken = gameToken,
                    gameId = "1", language = "th-TH"
                )
            Intent(this@MainActivity, GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                this@MainActivity.startActivity(this)
            }
        }
    }

    private fun formatGameUrl(
        gameUrl: String,
        uid: String,
        gameToken: String,
        gameId: String,
        language: String
    ): String {
        return "${gameUrl}?uid=${uid}&token=${gameToken}&gameid=${gameId}&lang=${language}"
    }

    private fun onStartLocalTestHtmlPage() {
        Intent(this@MainActivity, GameWebView::class.java).apply {
            putExtra("extra_url", "file:///android_asset/html/game.html")
            this@MainActivity.startActivity(this)
        }
    }
}