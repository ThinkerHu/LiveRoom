package com.bvc.liveroom.ui.game

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.appcompat.widget.AppCompatTextView
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.toast
import com.bvc.game.lib.R
import com.bvc.game.lib.common.constants.ApiConfig
import com.bvc.game.lib.data.model.Game
import com.bvc.game.lib.ui.webview.GameWebView

class GameListActivity : BaseActivity() {
    private lateinit var gameList: RecyclerView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_game_list)
        gameList = findViewById<RecyclerView>(R.id.rv_game_list).apply {
            layoutManager = GridLayoutManager(this@GameListActivity, 2)
            adapter = GameListAdapter(listOf()) {
                onGameStart(it)
            }
        }
    }

    private fun onGameStart(game: Game) {
        if(ApiConfig.user == null) {
            getString(R.string.is_not_login).toast(this@GameListActivity)
            return
        }
        ApiConfig.user!!.apply {
            val gameUrl = formatGameUrl(
                game.url,
                uid = id,
                gameToken = gameToken,
                gameId = game.id,
                language = "zh-CN"
            )
            Intent(this@GameListActivity, GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                this@GameListActivity.startActivity(this)
            }
        }
    }

    private fun formatGameUrl(
        gameUrl: String, uid: String, gameToken: String, gameId: String, language: String
    ): String {
        return "${gameUrl}?uid=${uid}&token=${gameToken}&gameid=${gameId}&lang=${language}"
    }
}

class GameListAdapter(
    private val gameList: List<Game>, private val onItemClick: (game: Game) -> Unit
) : RecyclerView.Adapter<GameListAdapter.GameViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.item_game, parent, false)
        return GameViewHolder(view)
    }

    override fun getItemCount(): Int {
        return gameList.size
    }

    override fun onBindViewHolder(holder: GameViewHolder, position: Int) {
        val game = gameList[position]
        holder.apply {
            gameName.text = game.name
            Glide.with(gameCover)
                .load(game.cover)
                .into(gameCover)
            itemView.setOnClickListener {
                onItemClick(game)
            }
        }
    }

    class GameViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val gameName: AppCompatTextView = itemView.findViewById(R.id.tv_game_name)
        val gameCover: ImageView = itemView.findViewById(R.id.iv_game_cover)
    }
}