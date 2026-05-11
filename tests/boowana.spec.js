import { test } from '@playwright/test';
import fs from 'fs';

test('Daftar Akun', async ({ page }) => {

    await page.goto('https://staging-buwana.indonesiancloud.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // ========================
    // CLICK SIGN UP
    // ========================
    const signupBtn = page.locator('a[href="/auth/signup"]');

    await Promise.all([
        page.waitForURL('**/auth/signup'),
        signupBtn.click()
    ]);

    // ========================
    // INPUT NAMA
    // ========================
    const namaLengkap = page.locator('input[name="fullName"]');
    await namaLengkap.type('Akmal Al Hq', { delay: 100 });

    // ========================
    // GENERATE USERNAME
    // ========================
    function generateUsername(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }

    const randomUsername = generateUsername();

    const userName = page.locator('input[name="username"]');
    await userName.type(randomUsername, { delay: 100 });

    console.log('Username:', randomUsername);

    // ========================
    // GENERATE EMAIL
    // ========================
    const noHp = page.locator('input[name="emailOrPhone"]');

    const now = new Date();
    const email = `akmalyadong+${now.getHours()}${now.getMinutes()}${now.getSeconds()}@gmail.com`;

    await noHp.type(email, { delay: 100 });

    console.log('Email:', email);

    // ========================
    // PASSWORD
    // ========================
    const passwordField = page.locator('input[name="password"]');
    const confPassword = page.locator('input[name="confirmPassword"]');

    const passwordValue = 'Akmalalhaqi1.';

    await passwordField.type(passwordValue, { delay: 100 });
    await confPassword.type(passwordValue, { delay: 100 });

    console.log('Password:', passwordValue);

    // ========================
    // CLICK AGREE
    // ========================
    const agreeToTerms = page.locator('#agreeToTerms');
    await agreeToTerms.click();



    const signUpBtn = page.locator('button[type="submit"]');
    await signUpBtn.click();



    // ========================
    // SAVE DATA TO TXT
    // ========================
    const data = `
Time: ${new Date().toISOString()}
Username: ${randomUsername}
Email: ${email}
Password: ${passwordValue}
-------------------------
`;

    fs.appendFileSync('data-register.txt', data);

    console.log('Data berhasil disimpan!');

});