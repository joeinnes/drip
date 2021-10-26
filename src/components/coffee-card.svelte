<script>
	import RatingWidget from './rating-widget.svelte';

	export let coffee,
		side = false;

	const rating =
		coffee?.ratings?.reduce((acc, curr) => acc + curr.rating, 0) / coffee?.ratings?.length || 0;
</script>

<div class={`shadow-lg card bg-white mb-8 ${side && 'flex flex-col lg:flex-row'}`}>
	<figure style="relative padding-top: 56.25%">
		<img
			src={`${import.meta.env.VITE_API_URL}/assets/${coffee?.image?.id}`}
			alt={coffee.name}
			class="object-contain"
		/>
	</figure>
	<div class="card-body">
		<div class="flex justify-between items-center">
			<div>
				<h2 class="card-title mb-0">
					{coffee.name}
				</h2>
				<div class="badge badge-neutral mb-4 mt-0 font-semibold">
					{coffee?.cost?.toLocaleString()} HUF/kg
				</div>
			</div>
			<div class="w-32 mb-2">
				<RatingWidget {rating} interactive={false} />
			</div>
		</div>
		<p class="flex-1 mb-2">
			{coffee.description}
		</p>
		<div class="card-actions justify-end">
			<a
				class="btn btn-secondary"
				href={coffee.link}
				rel="external noreferrer noopener"
				target="_blank">Where to buy?</a
			>
			<a class="btn btn-primary" href={`/coffee/${coffee.id}`}>More info</a>
		</div>
	</div>
</div>
