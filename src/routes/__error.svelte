<script context="module" lang="ts">
  export function load({ error, status }) {
    return {
      props: {
        error: `${status}: ${error.message}`
      }
    };
  }
</script>

<script lang="ts">
  export let error: string = null;
</script>

<h2 class="font-bold text-2xl">Whoops!</h2>
<p class="mb-4">If you followed a link to get here, it's probably broken.</p>
<p class="font-bold">Error details:</p>
<p class="mb-4">{error}</p>
<a href="/" class="link">Go home</a>
