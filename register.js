const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const rut = process.env.RUT;
const password = process.env.PASSWORD;
const enterButton = '[class = "btn btn-blue btn-block z-a"]';
const inputRut = '[placeholder="Identificación"]';
const inputPass = '[placeholder="Contraseña"]';
const registerButtonPath = '[class = "btn btn-green"]';
const confirmButtonPath = '[class = "z-messagebox-button z-button"]';
const okButtonPath = '[class = "btn btn-default z-button"]';
const fill = async (page, selector, fillValue) => {
  const data = await page.waitFor(selector);
  await page.click(data._remoteObject.description);
  await page.$eval(
    data._remoteObject.description,
    (element, value) => {
      const el = element;
      el.value = value;
    },
    fillValue
  );
};
const clickButton = async (page, selector) => {
  const button = await page.waitFor(selector);
  await page.click(button._remoteObject.description);
};
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://trabajador.relojcontrol.com/");

    await fill(page, inputRut, rut);
    await fill(page, inputPass, password);

    await clickButton(page, enterButton);
    await clickButton(page, registerButtonPath);
    await clickButton(page, confirmButtonPath);
    await clickButton(page, okButtonPath);
    await page.screenshot({ path: "entrada.png" });

    await browser.close();
  } catch (error) {
    await browser.close();
  }
})();
