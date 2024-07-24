package com.bvc.game.lib.ui.recharge

import com.bvc.game.lib.data.model.RechargeItem


sealed class RechargeIntent {
    data object FetchRechargeList : RechargeIntent()
    data class RechargeItemClick(val item: RechargeItem) : RechargeIntent()
}