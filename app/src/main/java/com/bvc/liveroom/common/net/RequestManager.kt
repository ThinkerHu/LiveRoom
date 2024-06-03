package com.bvc.liveroom.common.net


import com.bvc.common.tools.logD
import com.bvc.common.tools.logE
import com.bvc.common.tools.logJson
import com.bvc.liveroom.BuildConfig
import okhttp3.FormBody
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

class RequestManager() {
    private var okHttpClient: OkHttpClient? = null
    private var requestBuild: Request.Builder = Request.Builder()

    init {
        okHttpClient = HttpManager.instance().initHttpClient()
    }

    fun doGetSync(
        url: String,
        heads: MutableMap<String, String>? = null,
        params: MutableMap<String, String>? = null
    ): HttpResult {
        if (url.isEmpty()) {
            return HttpResult.Error(ApiException(-1, "url is Empty"))
        }
        if (heads != null) {
            addHeads(heads)
        }
        if (params != null) {
            requestBuild.url(buildGetUrl(url, params))
        } else {
            requestBuild.url(url)
        }
        return try {
            val response = okHttpClient!!.newCall(requestBuild.build()).execute()
            if (response.isSuccessful) {
                val body = response.body.string()
                handleResultSync(body)
            } else {
                HttpResult.Error(ApiException(response.code, response.message))
            }
        } catch (e: Exception) {
            e.printStackTrace()
            HttpResult.Error(ApiException(-1, e.message!!))
        }
    }

