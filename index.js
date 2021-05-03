const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector("._2_1wd");
    await delay(5000);

    const contactName = "Sibel";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector(".TbtXF");

    const editor = await page.$("div[data-tab='6']");
    await editor.focus();

    const amountOfMessages = 60;

    for (let i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const messages = ["Heyy", "Wasssap", "Napıyorsun Ciguli?"];
        const message = messages[Math.floor(Math.random() * 3)];
        document.execCommand("insertText", false, message);
      });

      await page.click("span[data-testid='send']");
      await delay(500);
    }
  } catch (error) {
    console.log(error);
  }
})();

const delay = time => new Promise(resolve => setTimeout(resolve, time));
