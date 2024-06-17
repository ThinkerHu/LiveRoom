package com.bvc.liveroom.ui.main

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.activity.ComponentActivity
import androidx.appcompat.widget.AppCompatTextView
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bvc.common.tools.fromAssets
import com.bvc.common.tools.fromJsonToList
import com.bvc.common.tools.logD
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.liveroom.R
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.model.Game
import com.bvc.liveroom.data.model.RequestToken
import com.bvc.liveroom.data.repository.GameRepository
import com.bvc.liveroom.ui.recharge.RechargeActivity
import com.bvc.liveroom.ui.recharge.RechargeListActivity
import com.bvc.liveroom.ui.webview.GameWebView
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    private lateinit var console: AppCompatTextView
    private lateinit var gameList: RecyclerView
    private var token: RequestToken? = null
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

        findViewById<Button>(R.id.btn_recharge_test).onClick {
            this@MainActivity.startActivity(
                Intent(
                    this@MainActivity, RechargeListActivity::class.java
                )
            )
        }

        console = findViewById(R.id.tv_console)

        gameList = findViewById<RecyclerView?>(R.id.rv_game_list).apply {
            layoutManager = GridLayoutManager(this@MainActivity, 6)
            val gameList = fetchGameList()
            adapter = GameGridAdapter(gameList) {
                onStartGame(it)
            }
        }
    }

    private fun fetchGameList(): List<Game> {
        return "config/GameList.json".fromAssets(this).fromJsonToList<Game>()
    }

    private fun fetchUserInfo() {
        lifecycleScope.launch {
            updateConsole("fetchUserInfo")
            token?.getRequestToken().let { userToken ->
                GameRepository.fetchUserInfo2(userToken!!).onSuccess {
                    updateConsole(it.toString())
                    ApiConfig.user = it
                }.onFailure {
                    updateConsole(it.message!!)
                }
            }
        }
    }

    private fun fetchToken() {
        lifecycleScope.launch {
            GameRepository.login("18100000001", "123456").let {
                when (it) {
                    is ApiResult.Error -> {
                        it.apiException.msg.toast(this@MainActivity)
                    }

                    is ApiResult.Success -> {
                        token = it.data
                        ApiConfig.userToken = it.data.getRequestToken()
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
        val gameOriginUrl = "https://gztest.leadercc.com/pokavoice_games/fish6/index.html"
        ApiConfig.user?.apply {
            val gameUrl = formatGameUrl(
                gameOriginUrl, uid = id, gameToken = gameToken, gameId = "3", language = "zh-CN"
            )
            gameUrl.logD()
            Intent(this@MainActivity, GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                this@MainActivity.startActivity(this)
            }
        }
    }

    private fun onStartGame(game: Game) {
        if (ApiConfig.user == null) {
            getString(R.string.is_not_login).toast(this)
            return
        }
        ApiConfig.user!!.apply {
            val gameUrl = formatGameUrl(
                game.url, uid = id, gameToken = gameToken, gameId = game.id, language = "th-TH"
            )
            gameUrl.logD()
            Intent(this@MainActivity, GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                this@MainActivity.startActivity(this)
            }
        }
    }

    private fun formatGameUrl(
        gameUrl: String, uid: String, gameToken: String, gameId: String, language: String
    ): String {
        return "${gameUrl}?uid=${uid}&token=${gameToken}&gameid=${gameId}&lang=${language}"
    }

    private fun onStartLocalTestHtmlPage() {
        Intent(this@MainActivity, GameWebView::class.java).apply {
            putExtra("extra_url", "file:///android_asset/html/game.html")
            this@MainActivity.startActivity(this)
        }
    }

    class GameGridAdapter(
        private val gameList: List<Game>, private val onItemClick: (game: Game) -> Unit
    ) : RecyclerView.Adapter<GameGridAdapter.GameViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameViewHolder {
            val view =
                LayoutInflater.from(parent.context).inflate(R.layout.item_layout, parent, false)
            return GameViewHolder(view)
        }

        override fun getItemCount(): Int {
            return gameList.size
        }

        override fun onBindViewHolder(holder: GameViewHolder, position: Int) {
            val game = gameList[position]
            holder.gameName.apply {
                text = game.name
                setOnClickListener {
                    game.name.toast(this.context)
                    onItemClick(game)
                }
            }
        }

        class GameViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val gameName: AppCompatTextView = itemView.findViewById(R.id.tv_game_name)
        }
    }

}