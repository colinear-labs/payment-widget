<script>
    import QrCode from "svelte-qrcode";

    let currency;   // 3-letter ticker
    let amount;     // native currency amount

    function createPaymentIntent() {
        fetch(`https://${server}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currency, amount
            })
        }).then(function(result) {
            return result.json();
        })
    }

</script>

<div>
    <!-- Test qr code -->
    <QrCode value="https://google.com" width="400px"/>
</div>

<style>

</style>
