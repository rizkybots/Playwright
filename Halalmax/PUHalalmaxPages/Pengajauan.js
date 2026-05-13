class PengajuanPage {

  constructor(page) {
    this.page = page;
  }

  async createPengajuan() {

    await this.page
      .locator('[data-test-id="button-primary"]')
      .click();

    await this.page
      .getByRole("button", {
        name: "Ajukan Sertifikasi",
      })
      .click();
  }

  async pilihKBLI() {

    await this.page
      .getByRole("textbox", {
        name: "Pilih KBLI atau Usaha",
      })
      .click();

    await this.page
      .getByText("Kedai Makanan")
      .click();

    await this.page
      .getByRole("radio", {
        name: "Fasilitator",
      })
      .check();

    await this.page
      .getByRole("button", {
        name: "Kirim",
      })
      .click();
  }

  async pilihKategori() {

    await this.page.mouse.wheel(0, 3000);

    await this.page
      .locator(".cursor-pointer")
      .filter({ hasText: /Pilih/ })
      .last()
      .click();

    await this.page
      .getByText(
        "Penyediaan makanan dan minuman dengan pengolahan",
        { exact: true }
      )
      .click();
  }
}

module.exports = PengajuanPage;