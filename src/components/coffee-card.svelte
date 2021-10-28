<script>
  import RatingWidget from './rating-widget.svelte';

  export let coffee,
    side = false;

  const rating =
    coffee?.ratings?.reduce((acc, curr) => acc + curr.rating, 0) / coffee?.ratings?.length || 0;
</script>

<div class={`shadow-lg card bg-white pt-4 mb-8 ${side && 'flex flex-col lg:flex-row'}`}>
  <figure class="relative">
    <img
      src={`${import.meta.env.VITE_API_URL}/assets/${coffee?.image?.id}`}
      alt={coffee.name}
      class="object-contain"
      style="max-height:50vh;"
    />
  </figure>
  <div class="card-body">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="card-title mb-0">
          {coffee.name}
        </h2>
        <div class="badge badge-neutral mb-4 mt-0 font-semibold">
          {coffee?.cost?.toLocaleString()} HUF/kg
        </div>
      </div>
      <div class="w-32 my-4 flex-shrink-0 pl-2">
        <RatingWidget {rating} interactive={false} />
      </div>
    </div>
    <p class="flex-1 mb-2">
      {coffee.description}
    </p>
    <div class="card-actions justify-end">
      <a
        class="btn btn-secondary"
        href={coffee.link}
        rel="external noreferrer noopener"
        target="_blank">Where to buy?</a
      >
      <a class="btn btn-primary" href={`/coffee/${coffee.id}`}>More info</a>
    </div>
  </div>
</div>
