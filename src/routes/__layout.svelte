<script context="module">
  import { directus } from '$lib/directus';
  let loading = true;
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

<script>
  import AddCoffeeButton from '../components/add-coffee-button.svelte';
  import '../styles/tailwind-output.css';
  import Navbar from '../components/navbar.svelte';
  import { session } from '$app/stores';
  const me = $session.user;
  loading = false;
</script>

<Navbar {loading} />
<main class="container p-8 mx-auto">
  <slot />
</main>
{#if me}
  <AddCoffeeButton />
{/if}
