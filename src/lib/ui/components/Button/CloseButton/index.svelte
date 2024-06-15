<script lang="ts">
  import CloseIcon from 'carbon-icons-svelte/lib/Close.svelte';
  import IconButton from '$lib/ui/components/Button/IconButton/index.svelte';

  export let onClick = () => {};
  export let contained = false;
  export let color = 'text-blue-700 bg-blue-200';
  export let size = 'small';
</script>

<IconButton {onClick} {color} {contained} {size}>
  {#if size === 'large'}
    <CloseIcon size={24} class="carbon-icon" title="Delete" />
  {:else}
    <CloseIcon size={20} class="carbon-icon" title="Delete" />
  {/if}
</IconButton>
