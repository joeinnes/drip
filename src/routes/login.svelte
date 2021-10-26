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

<div class="shadow-2xl card bordered">
	<div class="card-body">
		<form on:submit={login}>
			<h1 class="card-title">Log In</h1>
			<div class="form-control">
				<label class="label" for="email">
					<span class="label-text">Username</span>
				</label>
				<input
					type="email"
					name="email"
					placeholder="Enter user name..."
					class="input input-bordered"
					bind:value={email}
					required
				/>
			</div>
			<div class="form-control">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					bind:value={password}
					name="password"
					type="password"
					placeholder="Enter password..."
					class="input input-bordered"
					required
				/>
			</div>

			<div class="justify-center card-actions">
				{#if isLoading}
					<button type="submit" disabled class="btn btn-primary btn-disabled">Log In</button>
				{:else}
					<button type="submit" class="btn btn-primary">Log In</button>
				{/if}
			</div>
		</form>
	</div>
</div>
