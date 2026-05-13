const { expect } = require("@playwright/test");

class LoginPage {

  constructor(page) {
    this.page = page;
  }

  async openWebsite() {

    await this.page.goto(
      "https://staging-halalmaxcert.indonesiancloud.com/",
      {
        waitUntil: "domcontentloaded",
      }
    );
  }

  async login(email, password) {

    await this.page
      .getByText("Masuk sebagai")
      .nth(5)
      .click();

    await this.page
      .getByText("Pelaku Usaha")
      .click();

    await this.page
      .getByRole("button", {
        name: "Konfirmasi",
      })
      .click();

    await this.page
      .getByText("Masuk", {
        exact: true,
      })
      .click();

    await this.page
      .getByRole("textbox", {
        name: "Masukkan Alamat Email",
      })
      .fill(email);

    await this.page
      .getByRole("textbox", {
        name: "Masukkan Kata Sandi",
      })
      .fill(password);

    await this.page
      .getByRole("button", {
        name: "Masuk",
      })
      .click();

    await expect(this.page)
      .toHaveURL(/\/portal/);
  }
}

module.exports = LoginPage;