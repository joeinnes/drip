<script>
	import { onMount } from 'svelte';
	import { directus } from '$lib/directus';
	import { goto } from '$app/navigation';

	let loading = true;
	let me = null;
	onMount(async () => {
		try {
			me = await directus.users.me.read();
		} catch (e) {
			console.log('Not logged in');
		} finally {
			loading = false;
		}
	});
	const logout = async () => {
		await directus.auth.logout();
		goto('/login');
	};
</script>

<div
	class="inline-block px-1 py-1 
  pr-3 placeholder-gray-900placeholder-gray-200 first:rounded-full bg-brand-800 text-brand-50 text-lg font-semibold"
	on:click={() => logout()}
>
	{#if me}
		<img
			src={`https://api.traist.co.uk/assets/${me.avatar}`}
			class="rounded-full w-10 h-10 inline mr-2"
			alt="Profile"
		/>{me.first_name}
		{me.last_name}{:else}<a class="mx-2" href="/login">Log in</a>{/if}
</div>
