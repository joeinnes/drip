<script context="module" lang="ts">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { directus, User } from '$lib/directus';
  export async function load() {
    try {
      const user = (await directus.users.me.read()) as User;
      session.set(user);
      goto('/');
    } catch (e) {
      console.log('Not logged in');
    } finally {
      return {};
    }
  }
</script>

<script lang="ts">
  let email: string = null,
    password: string = null,
    isLoading: boolean = false;
  const login = async (e: Event) => {
    e.preventDefault();
    isLoading = true;
    try {
      const res = await directus.auth.login(
        {
          email,
          password
        },
        {
          refresh: {
            auto: true
          }
        }
      );
      goto('/');
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  };
</script>

<svelte:head>
  <title>Log In</title>
</svelte:head>

<div class="shadow-2xl card bordered">
  <div class="card-body">
    <form on:submit={login}>
      <h1 class="card-title">Log In</h1>
      <div class="form-control">
        <label class="label" for="email">
          <span class="label-text">Username</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter user name..."
          class="input input-bordered"
          bind:value={email}
          required
        />
      </div>
      <div class="form-control">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input
          bind:value={password}
          name="password"
          type="password"
          placeholder="Enter password..."
          class="input input-bordered"
          required
        />
      </div>

      <div class="justify-center card-actions">
        {#if isLoading}
          <button type="submit" disabled class="btn btn-primary btn-disabled">Log In</button>
        {:else}
          <button type="submit" class="btn btn-primary">Log In</button>
        {/if}
      </div>
    </form>
  </div>
</div>
