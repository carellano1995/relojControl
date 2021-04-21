const puppeteer = require("puppeteer");

const rut = process.env.RUT;
const password = process.env.PASSWORD;
const enterButton = '[class = "btn btn-blue btn-block z-a"]';
const inputRut = '[placeholder="Identificación"]';
const inputPass = '[placeholder="Contraseña"]';
const registerButtonPath = '[class = "btn btn-red"]';
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
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://trabajador.relojcontrol.com/");

  await fill(page, inputRut, rut);
  await fill(page, inputPass, password);

  const button = await page.waitFor(enterButton);
  await page.click(button._remoteObject.description);

  const registerButton = await page.waitFor(registerButtonPath);
  await page.click(registerButton._remoteObject.description);
  const confirmButton = await page.waitFor(confirmButtonPath);
  await page.click(confirmButton._remoteObject.description);
  const okButton = await page.waitFor(okButtonPath);
  await page.click(okButton._remoteObject.description);
  await page.screenshot({ path: "salida.png" });

  await browser.close();
})();
