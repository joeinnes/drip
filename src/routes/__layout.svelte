<script>
	import '../styles/tailwind-output.css';
	import Navbar from '../components/navbar.svelte';
</script>

<Navbar />
<main class="w-3/4 2xl:w-1/2 p-8 mx-auto">
	<slot />
</main>
