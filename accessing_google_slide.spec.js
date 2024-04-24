const { Builder, By, Key, until } = require("selenium-webdriver");

async function access_google_slide() {
    let driver = new Builder().forBrowser('chrome').build();

    await driver.manage().window().maximize();  // Full-screen Browser
    await driver.manage().setTimeouts({implicit:2000});  // Set Waiting Time
    await driver.get("https://docs.google.com/presentation/d/1_ynGkklYDsaFQEDRbz1jx_wGyIrrWvYd/edit#slide=id.p1"); // Google Slide Link
    console.log("Browsed URL successfully!");

    let sign_in_button = await driver.wait(until.elementLocated(By.className("gb_Ld")));        // Get button element
    await sign_in_button.click();       // Click sign-in button
    console.log("Sign-in button clicked!");

    let emailBox = await driver.wait(until.elementLocated(By.name("identifier")));      // Email input element by name
    await emailBox.sendKeys("stein202120001@student.ndub.edu.bd", Key.RETURN);          // Type the email address & click enter
    console.log("Email address interted!");

    let passwordBox = await driver.wait(until.elementLocated(By.name("Passwd")));       // Password input element by name
    await passwordBox.sendKeys("CRsteinNDUB#2020", Key.RETURN);                         // Type the password and press enter
    console.log("Password inserted! \n Successfull Log-in.");

    await driver.sleep(5000);       // Wait before exiting the browser
    await driver.quit();            // Exit the automation browser
}
access_google_slide();