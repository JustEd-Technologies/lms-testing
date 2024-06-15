<script lang="ts">
  /************************** IMPORTS *******************************/

  // ------------------- Library Imports ---------------------------
  import { onMount, onDestroy } from 'svelte'; // Lifecycle functions for Svelte components
  import { goto } from '$app/navigation'; // Function to navigate to different routes
  import type {
    RealtimeChannel,
    RealtimePostgresChangesPayload,
  } from '@supabase/supabase-js'; // Type definitions for Supabase realtime channels and payloads

  import { t } from '$lib/translations/translations'; // Translation function
  import { supabase } from '$lib/supabase/supabase'; // Supabase Client Instance

  // -------------------- Types Imports -----------------------------
  import type { OrganizationPlan } from '$lib/types'; // Type definition for OrganizationPlan

  // ------------------- UI Imports - Components and Icons -----------
  import Confetti from '$lib/ui/components/Confetti/index.svelte'; // Confetti component
  import Modal from '$lib/ui/components/Modal/index.svelte'; // Modal component
  import PrimaryButton from '$lib/ui/components/Button/PrimaryButton/index.svelte'; // Primary button component
  import { VARIANTS } from '$lib/ui/components/Button/PrimaryButton/constants'; // Button variants
  import { Loading } from 'carbon-components-svelte'; // Loading spinner component

  import StepDoneIcon from '$lib/ui/icons/StepDoneIcon.svelte'; // Step done icon component
  import { Checkmark } from 'carbon-icons-svelte'; // Checkmark icon component

  // -------------------- Stores Imports ------------------------------
  import { page } from '$app/stores'; // Store for the current page
  import { currentOrg, currentOrgPath } from '$lib/stores/org'; // Stores for the current organization and its path
  import { profile } from '$lib/stores/user'; // Store for the user profile
  import { snackbar } from '../../Snackbar/store'; // Snackbar store for notifications
  import { toggleConfetti } from '../../Confetti/store'; // Store to toggle the confetti

  // ------------------- Utility Imports - constants and functions -------
  import { PLANS } from '$lib/utils/constants/plans'; // Plan constants (that includes price, features, etc.)

  // ----------------- Third Party Services Imports -----------------------
  import { subscribeToProduct } from '$lib/services/lemonsqueezy/subscribe'; // Service to subscribe to a product

  /*************************** PROPS *********************************/
  // No props

  /******************* STATE & REACTIVE STATEMENTS *******************/
  const disabledClass = 'bg-gray-300 text-gray-400 hover:cursor-not-allowed'; // CSS class for disabled state (not actually useful because nothing is disabled actually)

  let open = false; // State to control modal visibility
  let upgraded = false; // State to indicate if the upgrade is successful
  let isLoadingPlan: string | null = null; // State to indicate the loading plan
  let orgPlanChannel: RealtimeChannel; // Variable to hold the realtime channel for organization plans

  // Reactive statement to get plan names from PLANS (whenever PLANS will change, planNames will take that change into effect)
  $: planNames = Object.keys(PLANS) as (keyof typeof PLANS)[];

  // Reactive statement to check if the modal should be open based on URL query parameters
  $: {
    const query = new URLSearchParams($page.url.search);
    open = (query.get('upgrade') || '') === 'true';
  }

  /******************* FUNCTION DECLARATIONS & DEFINITIONS *******************/

  // Function to handle closing the modal (via Close button)
  function onClose() {
    if (upgraded) {
      window.location.href = $currentOrgPath;
    } else {
      goto($page.url.pathname);
    }
  }

  // Function to handle "Learn More" button click
  function onLearnMore() {
    window.open('https://justed.in/blog/early-adopter', '_blank');
  }

  // Function to handle plan selection click
  async function handleClick(
    plan: (typeof PLANS)[keyof typeof PLANS],
    planName: keyof typeof PLANS
  ) {
    // Return if the plan is disabled or the user profile is not available
    if (plan.CTA.IS_DISABLED || !$profile.id) {
      return;
    }

    // Open the dashboard link if the plan doesn't have a product ID but has a dashboard link
    if (!plan.CTA.PRODUCT_ID && plan.CTA.DASHBOARD_LINK) {
      window.open(plan.CTA.DASHBOARD_LINK, '_blank');
      return;
    }

    isLoadingPlan = planName; // Set the loading state to the current plan name

    try {
      // Subscribe to the product and get the checkout URL
      const { checkoutURL } = await subscribeToProduct({
        productId: plan.CTA.PRODUCT_ID,
        email: $profile.email,
        name: $profile.fullname,
        triggeredBy: $currentOrg.memberId,
        orgId: $currentOrg.id,
      });

      // Show an error message if checkout URL is not generated
      if (!checkoutURL) {
        snackbar.error('snackbar.upgrade.generate_fail');
        return;
      }

      // Open the checkout URL in a new tab
      window.open(checkoutURL, '_blank');
    } catch (error) {
      console.error('Error subscribing', error);
      // Show an error message if subscription fails
      snackbar.error('snackbar.upgrade.failed');
    }

    isLoadingPlan = null;  // Reset the loading state
  }

   // Function to handle the insertion of a new plan
  async function handleInsert(
    payload: RealtimePostgresChangesPayload<OrganizationPlan>
  ) {
    // Get the new plan data
    const newPlan = payload.new as OrganizationPlan;

    console.log('A new plan was inserted');
    // If the new plan is for the current organization and is active, mark as upgraded
    if (newPlan.org_id === $currentOrg.id && newPlan.is_active) {
      upgraded = true;
      toggleConfetti();  // show confetti

      // Hide confetti after 3 seconds
      setTimeout(() => {
        toggleConfetti();
      }, 3000);
    }
  }

  /****************************** LIFECYCLE METHODS ****************************/
  // Lifecycle method to subscribe to plan changes on mount
  onMount(() => {
    orgPlanChannel = supabase
      .channel('any')  // Subscribe to any changes
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'organization_plan' },
        handleInsert // Handle new plan insertion
      )
      .subscribe();
  });

  // Lifecycle method to unsubscribe from plan changes on destroy
  onDestroy(() => {
    if (orgPlanChannel) {
      supabase.removeChannel(orgPlanChannel); // Remove the channel
    }
  });
