<script>
	import { directus } from '../../lib/directus';
	let droppedFile,
		preview,
		loading = false,
		form = { name: null, description: null, link: null, cost: null };
	const dropHandler = (e) => {
		droppedFile = e.dataTransfer.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(droppedFile);
		reader.onloadend = () => (preview = reader.result);
		console.log(droppedFile);
	};

	const uploadImage = async () => {
		const formData = new FormData();

		formData.append('title', 'My First File');
		formData.append('file', droppedFile);

		const imgRes = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
			method: 'post',
			body: formData
		});

		const img = await imgRes.json();

		return img.data;
	};

	const submitForm = async () => {
		loading = true;
		const { id: imgId } = await uploadImage();
		const res = await directus.items('coffees').createOne({ ...form, image: imgId });
		loading = false;
	};
</script>

<svelte:head>
	<title>Add A Coffee</title>
</svelte:head>

<div class="shadow-lg card bg-white mb-8">
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
				<div class="w-full h-64 bg-primary rounded-lg overflow-hidden p-2">
					<div
						class="rounded-lg border-dashed border-4 w-full h-full flex items-center justify-center"
						class:bg-white={preview}
					>
						{#if preview}<img
								src={preview}
								alt="Preview"
								class="object-contain w-full h-full"
							/>{:else}<label for="file">Choose a file or drag it here.</label>{/if}
						<input type="file" name="file" id="file" accept="image/*" class="hidden" />
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
					/>
					<span>HUF/kg</span>
				</label>
			</div>

			<div class="form-control">
				<label class="label" for="link">
					<span class="label-text">Link</span>
				</label>
				<input type="url" placeholder="Link" class="input input-bordered" bind:value={form.link} />
			</div>
			<button class="btn btn-primary" on:click|preventDefault={submitForm}>Submit</button>
		</div>
	</div>
</div>
