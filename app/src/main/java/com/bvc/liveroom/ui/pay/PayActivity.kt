package com.bvc.liveroom.ui.pay

import android.os.Bundle
import android.widget.Button
import androidx.lifecycle.lifecycleScope
import com.bvc.base.ui.BaseActivity
import com.bvc.common.tools.onClick
import com.bvc.liveroom.R
import com.bvc.liveroom.common.constants.ApiConfig
import com.bvc.liveroom.common.net.ApiResult
import com.bvc.liveroom.data.repository.GameRepository
import kotlinx.coroutines.launch

class PayActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pay)
        findViewById<Button>(R.id.btn_recharge).onClick {
            lifecycleScope.launch {
                GameRepository.recharge(
                    1000,
                    System.currentTimeMillis().toString(),
                    ApiConfig.userToken
                ).let {
                    when (it) {
                        is ApiResult.Error -> {

                        }

                        is ApiResult.Success -> {

                        }
                    }
                }
            }
        }
    }
}
