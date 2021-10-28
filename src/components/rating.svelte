<script>
  import RatingWidget from './rating-widget.svelte';

  export let rating;
</script>

<div class="shadow-lg card bg-white p-4">
  <div class="flex flex-col md:flex-row items-center">
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

    <div class="p-2 w-full flex flex-col-reverse md:flex-col">
      <p class="mb-1">{rating.comments}</p>
      <div class="w-32 mx-auto md:mx-0 mb-4">
        <RatingWidget rating={rating.rating} interactive={false} />
      </div>
    </div>
  </div>
</div>
