package com.bvc.liveroom.ui.recharge

import androidx.lifecycle.ViewModel
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.constants.workScope
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.model.RechargeItem
import com.bvc.liveroom.data.repository.GameRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class RechargeViewModel : ViewModel() {

    private val _rechargeStateFlow = MutableStateFlow(RechargeState.Idle)

    val rechargeState: StateFlow<RechargeState> get() = _rechargeStateFlow

    fun handleIntent(rechargeIntent: RechargeIntent) {
        when (rechargeIntent) {
            is RechargeIntent.FetchRechargeList -> {
                fetchRechargeList()
            }

            is RechargeIntent.RechargeItemClick -> {
                rechargeItemClick(rechargeIntent.item)
            }
        }
    }

    private fun rechargeItemClick(item: RechargeItem) {

    }

    private fun fetchRechargeList() {
        workScope.launch {
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