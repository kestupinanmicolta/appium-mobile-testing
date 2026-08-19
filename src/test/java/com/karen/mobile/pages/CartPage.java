package com.karen.mobile.pages;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import io.qameta.allure.Step;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class CartPage {
    private final AndroidDriver driver;

    @AndroidFindBy(id = "com.flowersapp:id/rvCart")
    private WebElement cartRecyclerView;

    @AndroidFindBy(id = "com.flowersapp:id/tvCartItemName")
    private List<WebElement> cartItemNames;

    @AndroidFindBy(id = "com.flowersapp:id/tvTotalPrice")
    private WebElement totalPrice;

    @AndroidFindBy(id = "com.flowersapp:id/btnCheckout")
    private WebElement checkoutButton;

    @AndroidFindBy(id = "com.flowersapp:id/btnRemoveItem")
    private List<WebElement> removeButtons;

    public CartPage(AndroidDriver driver) {
        this.driver = driver;
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    @Step("Obtener cantidad de itens en el carrito")
    public int getCartItemsCount() {
        return cartItemNames.size();
    }

    @Step("Obtener nombre del item índice: {0}")
    public String getCartItemName(int index) {
        return cartItemNames.get(index).getText();
    }

    @Step("Obtener precio total")
    public String getTotalPrice() {
        return totalPrice.getText();
    }

    @Step("Eliminar item índice: {0}")
    public void removeItem(int index) {
        removeButtons.get(index).click();
    }

    @Step("Proceder al checkout")
    public void proceedToCheckout() {
        checkoutButton.click();
    }
}
