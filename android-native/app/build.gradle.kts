plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "app.vercel.matika_snowy.twa"
    compileSdk = 36

    defaultConfig {
        applicationId = "app.vercel.matika_snowy.twa"
        minSdk = 24
        targetSdk = 36
        // අනුවාදය workflow එකෙන් (app-version.json ලෙජරය):
        //   ./gradlew bundleRelease -PappVersionCode=26 -PappVersionName=3.0.5
        versionCode = (project.findProperty("appVersionCode") as String?)?.toInt() ?: 25
        versionName = (project.findProperty("appVersionName") as String?) ?: "3.0.4"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            // Signing: Build > Generate Signed App Bundle / APK හරහා
            // android.keystore (alias: pavara-key) තෝරන්න. password මෙහි ලියන්න එපා.
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    androidResources {
        // assets ගොනු compress නොකර (zip) පවත්වා ගැනීම අවශ්‍ය නැහැ; default හරි
        noCompress += listOf()
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.activity:activity-ktx:1.10.0")
    implementation("androidx.webkit:webkit:1.12.1")
    implementation("com.google.android.play:app-update:2.1.0")   // Play Store in-app update
    implementation("com.google.android.play:review:2.0.2")       // Play Store in-app review
}
