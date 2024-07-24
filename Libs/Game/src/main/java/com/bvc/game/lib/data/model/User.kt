package com.bvc.game.lib.data.model

data class User(
    val id: String,
    val username: String,
    val password: String,
    val nickname: String,
    val phone: String,
    val email: String = "12122@qq.com",
    val coin: Long,
    val state: Int,
    val createTime: String,
    val avatar: String,
    val gameToken: String
)