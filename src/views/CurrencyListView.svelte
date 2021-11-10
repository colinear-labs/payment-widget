<script>
  import { push, replace } from 'svelte-spa-router'
  import { stringify } from 'qs'

  let searchQuery = ''

  let currenciesPopular = [
    {
      name: 'Bitcoin',
      id: 'btc',
    },
    {
      name: 'Bitcoin Cash',
      id: 'bch',
    },
    {
      name: 'Litecoin',
      id: 'ltc',
    },
    {
      name: 'Ethereum',
      id: 'eth',
    },
  ]

  let currenciesOther = [
    {
      name: 'Dogecoin',
      id: 'doge',
    },
    {
      name: 'Dai',
      id: 'dai',
    },
    {
      name: 'USDT',
      id: 'usdt',
    },
    {
      name: 'USDC',
      id: 'usdc',
    },
    {
      name: 'TerraUSD',
      id: 'ust',
      generic: true,
    },
  ]
</script>

<style>
  header {
    display: flex;
    border-bottom: 1px solid hsla(0, 0%, 63.9%, 0.1);
    width: 100%;
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
</style>

<h1>Merchant XYZ</h1>
<h3>Please select the coin you will be using.</h3>
<div class="content">
  <header>
    <div class="search-container">
      <input
        type="text"
        placeholder="Search for Cryptocurrency"
        bind:value={searchQuery} />
      <img class="search-icon" src="assets/search.svg" alt="" />
    </div>
  </header>
  <div class="currency-container">
    <div class="title">Popular Currencies</div>
    {#each currenciesPopular as currency}
      {#if searchQuery == '' || (searchQuery.length > 0 && (currency.name
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase(),
            ) || currency.id
              .toLowerCase()
              .includes(searchQuery.toLowerCase())))}
        <div
          class="currency-item"
          on:click={() => {
            push(`/pay?${stringify({
                currency,
                amount: 20,
                baseCurrency: 'usd',
              })}`)
          }}>
          <div class="selection-container">
            <img
              src={currency.generic ? `../assets/currencies/generic.svg` : `./assets/currencies/${currency.id}.svg`}
              alt={`Pay with ${currency.name}`}
              class="currency-icon" />
            <div class="currency-item-text">{currency.name}</div>
          </div>
          <img class="chevron-icon" src="assets/chevron-right.svg" alt="" />
        </div>
      {/if}
    {/each}
    <div class="title" style="margin-top: 16px;">Other Currencies</div>
    {#each currenciesOther as currency}
      {#if searchQuery == '' || (searchQuery.length > 0 && (currency.name
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase(),
            ) || currency.id
              .toLowerCase()
              .includes(searchQuery.toLowerCase())))}
        <div
          class="currency-item"
          on:click={() => {
            push(`/pay?${stringify({
                currency,
                amount: 20,
                baseCurrency: 'usd',
              })}`)
          }}>
          <div class="selection-container">
            <img
              src={currency.generic ? `../assets/currencies/generic.svg` : `./assets/currencies/${currency.id}.svg`}
              alt={`Pay with ${currency.name}`}
              class="currency-icon" />
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
    alt="Select language" />
</button>
