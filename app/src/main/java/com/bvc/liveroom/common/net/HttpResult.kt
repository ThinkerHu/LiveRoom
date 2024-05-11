package com.bvc.liveroom.common.net

sealed class HttpResult {

    data class Success(val msg: String) : HttpResult()

    data class Error(val exception: ApiException) : HttpResult()
}