    fun doGet(
        url: String,
        heads: MutableMap<String, String>? = null,
        params: MutableMap<String, String>? = null,
        httpResponse: HttpResponse
    ) {
        if (url.isEmpty()) {
            httpResponse.onFailed(-1, "url is Empty")
            return
        }
        if (heads != null) {
            addHeads(heads)
        }
        if (params != null) {
            requestBuild.url(buildGetUrl(url, params))
        } else {
            requestBuild.url(url)
        }
        try {
            val response = okHttpClient!!.newCall(requestBuild.build()).execute()
            if (response.isSuccessful) {
                val body = response.body?.string()
                handleResult(body, httpResponse)
            } else {
                httpResponse.onFailed(response.code, response.message)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            httpResponse.onFailed(-1, e.message!!)
        }
    }

    fun doPost(
        url: String,
        heads: MutableMap<String, String>? = null,
        params: MutableMap<String, String>? = null,
        httpResponse: HttpResponse
    ) {
        if (url.isEmpty()) {
            httpResponse.onFailed(-1, "url is Empty")
            return
        }
        if (heads != null) {
            addHeads(heads)
        }
        val wrapperParams = wrapperRequestParams(params)
        requestBuild.url(url).post(addPostParams(wrapperParams))
        try {
            val response = okHttpClient!!.newCall(requestBuild.build()).execute()
            url.logD()
            if (response.isSuccessful) {
                val body = response.body.string()
                handleResult(body, httpResponse)
                body.apply {
                    this.logJson()
                }
            } else {
                httpResponse.onFailed(response.code, response.message)
                response.message.logD()
            }
        } catch (e: Exception) {
            "$url\n${e.message}".logE()
            httpResponse.onFailed(-1, e.message.toString())
            e.printStackTrace()
        }
    }

    fun doPostSync(
        url: String,
        heads: MutableMap<String, String>? = null,
        params: MutableMap<String, String>? = null,
    ): HttpResult {
        if (url.isEmpty()) {
            return HttpResult.Error(ApiException(msg = "url is Empty"))
        }
        if (heads != null) {
            addHeads(heads)
        }
        requestBuild.url(url).post(addPostParams(params))
        try {
            val response = okHttpClient!!.newCall(requestBuild.build()).execute()
            return if (response.isSuccessful) {
                val body = response.body.string()
                body.apply {
                    if (BuildConfig.LOG_DEBUG) {
                        this.logJson()
                    }
                }
                handleResultSync(body)
            } else {
                response.message.logD()
                HttpResult.Error(ApiException(response.code, response.message))
            }
        } catch (e: Exception) {
            "$url\n${e.message}".logE()
            e.printStackTrace()
            return HttpResult.Error(ApiException(msg = e.message.toString()))
        }
    }

    fun doPostSyncResult(
        url: String,
        heads: MutableMap<String, String>? = null,
        params: MutableMap<String, String>? = null,
    ): Result<String> {
        if (url.isEmpty()) {
            return Result.failure(Exception("url is Empty"))
        }
        if (heads != null) {
            addHeads(heads)
        }
        requestBuild.url(url).post(addPostParams(params))
        try {
            val response = okHttpClient!!.newCall(requestBuild.build()).execute()
            url.logD()
            return if (response.isSuccessful) {
                val body = response.body.string()
                body.apply {
                    if (BuildConfig.LOG_DEBUG) {
                        this.logJson()
                    }
                }
                handleResultSyncResult(body)
            } else {
                response.message.logD()
                Result.failure(java.lang.Exception(response.message))
            }
        } catch (e: Exception) {
            "$url\n${e.message}".logE()
            e.printStackTrace()
            return Result.failure(e)
        }
    }

    private fun handleResultSync(body: String?): HttpResult {
        if (body == null) {
            return HttpResult.Error(ApiException(msg = "response is Empty"))
        }
        try {
            val jsonObject = JSONObject(body)
            val code = jsonObject.getInt("errorCode")
            val message = jsonObject.getString("message")
            if (code != 0) {
                return HttpResult.Error(ApiException(code, message))
            }
            val data = jsonObject.getString("data")
            return if (data.isNullOrEmpty()) {
                HttpResult.Error(ApiException(msg = "Response is Empty"))
            } else {
                HttpResult.Success(data)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return HttpResult.Error(ApiException(msg = "data format is error:$body"))
        }

    }

    private fun handleResultSyncResult(body: String?): Result<String> {
        if (body == null) {
            return Result.failure(Exception("response is Empty"))
        }
        try {
            val jsonObject = JSONObject(body)
            val code = jsonObject.getInt("code")
            val message = jsonObject.getString("message")
            if (code != 0) {
                return Result.failure(Exception(message))
            }
            val data = jsonObject.getString("data")
            return if (data.isNullOrEmpty()) {
                Result.failure(Exception("Response is Empty"))
            } else {
                Result.success(data)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return Result.failure(e)
        }

    }


    private fun wrapperRequestParams(params: MutableMap<String, String>?): MutableMap<String, String>? {
        val wrapperParams = HashMap<String, String>()
        params?.apply {
            wrapperParams.putAll(this)
        }
        return wrapperParams
    }

    private fun handleResult(body: String?, httpResponse: HttpResponse) {
        if (body == null) {
            httpResponse.onFailed(-1, "response is Empty")
            return
        }
        try {
            val jsonObject = JSONObject(body)
            val code = jsonObject.getInt("code")
            val message = jsonObject.getString("message")
            if (code != 0) {
                httpResponse.onFailed(code, message)
                return
            }
            val data = jsonObject.getString("data")
            if (data.isNullOrEmpty()) {
                httpResponse.onFailed(-1, "Response is Empty")
            } else {
                httpResponse.onSuccess(data)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            httpResponse.onFailed(-1, "data format is error:$body")
        }

    }

    private fun addHeads(heads: MutableMap<String, String>) {
        heads.entries.forEach { entry ->
            heads.keys
            requestBuild.addHeader(entry.key, entry.value)
        }
    }

    private fun buildGetUrl(url: String, params: MutableMap<String, String>): String {
        val stringBuilder = StringBuilder(url)
        if (params.isNotEmpty()) stringBuilder.append("?")
        params.forEach { entry ->
            params.keys
            stringBuilder.append(entry.key + "=" + entry.value + "&")
        }
        return if (stringBuilder.toString().endsWith("&")) {
            stringBuilder.subSequence(0, stringBuilder.lastIndex).toString()
        } else {
            stringBuilder.toString()
        }
    }

    private fun addPostParams(params: MutableMap<String, String>?): RequestBody {
        val builder = FormBody.Builder()
        params?.forEach { entry ->
            params.keys
            builder.add(entry.key, entry.value)
        }
        return builder.build()
    }

    private fun addPutParas(content: String): RequestBody? {
        if (content.isEmpty()) {
            return null
        }
        return content.toRequestBody("application/json".toMediaTypeOrNull())
    }
}