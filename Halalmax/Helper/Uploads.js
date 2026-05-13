class UploadHelper {

  static randomImage(images) {

    return images[
      Math.floor(Math.random() * images.length)
    ];
  }

  static async upload(page, triggerLocator, fileButton, imagePath) {

    await triggerLocator.click();

    const fileChooserPromise =
      page.waitForEvent("filechooser");

    await fileButton.click();

    const fileChooser =
      await fileChooserPromise;

    await fileChooser.setFiles(imagePath);

    await page.waitForTimeout(1500);

    await page.mouse.click(20, 20);
  }
}

module.exports = UploadHelper;