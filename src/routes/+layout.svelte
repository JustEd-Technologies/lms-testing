<script lang="ts">
  /****************************** IMPORTS *****************************************/
  import '../app.css'; // for tailwind support

  import { onMount } from 'svelte';
  import { Theme } from 'carbon-components-svelte';
  import type { CarbonTheme } from 'carbon-components-svelte/src/Theme/Theme.svelte';

  import PlayQuiz from '$lib/pages/Quiz/PlayQuiz/index.svelte';

  import UpgradeModal from '$lib/ui/components/Modal/UpgradeModal/index.svelte';
  import Snackbar from '$lib/ui/components/Snackbar/index.svelte';

  import { isMobile, globalStore } from '$lib/stores/app';
  import { page } from '$app/stores';

  export let data;
  let path = $page.url?.pathname?.replace('/', '');

  /********************************** STATE **************************************/
  // Dark theme wasn't working properly, so decided to remove it from the app. Might add this in future.
  let carbonTheme: CarbonTheme = 'white';
  // $: carbonTheme = $globalStore.isDark ? 'g100' : 'white';

  /*********************** UTILITY FUNCTIONS AND EVENT HANDLERS ******************/
  function handleResize() {
    isMobile.update(() => window.innerWidth <= 760);
  }
</script>

<svelte:window on:resize={handleResize} />

<svelte:head>
  <link href="/css/carbon.css" rel="stylesheet" />
</svelte:head>

<Theme bind:theme={carbonTheme} />

<UpgradeModal />
<Snackbar />

{#if data.shouldSkipAuth}
  <PlayQuiz />
{:else if data.isOrgSite && !path}
  <p>Organization Landing Page</p>
{:else}
  <p>LMS page</p>
{/if}

<slot />