</script>

<!-- ************************* MAIN COMPONENT ***************************** -->
{#if upgraded}
  <Confetti />
{/if}

<Modal
  {onClose}
  {open}
  width="w-4/5"
  maxWidth={upgraded ? 'max-w-[600px]' : undefined}
  modalHeading={$t('pricing.modal.heading')}
>
  {#if upgraded}
    <div class="flex flex-col items-center justify-center mb-4 w-full relative">
      <StepDoneIcon />
      <h4 class="text-2xl">{$t('pricing.modal.thanks')}</h4>
      <p class="mb-4 text-center">
        {$t('pricing.modal.plan')}
      </p>
      <div class="flex items-center gap-4">
        <PrimaryButton
          label={$t('pricing.modal.close')}
          variant={VARIANTS.OUTLINED}
          onClick={onClose}
        />
        <PrimaryButton
          label={$t('pricing.modal.learn')}
          variant={VARIANTS.CONTAINED}
          onClick={onLearnMore}
        />
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center">
      <div class="isolate grid grid-cols-1 gap-3 lg:grid-cols-3">
        {#each planNames as planName}
          <div
            class="max-w-xl rounded-xl {planName === 'EARLY_ADOPTER' &&
              'cio-bg-blue'} p-4 ring-1 ring-gray-200 lg:max-w-sm"
          >
            <p
              class="mb-2 text-lg font-semibold leading-8 {planName ===
              'EARLY_ADOPTER'
                ? 'text-white'
                : 'text-gray-900'}  lg:text-xl"
            >
              {PLANS[planName].NAME}
            </p>
            <p
              class="text-baseline flex items-baseline gap-x-1 font-medium {planName ===
              'EARLY_ADOPTER'
                ? 'text-white'
                : 'text-black'} "
            >
              {PLANS[planName].PRICE.CURRENCY}
              {PLANS[planName].PRICE.MONTHLY}
              {#if !PLANS[planName].PRICE.IS_PREMIUM}
                /month
              {/if}
            </p>
            <p
              class=" mt-4 text-sm font-light leading-6 {planName ===
              'EARLY_ADOPTER'
                ? 'text-white'
                : 'text-black'}  lg:leading-6"
            >
              {PLANS[planName].DESCRIPTION}
            </p>

            <button
              class="text-md mt-4 block w-full rounded-md {isLoadingPlan ===
                planName && disabledClass} {planName === 'EARLY_ADOPTER'
                ? 'bg-white text-slate-900 hover:bg-indigo-50'
                : PLANS[planName].CTA.IS_DISABLED
                  ? disabledClass
                  : 'bg-primary-900 hover:bg-primary-700 text-white'} py-3 text-center font-medium hover:no-underline lg:rounded-md lg:py-3 lg:text-lg lg:font-semibold flex items-center justify-center"
              on:click={() => {
                if (isLoadingPlan === planName) return;

                handleClick(PLANS[planName], planName);
              }}
            >
              {#if isLoadingPlan === planName}
                <Loading withOverlay={false} small />
              {:else}
                {PLANS[planName].CTA.DASHBOARD_LABEL}
              {/if}
            </button>

            <ul
              class="mt-4 space-y-2 text-sm {planName === 'EARLY_ADOPTER'
                ? 'text-white'
                : 'text-black'} "
            >
              {#each PLANS[planName].FEATURES as features}
                <li class="flex items-center">
                  <div>
                    <Checkmark
                      size={16}
                      fill={planName === 'EARLY_ADOPTER' ? '#fff' : '#1D4EE2'}
                      class="mr-2 lg:mr-3"
                    />
                  </div>
                  <p class="text-sm">
                    {features}
                  </p>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</Modal>
