package com.bvc.liveroom.data.repository

import com.bvc.common.tools.fromJson
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.common.net.HttpResult
import com.bvc.liveroom.common.net.RequestManager
import com.bvc.liveroom.data.model.RequestToken
import com.bvc.liveroom.data.model.User
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object GameRepository {

    suspend fun fetchUserInfo(
        token: String
    ): ApiResult<User> = withContext(Dispatchers.IO) {
        val params = HashMap<String, String>()
        val heads = hashMapOf(
            "Authorization" to token
        )
        val httpResult = RequestManager().doGetSync(
            ApiConfig.FETCH_USER_INFO,
            heads = heads,
            params = params
        )
        when (httpResult) {
            is HttpResult.Success -> {
                val user = httpResult.msg.fromJson<User>()
                return@withContext ApiResult.Success(user)
            }

            is HttpResult.Error -> {
                return@withContext ApiResult.Error(httpResult.exception)
            }
        }
    }

    suspend fun login(userName: String, password: String): ApiResult<RequestToken> =
        withContext(Dispatchers.IO) {
            val params = hashMapOf(
                "username" to userName,
                "password" to password
            )
            RequestManager().doPostSync(ApiConfig.FETCH_TOKEN, null, params).let {
                when (it) {
                    is HttpResult.Success -> {
                        val requestToken = it.msg.fromJson<RequestToken>()
                        return@let ApiResult.Success(requestToken)
                    }

                    is HttpResult.Error -> {
                        return@let ApiResult.Error(it.exception)
                    }
                }
            }
        }

    suspend fun fetchRechargeList() = withContext(Dispatchers.IO) {

    }

    suspend fun pay(id: String) = withContext(Dispatchers.IO) {

    }
}