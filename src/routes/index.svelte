<script context="module">
	import { directus } from '$lib/directus';
	let coffees = [];
	export async function load() {
		let { data } = await directus.items('coffees').readMany({ fields: ['*', 'image.id'] });
		coffees = data;
		return {};
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	{#each coffees as coffee}
		<div class="card grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto">
			<div class="flex justify-center align-middle">
				<img
					src={'https://api.traist.co.uk/assets/' + coffee.image.id}
					alt={coffee.name}
					class="object-contain"
				/>
			</div>
			<div>
				<h1>{coffee.name}</h1>
				<p>{coffee.description}</p>
				<p>{coffee?.cost?.toLocaleString()} HUF/kg</p>
				<a href={coffee.link}>Buy more</a>
			</div>
		</div>
	{/each}
</div>
