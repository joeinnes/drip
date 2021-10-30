<script lang="ts">
  import { directus } from '$lib/directus';
  import '../styles/tailwind-output.css';
  import favicon from '../../static/coffee_bean.webp';
  import { session } from '$app/stores';

  import Navbar from '$lib/components/navbar.svelte';
  import AddCoffeeButton from '$lib/components/add-coffee-button.svelte';
  import { onMount } from 'svelte';

  let me = $session.user;

  onMount(() => {
    session.update(async (sess) => {
      try {
        me = await directus.users.me.read();
        return { ...sess, user: me };
      } catch (e) {
        console.log(e);
      }
    });
  });
</script>

<svelte:head>
  <link rel="shortcut icon" type="image/webp" href={favicon} />
</svelte:head>

<Navbar />
<main class="container p-8 mx-auto">
  <slot />
</main>
{#if me}
  <AddCoffeeButton />
{/if}
