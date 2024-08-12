package com.bvc.game.lib.ui.game

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.appcompat.widget.AppCompatTextView
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.bumptech.glide.Glide
import com.bvc.base.ui.BaseFragment
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.game.lib.R
import com.bvc.game.lib.common.constants.ApiConfig
import com.bvc.game.lib.data.model.Game
import com.bvc.game.lib.data.repository.GameRepository
import com.bvc.game.lib.ui.webview.GameWebView
import kotlinx.coroutines.launch

class GameListFragment : BaseFragment() {
    private lateinit var gameListAdapter: GameListFragmentAdapter
    private lateinit var gameList: RecyclerView
    private lateinit var gameSwipeRefreshLayout: SwipeRefreshLayout

    @SuppressLint("InflateParams")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_game_list, null)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView(view)
        fetchGameList()
    }

    private fun initView(view: View) {
        gameSwipeRefreshLayout =
            view.findViewById<SwipeRefreshLayout?>(R.id.sl_game_refresh).apply {
                setOnRefreshListener {
                    fetchGameList()
                }
            }

        gameList = view.findViewById<RecyclerView>(R.id.rv_game_list).apply {
            layoutManager = GridLayoutManager(context, 2)
            gameListAdapter = GameListFragmentAdapter(listOf()) {
                onGameStart(it)
            }
            adapter = gameListAdapter
        }

        view.findViewById<ImageView>(R.id.tv_back).onClick {
            activity?.finish()
        }
    }

    private fun fetchGameList() {
        lifecycleScope.launch {
            gameSwipeRefreshLayout.isRefreshing = true
            GameRepository.fetchGameList(ApiConfig.userToken, 1, 100).onSuccess {
                gameSwipeRefreshLayout.isRefreshing = false
                gameListAdapter.updateGameList(it)
            }.onFailure {
                gameSwipeRefreshLayout.isRefreshing = false
            }
        }
    }

    private fun onGameStart(game: Game) {
        if(ApiConfig.user == null) {
            getString(R.string.is_not_login).toast(requireContext())
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
            Intent(requireActivity(), GameWebView::class.java).apply {
                putExtra("extra_url", gameUrl)
                requireContext().startActivity(this)
            }
        }
    }

    private fun formatGameUrl(
        gameUrl: String, uid: String, gameToken: String, gameId: String, language: String
    ): String {
        return "${gameUrl}?uid=${uid}&token=${gameToken}&gameid=${gameId}&lang=${language}"
    }
}

private class GameListFragmentAdapter(
    private var gameList: List<Game>, private val onItemClick: (game: Game) -> Unit
) : RecyclerView.Adapter<GameListFragmentAdapter.GameViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.item_game, parent, false)
        return GameViewHolder(view)
    }

    fun updateGameList(gameList: List<Game>) {
        this.gameList = gameList
        notifyItemChanged(-1)
    }

    override fun getItemCount(): Int {
        return gameList.size
    }

    override fun onBindViewHolder(holder: GameViewHolder, position: Int) {
        val game = gameList[position]
        holder.apply {
            gameName.text = game.name
            gameDesc.text = game.desc
            Glide.with(gameCover)
                .load(game.icon)
                .into(gameCover)
            itemView.setOnClickListener {
                onItemClick(game)
            }
        }
    }

    class GameViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val gameName: AppCompatTextView = itemView.findViewById(R.id.tv_game_name)
        val gameDesc: AppCompatTextView = itemView.findViewById(R.id.tv_game_desc)
        val gameCover: ImageView = itemView.findViewById(R.id.iv_game_cover)
    }
}