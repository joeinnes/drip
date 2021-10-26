<script>
	import RatingWidget from './rating-widget.svelte';

	export let rating;
</script>

<div class="shadow-lg card bg-white p-4">
	<div class="flex items-center">
		<div class="flex flex-col flex-shrink-0 p-2 content-center">
			<div class="avatar">
				<div class="rounded-full w-16 h-16">
					<img
						src={`${import.meta.env.VITE_API_URL}/assets/${rating.directus_users_id.avatar}`}
						alt={rating.directus_users_id.first_name}
					/>
				</div>
			</div>
			<p>{rating.directus_users_id.first_name} {rating.directus_users_id.last_name}</p>
		</div>

		<div class="max-w-3/4 p-2">
			<p class="max-w-3/4">{rating.comments}</p>
			<RatingWidget />
			<p>{rating.rating}/10</p>
		</div>
	</div>
</div>
