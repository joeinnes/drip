<script lang="ts">
  import { directus } from '$lib/directus';
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';

  let me = null;
  let breadcrumbs = [
    {
      label: 'Home',
      link: '/'
    }
  ];

  session.subscribe((sess) => {
    me = sess.user;
    breadcrumbs = sess.path || [
      {
        label: 'Home',
        link: '/'
      }
    ];
  });

  const logout = async () => {
    await directus.auth.logout();
    session.set({ user: null });
    goto('/login');
  };
</script>

<div class="mb-2 shadow-lg navbar bg-neutral text-neutral-content items-center">
  <div class="flex-1">
    <div class="px-2 mx-2 mr-6">
      <a href="/" class="text-2xl font-bold"> {import.meta.env.VITE_APP_NAME}</a>
    </div>
    <div class="text-sm breadcrumbs hidden md:block ">
      <ul>
        {#each breadcrumbs as breadcrumb}
          <li>
            <a href={breadcrumb.link}>{breadcrumb.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  {#if me}
    <div class="flex-none" on:click={logout}>
      <div class="avatar">
        <div class="w-10 h-10 m-1 rounded-full">
          <img src={`${import.meta.env.VITE_API_URL}/assets/${me.avatar}`} alt="Profile" />
        </div>
      </div>
      <div class="m-2">
        {me.first_name}
        {me.last_name}
      </div>
    </div>
  {:else}
    <a class="mx-2" href="/login">Log in</a>
  {/if}
</div>
