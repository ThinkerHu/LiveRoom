package com.bvc.network

import com.bvc.common.network.BuildConfig
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.security.SecureRandom
import java.security.cert.X509Certificate
import java.util.concurrent.TimeUnit
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.X509TrustManager

class HttpManager {
    private var okHttpClient: OkHttpClient? = null
    private val timeUnit: TimeUnit = TimeUnit.SECONDS
    private var connectTimeOut: Long = 20
    private var readTimeOut: Long = 20
    private var writeTimeOut: Long = 20
    private var interceptions: List<Interceptor> = listOf(RedirectInterceptor())
    private var networkInterceptions: List<Interceptor> = ArrayList()

    private val loggingInterceptor by lazy {
        HttpLoggingInterceptor().apply {
            level = if (BuildConfig.LOG_DEBUG) {
                HttpLoggingInterceptor.Level.BODY
            } else {
                HttpLoggingInterceptor.Level.NONE
            }
        }
    }

    companion object {
        fun instance() = Holder.instance
    }

    private object Holder {
        val instance = HttpManager()
    }

    fun initHttpClient(): OkHttpClient? {
        if (okHttpClient != null) {
            return okHttpClient
        }
        var builder = OkHttpClient.Builder()
            .connectTimeout(connectTimeOut, timeUnit)
            .readTimeout(readTimeOut, timeUnit)
            .writeTimeout(writeTimeOut, timeUnit)
            .addInterceptor(loggingInterceptor)
            .hostnameVerifier { _, _ -> true }
            .sslSocketFactory(createSSLSocketFactory(), createTrustManager())
        builder = wrapInterceptions(builder, interceptions)
        builder = wrapNetworkInterceptions(builder, networkInterceptions)
        okHttpClient = builder.build()
        return okHttpClient
    }

    private fun wrapNetworkInterceptions(
        builder: OkHttpClient.Builder,
        interceptions: List<Interceptor>
    ): OkHttpClient.Builder {
        for (item in interceptions) {
            builder.addNetworkInterceptor(item)
        }
        return builder
    }

    private fun wrapInterceptions(
        builder: OkHttpClient.Builder,
        interceptions: List<Interceptor>
    ): OkHttpClient.Builder {
        for (item in interceptions) {
            builder.addInterceptor(item)
        }
        return builder
    }

    private fun createSSLSocketFactory(): SSLSocketFactory {
        var sslContext: SSLContext? = null
        try {
            sslContext = SSLContext.getInstance("SSL")
            val xTrustArray = arrayOf(createTrustManager())
            sslContext.init(
                null,
                xTrustArray, SecureRandom()
            )
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return sslContext!!.socketFactory
    }

    private fun createTrustManager(): X509TrustManager {
        return object : X509TrustManager {
            override fun getAcceptedIssuers(): Array<X509Certificate> {
                return arrayOf()
            }

            override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {
            }

            override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {
            }
        }
    }
}