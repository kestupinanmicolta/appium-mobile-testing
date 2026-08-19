package com.karen.mobile.utils;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import io.qameta.allure.Step;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class DriverManager {
    private static final ThreadLocal<AndroidDriver> driverPool = new ThreadLocal<>();
    private static final String APPIUM_SERVER = "http://localhost:4723";

    @Step("Inicializar driver Android")
    public static AndroidDriver getDriver(String appPackage, String appActivity) {
        if (driverPool.get() == null) {
            driverPool.set(createDriver(appPackage, appActivity));
        }
        return driverPool.get();
    }

    private static AndroidDriver createDriver(String appPackage, String appActivity) {
        UiAutomator2Options options = new UiAutomator2Options();
        options.setPlatformName("Android");
        options.setAutomationName("UiAutomator2");
        options.setDeviceName("emulator-5554");
        options.setAppPackage(appPackage);
        options.setAppActivity(appActivity);
        options.setNoReset(false);
        options.setAutoGrantPermissions(true);
        options.setNewCommandTimeout(Duration.ofSeconds(300));

        try {
            return new AndroidDriver(new URL(APPIUM_SERVER), options);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error al conectar con Appium server", e);
        }
    }

    public static AndroidDriver getDriver() {
        return driverPool.get();
    }

    @Step("Cerrar driver")
    public static void quitDriver() {
        if (driverPool.get() != null) {
            driverPool.get().quit();
            driverPool.remove();
        }
    }
}
