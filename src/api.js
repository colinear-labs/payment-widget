let server = ""

export function createPaymentIntent() {
    fetch(`https://${server}/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: document.querySelector('#amount').value,
            currency: document.querySelector('#currency').value
        })
    })
        .then(function(result) {
            return result.json();
        })
        .then(function(data) {
            document.querySelector('#result').innerHTML = JSON.stringify(data, null, 2);
        });
}
