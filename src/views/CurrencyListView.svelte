<script>
  import { push, replace } from "svelte-spa-router";
  import { stringify } from "qs";

  let searchQuery = ""

  let currenciesPopular = [
    {
      name: "Bitcoin",
      id: "btc",
    },
    {
      name: "Bitcoin Cash",
      id: "bch",
    },
    {
      name: "Litecoin",
      id: "ltc",
    },
    {
      name: "Ethereum",
      id: "eth",
    },
  ];

  let currenciesOther = [
    {
      name: "Dogecoin",
      id: "doge",
    },
    {
      name: "Dai",
      id: "dai",
    },
    {
      name: "USDT",
      id: "usdt",
    },
    {
      name: "USDC",
      id: "usdc",
    },
    {
      name: "TerraUSD",
      id: "ust",
      generic: true,
    },
  ];

</script>

<h1>Merchant XYZ</h1>
<h3>Please select the coin you will be using.</h3>
<div class="content">
  <header>
    <div class="search-container">
      <input type="text" placeholder="Search for Cryptocurrency" bind:value={searchQuery}/>
      <img class="search-icon" src="assets/search.svg" alt="" />
    </div>
  </header>
  <div class="currency-container">
    <div class="title">Popular Currencies</div>
    {#each currenciesPopular as currency}
      {#if searchQuery == "" || searchQuery.length > 0 && (
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        currency.id.toLowerCase().includes(searchQuery.toLowerCase()) 
      )}
        <div
          class="currency-item"
          on:click={() => {
            push(
              `/pay?${stringify({
                currency,
                amount: 20,
                baseCurrency: "usd",
              })}`
            );
          }}
        >
          <div class="selection-container">
            <img
              src={currency.generic
                ? `../assets/currencies/generic.svg`
                : `./assets/currencies/${currency.id}.svg`}
              alt={`Pay with ${currency.name}`}
              class="currency-icon"
            />
            <div class="currency-item-text">{currency.name}</div>
          </div>
          <img class="chevron-icon" src="assets/chevron-right.svg" alt="" />
        </div>
      {/if}
    {/each}
    <div class="title" style="margin-top: 16px;">Other Currencies</div>
    {#each currenciesOther as currency}
      {#if searchQuery == "" || (searchQuery.length > 0 && (
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        currency.id.toLowerCase().includes(searchQuery.toLowerCase()) 
      ))}
        <div
          class="currency-item"
          on:click={() => {
            push(
              `/pay?${stringify({
                currency,
                amount: 20,
                baseCurrency: "usd",
              })}`
            );
          }}
        >
          <div class="selection-container">
            <img
              src={currency.generic
                ? `../assets/currencies/generic.svg`
                : `./assets/currencies/${currency.id}.svg`}
              alt={`Pay with ${currency.name}`}
              class="currency-icon"
            />
            <div class="currency-item-text">{currency.name}</div>
          </div>
          <img class="chevron-icon" src="assets/chevron-right.svg" alt="" />
        </div>
      {/if}
    {/each}
  </div>
</div>
<button class="language-dropdown">
  English
  <img
    class="dropdown-icon"
    src="assets/chevron-down.svg"
    alt="Select language"
  />
</button>

<style>
  /*@font-face {
        font-family: 'Alliance';
        src: url('../fonts/AllianceNo2-Regular.woff2') format('woff2'),
            url('../fonts/AllianceNo2-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    .currency-list {
        list-style-type: none;
        margin: 0;
        padding: 10px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .widget-title {
        font-weight: 'bold';
        font-size: 18pt;
    }

    .currency-item {
        height: 43px;
        padding-left: 12px;
        padding-right: 12px;
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 8px;
        margin-bottom: 8px;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .currency-item:hover {
        background-color: #f4f4f4;
        cursor: pointer;
    }

    .currency-item-text {
        font-size: 17px;
        color: #565d6e;
        font-weight: 500;
        font-family: 'Roboto', serif;
        margin-left: 14px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }*/

  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

  html,
  body {
    background: #f5f5f7;
    overflow: hidden;
    height: 100%;
  }

  * {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  h1 {
    line-height: 1.5;
    color: #212529;
    text-align: center;
    box-sizing: inherit;
    font-size: 1.25rem;
    font-weight: 500;
  }

  h3 {
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    font-size: 14px;
    color: #434d5a;
    box-sizing: inherit;
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }

  header {
    display: flex;
    border-bottom: 1px solid hsla(0, 0%, 63.9%, 0.1);
    width: 100%;
  }

  .content {
    background: #ffffff;
    min-width: 300px;
    width: 344px;
    height: 488px;
    box-shadow: 0 0 14px 6px rgba(0, 0, 0, 0.05);
    border-radius: 13.5px;
    overflow-y: hidden;
  }

  .search-container {
    display: flex;
    width: 100%;
    border-radius: 9px;
    padding: 11px 16px;
    margin: 16px;
    align-items: center;
    justify-content: center;
    background: #f5f5f7;
  }

  input {
    box-sizing: inherit;
    width: 100%;
    border: none;
    padding: 0;
    color: #434d5a;
    font-size: 13px;
    font-weight: 500;
    background-color: transparent;
  }

  input::placeholder {
    color: #9ba3ae;
    font-weight: 400;
  }

  input:focus {
    outline: none;
  }

  .search-icon {
    height: 16px;
  }

  .title {
    line-height: 1.5;
    box-sizing: inherit;
    font-weight: 500;
    font-size: 13px;
    color: #979aa1;
    text-align: left;
    margin-top: 6px;
    margin-left: 18px;
    margin-bottom: 10px;
  }

  .currency-container {
    padding: 12px 12px 24px;
    max-height: 395px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .currency-container::-webkit-scrollbar {
    display: none;
  }

  .currency-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    cursor: pointer;
    border-radius: 10px;
  }

  .currency-item:hover {
    background: #f8fbfd;
  }

  .currency-item:hover .currency-item-text {
    color: #2240c4;
  }

  .selection-container {
    display: flex;
    align-items: center;
  }

  .currency-icon {
    width: 25px;
    height: 25px;
    margin-right: 13.5px;
  }

  .currency-item-text {
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    box-sizing: inherit;
    font-weight: 500;
    font-size: 16px;
    color: #434d5a;
    transform: translateY(0.5px);
    transition: color 0.2s ease;
  }

  .chevron-icon {
    height: 25px;
  }

  .language-dropdown {
    display: flex;
    align-items: center;
    margin-top: 21px;
    background: none;
    border: none;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0 0.5rem;
  }

  .dropdown-icon {
    width: 8px;
    margin-left: 7px;
  }
</style>
