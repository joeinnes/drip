<script>
	import '../styles/tailwind-output.css';

	import User from '../components/user.svelte';

	import { directus } from '$lib/directus';
	import { goto } from '$app/navigation';
</script>

<header class="bg-brand-900 p-2 flex items-center">
	<h1 class="text-3xl text-brand-50 ">Drip</h1>
	<div class="flex-grow" />
	<div><User /></div>
</header>
<main class="p-8">
	<slot />
</main>
