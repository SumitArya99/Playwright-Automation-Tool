class orderHistory {
    constructor(page) {
        this.page = page;
        this.orderhistory = page.locator("label[routerlink='/dashboard/myorders']");
        this.AllOrderID = page.locator("th[scope='row']");
        this.Row = page.locator("tbody tr");
    }

    async orderHistory(expect) {

        //fetching order id
        const orderid = await this.page.locator("label.ng-star-inserted").textContent();
        console.log(orderid);

        await this.orderhistory.click();

        // waiting all APIs call have been made
        await this.page.locator("tbody tr th").first().waitFor();

        // getting titles of all cards
        const OrderID = await this.Row.locator("th").allTextContents();
        console.log(OrderID);

        // getting the first table row
        await this.Row.locator('th').first().waitFor();

        //Count of all the table row in a tbody
        const rowCount = await this.Row.count();
        console.log(rowCount);

        //iterating over products
        for (let k = 0; k < rowCount; ++k) {

            const rowID = await this.Row.nth(k).locator("th").textContent();

            if (orderid.includes(rowID)) {
                await this.Row.nth(k).locator("button").first().click();
            }
        }

        //Assertion the OrderID
        const newOrder = await this.page.locator(".col-text").textContent();
        expect(orderid.includes(newOrder)).toBeTruthy();
    }

}
module.exports = { orderHistory };