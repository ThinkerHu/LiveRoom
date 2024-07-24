package com.bvc.game.lib.data.repository

import android.content.Context
import com.bvc.common.tools.fromAssets
import com.bvc.network.ApiResult
import com.bvc.network.HttpResult
import com.bvc.network.RequestManager
import com.bvc.common.tools.fromJson
import com.bvc.common.tools.fromJsonToList
import com.bvc.game.lib.common.constants.ApiConfig
import com.bvc.game.lib.data.model.Game
import com.bvc.game.lib.data.model.RechargeItem
import com.bvc.game.lib.data.model.RechargeOrder
import com.bvc.game.lib.data.model.RequestToken
import com.bvc.game.lib.data.model.User
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

object GameRepository {

    suspend fun fetchUserInfo(
        token: String
    ): ApiResult<User> = withContext(Dispatchers.IO) {
        val params = HashMap<String, String>()
        val heads = hashMapOf(
            "Authorization" to token
        )
        val httpResult = RequestManager().doGetSync(
            ApiConfig.FETCH_USER_INFO, heads = heads, params = params
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

    suspend fun fetchUserInfo2(
        token: String
    ): Result<User> = withContext(Dispatchers.IO) {
        val params = HashMap<String, String>()
        val heads = hashMapOf(
            "Authorization" to token
        )
        suspendCoroutine {
            val httpResult = RequestManager().doGetSync(
                ApiConfig.FETCH_USER_INFO, heads = heads, params = params
            )
            when (httpResult) {
                is HttpResult.Success -> {
                    val user = httpResult.msg.fromJson<User>()
                    it.resume(Result.success(user))
                }

                is HttpResult.Error -> {
                    it.resume(Result.failure(Exception(httpResult.exception.msg)))
                }
            }
        }
    }

    suspend fun login(userName: String, password: String): ApiResult<RequestToken> =
        withContext(Dispatchers.IO) {
            val params = hashMapOf(
                "username" to userName, "password" to password
            )
            RequestManager().doPostSync(ApiConfig.FETCH_TOKEN, params = params).let {
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

    suspend fun login2(userName: String, password: String): ApiResult<RequestToken> =
        withContext(Dispatchers.IO) {
            val params = hashMapOf(
                "username" to userName, "password" to password
            )
            RequestManager().doPostSync(ApiConfig.FETCH_TOKEN, params = params).let {
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

    suspend fun recharge(
        user: User,
        gameId: String,
        amount: String,
        token: String,
    ): ApiResult<RechargeOrder> = withContext(Dispatchers.IO) {
        val params = hashMapOf(
            "email" to "12122@gmail.com",
            "gameId" to gameId,
            "mobile" to user.phone,
            "name" to user.nickname,
            "orderAmount" to amount
        )
        val heads = hashMapOf(
            "Authorization" to token
        )
        RequestManager().doPostSync(ApiConfig.RECHARGE, heads = heads, params = params).let {
            when (it) {
                is HttpResult.Error -> {
                    return@withContext ApiResult.Error(it.exception)
                }

                is HttpResult.Success -> {
                    val payOrderResult = it.msg.fromJson<RechargeOrder>()
                    return@withContext ApiResult.Success(payOrderResult)
                }
            }
        }
    }

    suspend fun queryRechargeResult(orderSn: String, token: String): ApiResult<Boolean> =
        withContext(Dispatchers.IO) {
            val heads = hashMapOf(
                "Authorization" to token
            )
            val params = hashMapOf(
                "orderSn" to orderSn
            )
            RequestManager().doPostSync(
                ApiConfig.QUERY_RECHARGE_RESULT, heads = heads, params = params
            ).let {
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

    suspend fun fetchRechargeList(token: String): ApiResult<List<RechargeItem>> =
        withContext(Dispatchers.IO) {
            val heads = hashMapOf(
                "Authorization" to token
            )
            RequestManager().doPostSync(
                ApiConfig.RECHARGE_LIST, heads = heads, params = hashMapOf()
            ).let {
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

    suspend fun fetchGameList(context: Context): Result<List<Game>> = withContext(Dispatchers.IO) {
        delay(1000)
        val gameList = "config/GameList.json".fromAssets(context).fromJsonToList<Game>()
        return@withContext Result.success(gameList)
    }
}