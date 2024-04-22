const { By, Builder, Key } = require("selenium-webdriver")

async function animeStream()
{
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://hianime.to/");
    await driver.findElement(By.name("keyword")).sendKeys("Naruto", Key.RETURN);
    let anime1 = await driver.findElement(By.xpath('//*[@id="main-content"]/section/div[3]/div/div[1]/div[1]/div[1]/a'));
    console.log("Found: ", anime1)
    await anime1.sendKeys(Key.RETURN);
    console.log("Clicked!")
}

animeStream();
