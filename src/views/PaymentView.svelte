<script>
import QrCode from "svelte-qrcode";
import { querystring } from "svelte-spa-router";
import { parse } from "qs";
import { getContext } from "svelte";

var amountDue = 0
var toAddress = ""
var qrContent = ""

const parsed = parse($querystring);

// amount: native/base currency amount
let { currency, baseCurrency } = parsed;

let server = new URL(window.location.href).host

function createPaymentIntent() {
    return fetch(`http://${server}/api/createPaymentIntent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            currency: currency.id,
            basePrice: getContext('amount'),
            base: baseCurrency
        })
    })
    .then(response => response.json())
    .then(data => {
        return data
    })
    // .catch(() => {
    //     return result.json();
    // })
}

const currencyPrefixes = {
    btc:  "bitcoin",
    eth:  "ethereum",
    ltc:  "litecoin",
    bch:  "bitcoincash",
    doge: "dogecoin",
    dai:  "dai",
    usdt: "tether",
    usdc: "usdc",
}

function prefixIncluded(currency) {
    return Object.keys(currencyPrefixes).includes(currency)
}

function generateQrContent(currency, address, amount) {
    if (prefixIncluded(currency)) {
        return `${currencyPrefixes[currency]}:${address}?amount=${amount}`
    } else {
        return address
    }
    
}

createPaymentIntent().then(res => {

    if (
        res.amount == null ||
        res.address == null
        ) {
        // le error message here
        console.log("FAILED TO LOAD DUE TO REASONS")
    }

    else {
        amountDue = res.amount
        toAddress = res.address
        qrContent = generateQrContent(currency.id, toAddress, amountDue)
        console.log(qrContent)
    }
});

</script>

<div class="noselect">
    <div class="payment-header">
        <img 
        src={currency.generic
          ? `./assets/currencies/generic.svg`
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
            <QrCode value={qrContent} size=200/>
        </div>
        <br style="height: 40px;"/>
        <div class="hcentered">
            <div style="display:flex;flex-direction:row">
                <div class="money-text selectable">{amountDue}</div>
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
