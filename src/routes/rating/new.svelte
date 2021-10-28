<script lang="ts">
  import { directus, Coffee, User, Rating } from '$lib/directus';
  import { slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import ErrorAlert from '$lib/components/error-alert.svelte';
  import { onMount } from 'svelte';
  import RatingWidget from '$lib/components/rating-widget.svelte';

  let loading: boolean = false,
    error: string = null,
    errorTimeout: NodeJS.Timeout = null,
    coffeeList: Coffee[] = null,
    me: User | null = null,
    form = { comments: null, rating: null, coffees_id: null };

  const setError = (err: string) => {
    error = err;
    errorTimeout = setTimeout(() => {
      error = null;
      errorTimeout = null;
    }, 5000);
  };

  const submitForm = async () => {
    try {
      loading = true;
      if (!(form.comments && form.rating && form.coffees_id)) {
        setError('Not all data provided');
        throw new Error();
      }

      // Below line also upsets TS
      const res = await directus
        .items('coffees_directus_users')
        .createOne({ ...form, directus_users_id: me.id } as any);
      goto(`/coffee/${res.coffees_id}`);
    } catch (e) {
      setError(error || 'An unknown error occurred');
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    me = (await directus.users.me.read()) as User;
    const { data: ratedCoffees } = await directus.items('coffees_directus_users').readMany({
      filter: {
        directus_users_id: {
          _eq: me.id
        }
      }
    });
    const ratedCoffeeIds = ratedCoffees.map((coffee) => coffee.coffees_id);
    const { data: unratedCoffees } = await directus.items('coffees').readMany({
      filter: {
        id: {
          _nin: ratedCoffeeIds
        }
      }
    });
    coffeeList = unratedCoffees as Coffee[];
  });
</script>

<div />

<svelte:head>
  <title>Add A Rating</title>
</svelte:head>

<div class="shadow-lg lg:w-1/2 mx-auto card bg-white mb-8" transition:slide|local>
  <div class="card-body">
    <h2 class="card-title mb-0 text-2xl">Add A Rating</h2>
    <div class="form-control w-full">
      <label class="label" for="name">
        <span class="label-text">Coffee</span>
      </label>
      <select class="select select-bordered w-full" bind:value={form.coffees_id} required>
        <option disabled selected>Choose a coffee</option>
        {#each coffeeList as coffee}
          <option value={coffee.id}>{coffee.name}</option>
        {/each}
      </select>
    </div>

    <div class="form-control mb-4">
      <label class="label" for="description">
        <span class="label-text">Comments</span>
      </label>
      <textarea
        class="textarea h-40 textarea-bordered"
        placeholder="Description"
        name="description"
        bind:value={form.comments}
        required
      />
    </div>

    <div class="w-64 mx-auto mb-4">
      <RatingWidget interactive={true} bind:rating={form.rating} />
    </div>

    {#if error}
      <ErrorAlert {error} clearError={() => (error = null)} />
    {/if}
    <button class="btn btn-primary" type="submit" on:click|preventDefault={submitForm}
      >Submit</button
    >
  </div>
</div>
