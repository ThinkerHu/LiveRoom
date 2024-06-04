package com.bvc.liveroom.ui.recharge

import com.bvc.liveroom.data.model.RechargeItem
import com.bvc.liveroom.data.model.RechargeOrder

sealed class RechargeState {
    data object Idle : RechargeState()
    data class Loading(val isLoading: Boolean) : RechargeState()
    data class RechargeList(val rechargeList: List<RechargeItem>) : RechargeState()
    data class StartRecharge(val recharge: RechargeOrder) : RechargeState()
    data class RechargeResult(val result:Boolean) : RechargeState()
    data class Error(val msg: String) : RechargeState()
}