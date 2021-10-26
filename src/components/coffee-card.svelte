<script>
	export let coffee, side;
</script>

<div class={`shadow-lg card bg-white mb-8 ${side && 'flex flex-col lg:flex-row'}`}>
	<figure class="object-contain w-1/3 relative h-full">
		<img src={`${import.meta.env.VITE_API_URL}/assets/${coffee?.image?.id}`} alt={coffee.name} />
	</figure>
	<div class="card-body">
		<h2 class="card-title mb-0">
			{coffee.name}
		</h2>
		<div class="badge badge-neutral mb-4 mt-0 font-semibold">
			{coffee?.cost?.toLocaleString()} HUF/kg
		</div>
		<p class="flex-1">
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
