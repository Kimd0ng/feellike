package com.feellike.mobile

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * MainActivity
 * React Native 앱의 메인 액티비티
 * @author Feel Economy Team
 */
class MainActivity : ReactActivity() {

    /**
     * 메인 컴포넌트 이름 반환
     * index.js에서 등록한 이름과 일치해야 함
     */
    override fun getMainComponentName(): String = "FeelLikeMobile"

    /**
     * React Activity Delegate 생성
     * New Architecture 지원을 위한 설정
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
