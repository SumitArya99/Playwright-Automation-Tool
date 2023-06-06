const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');

//As javascript can not consume json format directly, we need to convert JSON format to string  and then to javascrpit
//JSON -> String -> JS Object
//JSON.Stringify is the method to convert JSON into string format and JSON.Parse is the method to convert  String into JS Object.
const dataSet = JSON.parse(JSON.stringify(require('../testData/frameworkTestData.json')));

//Whenever we run  parameters test cases, we make use of for loop.
for(const data of dataSet)

test(`Framework with pageObject for ${data.productname}`, async function ({ page }) {

    //Create a object for POManager class
    const pomanager = new POManager(page);
    
    //Creating Object for LoginPage Using Constructor
    const login_Page = pomanager.getLoginPage();

    //Creating Object for dashBoard Using Constructor
    const dash_Board = pomanager.getdashBoard();

    //Creating Object for placeOrder Using Constructor
    const place_Order = pomanager.getplaceOrder();

    //Creating Object for orderHistory Using Constructor
    const order_History = pomanager.getorderHistory();

    //Calling Goto Method from loginPage Class
    await page.waitForTimeout(3000);
    login_Page.goto();

    //Calling ValidLogin Method from loginPage Class
    await login_Page.validLogin(data.user_name, data.pass_word);

    //Calling dashBoard Method From dashBoard Class
    await dash_Board.dashBoard(data.productname, expect);

    //Calling placeOrder Method From placeOrder Class
    await place_Order.placeOrder(data.creditcard, data.month, data.Date, data.CVV, data.NameonCard, data.mail, data.thankyou, expect);

    //Calling orderHistory Method from orderHistory Class
    await order_History.orderHistory(expect);

await page.pause();


});