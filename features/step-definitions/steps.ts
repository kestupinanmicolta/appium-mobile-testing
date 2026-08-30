import { Given, When, Then } from '@cucumber/cucumber';

async function dismissGoogleDialog(browser: any) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const catalog = await browser.$('id=com.flowersapp:id/rvCatalog');
    if (await catalog.isDisplayed().catch(() => false)) return;

    try {
        const pageSource = await browser.getPageSource();
        if (pageSource.includes('Nunca') || pageSource.includes('Never')) {
            for (const selector of [
                'android=new UiSelector().text("Nunca")',
                'android=new UiSelector().text("Never")',
                '//android.widget.Button[contains(@text,"Nunca")]',
                '//android.widget.Button[contains(@text,"Never")]',
            ]) {
                try {
                    const btn = await browser.$(selector);
                    if (await btn.isDisplayed().catch(() => false)) {
                        await btn.click();
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        return;
                    }
                } catch {}
            }
        }
    } catch {}

    const catalogAfter = await browser.$('id=com.flowersapp:id/rvCatalog');
    if (await catalogAfter.isDisplayed().catch(() => false)) return;

    await browser.execute('mobile: pressKey', { keycode: 4 });
    await new Promise(resolve => setTimeout(resolve, 2000));
}

async function performLogin(browser: any, email: string, password: string) {
    const emailInput = await browser.$('id=com.flowersapp:id/etEmail');
    if (!(await emailInput.isDisplayed().catch(() => false))) return false;

    await emailInput.clearValue();
    await emailInput.setValue(email);
    const passwordInput = await browser.$('id=com.flowersapp:id/etPassword');
    await passwordInput.clearValue();
    await passwordInput.setValue(password);
    await browser.$('id=com.flowersapp:id/btnLogin').click();
    await new Promise(resolve => setTimeout(resolve, 4000));
    return true;
}

Given('the app is launched', async function () {
    await new Promise(resolve => setTimeout(resolve, 3000));
});

Given('the user is on the login screen', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    try {
        await browser.$('id=com.flowersapp:id/etEmail').waitForExist({ timeout: 10000 });
    } catch {}
});

When('the user enters email {string} and password {string}', async function (email: string, password: string) {
    // @ts-ignore
    const browser = globalThis.browser;
    await performLogin(browser, email, password);
});

When('the user enters valid credentials', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const didLogin = await performLogin(browser, 'abby@mail.com', 'pass123');
    if (didLogin) {
        try {
            await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 8000 });
            return;
        } catch {}
        await dismissGoogleDialog(browser);
    }
});

Then('the user should see a validation error', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const alertMessage = await browser.$('id=com.flowersapp:id/alertMessage');
    if (!(await alertMessage.isDisplayed().catch(() => false))) {
        throw new Error('Validation error alert is not visible');
    }
    await browser.$('id=com.flowersapp:id/btnAlertOk').click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('the user should see an auth error', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await new Promise(resolve => setTimeout(resolve, 1000));
    const alertMessage = await browser.$('id=com.flowersapp:id/alertMessage');
    if (!(await alertMessage.isDisplayed().catch(() => false))) {
        throw new Error('Auth error alert is not visible');
    }
    await browser.$('id=com.flowersapp:id/btnAlertOk').click();
    await new Promise(resolve => setTimeout(resolve, 500));
});

Then('the user stays on the login screen', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const emailInput = await browser.$('id=com.flowersapp:id/etEmail');
    if (!(await emailInput.isDisplayed().catch(() => false))) {
        throw new Error('User should still be on login screen');
    }
});

Then('the user should be on the catalog screen', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 15000 });
});

Given('the user is logged in', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const catalog = await browser.$('id=com.flowersapp:id/rvCatalog');
    if (await catalog.isDisplayed().catch(() => false)) return;

    const emailInput = await browser.$('id=com.flowersapp:id/etEmail');
    if (await emailInput.isDisplayed().catch(() => false)) {
        const didLogin = await performLogin(browser, 'abby@mail.com', 'pass123');
        if (didLogin) {
            try {
                await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 8000 });
                return;
            } catch {}
            await dismissGoogleDialog(browser);
        }
    }

    await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 15000 });
});

Then('the catalog should show at least one product', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const products = await browser.$$('id=com.flowersapp:id/tvFlowerName');
    if (products.length === 0) {
        throw new Error('Expected at least one product in catalog');
    }
});

When('the user clicks on the first product', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const products = await browser.$$('id=com.flowersapp:id/tvFlowerName');
    if (products.length > 0) {
        await products[0].click();
    }
});

Then('the product detail should be displayed', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/btnAddToCart').waitForExist({ timeout: 10000 });
    await browser.$('id=com.flowersapp:id/btnBack').click();
    await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 15000 });
});

When('the user clicks on a category filter', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const categories = await browser.$$('id=com.flowersapp:id/btnCategoryItem');
    if (categories.length > 1) {
        await categories[1].click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
});

Then('the catalog should display filtered results', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    const products = await browser.$$('id=com.flowersapp:id/tvFlowerName');
    if (products.length === 0) {
        throw new Error('No products displayed after filter');
    }
});

When('the user clicks on the cart icon', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/layoutCart').click();
});

Then('the cart screen should be displayed', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/rvCartItems').waitForExist({ timeout: 10000 });
    await browser.$('id=com.flowersapp:id/btnBack').click();
    await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 15000 });
});

Then('the cart screen is visible', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/rvCartItems').waitForExist({ timeout: 10000 });
    await browser.$('id=com.flowersapp:id/btnBack').click();
    await browser.$('id=com.flowersapp:id/rvCatalog').waitForExist({ timeout: 15000 });
});

When('the user navigates back from cart', async function () {
    // @ts-ignore
    const browser = globalThis.browser;
    await browser.$('id=com.flowersapp:id/btnBack').click();
    await new Promise(resolve => setTimeout(resolve, 1000));
});
