import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// We can probably pass in stuff here
		name: 'world'
	}
});

export default app;