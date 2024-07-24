package com.bvc.game.lib.common.constants

import com.bvc.game.lib.data.model.User

object ApiConfig {

    const val FETCH_TOKEN = "http://45.204.206.92:8085/sso/login"

    const val FETCH_USER_INFO = "http://45.204.206.92:8085/sso/info"

    const val UPDATE_USER_COIN = "http://45.204.206.92:8085/coin/updateCoin"

    const val RECHARGE_LIST: String = "http://45.204.206.92:8085/config/depositConfigList"

    const val QUERY_RECHARGE_RESULT = "http://45.204.206.92:8085/user/pay/getResult"

    const val RECHARGE = "http://45.204.206.92:8085/user/pay/add"

    var userToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODEwMDAwMDAwMCIsImNyZWF0ZWQiOjE3MTU3NTY3NTk4MjIsImV4cCI6MTcxNjM2MTU1OX0.Gsb2ccPXW_mLlTN_A-BwfauXOJmHoJrOAOckRdSzygc"

    var user: User? = null
}