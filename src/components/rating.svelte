<script>
	export let rating;
</script>

<div class="card mx-auto">
	<p>{rating.rating}/10</p>
	<p>{rating.comments}</p>
	<p>-{rating.directus_users_id.first_name}</p>
</div>
