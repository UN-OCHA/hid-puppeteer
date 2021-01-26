const puppeteer = require('puppeteer');
const config = require('./config');

(async () => {
  try {
    // Set up puppeteer + browser window
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 25,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

    // Set up HID auth request
    const oauthNonce = Math.floor(Math.random()*100000);
    const oauthParams = [
      `response_type=${encodeURIComponent(config.response_type)}`,
      `client_id=${encodeURIComponent(config.client_id)}`,
      `redirect_uri=${encodeURIComponent(config.redirect_uri)}`,
      `state=${encodeURIComponent(config.state)}`,
      'nonce=' + oauthNonce,
    ];
    const oauthUrl = config.baseUrl + '/oauth/authorize?' + oauthParams.join('&');
    process.env.NODE_ENV !== 'production' && console.log('🐛', oauthUrl);
    await page.goto(oauthUrl);

    // try to find one of the two forms.
    const formLogin = await page.waitForSelector('.t-form-login');
    const formAuth = !formLogin && await page.waitForSelector('.t-form-authorize');

    // Login if necessary
    if (formLogin) {
      await page.type('#email', config.userName);
      await page.type('#password', config.userPass);
      await page.click('.t-login-btn');
    }

    // Take screenshot
    // await page.screenshot({
    //   path: './tmp/oath-simple.png',
    //   fullPage: true,
    // });

    // We're done
    await page.waitForTimeout(5000);
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
