class apiUtils {

    //Constructor is a default method which gets called first whenever
    //an object is created of a particular class.

    constructor(apicontext, loginPayload) {
        //(this) Keyword enables the life of a variable throughout of the whole file.

        //We could have passed loginPayload  as an argument  with getToken method. but, we choose to pass this is 
        //an argument with Constructor because it is always a good practice to allow user to login as soon as the 
        //first method which is the constructor is called. 
        this.apicontext = apicontext;
        this.loginPayload = loginPayload;
    }

    //Method
    async getToken() {
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        //expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const newtoken = loginResponseJson.token;
        console.log(newtoken);

        //return is used when we want to use o/p of current method as i/p of another class/method
        return newtoken;
    }

    //Order method
    async getOrder(orderPayload) 
    {   
        //This is a blank javascript variable.
        let response = {};

        //Method vs Property---method(), and without () is called property.
        //token is property/characteristics/attribute of response variable.
        response.token = await this.getToken();


        const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                //We don't require to use (this) Keyword on line no. 37 OR Like this (data : this.orderPayload) as
                //orderPayload is a local argument for getOrder function.
                data: orderPayload,
                headers: {
                    'Authorization': response.token, //(getToken)---Where we get newToken value.
                    'Content-Type': 'application/json'
                }
            })
        //expect(orderResponse.ok()).toBeTruthy();
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        //Getting the order id
        const newOrderId = orderResponseJson.orders[0];
        console.log(newOrderId);

        //making a new property of response variable.
        response.orderId = newOrderId;
        return response;
    }
}

//This line will ensure that apiUtils.js file is accessible to all the other file PLAYWRIGHT TASK Folder
module.exports = { apiUtils };

