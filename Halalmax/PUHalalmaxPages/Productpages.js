const products =
  require("../Data/products");

class ProdukPage {

  constructor(page) {
    this.page = page;
  }

  async tambahSemuaProduk() {

    for (const product of products) {

      console.log(product);

      await this.page
        .getByRole("button", {
          name: "Tambah Produk",
        })
        .click();

      // sementara test basic dulu
    }
  }
}

module.exports = ProdukPage;