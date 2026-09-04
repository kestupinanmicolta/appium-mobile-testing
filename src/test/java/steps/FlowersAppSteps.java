package steps;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.List;

import static net.serenitybdd.screenplay.actors.OnStage.theActorCalled;

public class FlowersAppSteps {

    private static AndroidDriver driver;
    private static final String APP_PACKAGE = "com.flowersapp";
    private static final String APP_ACTIVITY = ".ui.LoginActivity";
    private static final String VALID_EMAIL = "abby@mail.com";
    private static final String VALID_PASSWORD = "pass123";

    @Before
    public void setup() {
        OnStage.setTheStage(new OnlineCast());
        if (driver == null) {
            try {
                UiAutomator2Options options = new UiAutomator2Options()
                        .setPlatformName("Android")
                        .setDeviceName(getDeviceName())
                        .setAppPackage(APP_PACKAGE)
                        .setAppActivity(APP_ACTIVITY)
                        .setAutoGrantPermissions(true)
                        .setNoReset(false)
                        .setNewCommandTimeout(Duration.ofSeconds(300));

                String serverUrl = System.getenv("APPIUM_SERVER_URL") != null
                        ? System.getenv("APPIUM_SERVER_URL")
                        : "http://127.0.0.1:4723";

                driver = new AndroidDriver(new URL(serverUrl), options);
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            } catch (MalformedURLException e) {
                throw new RuntimeException("Failed to start Appium session", e);
            }
        }
        theActorCalled("QA Engineer").can(BrowseTheWeb.with(driver));
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }

    @Given("the app is launched")
    public void theAppIsLaunched() {
        sleep(3000);
        try {
            new WebDriverWait(driver, Duration.ofSeconds(15))
                    .until(ExpectedConditions.presenceOfElementLocated(
                            By.id(APP_PACKAGE + ":id/etEmail")));
        } catch (Exception ignored) {}
        dismissGoogleDialogIfPresent();
    }

    @Given("the user is on the login screen")
    public void theUserIsOnTheLoginScreen() {
        try {
            new WebDriverWait(driver, Duration.ofSeconds(10))
                    .until(ExpectedConditions.presenceOfElementLocated(
                            By.id(APP_PACKAGE + ":id/etEmail")));
        } catch (Exception ignored) {}
    }

    @When("the user enters email {string} and password {string}")
    public void theUserEntersEmailAndPassword(String email, String password) {
        dismissGoogleDialogIfPresent();
        performLogin(email, password);
        sleep(2000);
    }

    @When("the user enters valid credentials")
    public void theUserEntersValidCredentials() {
        dismissGoogleDialogIfPresent();
        performLogin(VALID_EMAIL, VALID_PASSWORD);
        waitForCatalogOrDismissDialog();
    }

