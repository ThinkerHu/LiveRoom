package com.bvc.liveroom.ui.recharge

import android.os.Bundle
import android.widget.Button
import android.widget.ProgressBar
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.onClick
import com.bvc.common.tools.toast
import com.bvc.liveroom.R
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.repository.GameRepository
import com.bvc.liveroom.ui.recharge.RechargeState.*
import kotlinx.coroutines.launch

class RechargeActivity : BaseActivity() {
    private lateinit var progressBar: ProgressBar
    private lateinit var rechargeViewModel: RechargeViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pay)
        rechargeViewModel = ViewModelProvider(this)[RechargeViewModel::class.java]
        lifecycleScope.launch {
            rechargeViewModel.rechargeState.collect {
                when (it) {
                    is Error -> {
                        it.msg.toast(this@RechargeActivity)
                    }

                    Idle -> {

                    }

                    Loading -> {

                    }

                    is RechargeList -> {

                    }
                }
            }
        }
    }

    private fun rechargeTest() {
        findViewById<Button>(R.id.btn_recharge).onClick {
            lifecycleScope.launch {
                GameRepository.recharge(
                    1000,
                    System.currentTimeMillis().toString(),
                    ApiConfig.userToken
                ).let {
                    when (it) {
                        is ApiResult.Error -> {

                        }

                        is ApiResult.Success -> {

                        }
                    }
                }
            }
        }
    }

    private fun fetchRechargeList() {
        lifecycleScope.launch {
            GameRepository.fetchRechargeList(ApiConfig.userToken).apply {
                when (this) {
                    is ApiResult.Error -> {

                    }

                    is ApiResult.Success -> {

                    }
                }
            }
        }
    }
}
