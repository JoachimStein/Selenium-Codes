const { Builder, By, Key, until } = require("selenium-webdriver")
const assert = require("assert")

async function practice() {
    let driver = new Builder().forBrowser('chrome').build();

    await  driver.manage().setTimeouts({implicit:2000});
    await  driver.manage().window().maximize();

    await driver.get("https://www.google.com/");

    let titleGoogle = await driver.wait(until.titleMatches(/Google/), 10000)


    let searchBox = await driver.wait(until.elementLocated(By.name("q")));
    await searchBox.sendKeys("Selenium", Key.RETURN);

    let clickWebSite = await driver.wait(until.elementLocated(By.xpath(`//h3[text()="Selenium"]`)));
    await clickWebSite.click();

    let documentationLink = await driver.wait(until.elementLocated(By.xpath('//span[text()="Documentation"]')));
    await documentationLink.click();

    await driver.sleep(5000);
    await driver.quit();
}

practice();