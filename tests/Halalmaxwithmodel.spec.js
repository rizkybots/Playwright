const { test } =
  require("@playwright/test");

const LoginPage =
  require("../Halalmax/PUHalalmaxPages/Login");

const PengajuanPage =
  require("../Halalmax/PUHalalmaxPages/Pengajuan");

const ProdukPage =
  require("../Halalmax/PUHalalmaxPages/Productpages");

const SubmitPage =
  require("../Halalmax/PUHalalmaxPages/Submit");

test(
  "E2E Pengajuan Sertifikasi Halal",
  async ({ page }) => {

    test.setTimeout(900000);

    const loginPage =
      new LoginPage(page);

    const pengajuanPage =
      new PengajuanPage(page);

    const produkPage =
      new ProdukPage(page);

    const submitPage =
      new SubmitPage(page);

    await loginPage
      .openWebsite();

    await loginPage
      .login(
        "testingkibot@gmail.com",
        "P@ssword!1"
      );

    await pengajuanPage
      .createPengajuan();

    await pengajuanPage
      .pilihKBLI();

    await pengajuanPage
      .pilihKategori();

    await produkPage
      .tambahSemuaProduk();

    await submitPage
      .submitPengajuan();
  }
);