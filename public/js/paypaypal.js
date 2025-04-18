const urlSearchParams = new URLSearchParams(window.location.search);
const emailbox = document.getElementById('email');
const emailbutton = document.getElementById('emailbutton');
const loadinggif = document.getElementById('loading');
const params = Object.fromEntries(urlSearchParams.entries());
window.name = params['name'];

const namehtml = document.getElementById('name');


let text = "Confirm your name: " + window.name;
namehtml.textContent = text;
function pay() {
    if (emailbox.value.includes("@") && emailbox.value.includes(".")) {
        emailbox.style.display = "none";
        emailbutton.style.display = "none";
        loadinggif.style.display = "block";
        const customid = emailbox.value + "~" + Math.floor(Math.random() * 1000000000000000);
        url = "https://us-east1-nitbc-374322.cloudfunctions.net/nitbc" + "?name=" + window.name + "&email=" + emailbox.value + "&id=" + customid;
        let xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open("GET", url, false); 
        xmlHttpReq.send(null);
        console.log(xmlHttpReq.responseText);
        console.log(xmlHttpReq.status);

        const paypalButtonsComponent = paypal.Buttons({
            // optional styling for buttons
            // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
            style: {
            color: "gold",
            shape: "rect",
            layout: "vertical"
            },
        
            // set up the transaction
            createOrder: (data, actions) => {
                return actions.order.create({
                    "purchase_units": [{
                        "custom_id": customid,
                        "amount": {
                        "currency_code": "USD",
                        "value": "3.00",
                        "breakdown": {
                            "item_total": {  /* Required when including the `items` array */
                            "currency_code": "USD",
                            "value": "3.00"
                            }
                        }
                        },
                        "items": [
                        {
                            "name": "Name in the Blockchain", /* Shows within upper-right dropdown during payment approval */
                            "description": "Name in the Blockchain", /* Item details will also be in the completed paypal.com transaction view */
                            "unit_amount": {
                            "currency_code": "USD",
                            "value": "3.00"
                            },
                            "quantity": "1"
                        },
                        ]
                    }],
                });
                },
        
        
            // finalize the transaction
            onApprove: (data, actions) => {
                const captureOrderHandler = (details) => {
                    console.log('Transaction completed');
                    document.getElementById('thx').style.display = "block";
                    document.getElementById('paypal-button-container').style.display = "none";
                };
        
                return actions.order.capture().then(captureOrderHandler);
            },
        
            // handle unrecoverable errors
            onError: (err) => {
                console.error('An error prevented the buyer from checking out with PayPal');
            }
        });
    
    
        paypalButtonsComponent
            .render("#paypal-button-container")
            .catch((err) => {
                console.error('PayPal Buttons failed to render');
        });
        loadinggif.style.display = "none";

    }
}
