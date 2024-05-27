package com.bvc.liveroom.ui.recharge

import com.bvc.liveroom.data.model.RechargeItem

sealed class RechargeState {
    data object Idle : RechargeState()
    data class Loading(val isLoading: Boolean) : RechargeState()
    data class RechargeList(val rechargeList: List<RechargeItem>) : RechargeState()
    data class Error(val msg: String) : RechargeState()
}