const { test, expect } = require("@playwright/test");

test("Pengajuan Sertifikasi Halal - REAKTIF AI FLOW (FIXED SELECTOR)", async ({ page }) => {
  test.setTimeout(1200000);

  // =====================================================
  // DATA & KONFIGURASI
  // =====================================================
  const products = [
    "Empal Gentong",
    "Bika Ambon",
    "Jus Alpukat",
    "Jus Sirsak",
    "Jus Mangga",
    "Bulgogi Sapi Sambal Matah",
    "Jus Jambu",
    "Jus Pepaya",
    "Martabak Keju",
    "Es Kuku Bima",
    "Nasi Goreng Kecombrang",
    "Jus Apel",
    "Es Pisang Ijo",
    "Es Podeng",
    "Ikan Cakalang",
    "Nasi Goreng Seafood",
    "Mie Goreng Seafood",
    "Es Teler",
    "Ayam Woku",
    "Dendeng Batokok",
    "Es Ce Hun Tiau",
    "Empal Gentong",
    "Kwe Kia Theng",
    "Sotong Pangkong",
    "Ayam Bakar Bumbu Kacang",
    "Bakwan Tahu",
    "Bulgogi Sapi",
    "Ketoprak",
    "Gemblong",
    "Jus Sirsak",
  ];

  const images = [
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.45.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.44.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.43.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.41.jpeg",
  ];

  // =====================================================
  // HELPER
  // =====================================================
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const randomImage = () =>
    images[Math.floor(Math.random() * images.length)];

  async function safeClick(locator) {
    await locator.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async function closeModal() {
    await page.keyboard.press("Escape").catch(() => {});
    await page.mouse.click(0, 0).catch(() => {});
  }

  // =====================================================
  // FUNGSI TAMBAH PRODUK
  // =====================================================
  async function tambahProduk(productName) {
    const image = randomImage();

    console.log(`🚀 Memproses: ${productName}`);

    try {
      // =================================================
      // BUKA MODAL
      // =================================================
      await safeClick(
        page.getByRole("button", {
          name: "Tambah Produk",
        })
      );

      await sleep(500);

      await safeClick(
        page.getByRole("radio", {
          name: "Isi Manual",
        })
      );

      // =================================================
      // INPUT NAMA PRODUK
      // =================================================
      const inputProduk = page.getByRole("textbox", {
        name: "Masukkan nama produk",
      });

      await inputProduk.fill(productName.slice(0, 10));

      await sleep(1000);

      const suggestion = page
        .locator("div, span, p")
        .filter({
          hasText: new RegExp(`^${productName}$`, "i"),
        })
        .first();

      await suggestion.waitFor({
        state: "visible",
        timeout: 20000,
      });

      await suggestion.click();

      await sleep(1500);

      // =================================================
      // UPLOAD GAMBAR
      // =================================================
      await safeClick(
        page.getByRole("button", {
          name: "Ambil Gambar",
        })
      );

      const [fileChooser] = await Promise.all([
        page.waitForEvent("filechooser"),
        page.getByText("Pilih File Perangkat").click(),
      ]);

      await fileChooser.setFiles(image);

      await sleep(2500);

      // Tutup overlay upload
      await page.mouse.click(0, 0);

      await sleep(1000);

      // =================================================
      // ELEMENT PENTING
      // =================================================
      const btnSimpan = page.getByRole("button", {
        name: "Simpan",
        exact: true,
      });

      const modalIndicator = page.getByRole("radio", {
        name: "Isi Manual",
      });

      const btnAI = page
        .getByText("Gunakan AI")
        .first();

      // Alert merah spesifik
      const alertMerah = page.locator(
        "div.bg-red-50.text-red-600",
        {
          hasText: /Peringatan/i,
        }
      );

      // =================================================
      // FLOW SIMPAN + VALIDASI AI
      // =================================================

      // Klik Simpan Pertama
      await expect(btnSimpan).toBeEnabled({
        timeout: 15000,
      });

      console.log("💾 Klik Simpan Pertama...");

      await btnSimpan.click({
        force: true,
      });

      try {
        // Tunggu alert muncul
        await alertMerah.waitFor({
          state: "visible",
          timeout: 4000,
        });

        console.log(
          "⚠️ Alert merah terdeteksi, menjalankan AI..."
        );

        // Klik Gunakan AI
        await btnAI.click({
          force: true,
        });

        console.log("🤖 AI sedang memproses...");

        // Tunggu AI sinkronisasi
        await sleep(6000);

        // Tunggu tombol Simpan aktif kembali
        await expect(btnSimpan).toBeEnabled({
          timeout: 15000,
        });

        console.log("💾 Klik Simpan Final...");

        // Klik Simpan Final
        await btnSimpan.click({
          force: true,
        });

      } catch (error) {
        // Tidak ada alert merah
        console.log("✅ Tidak ada alert merah");
      }

      // =================================================
      // VALIDASI MODAL TERTUTUP
      // =================================================
      await expect(modalIndicator).toBeHidden({
        timeout: 10000,
      });

      console.log(`✅ Berhasil Disimpan: ${productName}`);

      return true;

    } catch (err) {
      console.log(
        `❌ Gagal: ${productName} | ${err.message}`
      );

      await closeModal();

      return false;
    }
  }

  // =====================================================
  // LOGIN & NAVIGASI
  // =====================================================
  await page.goto(
    "https://staging-halalmaxcert.indonesiancloud.com/",
    {
      waitUntil: "domcontentloaded",
    }
  );

  await safeClick(
    page.getByText("Masuk sebagai").nth(5)
  );

  await safeClick(
    page.getByText("Pelaku Usaha")
  );

  await safeClick(
    page.getByRole("button", {
      name: "Konfirmasi",
    })
  );

  await safeClick(
    page.getByText("Masuk", {
      exact: true,
    })
  );

  // =====================================================
  // LOGIN
  // =====================================================
  await page
    .getByRole("textbox", {
      name: "Masukkan Alamat Email",
    })
    .fill("testingkibot@gmail.com");

  await page
    .getByRole("textbox", {
      name: "Masukkan Kata Sandi",
    })
    .fill("P@ssword!1");

  await page
    .getByRole("button", {
      name: "Masuk",
    })
    .click();

  await expect(page).toHaveURL(/\/portal/, {
    timeout: 60000,
  });

  // =====================================================
  // BUAT PENGAJUAN
  // =====================================================
  await safeClick(
    page.locator('[data-test-id="button-primary"]')
  );

  await safeClick(
    page.getByRole("button", {
      name: "Ajukan Sertifikasi",
    })
  );

  // =====================================================
  // PILIH KBLI
  // =====================================================
  await safeClick(
    page.getByRole("textbox", {
      name: "Pilih KBLI atau Usaha",
    })
  );

  await safeClick(
    page.getByText("Kedai Makanan")
  );

  await page
    .getByRole("radio", {
      name: "Fasilitator",
    })
    .check();

  await page
    .getByRole("button", {
      name: "Kirim",
    })
    .click();

  await expect(page).toHaveURL(
    /\/sertifikasi\/\d+\/pengajuan/
  );

  // =====================================================
  // PILIH KATEGORI
  // =====================================================
  await page.mouse.wheel(0, 2000);

  await sleep(1000);

  await safeClick(
    page
      .locator(".cursor-pointer")
      .filter({ hasText: /Pilih/ })
      .last()
  );

  await safeClick(
    page.getByText(
      "Penyediaan makanan dan minuman dengan pengolahan",
      {
        exact: true,
      }
    )
  );

  // =====================================================
  // LOOP PRODUK
  // =====================================================
  for (const product of products) {
    await tambahProduk(product);
    await sleep(1000);
  }

  console.log("🏁 PROSES SELESAI!");

  // =====================================================
  // FINAL SUBMIT
  // =====================================================
  const btnKirimFinal =
    page.getByRole("button", {
      name: /Kirim Pengajuan/i,
    }).last();

  await btnKirimFinal.scrollIntoViewIfNeeded();

  await btnKirimFinal.click();

  await sleep(1500);

  // Checklist
  const checkboxes =
    page.locator('[name="checkbox"]');

  const total =
    await checkboxes.count();

  for (let i = 0; i < total; i++) {

    const checkbox =
      checkboxes.nth(i);

    if (await checkbox.isVisible()) {

      await checkbox.click();

      await sleep(150);
    }
  }

  await page
    .getByRole("button", {
      name: "Kirim Pengajuan",
    }).last().click()

  await sleep(2500);

  // =====================================================
  // LOKASI & LP3H
  // =====================================================
  await page
    .getByText("Mohon pilih lokasi terlebih")
    .click();

  await safeClick(
    page.getByText("Pilih lokasi", {
      exact: true,
    })
  );

  await safeClick(
    page.getByText("Kabupaten")
  );

  await sleep(800);

// =====================================================
// LP3H
// =====================================================

console.log("🔍 Memilih LP3H...");

const inputLP3H = page.getByRole("textbox", {
  name: "Pilih lp3h",
});

// klik field
await inputLP3H.click();

await sleep(1000);

// ketik keyword
await inputLP3H.fill("Masyarakat");

await sleep(3000);

// DEBUG: lihat option muncul atau tidak
const optionLP3H = page.getByText(
  "Masyarakat Ekonomi Syariah",
  { exact: true }
);

// tunggu option muncul
await optionLP3H.waitFor({
  state: "visible",
  timeout: 15000,
});

console.log("✅ Option LP3H muncul");

// klik option
await optionLP3H.click();

console.log("✅ LP3H berhasil dipilih");

// tunggu dependency render
await sleep(4000);

// klik luar supaya dropdown close
await page.mouse.click(0, 0);

await sleep(2000);

// =====================================================
// PENDAMPING HALAL
// =====================================================

console.log("🔍 Memilih Pendamping Halal...");

const inputPendamping = page.getByRole("textbox", {
  name: "Pilih pendamping halal",
});

// tunggu enable
await expect(inputPendamping).toBeEditable({
  timeout: 20000,
});

await inputPendamping.click();

await sleep(1000);

await inputPendamping.fill("Abiyyu");

await sleep(3000);

const optionPendamping = page.getByText(
  "Abiyyu Achmad Syahru Mubarok",
  { exact: true }
);

await optionPendamping.waitFor({
  state: "visible",
  timeout: 15000,
});

await optionPendamping.click();

console.log("✅ Pendamping berhasil dipilih");

  // Kode fasilitator
  await page
    .getByRole("textbox", {
      name: "Masukkan kode fasilitator",
    })
    .fill("SEHATI26");

  await sleep(500);

  await page
    .getByRole("button", {
      name: "Kirim",
      exact: true,
    })
    .click();

  // =====================================================
  // VALIDASI AKHIR
  // =====================================================
  await expect(page).toHaveURL(
    /daftar-pengajuan/,
    {
      timeout: 60000,
    }
  );

  console.log("🏁 SEMUA BERHASIL!");
});