<script context="module" lang="ts">
  import { directus, Coffee, Rating as RatingType } from '$lib/directus';
  import { session } from '$app/stores';
  let coffee: Coffee;

  export async function load({ page }) {
    try {
      const data = (await directus.items('coffees').readOne(page.params.id, {
        fields: [
          '*',
          'image.id',
          'ratings.*',
          'ratings.directus_users_id.first_name',
          'ratings.directus_users_id.last_name',
          'ratings.directus_users_id.avatar',
          'ratings.directus_users_id.id'
        ]
      })) as Coffee;
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

<script lang="ts">
  import CoffeeCard from '$lib/components/coffee-card.svelte';
  import Rating from '$lib/components/rating.svelte';
  import RatingWidget from '$lib/components/rating-widget.svelte';
  import ErrorAlert from '$lib/components/error-alert.svelte';
  import { goto } from '$app/navigation';

  const me = $session.user;
  let hasCommented: boolean = false,
    error: string = null,
    errorTimeout: NodeJS.Timeout = null,
    loading: boolean = false;
  let form = {
    comments: null,
    rating: null
  };

  if (coffee.ratings.find((rating) => rating.directus_users_id.id === me.id)) {
    hasCommented = true;
  }

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
      if (!(form.comments && form.rating)) {
        setError('Not all data provided');
        throw new Error();
      }

      // Below line also upsets TS
      const res = (await directus.items('coffees_directus_users').createOne({
        ...form,
        directus_users_id: me.id,
        coffees_id: coffee.id
      } as any)) as RatingType;
      goto('/');
    } catch (e) {
      setError(error || 'An unknown error occurred');
    } finally {
      loading = false;
    }
  };
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
  {#if !hasCommented}
    <div class="w-full">
      <label for="rating-modal" class="btn btn-primary modal-button flex">Rate This Coffee!</label>
      <input type="checkbox" id="rating-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
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
          <div class="modal-action">
            <label for="rating-modal" class="btn btn-primary" on:click={submitForm}>Save</label>
            <label for="rating-modal" class="btn">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
