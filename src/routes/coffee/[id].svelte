<script context="module">
	import { directus } from '$lib/directus';
	let coffee = {};
	export async function load({ page }) {
		const data = await directus.items('coffees').readOne(page.params.id, {
			fields: [
				'*',
				'image.id',
				'ratings.*',
				'ratings.directus_users_id.first_name',
				'ratings.directus_users_id.avatar'
			]
		});
		coffee = data;
		return {};
	}
</script>

<script>
	import Rating from '../../components/rating.svelte';
</script>

<svelte:head>
	<title>{coffee.name}</title>
</svelte:head>

<div class="card mx-auto mb-6">
	<h1 class="mr-4">
		{coffee.name}
		<span class="font-semibold text-sm text-brand-400">{coffee.cost.toLocaleString()} HUF/kg</span>
	</h1>
	<img
		src={`${import.meta.env.VITE_API_URL}/assets/${coffee.image.id}`}
		alt={coffee.name}
		class="mx-auto"
	/>
	<p>{coffee.description}</p>
</div>

{#if coffee.ratings}
	{#each coffee.ratings as rating}
		<Rating {rating} />
	{/each}
{/if}
