<script context="module">
	import { goto } from '$app/navigation';
	import { directus } from '$lib/directus';
	export async function load() {
		try {
			await directus.users.me.read();
			goto('/');
		} catch (e) {
			console.log('Not logged in');
		} finally {
			return {};
		}
	}
</script>

<script>
	let email,
		password,
		isLoading = false;
	const login = async (e) => {
		e.preventDefault();
		isLoading = true;
		try {
			const res = await directus.auth.login(
				{
					email,
					password
				},
				{
					refresh: {
						auto: true
					}
				}
			);
			goto('/');
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Log In</title>
</svelte:head>

<form on:submit={login} class="card mx-auto flex flex-col">
	<h1>Log In</h1>
	<input type="email" placeholder="Enter user name..." bind:value={email} required />
	<input bind:value={password} type="password" placeholder="Enter password..." required />
	{#if isLoading}
		<button type="submit" disabled>Log In</button>
	{:else}
		<button type="submit">Log In</button>
	{/if}
</form>
