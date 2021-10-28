<script context="module">
  import { directus } from '$lib/directus';
  let coffee = {};
  export async function load({ page }) {
    try {
      const data = await directus.items('coffees').readOne(page.params.id, {
        fields: [
          '*',
          'image.id',
          'ratings.*',
          'ratings.directus_users_id.first_name',
          'ratings.directus_users_id.last_name',
          'ratings.directus_users_id.avatar'
        ]
      });
      coffee = data;
    } catch (e) {
      return {
        status: 404,
        error: 'This coffee does not exist'
      };
    }
    return {};
  }
</script>

<script>
  import CoffeeCard from '../../components/coffee-card.svelte';
  import Rating from '../../components/rating.svelte';
</script>

<svelte:head>
  <title>{coffee.name}</title>
</svelte:head>

<CoffeeCard {coffee} side={true} />

<div class="md:w-1/2 mx-auto">
  {#if coffee.ratings}
    {#each coffee.ratings as rating}
      <Rating {rating} />
    {/each}
  {/if}
</div>
