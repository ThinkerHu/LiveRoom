package com.bvc.liveroom.ui.recharge

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.hide
import com.bvc.common.tools.logE
import com.bvc.common.tools.onClick
import com.bvc.common.tools.show
import com.bvc.common.tools.toast
import com.bvc.liveroom.R
import com.bvc.liveroom.data.model.RechargeItem
import com.bvc.liveroom.ui.recharge.RechargeState.Error
import com.bvc.liveroom.ui.recharge.RechargeState.Idle
import com.bvc.liveroom.ui.recharge.RechargeState.Loading
import com.bvc.liveroom.ui.recharge.RechargeState.RechargeList
import kotlinx.coroutines.launch

class RechargeListActivity : BaseActivity() {
    private lateinit var rechargeListAdapter: RechargeListAdapter
    private lateinit var progressBar: ProgressBar
    private lateinit var rechargeList: RecyclerView
    private lateinit var rechargeViewModel: RechargeViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pay)
        prepareView()
        attachViewModel()
    }

    private fun prepareView() {
        title = getString(R.string.title_recharge)
        progressBar = findViewById(R.id.pb_loading)
        rechargeListAdapter = RechargeListAdapter(listOf()) {
            "OnItemClick${it.coins}".toast(this)
            rechargeViewModel.handleIntent(RechargeIntent.RechargeItemClick(it))
        }
        rechargeList = findViewById<RecyclerView>(R.id.rv_recharge_list).apply {
            layoutManager = LinearLayoutManager(this@RechargeListActivity)
            adapter = rechargeListAdapter
        }
    }

    private fun attachViewModel() {
        rechargeViewModel = ViewModelProvider(this)[RechargeViewModel::class.java]
        lifecycleScope.launch {
            rechargeViewModel.rechargeState.collect {
                when (it) {
                    is Error -> {
                        it.msg.toast(this@RechargeListActivity)
                    }

                    Idle -> {
                        //do nothing
                    }

                    is RechargeList -> {
                        rechargeListAdapter.updateList(it.rechargeList)
                    }

                    is Loading -> {
                        if (it.isLoading) {
                            progressBar.show()
                        } else {
                            progressBar.hide()
                        }
                    }

                    is RechargeState.StartRecharge -> {
                        rechargeViewModel.startCheckRechargeResult(it.recharge.orderNo)
                    }

                    is RechargeState.RechargeResult -> {

                    }
                }
            }
        }
        rechargeViewModel.handleIntent(RechargeIntent.FetchRechargeList)
    }

    private class RechargeListAdapter(
        private var rechargeList: List<RechargeItem>,
        private val onItemClick: (item: RechargeItem) -> Unit
    ) : RecyclerView.Adapter<RechargeViewHolder>() {
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RechargeViewHolder {
            val view =
                LayoutInflater.from(parent.context).inflate(R.layout.item_recharge, parent, false)
            return RechargeViewHolder(view)
        }

        override fun getItemCount(): Int {
            return rechargeList.size
        }

        fun updateList(list: List<RechargeItem>) {
            rechargeList = list
            notifyDataSetChanged()
        }

        override fun onBindViewHolder(holder: RechargeViewHolder, position: Int) {
            rechargeList[position].apply {
                holder.itemView.onClick {
                    onItemClick(this)
                }
                holder.amount.text = this.coins.toString()
                holder.price.text = this.price.toString()
            }
        }

    }

    private class RechargeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val amount: TextView = itemView.findViewById(R.id.tv_coin)
        val price: TextView = itemView.findViewById(R.id.tv_amount)
    }
}