    @Then("the user should see a validation error")
    public void theUserShouldSeeAValidationError() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/alertMessage")));
        WebElement alert = driver.findElement(By.id(APP_PACKAGE + ":id/alertMessage"));
        if (!alert.isDisplayed()) {
            throw new AssertionError("Validation error alert is not visible");
        }
        driver.findElement(By.id(APP_PACKAGE + ":id/btnAlertOk")).click();
        sleep(500);
    }

    @Then("the user should see an auth error")
    public void theUserShouldSeeAnAuthError() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/alertMessage")));
        WebElement alert = driver.findElement(By.id(APP_PACKAGE + ":id/alertMessage"));
        if (!alert.isDisplayed()) {
            throw new AssertionError("Auth error alert is not visible");
        }
        driver.findElement(By.id(APP_PACKAGE + ":id/btnAlertOk")).click();
        sleep(500);
    }

    @Then("the user stays on the login screen")
    public void theUserStaysOnTheLoginScreen() {
        WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
        if (!emailInput.isDisplayed()) {
            throw new AssertionError("User should still be on login screen");
        }
    }

    @Then("the user should be on the catalog screen")
    public void theUserShouldBeOnTheCatalogScreen() {
        new WebDriverWait(driver, Duration.ofSeconds(15))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    @Given("the user is logged in")
    public void theUserIsLoggedIn() {
        try {
            WebElement catalog = driver.findElement(By.id(APP_PACKAGE + ":id/rvCatalog"));
            if (catalog.isDisplayed()) return;
        } catch (Exception ignored) {}

        dismissGoogleDialogIfPresent();

        try {
            WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
            if (emailInput.isDisplayed()) {
                performLogin(VALID_EMAIL, VALID_PASSWORD);
                waitForCatalogOrDismissDialog();
                return;
            }
        } catch (Exception ignored) {}

        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    @Then("the catalog should show at least one product")
    public void theCatalogShouldShowAtLeastOneProduct() {
        List<WebElement> products = driver.findElements(By.id(APP_PACKAGE + ":id/tvFlowerName"));
        if (products.isEmpty()) {
            throw new AssertionError("Expected at least one product in catalog");
        }
    }

    @When("the user clicks on the first product")
    public void theUserClicksOnTheFirstProduct() {
        List<WebElement> products = driver.findElements(By.id(APP_PACKAGE + ":id/tvFlowerName"));
        if (!products.isEmpty()) {
            products.get(0).click();
        }
    }

    @Then("the product detail should be displayed")
    public void theProductDetailShouldBeDisplayed() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/btnAddToCart")));
        driver.findElement(By.id(APP_PACKAGE + ":id/btnBack")).click();
        new WebDriverWait(driver, Duration.ofSeconds(15))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    @When("the user clicks on a category filter")
    public void theUserClicksOnACategoryFilter() {
        List<WebElement> categories = driver.findElements(By.id(APP_PACKAGE + ":id/btnCategoryItem"));
        if (categories.size() > 1) {
            categories.get(1).click();
            sleep(2000);
        }
    }

    @Then("the catalog should display filtered results")
    public void theCatalogShouldDisplayFilteredResults() {
        List<WebElement> products = driver.findElements(By.id(APP_PACKAGE + ":id/tvFlowerName"));
        if (products.isEmpty()) {
            throw new AssertionError("No products displayed after filter");
        }
    }

    @When("the user clicks on the cart icon")
    public void theUserClicksOnTheCartIcon() {
        driver.findElement(By.id(APP_PACKAGE + ":id/layoutCart")).click();
    }

    @Then("the cart screen should be displayed")
    public void theCartScreenShouldBeDisplayed() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCartItems")));
        driver.findElement(By.id(APP_PACKAGE + ":id/btnBack")).click();
        new WebDriverWait(driver, Duration.ofSeconds(15))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    @Then("the cart screen is visible")
    public void theCartScreenIsVisible() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCartItems")));
        driver.findElement(By.id(APP_PACKAGE + ":id/btnBack")).click();
        new WebDriverWait(driver, Duration.ofSeconds(15))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    @And("the user navigates back from cart")
    public void theUserNavigatesBackFromCart() {
        driver.findElement(By.id(APP_PACKAGE + ":id/btnBack")).click();
        sleep(1000);
    }

    private void performLogin(String email, String password) {
        try {
            WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
            if (!emailInput.isDisplayed()) return;
            emailInput.clear();
            emailInput.sendKeys(email);
            WebElement passwordInput = driver.findElement(By.id(APP_PACKAGE + ":id/etPassword"));
            passwordInput.clear();
            passwordInput.sendKeys(password);
            driver.findElement(By.id(APP_PACKAGE + ":id/btnLogin")).click();
            sleep(3000);
        } catch (Exception ignored) {}
    }

    private void waitForCatalogOrDismissDialog() {
        for (int attempt = 0; attempt < 3; attempt++) {
            try {
                new WebDriverWait(driver, Duration.ofSeconds(5))
                        .until(ExpectedConditions.presenceOfElementLocated(
                                By.id(APP_PACKAGE + ":id/rvCatalog")));
                return;
            } catch (Exception e) {
                dismissGoogleDialogIfPresent();
            }
        }
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(
                        By.id(APP_PACKAGE + ":id/rvCatalog")));
    }

    private void dismissGoogleDialogIfPresent() {
        sleep(1500);

        try {
            WebElement catalog = driver.findElement(By.id(APP_PACKAGE + ":id/rvCatalog"));
            if (catalog.isDisplayed()) return;
        } catch (Exception ignored) {}

        try {
            WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
            if (emailInput.isDisplayed()) return;
        } catch (Exception ignored) {}

        try {
            String pageSource = driver.getPageSource();
            if (pageSource.contains("Nunca") || pageSource.contains("Never")
                    || pageSource.contains("No, gracias") || pageSource.contains("No thanks")) {
                try { driver.findElement(By.xpath("//android.widget.Button[contains(@text,\"Never\")]")).click(); sleep(1000); return; } catch (Exception ignored) {}
                try { driver.findElement(By.xpath("//android.widget.Button[contains(@text,\"Nunca\")]")).click(); sleep(1000); return; } catch (Exception ignored) {}
                try { driver.findElement(By.xpath("//android.widget.Button[contains(@text,\"No, gracias\")]")).click(); sleep(1000); return; } catch (Exception ignored) {}
                try { driver.findElement(By.xpath("//android.widget.Button[contains(@text,\"No thanks\")]")).click(); sleep(1000); return; } catch (Exception ignored) {}
            }
        } catch (Exception ignored) {}

        try {
            WebElement catalog = driver.findElement(By.id(APP_PACKAGE + ":id/rvCatalog"));
            if (catalog.isDisplayed()) return;
        } catch (Exception ignored) {}

        try {
            WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
            if (emailInput.isDisplayed()) return;
        } catch (Exception ignored) {}

        driver.navigate().back();
        sleep(2000);

        try {
            WebElement emailInput = driver.findElement(By.id(APP_PACKAGE + ":id/etEmail"));
            if (emailInput.isDisplayed()) return;
        } catch (Exception ignored) {}
    }

    private String getDeviceName() {
        String envDevice = System.getenv("DEVICE_NAME");
        if (envDevice != null && !envDevice.isEmpty()) return envDevice;

        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            try {
                Process process = Runtime.getRuntime().exec(
                        "C:\\Users\\pacho\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe devices");
                java.io.BufferedReader reader = new java.io.BufferedReader(
                        new java.io.InputStreamReader(process.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.contains("device") && !line.contains("List")) {
                        return line.split("\\t")[0];
                    }
                }
            } catch (Exception ignored) {}
        }
        return "emulator-5554";
    }

    private void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}
