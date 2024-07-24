package com.bvc.game.lib.common.constants

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers

val uiScope = CoroutineScope(Dispatchers.Main)

val workScope = CoroutineScope(Dispatchers.IO)
