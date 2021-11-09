<script context="module">

import Router from "svelte-spa-router";
import {wrap} from 'svelte-spa-router/wrap';
import CurrencyListView from "./views/CurrencyListView.svelte";
import PaymentView from "./views/PaymentView.svelte";

const urlParams = new URLSearchParams(window.location.search);
export const metadata = urlParams.get("data")

const routes = {
    '/': CurrencyListView,
    '/pay': PaymentView,
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
        overflow: hidden;
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
		height: 500px;
		width: 350px;
		box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.05);
        overflow: hidden;
	}


</style>