package com.karen.mobile.pages;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import io.qameta.allure.Step;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    private final AndroidDriver driver;

    @AndroidFindBy(id = "com.flowersapp:id/etEmail")
    private WebElement emailInput;

    @AndroidFindBy(id = "com.flowersapp:id/etPassword")
    private WebElement passwordInput;

    @AndroidFindBy(id = "com.flowersapp:id/btnLogin")
    private WebElement loginButton;

    @AndroidFindBy(id = "com.flowersapp:id/tvError")
    private WebElement errorMessage;

    public LoginPage(AndroidDriver driver) {
        this.driver = driver;
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    @Step("Iniciar sesión con email: {0}")
    public void login(String email, String password) {
        emailInput.clear();
        emailInput.sendKeys(email);
        passwordInput.clear();
        passwordInput.sendKeys(password);
        loginButton.click();
    }

    @Step("Obtener mensaje de error")
    public String getErrorMessage() {
        return errorMessage.getText();
    }

    @Step("Verificar si el error es visible")
    public boolean isErrorVisible() {
        return errorMessage.isDisplayed();
    }
}
