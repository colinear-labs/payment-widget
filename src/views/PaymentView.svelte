<script>
import QrCode from "svelte-qrcode";
import { querystring } from "svelte-spa-router";
import { parse } from "qs";

const parsed = parse($querystring);

// currency: {name, id} object
// amount: native currency amount
let { currency, amount } = parsed;
console.log(JSON.stringify(currency))

function createPaymentIntent() {
    fetch(`https://${server}/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currencyId: currency.id,
            amount: amount
        })
    }).then(function(result) {
        return result.json();
    })
}

</script>

<div class="noselect">
    <div class="payment-header">
        <img 
        src={currency.generic
          ? `../assets/currencies/generic.svg`
          : `./assets/currencies/${currency.id}.svg`}
        alt=""
        style="width:40px;"
        />
        <div class="payment-header-title">Pay with {currency.name}</div>
    </div>

    <br style="height:20px"/>

    <div style="display:flex;flex-direction:column">
        <div class="hcentered noselect">
            <!-- Probably fix the QR resolution or something later -->
            <QrCode value="https://google.com" size=200/>
        </div>
        <br style="height: 40px;"/>
        <div class="hcentered">
            <div style="display:flex;flex-direction:row">
                <div class="money-text selectable">{amount}</div>
                <div class="currency-suffix-text">{currency.id.toUpperCase()}</div>
            </div>
        </div>
    </div>
</div>

<style>

    .payment-header {
        padding: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .payment-header-title {
        color: #565d6e;
        font-size: 14pt;
        font-family: 'Roboto';
        font-weight: 500;
        margin-left: 18px;
    }

    .hcentered {
        display: flex;
        margin: auto;
        justify-content: center;
    }

    .money-text {
        color: #565d6e;
        font-family: 'Roboto Mono', monospace;
        font-size: 18pt;
        font-weight: 300;
    }

    .currency-suffix-text {
        color: #7d8599;
        font-family: 'Roboto Mono', monospace;
        font-size: 18pt;
        font-weight: 500;
    }

</style>
