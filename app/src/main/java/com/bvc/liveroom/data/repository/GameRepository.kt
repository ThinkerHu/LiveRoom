package com.bvc.liveroom.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object GameRepository {

    suspend fun fetchUserInfo() = withContext(Dispatchers.IO) {
        val params = HashMap<String, String>()
        params["password"] = password
        params["username"] = phoneNumber
        params["localLan"] = ApiConfig.LOCAL_LAN
        val heads = HashMap<String, String>()
        heads["Authorization"] = ApiConfig.QUERY_TOKEN
        val httpResult = RequestManager().doPostSync(
            ApiConfig.USER_LOGIN,
            heads = heads,
            params = params
        )
        when (httpResult) {
            is HttpResult.Success -> {
                val token = httpResult.msg.fromJson<RequestToken>()
                if (token != null) {
                    setSPValue(SP_QUERY_TOKEN_KEY, token.tokenStr(), FiApp.instance())
                    ApiConfig.QUERY_TOKEN = token.tokenStr()
                    getUserInfo(result)
                } else {
                    result(ApiResult.Error(ApiException(-1, "Result is Empty")))
                }
            }

            is HttpResult.Error -> {
                result(ApiResult.Error(httpResult.exception))
            }
        }
    }

    suspend fun fetchToken() = withContext(Dispatchers.IO) {

    }

    suspend fun fetchRechargeList() = withContext(Dispatchers.IO) {

    }

    suspend fun pay(id: String) = withContext(Dispatchers.IO) {

    }
}