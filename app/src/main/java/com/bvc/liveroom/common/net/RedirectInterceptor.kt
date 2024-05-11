package com.bvc.liveroom.common.net

import okhttp3.Interceptor
import okhttp3.Response

class RedirectInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        return chain.proceed(request);
    }
}
