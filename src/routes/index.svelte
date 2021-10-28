<script context="module" lang="ts">
  import { directus, Coffee } from '$lib/directus';
  let coffees: Coffee[] = [];
  export async function load() {
    let { data } = (await directus
      .items('coffees')
      .readMany({ fields: ['*', 'image.id', 'ratings.rating'] })) as { data: Coffee[] };
    coffees = data;
    return {};
  }
</script>

<script>
  import CoffeeCard from '$lib/components/coffee-card.svelte';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {#each coffees as coffee}
    <CoffeeCard {coffee} />
  {/each}
</div>
