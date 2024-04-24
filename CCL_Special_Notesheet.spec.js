const { By, Builder, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { LOADIPHLPAPI } = require("dns/promises");

async function specialNotesheet() {
    let driver = new Builder().forBrowser('chrome').build();

    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 2000 });

    // visit Taki Bro's localhost
    // await driver.get("http://192.168.23.235:8069/web/login");
    // console.log("Visit Website");

    // visit Test Server
    await driver.get("http://192.168.3.187:7071/web/login");
    console.log("Visit Website");

    // login
    await driver.wait(until.elementLocated(By.name("login"))).sendKeys("admin");
    await driver.wait(until.elementLocated(By.name("password"))).sendKeys("admin");
    await driver.wait(until.elementLocated(By.className("btn btn-primary"))).click();
    console.log("Login Successful!");

    // Navigate to Special Note sheet
    await driver.wait(until.elementLocated(By.className("oi oi-apps"))).click();
    await driver.wait(until.elementLocated(By.xpath('//a[text() = "Purchase"]'))).click();
    await driver.wait(until.elementLocated(By.xpath('//span[text() = "Orders"]'))).click();
    await driver.wait(until.elementLocated(By.xpath('//a[text() = "Special Note sheet"]'))).click();

    // create new record
    await driver.sleep(1000);
    await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/button'), 1000)).click();   // New Button   
    await driver.wait(until.elementLocated(By.id("vendor_id_0"))).sendKeys("Vendor 2", Key.RETURN);    // vendor select
    await driver.wait(until.elementLocated(By.id("start_date_0"))).sendKeys("04/24/2024", Key.RETURN);      // Agreement Start Date
    await driver.wait(until.elementLocated(By.id("end_date_0"))).sendKeys("04/30/2024", Key.RETURN);      // Agreement Start Date
    await driver.wait(until.elementLocated(By.id("currency_id_0"))).sendKeys("BDT", Key.RETURN);        // Currency Select
    await driver.wait(until.elementLocated(By.id("subject_0"))).sendKeys("Automated Testing - 4");      // Subject
    await driver.wait(until.elementLocated(By.id("body_0"))).sendKeys("Automated Testing on test-server using Selenium : Attempt - 4");      // Body
    await driver.wait(until.elementLocated(By.id("approver_comments_0"))).sendKeys("No Comments", Key.RETURN);      // Approver's Comment
    await driver.wait(until.elementLocated(By.name("ufile"))).sendKeys("/home/stein/Downloads/Cyber Security (1).png"); // Upload Attachments
    await driver.sleep(1000);

    // Submit to Layer-1 
    // Assertion
    let submitButton = await driver.wait(until.elementLocated(By.name("action_submit")));
    assert.equal("Submit to Layer-1", await submitButton.getText());
    console.log("Assertion Successful : Submit to Layer - 1\n");
    let cancelButton = await driver.wait(until.elementLocated(By.name("action_notesheet_cancel")));
    assert.equal("Cancel", await cancelButton.getText());
    console.log("Assertion Successful : Cancel Button\n");
    // Button Click
    await submitButton.click();
    console.log("Submit to Layer-1 button Clicked!\n");

    // Layer - 1
    let submitLayer1Button = await driver.wait(until.elementLocated(By.name("action_layerOne_submit")));
    assert.equal("Submit to Layer-2", await submitLayer1Button.getText());
    console.log("Assertion Successfull: Submit to Layer - 2\n");
    assert.equal("Cancel", await cancelButton.getText());
    console.log("Assertion Successful : Cancel Button\n");
    // Button click
    await submitLayer1Button.click();
    console.log("Submit to Layer-2 button clicked!\n");


    // Layer - 2  
    let submitLayer2Button = await driver.wait(until.elementLocated(By.name("action_layerTwo_submit")));
    assert.equal("Submit to SCM-HOD", await submitLayer2Button.getText());
    console.log("Assertion Successfull: Submit to SCM_HOD\n");
    assert.equal("Cancel", await cancelButton.getText());
    console.log("Assertion Successful : Cancel Button\n");
    // Button click
    await submitLayer2Button.click();
    console.log("Submit to SCM-HOD button clicked!\n");

    // SCM - HOD
    let submitSCMHODButton = await driver.wait(until.elementLocated(By.name("action_scm_hod_approve")));
    assert.equal("Approve", await submitSCMHODButton.getText());
    console.log("Assertion Successfull: Submit to MD\n");
    assert.equal("Cancel", await cancelButton.getText());
    console.log("Assertion Successful : Cancel Button\n");
    // Button click
    await submitSCMHODButton.click();
    console.log("Submit to MD Button Clicked!\n");

    // SCM - HOD
    let submitMDButton = await driver.wait(until.elementLocated(By.name("action_md_approve")));
    assert.equal("Approve", await submitMDButton.getText());
    console.log("Assertion Successfull: Approve\n");
    assert.equal("Cancel", await cancelButton.getText());
    console.log("Assertion Successful : Cancel Button\n");
    // Button click
    await submitMDButton.click();
    console.log("Approve Button Clicked!\n");

    // Approve Assertion
    let amendmentButton = await driver.wait(until.elementLocated(By.name("action_notesheet_amendment")));    // Amendment Button
    assert.equal("Amendment", await amendmentButton.getText());
    let closeButton = await driver.wait(until.elementLocated(By.name("action_notesheet_close")));            // Close Button
    assert.equal("Close", await closeButton.getText());
    console.log("Assertion Completed! \nResult: Process Successful; PASS");

    // Exiting Automation Browser
    await driver.sleep(5000);
    await driver.quit();
}
specialNotesheet();