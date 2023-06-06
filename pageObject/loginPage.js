class loginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signIn = page.locator("#login");
    }

    async validLogin(user_name, pass_word) {
        // entering email
        await this.page.waitForTimeout(3000);
        await this.userName.type(user_name);

        // entering password
        await this.page.waitForTimeout(3000);
        await this.password.type(pass_word);

        // clicking log in button
        await this.signIn.click();
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

}

module.exports = { loginPage };