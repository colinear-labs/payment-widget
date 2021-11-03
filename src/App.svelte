<script>
	import "./api";

	import "cryptocurrency-icons";
	// import { Btc, Eth, Bch, Ltc, Doge, Dai, Usdt, Usdc, Generic
	// } from "svelte-cryptoicon"

	let currencies = [
		{
			name: "Bitcoin",
			id: "btc",
		},
		{
			name: "Bitcoin Cash",
			id: "bch",
		},
		{
			name: "Ethereum",
			id: "eth",
		},
		{
			name: "Litecoin",
			id: "ltc",
		},
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
			generic: true
		},
	]

</script>


<main>

	<div class="widget">

		<div align="center">
			<h1 class="widget-title">Pay with Crypto</h1>
		</div>

		<div class="currency-list">

			{#each currencies as currency}

			<div class="currency-item">
				<img src={
				currency.generic == true ? `../assets/generic.svg` : `./assets/${currency.id}.svg` } 
				width="32px" alt={`Pay with ${currency.name}`}/>
				<div class="currency-item-text">{currency.name}</div>
			</div>

			{/each}

		</div>
	</div>

</main>


<style>
	@font-face {
		font-family: 'Alliance';
		src: url('../styles/AllianceNo2-Regular.woff2') format('woff2'), 
		url('../styles/AllianceNo2-Regular.woff') format('woff');
		font-weight: 400;
		font-style: normal;
	}

	.widget {
		background-color: white;
		color: black;
		font-family: 'Alliance', sans-serif;
		padding: 10px;
		border-radius: 5px;
		border-width: 1px;
		border-color: gray;
		max-width: 500px;
		max-height: 800px;
	}

	.currency-list {
		list-style-type: none;
		margin: 0; /* Remove margins */
		padding: 0;
		overflow: scroll;
	}

	.widget-title {
		font-weight: 'bold';
		font-size: 18pt;
	}

	.currency-item {
		height: 64px;
		padding-left: 20px;
		padding-right: 20px;
		background-color: #f4f4f4;
		margin-left: 4px;
		margin-right: 4px;
		margin-top: 5px;
		margin-bottom: 5px;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.currency-item:hover {
		background-color: #eeeeee;
		cursor: pointer;
	}

	.currency-item-text {
		font-size: 14pt;
		margin-left: 14px;
	}

</style>