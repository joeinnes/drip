<script lang="ts">
  export let errorHandler = (error: string) => console.error(error);
  let droppedFile: File, preview: string;

  const dropHandler = (e: DragEvent) => {
    try {
      droppedFile = e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(droppedFile);
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          throw new Error();
        }
        preview = Buffer.from(reader.result).toString();
      };
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
