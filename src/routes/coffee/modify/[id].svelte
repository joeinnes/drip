<script context="module" lang="ts">
  import { session } from '$app/stores';
  import { directus, Coffee } from '$lib/directus';
  let coffee: Coffee;
  export async function load({ page }) {
    try {
      const data = (await directus
        .items('coffees')
        .readOne(page.params.id, { fields: ['*', 'image.id'] })) as Coffee;
      coffee = data;
    } catch (e) {
      console.error(e);
      return {
        status: 404,
        error: 'This coffee does not exist'
      };
    }
    return {
      props: {
        form: {
          name: coffee.name,
          description: coffee.description,
          link: coffee.link,
          cost: coffee.cost
        },
        preview: `${import.meta.env.VITE_API_URL}/assets/${coffee.image.id}`
      }
    };
  }
</script>

<script lang="ts">
  import ImageInput from '$lib/components/image-input.svelte';
  import { slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import ErrorAlert from '$lib/components/error-alert.svelte';
  import { onMount } from 'svelte';
  let droppedFile: File,
    loading: boolean = false,
    error: string = null,
    errorTimeout: NodeJS.Timeout = null,
    imgChanged: boolean = false;
  export let preview: string,
    form = { name: null, description: null, link: null, cost: null };

  const setError = (err: string) => {
    error = err;
    errorTimeout = setTimeout(() => {
      error = null;
      errorTimeout = null;
    }, 5000);
  };

  const dropHandler = (e: DragEvent) => {
    try {
      droppedFile = e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(droppedFile);
      reader.onloadend = () => (preview = reader.result as string);
    } catch (e) {
      setError('File could not be processed.');
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();

      formData.append('title', form.name);
      formData.append('file', droppedFile);

      const imgRes = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
        method: 'post',
        body: formData
      });

      const img = await imgRes.json();

      return img.data;
    } catch (e) {
      throw new Error('Could not upload image.');
    }
  };

  const submitForm = async () => {
    try {
      loading = true;
      if (
        !(form.name && form.description && form.link && form.cost) ||
        (imgChanged && !droppedFile)
      ) {
        setError('Not all data provided');
        throw new Error();
      }
      let imgId = coffee.image.id;
      if (imgChanged) {
        const imgRes = await uploadImage();
        imgId = imgRes.id;
      }
      const res = await directus.items('coffees').updateOne(coffee.id, { ...form, image: imgId });
      goto(`/coffee/${res.id}`);
    } catch (e) {
      setError(error || 'An unknown error occurred');
    } finally {
      loading = false;
    }
  };
  onMount(() => {
    session.set({
      ...session,
      path: [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'Coffees',
          link: '/'
        },
        {
          label: coffee.name,
          link: '/coffees/' + coffee.id
        }
      ]
    });
  });
</script>

<svelte:head>
  <title>Add A Coffee</title>
</svelte:head>

<div class="shadow-lg card bg-white mb-8" transition:slide|local>
  <div class="card-body">
    <h2 class="card-title mb-0 text-2xl">Add A Coffee</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Coffee Name</span>
          </label>
          <input
            type="text"
            placeholder="Coffee"
            class="input input-bordered"
            name="name"
            bind:value={form.name}
            required
          />
        </div>

        <div class="form-control">
          <label class="label" for="description">
            <span class="label-text">Description</span>
          </label>
          <textarea
            class="textarea h-40 textarea-bordered"
            placeholder="Description"
            name="description"
            bind:value={form.description}
            required
          />
        </div>
      </div>
      <ImageInput {preview} errorHandler={setError} bind:isChanged={imgChanged} bind:droppedFile />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div class="form-control">
        <label class="label" for="cost">
          <span class="label-text">Cost</span>
        </label>
        <label class="input-group w-full">
          <input
            type="number"
            placeholder="5000"
            class="input input-bordered w-full"
            name="cost"
            bind:value={form.cost}
            required
          />
          <span>HUF/kg</span>
        </label>
      </div>

      <div class="form-control">
        <label class="label" for="link">
          <span class="label-text">Link</span>
        </label>
        <input
          type="url"
          placeholder="Link"
          class="input input-bordered"
          bind:value={form.link}
          required
        />
      </div>
    </div>
    {#if error}
      <ErrorAlert {error} clearError={() => (error = null)} />
    {/if}
    <button class="btn btn-primary" type="submit" on:click|preventDefault={submitForm}
      >Submit</button
    >
  </div>
</div>
