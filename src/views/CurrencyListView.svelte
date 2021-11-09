<script>
    import { push, replace } from 'svelte-spa-router'
    import { stringify } from 'qs'

    let currencies = [
        {
            name: 'Bitcoin',
            id: 'btc',
        },
        {
            name: 'Bitcoin Cash',
            id: 'bch',
        },
        {
            name: 'Ethereum',
            id: 'eth',
        },
        {
            name: 'Litecoin',
            id: 'ltc',
        },
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
    @font-face {
        font-family: 'Alliance';
        src: url('../fonts/AllianceNo2-Regular.woff2') format('woff2'),
            url('../fonts/AllianceNo2-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    .currency-list {
        list-style-type: none;
        margin: 0; /* Remove margins */
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
    }
</style>

<!--<header>
		<div class="search-bar">
			<input class="search-input"/>
		</div>
	</header>-->

<div align="center">

	<div class="searchbar">
		
	</div>

	<div class="currency-list noselect">
		{#each currencies as currency}
			<div
				class="currency-item"
				on:click={() => {
					push(`/pay?${stringify({ currency, amount: 0.0001, baseCurrency: "usd" })}`)
				}}>
				<img
					src={currency.generic ? `../assets/currencies/generic.svg` : `./assets/currencies/${currency.id}.svg`}
					alt={`Pay with ${currency.name}`}
					style="width:26px;" />
				<div class="currency-item-text">{currency.name}</div>
			</div>
		{/each}
	</div>
</div>