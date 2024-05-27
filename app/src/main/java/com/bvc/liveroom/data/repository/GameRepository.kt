package com.bvc.liveroom.data.repository

import com.bvc.common.tools.fromJson
import com.bvc.common.tools.fromJsonToList
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.common.net.HttpResult
import com.bvc.liveroom.common.net.RequestManager
import com.bvc.liveroom.data.model.PayOrderResult
import com.bvc.liveroom.data.model.RechargeItem
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

    suspend fun pay(
        email: String,
        phone: String,
        name: String,
        amount: Float,
        token: String
    ): ApiResult<PayOrderResult> =
        withContext(Dispatchers.IO) {
            val params = hashMapOf(
                "email" to email,
                "mobile" to phone,
                "name" to name,
                "orderAmount" to amount.toString()
            )
            val heads = hashMapOf(
                "Authorization" to token
            )
            RequestManager().doPostSync(ApiConfig.PAY, heads = heads, params = params).let {
                when (it) {
                    is HttpResult.Error -> {
                        return@withContext ApiResult.Error(it.exception)
                    }

                    is HttpResult.Success -> {
                        val payOrderResult = it.msg.fromJson<PayOrderResult>()
                        return@withContext ApiResult.Success(payOrderResult)
                    }
                }
            }
        }

    suspend fun fetchRechargeList(token: String): ApiResult<List<RechargeItem>> =
        withContext(Dispatchers.IO) {
            val heads = hashMapOf(
                "Authorization" to token
            )
            RequestManager().doPostSync(
                ApiConfig.RECHARGE_LIST,
                heads = heads,
                params = hashMapOf()
            )
                .let {
                    when (it) {
                        is HttpResult.Success -> {
                            val rechargeItemList = it.msg.fromJsonToList<RechargeItem>()
                            return@let ApiResult.Success(rechargeItemList)
                        }

                        is HttpResult.Error -> {
                            return@let ApiResult.Error(it.exception)
                        }
                    }
                }

        }

    suspend fun recharge(coin: Long, orderId: String, token: String): ApiResult<Boolean> =
        withContext(Dispatchers.IO) {
            val params = hashMapOf(
                "coin" to coin.toString(),
                "orderId" to orderId
            )
            val heads = hashMapOf(
                "Authorization" to token
            )
            RequestManager().doPostSync(ApiConfig.RECHARGE_COIN, heads = heads, params = params)
                .let {
                    when (it) {
                        is HttpResult.Success -> {
                            return@let ApiResult.Success(true)
                        }

                        is HttpResult.Error -> {
                            return@let ApiResult.Error(it.exception)
                        }
                    }
                }
        }

}