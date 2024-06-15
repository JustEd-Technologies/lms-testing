<script lang="ts">
  import { onMount } from 'svelte';
  import { SyncLoader } from 'svelte-loading-spinners';
  import PlayContainer from '$lib/pages/Quiz/PlayContainer/index.svelte';
  import PlayHeader from '$lib/pages/Quiz/PlayHeader/index.svelte';

  import PrimaryButton from '$lib/ui/components/Button/PrimaryButton/index.svelte';
  import { VARIANTS } from '$lib/ui/components/Button/PrimaryButton/constants';

  import { quizStore, playQuizStore } from '$lib/stores/quiz';
  import { STEPS } from '$lib/utils/constants/quiz';
  import { Play } from 'carbon-icons-svelte';

  let isGettingPin = true;

  function genQuizPin(): number {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  function getPin() {
    setTimeout(() => {
      $quizStore.pin = genQuizPin();
      isGettingPin = false;
    }, 3000);
  }

  function goToPlayersStep() {
    $playQuizStore.step = STEPS.WAIT_FOR_PLAYERS;
  }

  onMount(() => {
    getPin();
  });
</script>

<PlayContainer>
  <div slot="header">
    <PlayHeader startCount={true} showCountDown={true} />
  </div>

  <div
    slot="body"
    class="w-full rounded-md bg-white  py-7 px-5"
  >
    <div class="mb-3">
      <p>1. Visit</p>
      <h3>play.justed.in</h3>
    </div>
    <div class="">
      <p>2. Enter Pin</p>
      {#if isGettingPin}
        <SyncLoader size="50" color="#1d4ed8" unit="px" duration="1s" />
      {:else}
        <h3>{$quizStore.pin}</h3>
      {/if}
    </div>
  </div>

  <div slot="footer" class="flex justify-center items-center">
    <p class="font-bold mr-3">Let's go</p>
    <PrimaryButton
      label="View Players"
      variant={VARIANTS.OUTLINED}
      onClick={goToPlayersStep}
    />
  </div>
</PlayContainer>
