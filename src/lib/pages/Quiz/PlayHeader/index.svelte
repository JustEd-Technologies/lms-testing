<script lang="ts">
  import { quizStore } from '$lib/stores/quiz';

  import Answer from '$lib/pages/Quiz/PlayHeader/Answer/index.svelte';
  import Timer from '$lib/pages/Quiz/PlayHeader/Timer/index.svelte';

  export let startCount = false;
  export let showCountDown = false;
</script>

<div class="flex justify-between items-center w-full">
  <h3 class="text-white">{$quizStore.title}</h3>
  {#if showCountDown}
    <div class="flex">
      <Timer {startCount} timelimit={$quizStore.timelimit} />
      <Answer />
    </div>
  {/if}
</div>
