const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert');
const { log } = require("console");

describe('Second Script', function(){
    let driver;

    before(async function(){
        driver = await new Builder().forBrowser('chrome').build();
    })

    it('Purchase Requisition', async function(){
        await driver.get('http://192.168.3.187:7071/web/login');


        await driver.manage().setTimeouts({ implicit : 1000 });

        let email_id = await driver.findElement(By.name("login"));
        await email_id.sendKeys("admin");

        let password = await driver.findElement(By.name("password"));
        await password.sendKeys("admin");

        let loginButton = await driver.findElement(By.className("btn btn-primary"));
        await loginButton.click();

        await driver.findElement(By.className("oi oi-apps")).click();
        await driver.findElement(By.xpath('/html/body/header/nav/div[1]/div/a[8]')).click();
        await driver.findElement(By.className('btn btn-primary o_list_button_add')).click();
        await driver.findElement(By.id("budget_id_0")).sendKeys("It", Key.RETURN);

        await driver.findElement(By.id("requisition_type_0")).sendKeys("F", Key.RETURN);

        await driver.findElement(By.id("remarks_0")).sendKeys("Automated Testing by Selenium");

        await driver.sleep(1000);
        let filePath = '/home/stein/Downloads/Cyber Security (1).png';
        await driver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[3]/div/div[2]/div/div/div[2]/span/input")).sendKeys(filePath);

        await driver.sleep(1000);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td/a')).click(); // Add a file
        await driver.sleep(1000);
        await driver
                .findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[1]/div/div[1]/div/div/input'))
                .sendKeys("CCL", Key.RETURN);
                console.log("Add a line > Product");
    
        await driver
                .findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[5]/div/input'))
                .clear();

        await driver
                    .findElement(By.xpath('/html/body/div[1]/div/div/div[2]/div/div[1]/div[2]/div[4]/div[2]/div/div/div/div[2]/table/tbody/tr[1]/td[5]/div/input'))
                    .sendKeys("1.00");
        console.log("Quantity");
        await driver.sleep(5000);
        
        
        let submitButton = await driver.findElement(By.name("action_submit"));
        assert.equal("Submit",await submitButton.getText());   
        await driver.sleep(1000);     
        let cancelButton = await driver.findElement(By.name("action_pr_cancel"));
        assert.equal("Cancel", await cancelButton.getText());
        await driver.sleep(1000);
        await submitButton.click();

        await driver.sleep(1000)
        assert.equal("Cancel", await cancelButton.getText());
        let approveButton1 = await driver.findElement(By.name("action_hod_hoit_approve"));
        assert.equal("Approve", await approveButton1.getText());
        await approveButton1.click();
        
        await driver.sleep(1000);
        let approveButton2 = await driver.findElement(By.name("action_gm_approve"));
        assert.equal("Cancel", await cancelButton.getText());
        assert.equal("Approve", await approveButton2.getText());
        await approveButton2.click();

        await driver.sleep(1000);
        let amendmentButton = await driver.findElement(By.name("action_pr_amendment"));
        assert.equal("Amendment", await amendmentButton.getText());
        let closeButton = await driver.findElement(By.name("action_pr_close"));
        assert.equal("Close", await closeButton.getText());
        

        await driver.sleep(5000);

    });

    after(async () => await driver.quit());
});