package com.bvc.liveroom.ui.recharge

import androidx.lifecycle.ViewModel
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.constants.workScope
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.model.RechargeItem
import com.bvc.liveroom.data.repository.GameRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

class RechargeViewModel : ViewModel() {

    private var _rechargeStateFlow = MutableStateFlow<RechargeState>(RechargeState.Idle)

    val rechargeState: StateFlow<RechargeState> get() = _rechargeStateFlow

    private var pollingJob: Job? = null

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
        workScope.launch {
            if (ApiConfig.user != null) {
                GameRepository.recharge(
                    user = ApiConfig.user!!,
                    gameId = "1",
                    amount = item.coins.toString(),
                    token = ApiConfig.userToken
                ).let {
                    when (it) {
                        is ApiResult.Error -> {
                            _rechargeStateFlow.value = RechargeState.Error(it.apiException.msg)
                        }

                        is ApiResult.Success -> {
                            _rechargeStateFlow.value = RechargeState.StartRecharge(it.data)
                        }
                    }
                }
            } else {
                _rechargeStateFlow.value = RechargeState.Error("User Info is Empty")
            }
        }
    }

    private fun fetchRechargeList() {
        workScope.launch {
            GameRepository.fetchRechargeList(ApiConfig.userToken).apply {
                when (this) {
                    is ApiResult.Error -> {
                        _rechargeStateFlow.value = RechargeState.Loading(false)
                    }

                    is ApiResult.Success -> {
                        _rechargeStateFlow.value = RechargeState.Loading(false)
                        _rechargeStateFlow.value = RechargeState.RechargeList(this.data)
                    }
                }
            }
        }
    }


    fun startCheckRechargeResult(orderSn: String) {
        pollingJob = workScope.launch {
            while (isActive) {
                GameRepository.queryRechargeResult(orderSn, ApiConfig.userToken).let {
                    when (it) {
                        is ApiResult.Error -> {
                            stopPolling(it.apiException.msg)
                        }

                        is ApiResult.Success -> {
                            if (it.data) {
                                _rechargeStateFlow.value = RechargeState.RechargeResult(true)
                                pollingJob?.cancel()
                            } else {
                                delay(1000L)
                            }
                        }
                    }
                }
            }
        }
    }

    private fun stopPolling(errorMsg: String = "Recharge Canceled") {
        _rechargeStateFlow.value = RechargeState.Error(errorMsg)
        pollingJob?.cancel()
    }


}