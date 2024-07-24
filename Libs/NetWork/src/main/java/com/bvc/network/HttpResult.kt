package com.bvc.network

sealed class HttpResult {

    data class Success(val msg: String) : HttpResult()

    data class Error(val exception: ApiException) : HttpResult()
}