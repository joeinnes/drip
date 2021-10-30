<script context="module" lang="ts">
  import { goto } from '$app/navigation';
  import { directus, User } from '$lib/directus';
</script>

<script lang="ts">
  import { session } from '$app/stores';
  import ErrorAlert from '$lib/components/error-alert.svelte';
  import { onMount } from 'svelte';

  let email: string = null,
    password: string = null,
    isLoading: boolean = false,
    error: string = null,
    errorTimeout: NodeJS.Timeout = null;

  const setError = (err: string) => {
    error = err;
    errorTimeout = setTimeout(() => {
      error = null;
      errorTimeout = null;
    }, 5000);
  };
  const clearError = () => (error = null);
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
      const me = (await directus.users.me.read()) as User;
      session.update((sess) => {
        sess.user = me;
        return sess;
      });
      goto('/');
    } catch (e) {
      setError('Login unsuccessful');
    } finally {
      isLoading = false;
    }
  };

  onMount(async () => {
    session.set({
      path: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Login',
          link: '/login'
        }
      ]
    });
    try {
      const me = (await directus.users.me.read()) as User;
      session.update((sess) => {
        sess.user = me;
        return sess;
      });
      goto('/');
    } catch (e) {
      console.log(e);
    }
  });
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
      <div class="mt-4">
        {#if error}
          <ErrorAlert bind:error {clearError} />
        {/if}
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
