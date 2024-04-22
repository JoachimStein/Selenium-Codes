const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert');

describe('CCL Automation', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    })

    it('Request For Quotation', async function () {
        await driver.get('http://192.168.3.187:7071/web/login');


        await driver.manage().setTimeouts({ implicit: 1000 });

        let email_id = await driver.findElement(By.name("login"));
        await email_id.sendKeys("admin");

        let password = await driver.findElement(By.name("password"));
        await password.sendKeys("admin");

        let loginButton = await driver.findElement(By.className("btn btn-primary"));
        await loginButton.click();

        await driver.findElement(By.className("oi oi-apps")).click();
        await driver.findElement(By.xpath('/html/body/header/nav/div[1]/div/a[8]')).click();
        await driver.findElement(By.xpath("/html/body/header/nav/div[2]/div[1]/button/span")).click();  // Orders
        await driver.findElement(By.xpath("/html/body/header/nav/div[2]/div[1]/div/a[2]")).click();     // RFQ

        await driver.findElement(By.className('btn btn-primary o_list_button_add')).click();
        await driver.sleep(1000);

        await driver.findElement(By.id("purchase_request_ids_0")).sendKeys("PR/00", Key.RETURN);
        await driver.sleep(1000);

        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[7]')).click();
        await driver.sleep(1000);

        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[7]/div/div/input')).clear();
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[7]/div/div/input')).sendKeys("2.00");
        await driver.sleep(1000);

        let cancelButton = await driver.findElement(By.name("action_cancel"));
        assert.equal("Cancel", await cancelButton.getText());
        await driver.sleep(1000)

        let confirmButton = await driver.findElement(By.name("action_rfq_confirm"));
        assert.equal("Confirm", await confirmButton.getText());
        await driver.sleep(1000);
        await confirmButton.click();

        await driver.sleep(1000)
        let amendmentButton = await driver.findElement(By.name("action_go_back"));
        assert.equal("Amendment", await amendmentButton.getText());

        await driver.sleep(1000);
        let closeButton = await driver.findElement(By.name("action_rfq_close"));
        assert.equal("Close", await closeButton.getText());

        await driver.sleep(1000)
        await driver.findElement(By.name("action_multiple_quotation_creation")).click();

        await driver.sleep(1000);
        await driver
            .findElement(By.id("partner_ids_0"))
            .sendKeys("Local", Key.RETURN);

        await driver.sleep(1000);
        await driver
            .findElement(By.id("partner_ids_0"))
            .sendKeys("Vendor", Key.RETURN);

        await driver.sleep(1000);
        await driver.findElement(By.name("action_create_quotations")).click();

        await driver.sleep(5000);

    });

    after(async () => await driver.quit());
});