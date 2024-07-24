package com.bvc.common.network

interface HttpResponse {
    fun onSuccess(t: String)
    fun onFailed(code: Int, msg: String)
}