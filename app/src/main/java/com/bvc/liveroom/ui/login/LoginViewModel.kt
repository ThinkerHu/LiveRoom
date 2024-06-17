package com.bvc.liveroom.ui.login

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    private val _loginState = MutableStateFlow(LoginState())
    val loginState: StateFlow<LoginState> get() = _loginState


    fun sendIntent(intent: LoginIntent) {
        when (intent) {
            is LoginIntent.Login -> {
                performLogin(intent.phoneNumber, intent.password)
            }

            is LoginIntent.ForgetPasswordIntent -> {

            }

            is LoginIntent.RegisterIntent -> {

            }
        }
    }

    private fun performLogin(phoneNumber: String, password: String) {
        viewModelScope.launch {
            _loginState.value = LoginState(isLoading = true)
        }
    }

    fun loginDataChanged(toString: String, toString1: String) {

    }
}

data class LoginState(
    val isLoading: Boolean = false, val isLoggedIn: Boolean = false, val error: String? = null
)

sealed class LoginIntent {
    data class Login(
        val phoneNumber: String, val password: String
    ) : LoginIntent()

    data class ForgetPasswordIntent(val context: Context) : LoginIntent()

    data class RegisterIntent(val context: Context) : LoginIntent()
}

sealed class LoginResult {
    data object Success : LoginResult()
    data class Failure(val error: String) : LoginResult()
    data object Loading : LoginResult()
}