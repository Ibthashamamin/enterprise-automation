// tests/login.spec.js
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('User Authentication Pipeline', () => {

    test('Should reject unauthorized login attempts gracefully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        // Act: Intentionally pass invalid credentials
        await loginPage.login('locked_out_user', 'wrong_password');
        
        // Assert: Ensure system catches the failure cleanly
        await loginPage.verifyLoginFailure();
    });
});