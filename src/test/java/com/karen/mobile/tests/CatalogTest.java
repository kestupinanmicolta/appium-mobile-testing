package com.karen.mobile.tests;

import com.karen.mobile.pages.CatalogPage;
import com.karen.mobile.utils.DriverManager;
import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.*;

@Feature("Catálogo móvil")
public class CatalogTest {
    private CatalogPage catalogPage;

    @BeforeMethod
    @Parameters({"appPackage", "appActivity"})
    public void setUp(String appPackage, String appActivity) {
        DriverManager.getDriver(appPackage, appActivity);
        catalogPage = new CatalogPage(DriverManager.getDriver());
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }

    @Test
    @Story("Mostrar productos en catálogo")
    @Severity(SeverityLevel.CRITICAL)
    public void testDisplayProducts() {
        Assert.assertTrue(catalogPage.getProductCount() > 0, "Debería mostrar productos");
    }

    @Test
    @Story("Hacer clic en producto")
    @Severity(SeverityLevel.NORMAL)
    public void testClickProduct() {
        String productName = catalogPage.getProductName(0);
        catalogPage.clickProduct(0);
        Assert.assertNotNull(productName, "El nombre del producto no debería ser nulo");
    }

    @Test
    @Story("Navegar al carrito")
    @Severity(SeverityLevel.NORMAL)
    public void testNavigateToCart() {
        catalogPage.goToCart();
        // Verify cart page is displayed
    }
}
