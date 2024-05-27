package com.bvc.liveroom.ui.recharge

import com.bvc.liveroom.data.model.RechargeItem

sealed class RechargeIntent {
    data object FetchRechargeList : RechargeIntent()
    data class RechargeItemClick(val item: RechargeItem) : RechargeIntent()
}