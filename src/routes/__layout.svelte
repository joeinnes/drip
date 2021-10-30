<script context="module" lang="ts">
  import { directus } from '$lib/directus';
  let loading: boolean = true;
  export const load = async ({ session }) => {
    if (session.user) {
      return {};
    }
    try {
      session.user = await directus.users.me.read();
    } catch (e) {
      console.log('Not logged in');
    } finally {
      return {};
    }
  };
</script>

<script lang="ts">
  import '../styles/tailwind-output.css';
  import favicon from '../../static/coffee_bean.webp';
  import { session } from '$app/stores';

  import Navbar from '$lib/components/navbar.svelte';
  import AddCoffeeButton from '$lib/components/add-coffee-button.svelte';

  const me = $session.user;
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
