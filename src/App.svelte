<script>
import { setContext } from 'svelte';

  import Router from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'
  import CurrencyListView from './views/CurrencyListView.svelte'
  import PaymentView from './views/PaymentView.svelte'

  const urlParams = new URLSearchParams(window.location.search)
  export const metadata = urlParams.get('data')

  setContext('language', 'en')

  const routes = {
    '/': CurrencyListView,
    '/pay': PaymentView,
  }
</script>

<style>
  /* #app {
    display: flex;
    height: 100%;
    background: #f5f5f7;
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
	}*/

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

<div class="container">
  <Router {routes} />
</div>
