const { Builder, Key, By } = require("selenium-webdriver");
// require("chromedriver");

async function example()
{
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("http://demo.automationtesting.in/FileDownload.html");

        await driver
            .findElement(By.id('textbox'))
            .sendKeys("Automation Testing", Key.RETURN);

        await driver.findElement(By.id("createTxt")).click();

        await driver.findElement(By.id("link-to-download")).click();

        await driver.sleep(5000);
    } catch (e) {
            console.log("Error Occured: ", e.name);
    }

}
example()