<script>
	import { directus } from '$lib/directus';
	import { goto } from '$app/navigation';
	export let me = null,
		loading = false;

	const logout = async () => {
		await directus.auth.logout();
		goto('/login');
	};
</script>

<div class="mb-2 shadow-lg navbar bg-neutral text-neutral-content">
	<div class="flex-1 px-2 mx-2">
		<a href="/" class="text-2xl font-bold"> {import.meta.env.VITE_APP_NAME} </a>
	</div>

	{#if !loading}
		{#if me}
			<div class="flex-none">
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
	{/if}
</div>
