// pages/LoginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Centralized locators using robust test attributes
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        // Navigates using global config baseUrl
        await this.page.goto('/'); 
    }

    async login(username, password) {
        // Playwright automatically waits for these elements to be interactable
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginFailure() {
        // Assertions belong to the page action or test assertion layer
        await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    }
}

module.exports = { LoginPage };