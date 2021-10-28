<script lang="ts">
  import { slide } from 'svelte/transition';
  export let error: string, clearError: () => null;
</script>

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
    <button class="btn btn-sm btn-primary btn-error btn-circle text-white" on:click={clearError}>
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
