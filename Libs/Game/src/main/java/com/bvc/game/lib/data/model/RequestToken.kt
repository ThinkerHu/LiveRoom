package com.bvc.game.lib.data.model

data class RequestToken(val tokenHead: String, val token: String) {
    fun getRequestToken(): String {
        return tokenHead + token
    }
}
