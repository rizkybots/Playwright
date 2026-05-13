const { test, expect } = require("@playwright/test");

test("Pengajuan Sertifikasi Halal - PRO MULTI IMAGE FLOW (ULTRA VALIDATION)", async ({ page }) => {
  test.setTimeout(900000);

  // =====================================================
  // DATA & KONFIGURASI
  // =====================================================
  const products = [
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
  ];

  const images = [
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.45.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.44.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.43.jpeg",
    "C:/Users/Kibotsky/Downloads/WhatsApp Image 2025-11-26 at 15.36.41.jpeg",
  ];

  // =====================================================
  // HELPERS
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

    await locator.click();
  }

  async function safeEscape() {
    await page.keyboard
      .press("Escape")
      .catch(() => {});

    await page.mouse
      .click(0, 0)
      .catch(() => {});
  }

  // =====================================================
  // FUNGSI TAMBAH PRODUK
  // =====================================================
  async function tambahProduk(productName) {
    const image = randomImage();

    console.log(
      `🚀 Memproses: ${productName}`
    );

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

      await sleep(500);

      // =================================================
      // INPUT NAMA PRODUK
      // =================================================
      const input =
        page.getByRole("textbox", {
          name: "Masukkan nama produk",
        });

      await input.fill(
        productName.slice(0, 10)
      );

      await sleep(1000);

      const suggestion =
        page
          .locator("div, span, p")
          .filter({
            hasText: new RegExp(
              `^${productName}$`,
              "i"
            ),
          })
          .first();

      await suggestion.waitFor({
        state: "visible",
        timeout: 20000,
      });

      await suggestion.click();

      await sleep(1200);

      // =================================================
      // UPLOAD GAMBAR
      // =================================================
      await safeClick(
        page.getByRole("button", {
          name: "Ambil Gambar",
        })
      );

      await sleep(700);

      const [fileChooser] =
        await Promise.all([
          page.waitForEvent(
            "filechooser"
          ),

          page
            .getByText(
              "Pilih File Perangkat"
            )
            .click(),
        ]);

      await fileChooser.setFiles(image);

      await sleep(1800);

      // Tutup overlay upload
      await page.mouse.click(0, 0);

      await sleep(800);

      // =================================================
      // ELEMENT PENTING
      // =================================================
      const btnSimpan =
        page.getByRole("button", {
          name: "Simpan",
          exact: true,
        });

      const modalIndicator =
        page.getByRole("radio", {
          name: "Isi Manual",
        });

      const alertWarning =
        page.locator(".v-alert", {
          hasText: "Peringatan",
        });

      // =================================================
      // KLIK AI AWAL
      // =================================================
      const btnAIInitial =
        page
          .getByRole("button", {
            name: /Gunakan AI/i,
          })
          .first();

      if (
        await btnAIInitial
          .isVisible()
          .catch(() => false)
      ) {

        await btnAIInitial.click();

        await sleep(3500);
      }

      // =================================================
      // SIMPAN PERTAMA
      // =================================================
      await btnSimpan.scrollIntoViewIfNeeded();

      await btnSimpan.click();

      await sleep(2200);

      // =================================================
      // VALIDASI ALERT + RETRY AI
      // =================================================
      let isSolved = false;

      let attempt = 0;

      const maxAttempts = 5;

      while (
        !isSolved &&
        attempt < maxAttempts
      ) {

        const isAlertVisible =
          await alertWarning
            .isVisible()
            .catch(() => false);

        // =============================================
        // JIKA ALERT MUNCUL
        // =============================================
        if (isAlertVisible) {

          const fullText =
            await alertWarning.innerText();

          const match =
            fullText.match(
              /"([^"]+)"/
            );

          const namaBahan =
            match?.[1] || null;

          console.log(
            `⚠️ [${attempt + 1}/${maxAttempts}] ${productName} -> ${namaBahan || "Unknown"}`
          );

          // Cari tombol AI sesuai bahan
          if (namaBahan) {

            const btnAIRetry =
              page
                .locator(
                  "tr, .row",
                  {
                    hasText:
                      new RegExp(
                        namaBahan,
                        "i"
                      ),
                  }
                )
                .getByRole(
                  "button",
                  {
                    name:
                      /Gunakan AI/i,
                  }
                );

            if (
              await btnAIRetry
                .isVisible()
                .catch(() => false)
            ) {

              await btnAIRetry.click();

              await sleep(4000);

            } else {

              console.log(
                `❌ Tombol AI ${namaBahan} tidak ditemukan`
              );
            }

          } else {

            // fallback klik AI pertama
            if (
              await btnAIInitial
                .isVisible()
                .catch(() => false)
            ) {

              await btnAIInitial.click();

              await sleep(3500);
            }
          }

          // Klik simpan ulang
          await btnSimpan.click();

          await sleep(2500);

        } else {

          // =============================================
          // JIKA ALERT SUDAH HILANG
          // =============================================
          if (
            await modalIndicator
              .isHidden()
              .catch(() => false)
          ) {

            isSolved = true;

            console.log(
              `✅ DONE: ${productName}`
            );

            break;

          } else {

            console.log(
              `🧐 Modal masih terbuka tanpa alert: ${productName}`
            );

            // Pancing klik simpan
            await btnSimpan.click();

            await sleep(2500);

            if (
              await modalIndicator
                .isHidden()
                .catch(() => false)
            ) {

              isSolved = true;

              console.log(
                `✅ DONE: ${productName}`
              );

              break;
            }
          }
        }

        attempt++;
      }

      // =================================================
      // VALIDASI FINAL
      // =================================================
      await expect(
        modalIndicator
      ).toBeHidden({
        timeout: 10000,
      });

      return true;

    } catch (err) {

      console.log(
        `❌ GAGAL: ${productName} | ${err.message}`
      );

      await safeEscape();

      await sleep(1000);

      return false;
    }
  }

  // =====================================================
  // LOGIN FLOW
  // =====================================================
  await page.goto(
    "https://staging-halalmaxcert.indonesiancloud.com/",
    {
      waitUntil: "domcontentloaded",
    }
  );

  await sleep(1500);

  await safeClick(
    page.getByText("Masuk sebagai").nth(5)
  );

  await sleep(500);

  await safeClick(
    page.getByText("Pelaku Usaha")
  );

  await sleep(500);

  await safeClick(
    page.getByRole("button", {
      name: "Konfirmasi",
    })
  );

  await sleep(1000);

  await safeClick(
    page.getByText("Masuk", {
      exact: true,
    })
  );

  await page
    .getByRole("textbox", {
      name: "Masukkan Alamat Email",
    })
    .fill("testingkibot@gmail.com");

  await sleep(300);

  await page
    .getByRole("textbox", {
      name: "Masukkan Kata Sandi",
    })
    .fill("P@ssword!1");

  await sleep(300);

  await page
    .getByRole("button", {
      name: "Masuk",
    })
    .click();

  await expect(page).toHaveURL(
    /\/portal/,
    {
      timeout: 60000,
    }
  );

  await sleep(2000);

  // =====================================================
  // AJUKAN SERTIFIKASI
  // =====================================================
  await safeClick(
    page.locator(
      '[data-test-id="button-primary"]'
    )
  );

  await sleep(1000);

  await safeClick(
    page.getByRole("button", {
      name: "Ajukan Sertifikasi",
    })
  );

  await sleep(1500);

  // =====================================================
  // KBLI
  // =====================================================
  await safeClick(
    page.getByRole("textbox", {
      name: "Pilih KBLI atau Usaha",
    })
  );

  await sleep(500);

  await safeClick(
    page.getByText("Kedai Makanan")
  );

  await sleep(500);

  await page
    .getByRole("radio", {
      name: "Fasilitator",
    })
    .check();

  await sleep(500);

  await page
    .getByRole("button", {
      name: "Kirim",
    })
    .click();

  await expect(page).toHaveURL(
    /\/sertifikasi\/\d+\/pengajuan/
  );

  await sleep(2000);

  // =====================================================
  // PILIH KATEGORI
  // =====================================================
  await page.mouse.wheel(0, 2000);

  await sleep(1000);

  await safeClick(
    page
      .locator(".cursor-pointer")
      .filter({
        hasText: /Pilih/,
      })
      .last()
  );

  await sleep(500);

  await safeClick(
    page.getByText(
      "Penyediaan makanan dan minuman dengan pengolahan",
      {
        exact: true,
      }
    )
  );

  await sleep(1500);

  // =====================================================
  // LOOP PRODUK
  // =====================================================
  const failed = [];

  for (const product of products) {

    const success =
      await tambahProduk(product);

    if (!success) {
      failed.push(product);
    }

    await sleep(800);
  }

  // =====================================================
  // RETRY PRODUK GAGAL
  // =====================================================
  if (failed.length > 0) {

    console.log(
      "⚠️ RETRY PRODUK:",
      failed
    );

    for (const product of failed) {

      await tambahProduk(product);

      await sleep(1000);
    }
  }

  // =====================================================
  // SUBMIT PENGAJUAN
  // =====================================================
  const btnKirimPengajuan =
    page
      .getByRole("button", {
        name: /Kirim Pengajuan/i,
      })
      .last();

  await btnKirimPengajuan.scrollIntoViewIfNeeded();

  await sleep(1000);

  await btnKirimPengajuan.click();

  await sleep(2000);

  // =====================================================
  // CHECKLIST
  // =====================================================
  const checkboxes =
    page.locator(
      '[name="checkbox"]'
    );

  const total =
    await checkboxes.count();

  for (let i = 0; i < total; i++) {

    const cb =
      checkboxes.nth(i);

    if (
      await cb
        .isVisible()
        .catch(() => false)
    ) {

      await cb.click();

      await sleep(300);
    }
  }

  // =====================================================
  // KIRIM PENGAJUAN
  // =====================================================
  await page
    .getByRole("button", {
      name: "Kirim Pengajuan",
    })
    .nth(3)
    .click();

  await sleep(2500);

  // =====================================================
  // LOKASI
  // =====================================================
  await page
    .getByText(
      "Mohon pilih lokasi terlebih"
    )
    .click();

  await sleep(500);

  await safeClick(
    page.getByText(
      "Pilih lokasi",
      {
        exact: true,
      }
    )
  );

  await sleep(500);

  await safeClick(
    page.getByText("Kabupaten")
  );

  await sleep(1200);

  // =====================================================
  // LP3H
  // =====================================================
  await page
    .getByRole("textbox", {
      name: "Pilih lp3h",
    })
    .fill("mas");

  await sleep(1000);

  await safeClick(
    page
      .locator("div")
      .filter({
        hasText:
          /^Masyarakat Ekonomi Syariah$/,
      })
  );

  await sleep(1000);

  // =====================================================
  // PENDAMPING
  // =====================================================
  await safeClick(
    page.getByRole("textbox", {
      name: "Pilih pendamping halal",
    })
  );

  await sleep(700);

  await safeClick(
    page
      .locator("div")
      .filter({
        hasText:
          /^Abiyyu Achmad Syahru Mubarok$/,
      })
  );

  await sleep(1000);

  // =====================================================
  // KODE FASILITATOR
  // =====================================================
  await page
    .getByRole("textbox", {
      name:
        "Masukkan kode fasilitator",
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
  // VALIDASI FINAL
  // =====================================================
  await expect(page).toHaveURL(
    /daftar-pengajuan/,
    {
      timeout: 60000,
    }
  );

  console.log(
    "🏁 SEMUA PROSES SELESAI"
  );
});