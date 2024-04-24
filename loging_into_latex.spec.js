const { By, Builder, Key, until } = require("selenium-webdriver")

async function log_into_Latex() {
    let driver = new Builder().forBrowser('chrome').build();
    let count = 0;

    await driver.manage().window().maximize();      // Full-screen
    await driver.manage().setTimeouts({implicit:2000});     // Waiting Time
    await driver.get("https://www.overleaf.com/")           // Browse Website
    count = count + 1;
    console.log(`Step-${count}: Go to Latex`);

    let orchidButton = await driver.wait(until.elementLocated(By.xpath('//a[text() = "Sign up with ORCID"]')));   // get element
    await orchidButton.click();     // click orchid sign up button
    count = count + 1;
    console.log(`Step-${count}: Sign In to Orchid Account`);

    let cookieConsent = await driver.wait(until.elementLocated(By.id("onetrust-reject-all-handler")));  // get cookie element
    await cookieConsent.click();    // click reject_unnecessary_cookies button
    count = count + 1;
    console.log(`Step-${count}: Reject Unnecessary Cookies`);

    let userName = await driver.wait(until.elementLocated(By.xpath('//*[@id="username"]')));     // get userName element by xpath
    await userName.sendKeys("stein202120001@student.ndub.edu.bd");      // Type user name
    count = count + 1;
    console.log(`Step-${count}: User Name inserted!`);

    let userPassword = await driver.wait(until.elementLocated(By.id("password")));          // get userPassword element by id
    await userPassword.sendKeys("Stein@1999#");         // Type password
    count = count + 1;
    console.log(`Step-${count}: Password insterted!`);

    let signIn = await driver.wait(until.elementLocated(By.xpath('//span[text() = "SIGN IN"]')));   // Sign In button
    await signIn.click();
    count = count + 1;
    console.log(`Step-${count}: Sign-In to Latex account successful!`);

    await driver.sleep(5000);
    await driver.quit();
}
log_into_Latex();