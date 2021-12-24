<script>
  import QrCode from "svelte-qrcode";
  import { querystring } from "svelte-spa-router";
  import { parse } from "qs";
  import { getContext, setContext } from "svelte";
  import { push } from "svelte-spa-router";

  // set to false later
  var initialDetailsRender = true;
  var detailsShown = null;

  var amountDue = 0;
  var toAddress = "";
  var qrContent = "";

  const parsed = parse($querystring);

  // amount: native/base currency amount
  let { currency, baseCurrency } = parsed;

  let server = new URL(window.location.href).host;

  function createPaymentIntent() {
    return fetch(`http://${server}/api/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: currency.id,
        basePrice: getContext("amount"),
        base: baseCurrency,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    // .catch(() => {
    //     return result.json();
    // })
  }

  // reads status from payment intent websocket endpoint and displays it
  const statusWs = new WebSocket(`ws:${getContext('secure') ? 's' : '' }//${server}/ws/${toAddress}`)
  statusWs.addEventListener('message', (event) => {
    console.log("RECEIVED DATA")
    console.log(event.data)
  })

  const currencyPrefixes = {
    btc: "bitcoin",
    eth: "ethereum",
    ltc: "litecoin",
    bch: "bitcoincash",
    doge: "dogecoin",
    dai: "dai",
    usdt: "tether",
    usdc: "usdc",
  };

  function prefixIncluded(currency) {
    return Object.keys(currencyPrefixes).includes(currency);
  }

  function generateQrContent(currency, address, amount) {
    if (prefixIncluded(currency)) {
      return `${currencyPrefixes[currency]}:${address}?amount=${amount}`;
    } else {
      return address;
    }
  }

  if (typeof getContext('intents')[currency.name] === "undefined") {
    let intents = getContext('intents')
    createPaymentIntent().then((res) => {
      if (res.amount == null || res.address == null) {
        // le error message here
        console.log("FAILED TO LOAD DUE TO REASONS");
      } else {
        amountDue = res.amount;
        toAddress = res.address;
        qrContent = generateQrContent(currency.id, toAddress, amountDue);
        console.log(qrContent);
      }
    }).then(() => {
      intents[currency.name] = {
        amount: amountDue,
        address: toAddress 
      }
    });
    setContext('intents', intents)

  } else {
    toAddress = getContext('intents')[currency.name].address
    amountDue = getContext('intents')[currency.name].amount
    qrContent = generateQrContent(currency.id, toAddress, amountDue);
    console.log(qrContent);
  }
</script>

<!--<div class="noselect">
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
        <div class="hcentered noselect">-->
<!-- Probably fix the QR resolution or something later -->
<!--<QrCode value={qrContent} size=200/>
        </div>
        <br style="height: 40px;"/>
        <div class="hcentered">
            <div style="display:flex;flex-direction:row">
                <div class="money-text selectable">{amountDue}</div>
                <div class="currency-suffix-text">{currency.id.toUpperCase()}</div>
            </div>
        </div>
    </div>
</div>-->

<div class="container">
  <h1>{getContext("merchantName")}</h1>
  <h3>Please select the coin you will be using.</h3>
  <div class="content">
    <div
      class="backdrop {initialDetailsRender ? 'hidden' : (detailsShown ? 'fade-in' : 'fade-out')}"
      on:click={() => {
        detailsShown = false;
      }}
    />

    <!-- Popup modal -->
    <div class="popup {initialDetailsRender ? 'hidden' : (detailsShown ? 'slide-in' : 'slide-out')}">
      <label>Amount Due</label>
      <div class="popup-input-container">
        <div class="input-text">{amountDue} {currency.id.toUpperCase()}</div>
        <img
          src="assets/copy.svg"
          on:click={() => {
            navigator.clipboard.writeText(amountDue);
          }}
          alt=""
          style="cursor:pointer"
        />
      </div>
      <label>Address</label>
      <div class="popup-input-container">
        <div class="input-text">{toAddress}</div>
        <img
          src="assets/copy.svg"
          on:click={() => {
            navigator.clipboard.writeText(toAddress);
          }}
          alt=""
          style="cursor: pointer;"
        />
      </div>
    </div>
    <!-- End popup modal -->

    <header>
      <div class="search-container">
        <div class="input-container">
          <img
            src={currency.generic
              ? `./assets/currencies/generic.svg`
              : `./assets/currencies/${currency.id}.svg`}
            class="currency-icon"
            alt=""
          />
          {currency.name}
        </div>
        <img
          on:click={() => {
            push(`/`);
          }}
          class="close-icon"
          src="assets/close.svg"
          alt="Close payment"
        />
      </div>
    </header>
    <div class="content-container">
      <div class="amount-container">
        <div class="amount-number" style="padding-right: 7px">{amountDue}</div>
        {currency.id.toUpperCase()}
      </div>
      <div class="amount-dollars">
        ${getContext("amount")} USD
        <img class="dropdown" src="assets/chevron-down-small.svg" alt="Select currency" />
      </div>
      <QrCode value={qrContent} size="190" class="code" />
      <div class="view-details" on:click={() => {detailsShown=true; initialDetailsRender=false}}>
          View Payment Details
          <img src="assets/chevron-right-small.svg" alt="" />
      </div>
      <button class="btn">
        <div class="loader" />
        Awaiting Payment
      </button>
    </div>
  </div>
  <button class="language-dropdown">
    English
    <img
      class="dropdown-icon"
      src="assets/chevron-down.svg"
      alt="Select Langugae"
    />
  </button>
</div>

<style>
  /* .payment-header {
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
    }*/

  h3 {
    max-width: 300px;
  }

  header {
    display: flex;
    border-bottom: 1px solid hsla(0, 0%, 63.9%, 0.1);
    width: 100%;
  }

  .content {
    position: relative;
  }

  .currency-icon {
    height: 20px;
    width: 20px;
    margin-right: 9px;
  }

  .search-container {
    display: flex;
    width: 100%;
    border-radius: 25px;
    padding: 10px 14px;
    margin: 16px;
    align-items: center;
    justify-content: center;
    background: #f5f5f7;
  }

  .input-container {
    display: flex;
    align-items: center;
    box-sizing: inherit;
    width: 100%;
    border: none;
    padding: 0;
    color: #454e59;
    font-size: 13px;
    font-weight: 700;
    background-color: transparent;
  }

  .close-icon {
    cursor: pointer;
    height: 16px;
  }

  .amount-container {
    display: flex;
    font-size: 25px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: #303133;
    margin-bottom: 8px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 30px;
    height: 371px;
  }
  .amount-number {
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 12ch;
    overflow: hidden;
  }

  .amount-dollars {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: #7c8086;
    clear: both;
    margin-bottom: 20px;
  }

  .code {
    border-radius: 3px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eff1fe;
    border-radius: 8px;
    width: 100%;
    height: 52px;
    border: none;
    cursor: pointer;
    color: #5272ef;
    font-size: 15px;
    font-weight: 500;
    margin-top: auto;
  }

  .backdrop {
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 13.5px;
  }

  .dropdown {
    margin-left: 4px;
  }

  .popup {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    height: 193px;
    border-radius: 12px;
    box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.05);
    z-index: 999999;
    padding: 20px 25px;
  }

  label {
    color: #575e6d;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.1px;
  }

  .popup-input-container {
    display: flex;
    background: #f5f5f5;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    height: 49px;
    margin-top: 14px;
    margin-bottom: 18px;
  }

  .input-text {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 80%;
  }

  .view-details {
      display: flex;
      align-items: center;
      color: #5272ef;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.2px;
      cursor: pointer;
      margin: 5px 0;
  }

  .fade-in {
    animation: fade 0.2s ease-in-out;
  }

  .slide-in {
    animation: slide 0.2s ease-in-out;
  }

  .fade-out {
    animation: fade-out-key 0.2s ease-in-out forwards;
  }

  .slide-out {
    animation: slide-out-key 0.2s ease-in-out forwards;
  }

  .hidden {
    display: none;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes slide {
    0% {
      transform: translateY(50%);
      opacity: 0.5;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade-out-key {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes slide-out-key {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(100%);
      opacity: 0;
      visibility: hidden;
    }
  }

  /* 
    .content {
        height: auto;
    }

    .amount-container {
        display: flex;
        font-size: 25px;
        font-weight: 500;
        letter-spacing: -0.3px;
        color: #303133;
        margin-bottom: 8px;
    }

    .amount-dollars {
        font-size: 15px;
        font-weight: 500;
        letter-spacing: -0.2px;
        color: #7C8086;
        margin-bottom: 20px;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 48px;
    } */

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin-right: 12px;
  }

  .loader {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 2px solid #5272ef;
    border-right: 2px solid rgba(255, 255, 255, 0);
    border-bottom: 2px solid #5272ef;
    border-left: 2px solid #5272ef;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ();
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
