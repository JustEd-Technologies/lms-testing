<script lang="ts">

  /****************************** IMPORTS *****************************************/
  import '../app.css'; // for tailwind support

  import { onMount } from 'svelte';
  import { Theme } from 'carbon-components-svelte';
  import type { CarbonTheme } from 'carbon-components-svelte/src/Theme/Theme.svelte';

  import { isMobile, globalStore } from '$lib/stores/app';


  /********************************** STATE **************************************/
  let carbonTheme: CarbonTheme = 'white';
  $: carbonTheme = $globalStore.isDark ? 'g100' : 'white';



  /*********************** UTILITY FUNCTIONS AND EVENT HANDLERS ******************/
  function handleResize() {
    isMobile.update(() => window.innerWidth <= 760);
  }

</script>

<svelte:window on:resize={handleResize} />

<svelte:head>
  <link href="/css/carbon.css" rel="stylesheet" />
</svelte:head>

<Theme bind:theme = {carbonTheme} />



<slot />
