package com.karen.mobile.pages;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import io.qameta.allure.Step;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class CatalogPage {
    private final AndroidDriver driver;

    @AndroidFindBy(id = "com.flowersapp:id/rvCatalog")
    private WebElement catalogRecyclerView;

    @AndroidFindBy(id = "com.flowersapp:id/tvProductName")
    private List<WebElement> productNames;

    @AndroidFindBy(id = "com.flowersapp:id/fabCart")
    private WebElement cartFab;

    @AndroidFindBy(id = "com.flowersapp:id/search_view")
    private WebElement searchView;

    public CatalogPage(AndroidDriver driver) {
        this.driver = driver;
        PageFactory.initElements(new AppiumFieldDecorator(driver), this);
    }

    @Step("Obtener cantidad de productos")
    public int getProductCount() {
        return productNames.size();
    }

    @Step("Obtener nombre del producto índice: {0}")
    public String getProductName(int index) {
        return productNames.get(index).getText();
    }

    @Step("Hacer clic en producto índice: {0}")
    public void clickProduct(int index) {
        productNames.get(index).click();
    }

    @Step("Ir al carrito")
    public void goToCart() {
        cartFab.click();
    }

    @Step("Buscar producto: {0}")
    public void searchProduct(String query) {
        searchView.sendKeys(query);
    }
}
