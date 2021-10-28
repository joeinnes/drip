<script lang="ts">
  import { directus } from '../../lib/directus';
  import { slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  let droppedFile: File,
    preview: string | ArrayBuffer,
    loading: boolean = false,
    error: string = null,
    errorTimeout: NodeJS.Timeout = null,
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
      reader.onloadend = () => (preview = reader.result);
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
      if (!(form.name && form.description && form.link && form.cost && droppedFile)) {
        setError('Not all data provided');
        throw new Error();
      }
      const { id: imgId } = await uploadImage();
      const res = await directus.items('coffees').createOne({ ...form, image: imgId });
      goto(`coffee/${res.id}`);
    } catch (e) {
      setError(error || 'An unknown error occurred');
    } finally {
      loading = false;
    }
  };
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
      <div
        on:drop|preventDefault|stopPropagation={dropHandler}
        on:drag|preventDefault|stopPropagation
        on:dragstart|preventDefault|stopPropagation
        on:dragend|preventDefault|stopPropagation
        on:dragover|preventDefault|stopPropagation
        on:dragenter|preventDefault|stopPropagation
        on:dragleave|preventDefault|stopPropagation
        on:drop|preventDefault|stopPropagation
      >
        <label class="label" for="file">
          <span class="label-text">Image</span>
        </label>
        <div class="w-full h-64 bg-secondary rounded-lg overflow-hidden p-2">
          <div
            class="rounded-lg border-dotted border-neutral border-2 w-full h-full flex items-center justify-center"
            class:bg-white={preview}
          >
            {#if preview}<img
                src={preview}
                alt="Preview"
                class="object-contain w-full h-full"
              />{:else}<label for="file">Choose a file or drag it here.</label>{/if}
            <input type="file" name="file" id="file" accept="image/*" class="hidden" required />
          </div>
        </div>
      </div>
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
      <div class="alert alert-error mb-4" transition:slide>
        <div class="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="w-6 h-6 mx-2 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <span>{error}</span>
        </div>
        <div class="flex-none">
          <button
            class="btn btn-sm btn-primary btn-error btn-circle text-white"
            on:click={() => (error = null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-4 h-4 stroke-current md:w-6 md:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    {/if}
    <button class="btn btn-primary" type="submit" on:click|preventDefault={submitForm}
      >Submit</button
    >
  </div>
</div>
