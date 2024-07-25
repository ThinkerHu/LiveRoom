package com.bvc.game.lib.common.constants

import com.bvc.game.lib.data.model.User

object ApiConfig {

    private const val GAME_HOST = "http://45.204.206.92:8085/"

    const val FETCH_TOKEN = "${GAME_HOST}sso/login"

    const val FETCH_USER_INFO = "${GAME_HOST}/sso/info"

    const val UPDATE_USER_COIN = "${GAME_HOST}coin/updateCoin"

    const val RECHARGE_LIST: String = "${GAME_HOST}config/depositConfigList"

    const val QUERY_RECHARGE_RESULT = "${GAME_HOST}user/pay/getResult"

    const val RECHARGE = "${GAME_HOST}user/pay/add"

    const val FETCH_GAME_LIST = "${GAME_HOST}games/list"

    var userToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODEwMDAwMDAwMCIsImNyZWF0ZWQiOjE3MTU3NTY3NTk4MjIsImV4cCI6MTcxNjM2MTU1OX0.Gsb2ccPXW_mLlTN_A-BwfauXOJmHoJrOAOckRdSzygc"

    var user: User? = null
}