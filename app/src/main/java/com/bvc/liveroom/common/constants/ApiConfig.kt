package com.bvc.liveroom.common.constants

object ApiConfig {

    const val FETCH_TOKEN = "http://38.55.193.60:8085/sso/login"

    const val FETCH_USER_INFO = "http://38.55.193.60:8085/sso/info"

    const val UPDATE_USER_COIN = "http://38.55.193.60:8085/coin/updateCoin"

    const val RECHARGE_COIN = "http://38.55.193.60:8085/user/deposit/add"

    const val RECHARGE_LIST: String = "http://38.55.193.60:8085/config/depositConfig"

    const val PAY = "http://38.55.193.60:8085/user/pay/add"

    var userToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODEwMDAwMDAwMCIsImNyZWF0ZWQiOjE3MTU3NTY3NTk4MjIsImV4cCI6MTcxNjM2MTU1OX0.Gsb2ccPXW_mLlTN_A-BwfauXOJmHoJrOAOckRdSzygc"
}