package com.bvc.game.lib.data.model

data class Game(
    val id: String,
    val url: String,
    val name: String,
    val desc: String,
    val icon: String,
    val state: Int
)