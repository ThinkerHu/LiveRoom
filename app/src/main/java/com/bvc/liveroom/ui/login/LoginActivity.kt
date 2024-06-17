package com.bvc.liveroom.ui.login

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.annotation.StringRes
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.bvc.common.tools.onClick
import com.bvc.liveroom.R
import com.bvc.liveroom.databinding.ActivityLoginBinding


class LoginActivity : AppCompatActivity() {

    private lateinit var loginViewModel: LoginViewModel
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        prepareView()
        attachViewModel()
    }

    private fun prepareView() {
        findViewById<Button>(R.id.btn_forgot_password).onClick {

        }

        findViewById<Button>(R.id.btn_register).onClick {

        }

        findViewById<Button>(R.id.btn_login).onClick {

        }
    }

    private fun attachViewModel() {
        loginViewModel = ViewModelProvider(this)[LoginViewModel::class.java]
    }
}

