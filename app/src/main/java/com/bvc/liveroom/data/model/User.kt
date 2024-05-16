package com.bvc.liveroom.data.model

data class User(
    val id: String,
    val username: String,
    val password: String,
    val nickname: String,
    val phone: String,
    val coin: Long,
    val state: Int,
    val createTime: String,
    val avatar: String
)