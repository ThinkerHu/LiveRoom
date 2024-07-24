package com.bvc.network

interface HttpResponse {
    fun onSuccess(t: String)
    fun onFailed(code: Int, msg: String)
}