<script lang="ts">
  import { directus } from '$lib/directus';
  import RatingWidget from './rating-widget.svelte';
  import type { Rating } from '$lib/directus';
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  const me = $session.user;
  export let rating: Rating;

  const deleteRating = async () => {
    try {
      await directus.items('coffees_directus_users').deleteOne(rating.id);
      goto(`/`);
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div class="shadow-lg card bg-white p-4">
  {#if rating.directus_users_id.id === me && me.id}
    <button class="btn btn-circle btn-xs absolute top-2 right-2" on:click={deleteRating}>x</button
    >{/if}
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
