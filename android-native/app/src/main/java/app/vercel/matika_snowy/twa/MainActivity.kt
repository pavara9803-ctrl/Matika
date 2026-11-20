package app.vercel.matika_snowy.twa

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader
import com.google.android.play.core.appupdate.AppUpdateManager
import com.google.android.play.core.appupdate.AppUpdateManagerFactory
import com.google.android.play.core.appupdate.AppUpdateOptions
import com.google.android.play.core.install.InstallStateUpdatedListener
import com.google.android.play.core.install.model.AppUpdateType
import com.google.android.play.core.install.model.InstallStatus
import com.google.android.play.core.install.model.UpdateAvailability
import com.google.android.play.core.review.ReviewManager
import com.google.android.play.core.review.ReviewManagerFactory

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView

    // ---- Play Store in-app update ("නව අනුවාදයක් ඇත" දැනුම්දීම) ----
    private lateinit var appUpdateManager: AppUpdateManager

    // ---- Play Store in-app review (තරු දීමේ ඉල්ලීම) ----
    private lateinit var reviewManager: ReviewManager

    /** none | available | downloading | ready */
    @Volatile
    private var updateState = "none"

    private val installListener = InstallStateUpdatedListener { state ->
        when (state.installStatus()) {
            InstallStatus.PENDING, InstallStatus.DOWNLOADING -> setUpdateState("downloading")
            InstallStatus.DOWNLOADED -> setUpdateState("ready")
            InstallStatus.INSTALLED -> setUpdateState("none")
            InstallStatus.FAILED, InstallStatus.CANCELED -> setUpdateState("available")
            else -> {}
        }
    }

    /** JavaScript (assets පිටු) වෙතින් ඇමතිය හැකි bridge: window.MatikaNative */
    inner class NativeBridge {
        @JavascriptInterface
        fun updateState(): String = updateState

        @JavascriptInterface
        fun getTextZoom(): Int = savedTextZoom()

        @JavascriptInterface
        fun setTextZoom(percent: Int) {
            val p = percent.coerceIn(70, 200)
            getSharedPreferences("matika", MODE_PRIVATE).edit().putInt("textZoom", p).apply()
            runOnUiThread { if (::webView.isInitialized) webView.settings.textZoom = p }
        }

        @JavascriptInterface
        fun startUpdate() {
            runOnUiThread { startOrCompleteUpdate() }
        }

        /** Play Store හි තරු දීමේ කවුළුව ඉල්ලයි (පෙන්වනවා ද යන්න Play තීරණය කරයි) */
        @JavascriptInterface
        fun requestReview() {
            runOnUiThread { launchReview() }
        }
    }

    /** සුරකින ලද අකුරු ප්‍රමාණය; පෙරනිමිය: දුරකථන 90%, ටැබ්ලට් 100% */
    private fun savedTextZoom(): Int {
        val def = if (resources.configuration.smallestScreenWidthDp < 600) 90 else 100
        return getSharedPreferences("matika", MODE_PRIVATE).getInt("textZoom", def)
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // තද පසුබිමක් මත වේලාව/බැටරිය ආදිය සුදු පැහැයෙන් පෙනෙන ලෙස
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.dark(Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.dark(Color.TRANSPARENT)
        )

        appUpdateManager = AppUpdateManagerFactory.create(this)
        reviewManager = ReviewManagerFactory.create(this)

        // app/src/main/assets/* ගොනු https://appassets.androidplatform.net/* ලෙස සේවය කරයි
        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView = WebView(this).apply {
            setBackgroundColor(Color.parseColor("#FFFBEE"))
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                allowFileAccess = false
                allowContentAccess = false
                cacheMode = WebSettings.LOAD_DEFAULT
                textZoom = savedTextZoom()
            }
            addJavascriptInterface(NativeBridge(), "MatikaNative")
            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView, request: WebResourceRequest
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(
                    view: WebView, request: WebResourceRequest
                ): Boolean {
                    val url = request.url
                    if (url.host == WebViewAssetLoader.DEFAULT_DOMAIN) return false
                    // බාහිර සබැඳි බ්‍රවුසරයෙන් විවෘත කරයි
                    startActivity(Intent(Intent.ACTION_VIEW, url))
                    return true
                }

                override fun onPageFinished(view: WebView, url: String?) {
                    super.onPageFinished(view, url)
                    pushUpdateState()   // සෑම පිටුවකම යාවත්කාලීන දැනුම්දීම පෙන්වීමට
                }
            }
        }

        // WebView එක padding නොසලකන නිසා, එය FrameLayout එකක් තුළ දමා
        // එම FrameLayout එකට status bar / navigation bar / keyboard ඉඩ (padding) දෙයි.
        val container = FrameLayout(this).apply {
            setBackgroundColor(Color.parseColor("#3F0A0C"))
            addView(
                webView,
                FrameLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            )
        }
        ViewCompat.setOnApplyWindowInsetsListener(container) { v, insets ->
            val bars = insets.getInsets(
                WindowInsetsCompat.Type.systemBars() or
                    WindowInsetsCompat.Type.displayCutout() or
                    WindowInsetsCompat.Type.ime()
            )
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }
        setContentView(container)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
            }
        })

        if (savedInstanceState == null) {
            webView.loadUrl("https://${WebViewAssetLoader.DEFAULT_DOMAIN}/index.html")
        } else {
            webView.restoreState(savedInstanceState)
        }
    }

    override fun onResume() {
        super.onResume()
        appUpdateManager.registerListener(installListener)
        checkForUpdate()
    }

    override fun onPause() {
        appUpdateManager.unregisterListener(installListener)
        super.onPause()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    // ------------------------------------------------------------------
    // Play Store යාවත්කාලීන පරීක්ෂාව (Play Store හරහා install කළ අනුවාදයකදී පමණක් ක්‍රියා කරයි)
    // ------------------------------------------------------------------
    private fun checkForUpdate() {
        appUpdateManager.appUpdateInfo
            .addOnSuccessListener { info ->
                when {
                    info.installStatus() == InstallStatus.DOWNLOADED -> setUpdateState("ready")
                    info.installStatus() == InstallStatus.DOWNLOADING -> setUpdateState("downloading")
                    info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE &&
                        info.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE) -> setUpdateState("available")
                    else -> setUpdateState("none")
                }
            }
            .addOnFailureListener { /* Play Store නැති / sideload කළ අනුවාද — නිශ්ශබ්දව නවතින්න */ }
    }

    private fun startOrCompleteUpdate() {
        if (updateState == "ready") {
            appUpdateManager.completeUpdate()   // බාගත කළ අනුවාදය install කර ඇප් එක නැවත ආරම්භ කරයි
            return
        }
        appUpdateManager.appUpdateInfo.addOnSuccessListener { info ->
            if (info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE &&
                info.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE)
            ) {
                // පරිශීලකයා පිළිගත්/ප්‍රතික්ෂේප කළ ප්‍රතිඵලය install listener හරහා state යාවත්කාලීන කරයි
                appUpdateManager.startUpdateFlowForResult(
                    info,
                    this,
                    AppUpdateOptions.newBuilder(AppUpdateType.FLEXIBLE).build(),
                    UPDATE_REQUEST_CODE
                )
            }
        }
    }

    // ------------------------------------------------------------------
    // Play Store තරු දීමේ කවුළුව (Play Store හරහා install කළ අනුවාදයකදී පමණක්;
    // පෙන්වීම Play විසින් තීරණය කරයි — quota ඉක්මවූ විට කිසිවක් නොපෙනේ)
    // ------------------------------------------------------------------
    private fun launchReview() {
        try {
            reviewManager.requestReviewFlow().addOnCompleteListener { task ->
                if (!task.isSuccessful) return@addOnCompleteListener
                try {
                    reviewManager.launchReviewFlow(this, task.result)
                } catch (e: Exception) { /* නිශ්ශබ්දව නවතී */ }
            }
        } catch (e: Exception) { /* Play Store නැති / sideload කළ අනුවාද */ }
    }

    companion object {
        private const val UPDATE_REQUEST_CODE = 7001
    }

    private fun setUpdateState(s: String) {
        updateState = s
        pushUpdateState()
    }

    private fun pushUpdateState() {
        runOnUiThread {
            if (::webView.isInitialized) {
                webView.evaluateJavascript(
                    "window.MX_NATIVE_UPDATE&&window.MX_NATIVE_UPDATE.set('$updateState')", null
                )
            }
        }
    }
}
