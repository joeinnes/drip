<script>
	import CoffeeBean from '../../static/coffee_bean.webp';
	import CoffeeBeanHalf from '../../static/coffee_bean_half.webp';
	import CoffeeBeanFilled from '../../static/coffee_bean_full.webp';
	export let rating = 0;
	export let interactive = true;

	const mouseMoveHandler = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const offset = parseInt(e.currentTarget.id, 10);

		if (isNaN(offset)) return;

		if (x < rect.width / 2) {
			if (interactive) {
				rating = offset + 1;
			}
		} else {
			if (interactive) {
				rating = offset + 2;
			}
		}
	};
</script>

<div class="flex max-w-full">
	<!-- What is this monstrosity?! Get the rating of the element, divide by two, and throw away any decimal places. This will give us the number of full beans we need to show. -->
	{#each [...Array(Math.floor(rating / 2))] as _, i (i)}
		<img
			src={CoffeeBeanFilled}
			alt="Filled coffee bean"
			class="block h-auto w-full"
			id={'' + i * 2}
			on:mousemove={mouseMoveHandler}
		/>
	{/each}

	<!-- If it's an even number, I won't need to show any half beans, otherwise, I will.-->
	{#if rating % 2 !== 0}
		<img
			src={CoffeeBeanHalf}
			alt="Half filled coffee bean"
			class="block h-auto w-full"
			id={'' + (rating - 1)}
			on:mousemove={mouseMoveHandler}
		/>
	{/if}

	<!-- Now take the first calculation, but then subtract it from 10 to work out how many empty beans I need to display.-->
	{#each [...Array(Math.floor((10 - rating) / 2))] as _, i (i)}
		<img
			src={CoffeeBean}
			alt="Empty coffee bean"
			class="block h-auto w-full"
			id={'' + (2 * Math.ceil(rating / 2) + i)}
			on:mousemove={mouseMoveHandler}
		/>
	{/each}
</div>
