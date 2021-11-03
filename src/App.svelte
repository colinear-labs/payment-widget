<script>
import Router from "svelte-spa-router";
import CurrencyListView from "./views/CurrencyListView.svelte";
import PaymentView from "./views/PaymentView.svelte";

const routes = {
    '/': CurrencyListView,
    '/pay': PaymentView
}

</script>

<div id="app">
    <div class="container">
        <Router {routes}/>
    </div>
</div>

<style>

    #app {
        display: flex;
		height: 100%;
		background: #F5F5F7;
    }

	.container {
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		margin-top: auto;
		margin-bottom: auto;
		background-color: white;
		font-family: 'Roboto', sans-serif;
		border-radius: 10px;
		overflow: scroll;
		height: 500px;
		width: 350px;
		box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.05);
	}

</style>