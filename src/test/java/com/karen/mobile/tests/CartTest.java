package com.karen.mobile.tests;

import com.karen.mobile.pages.CartPage;
import com.karen.mobile.utils.DriverManager;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.*;

@Feature("Carrito móvil")
public class CartTest {
    private CartPage cartPage;

    @BeforeMethod
    @Parameters({"appPackage", "appActivity"})
    public void setUp(String appPackage, String appActivity) {
        DriverManager.getDriver(appPackage, appActivity);
        cartPage = new CartPage(DriverManager.getDriver());
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }

    @Test
    @Story("Verificar carrito vacío")
    @Severity(SeverityLevel.NORMAL)
    public void testEmptyCart() {
        Assert.assertEquals(cartPage.getCartItemsCount(), 0, "El carrito debería estar vacío");
    }

    @Test
    @Story("Eliminar item del carrito")
    @Severity(SeverityLevel.NORMAL)
    public void testRemoveItem() {
        if (cartPage.getCartItemsCount() > 0) {
            cartPage.removeItem(0);
            Assert.assertEquals(cartPage.getCartItemsCount(), 0, "El carrito debería estar vacío");
        }
    }
}
