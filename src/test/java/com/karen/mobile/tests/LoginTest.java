package com.karen.mobile.tests;

import com.karen.mobile.pages.LoginPage;
import com.karen.mobile.utils.DriverManager;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.*;

@Feature("Login móvil")
public class LoginTest {
    private LoginPage loginPage;

    @BeforeMethod
    @Parameters({"appPackage", "appActivity"})
    public void setUp(String appPackage, String appActivity) {
        DriverManager.getDriver(appPackage, appActivity);
        loginPage = new LoginPage(DriverManager.getDriver());
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }

    @Test
    @Story("Inicio de sesión exitoso")
    @Severity(SeverityLevel.CRITICAL)
    public void testSuccessfulLogin() {
        loginPage.login("test@example.com", "password123");
        Assert.assertFalse(loginPage.isErrorVisible(), "No debería mostrar error");
    }

    @Test
    @Story("Inicio de sesión fallido")
    @Severity(SeverityLevel.NORMAL)
    public void testFailedLogin() {
        loginPage.login("invalid@email.com", "wrongpassword");
        Assert.assertTrue(loginPage.isErrorVisible(), "Debería mostrar error");
    }
}
