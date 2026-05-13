const UIHelper = require("../helpers/uiHelper");

class KBLIPage {

  constructor(page) {

    this.page = page;
  }

  async pilihKBLI() {

    await UIHelper.click(
      this.page.locator(
        '[data-test-id="button-primary"]'
      )
    );

    await UIHelper.click(
      this.page.getByRole("button", {
        name: "Ajukan Sertifikasi"
      })
    );

    await UIHelper.click(
      this.page.getByRole("textbox", {
        name: "Pilih KBLI atau Usaha"
      })
    );

    await UIHelper.click(
      this.page.getByText("Kedai Makanan")
    );

    await this.page
      .getByRole("radio", {
        name: "Fasilitator"
      })
      .check();

    await UIHelper.click(
      this.page.getByRole("button", {
        name: "Kirim"
      })
    );
  }
}

module.exports = KBLIPage;