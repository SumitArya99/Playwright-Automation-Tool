const { loginPage } = require('./loginPage');
const { dashBoard } = require('./dashBoard');
const { placeOrder } = require('./placeOrder');
const { orderHistory } = require('./orderHistory');

class POManager
{   
    constructor(page)
    {
    //Calling Page Fixture
    this.page = page;

    //Creating Object for LoginPage Using Constructor
    this.loginPage = new loginPage(this.page);

    //Creating Object for dashBoard Using Constructor
    this.dashBoard = new dashBoard(this.page);

    //Creating Object for placeOrder Using Constructor
    this.placeOrder = new placeOrder(this.page);

    //Creating Object for orderHistory Using Constructor
    this.orderHistory = new orderHistory(this.page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getdashBoard(){
        return this.dashBoard;
    }

    getplaceOrder(){
        return this.placeOrder;
    }

    getorderHistory(){
        return this.orderHistory;
    }
}

module.exports = {POManager};