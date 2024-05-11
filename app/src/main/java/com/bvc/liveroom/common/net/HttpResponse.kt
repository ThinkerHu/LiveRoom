package com.bvc.liveroom.common.net

interface HttpResponse {
    fun onSuccess(t: String)
    fun onFailed(code: Int, msg: String)
}