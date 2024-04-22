const { By, Builder, Key, until } = require("selenium-webdriver")
const assert = require("assert")

describe("CCL CS Automation", function(){
    let driver;

    before(async function(){
        driver = new Builder().forBrowser('chrome').build();
    })

    it("COMPARATIVE STATEMENT", async function(){

        await driver.get("http://192.168.3.187:7071/web/login");       // visit_website
        await driver.manage().setTimeouts({ implicit : 5000 });

        await driver.manage().window().maximize();

        await driver.findElement(By.name("login")).sendKeys("admin");   // login
        await driver.findElement(By.name("password")).sendKeys("admin");    // password
        await driver.findElement(By.className("btn btn-primary")).click();  // login_button

        
        await driver.findElement(By.className("oi oi-apps")).click();   // menu
        await driver.findElement(By.xpath('/html/body/header/nav/div[1]/div/a[9]')).click();    // click_purchase_module

        await driver.findElement(By.xpath("/html/body/header/nav/div[2]/div[1]/button/span")).click();  // Orders
        await driver.findElement(By.xpath("/html/body/header/nav/div[2]/div[1]/div/a[3]")).click();     // Comparative Statement

        let newbutton = await driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/button"));     // New_Button
        await newbutton.click();
        await driver.findElement(By.id("request_for_quotation_id_0")).sendKeys("RFQ/00", Key.RETURN);       // RFQ_ID

        let compareButton = await driver.findElement(By.name("btn_open_view"));     // Compare_Button_Assertion
        assert.equal("Compare", await compareButton.getText());
        await driver.sleep(1000);
        await compareButton.click();        // Click_compare_button

        await driver.sleep(1000);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/button')).click();    // click edit button in compare view

        await driver.sleep(1000);
        await driver.findElement(By.id("1273_input")).sendKeys("1", Key.RETURN);

        await driver.sleep(1000);
        await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div/button')).click();

        let sendApprovalButton = await driver.wait(until.elementTextMatches(By.id("btn_send_for_approval")));
        await driver.sleep(1000);
        assert.equal("Send For Approval", await sendApprovalButton.getText());
        await sendApprovalButton.click();

        await driver.sleep(1000);
        let rejctButton = await driver.findElement(By.id("btn_reject"));
        assert.equal("Reject", await rejctButton.getText());

        await driver.sleep(1000);
        let approveHodMdButton = await driver.findElement(By.id("btn_approve_hod_and_md"));
        assert.equal("Approve", await approveHodMdButton.getText());
        await approveHodMdButton.click();

        await driver.sleep(1000);
        assert.equal("Reject", await rejctButton.getText());

        await driver.sleep(1000);
        assert.equal("Approve", await approveHodMdButton.getText());
        await approveHodMdButton.click();

        let amendmentButton = await driver.findElement(By.id("btn_send_to_draft"));
        await driver.sleep(1000);
        assert.equal("Amendment", await amendmentButton.getText());
    
        await driver.sleep(5000);
    })
    after(async () => await driver.quit());
})