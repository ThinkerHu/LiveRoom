package com.bvc.common.network

sealed class HttpResult {

    data class Success(val msg: String) : HttpResult()

    data class Error(val exception: ApiException) : HttpResult()
}