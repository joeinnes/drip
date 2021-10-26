<script context="module">
	import { directus } from '$lib/directus';
	let loading = true;

	export const load = async () => {
		let user = null;
		try {
			user = await directus.users.me.read();
		} catch (e) {
			console.log('Not logged in');
		} finally {
			loading = false;
			return {
				props: { me: user }
			};
		}
	};
</script>

<script>
	import AddCoffeeButton from '../components/add-coffee-button.svelte';
	import '../styles/tailwind-output.css';
	import Navbar from '../components/navbar.svelte';
	export let me = null;
</script>

<Navbar {me} {loading} />
<main class="w-3/4 2xl:w-1/2 p-8 mx-auto">
	<slot />
</main>
<AddCoffeeButton />
