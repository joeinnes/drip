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
  import AddCoffeeButton from '$lib/components/add-coffee-button.svelte';
  import '../styles/tailwind-output.css';
  import Navbar from '$lib/components/navbar.svelte';
  import { session } from '$app/stores';
  const me = $session.user;
</script>

<Navbar {loading} />
<main class="container p-8 mx-auto">
  <slot />
</main>
{#if me}
  <AddCoffeeButton />
{/if}
