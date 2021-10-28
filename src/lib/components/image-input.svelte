<script lang="ts">
  export let errorHandler = (error: string) => console.error(error),
    preview: string = null,
    isChanged: boolean = false,
    droppedFile: File = null;

  const dropHandler = (e: DragEvent) => {
    try {
      droppedFile = e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(droppedFile);
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          throw new Error();
        }
        preview = reader.result as string;
      };
      isChanged = true;
    } catch (e) {
      errorHandler('File could not be processed.');
    }
  };

  const changeHandler = (e: any) => {
    try {
      droppedFile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(droppedFile);
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          throw new Error();
        }
        preview = reader.result as string;
      };
      isChanged = true;
    } catch (e) {
      errorHandler('File could not be processed.');
    }
  };
</script>

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
  <label class="label flex flex-col items-start" for="file">
    <span class="label-text block mb-2">Image</span>

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
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          class="hidden"
          on:change={changeHandler}
          required
        />
      </div>
    </div>
  </label>
</div>
