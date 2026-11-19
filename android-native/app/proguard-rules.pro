# JavaScript bridge (window.MatikaNative) — R8 විසින් මෙම ක්‍රම ඉවත් නොකළ යුතුයි
-keepclassmembers class app.vercel.matika_snowy.twa.MainActivity$NativeBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface
