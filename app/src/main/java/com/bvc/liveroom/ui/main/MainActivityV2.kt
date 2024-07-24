package com.bvc.liveroom.ui.main

import android.content.Intent
import android.net.Uri
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
import com.bvc.common.network.ApiResult
import com.bvc.common.tools.fromAssets
import com.bvc.common.tools.fromJsonToList
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.game.lib.common.constants.ApiConfig
import com.bvc.game.lib.data.model.Game
import com.bvc.game.lib.data.model.RequestToken
import com.bvc.game.lib.data.repository.GameRepository
import com.bvc.game.lib.data.repository.GameRepository.fetchUserInfo2
import com.bvc.game.lib.ui.webview.GameWebView
import com.bvc.liveroom.R
import kotlinx.coroutines.launch

class MainActivityV2 : ComponentActivity() {
    private lateinit var console: AppCompatTextView
    private lateinit var gameList: RecyclerView
    private var token: RequestToken? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_main_v2)

        console = findViewById(R.id.tv_console)
        findViewById<Button>(R.id.btn_login).onClick {
            autoLogin()
        }
        gameList = findViewById<RecyclerView?>(R.id.rv_game_list).apply {
            layoutManager = GridLayoutManager(this@MainActivityV2, 2)
            val gameList = fetchGameList()
            adapter = GameGridAdapter(gameList) {
                onStartGame(it)
            }
        }
    }

    private fun fetchGameList(): List<Game> {
        return "config/GameList.json".fromAssets(this).fromJsonToList<Game>()
    }

    private fun autoLogin() {
        lifecycleScope.launch {
            GameRepository.login("18100000000", "123456").let { it ->
                when (it) {
                    is ApiResult.Error -> {
                        it.apiException.msg.toast(this@MainActivityV2)
                    }

                    is ApiResult.Success -> {
                        token = it.data
                        ApiConfig.userToken = it.data.getRequestToken()
                        token?.getRequestToken().let { userToken ->
                            fetchUserInfo2(userToken!!).onSuccess { user ->
                                "LoginSuccess".toast(this@MainActivityV2)
                                updateConsole(user.nickname)
                                ApiConfig.user = user
                            }.onFailure {
                                updateConsole(it.message!!)
                            }
                        }
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

    private fun onStartGame(game: Game) {
        if(ApiConfig.user == null) {
            getString(R.string.is_not_login).toast(this)
            return
        }
        ApiConfig.user!!.apply {
            val gameUrl = formatGameUrl(
                game.url, uid = id, gameToken = gameToken, gameId = game.id, language = "zh-CN"
            )
            Intent(this@MainActivityV2, GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                this@MainActivityV2.startActivity(this)
            }
        }
    }

    private fun openWebPage(url: String) {
        val webpage: Uri = Uri.parse(url)
        val intent = Intent(Intent.ACTION_VIEW, webpage)
        if(intent.resolveActivity(packageManager) != null) {
            startActivity(intent)
        }
    }

    private fun formatGameUrl(
        gameUrl: String, uid: String, gameToken: String, gameId: String, language: String
    ): String {
        return "${gameUrl}?uid=${uid}&token=${gameToken}&gameid=${gameId}&lang=${language}"
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
                    onItemClick(game)
                }
            }
        }

        class GameViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val gameName: AppCompatTextView = itemView.findViewById(R.id.tv_game_name)
        }
    }
}