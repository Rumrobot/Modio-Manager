<script lang="ts">
  import { getConfigContext } from './utils';
  import { cn } from '$lib/utils';
  import type { HTMLAttributes } from 'svelte/elements';

  let { class: className, children: childrenProp }: HTMLAttributes<HTMLDivElement> = $props();

  let { errors, name, data } = getConfigContext();
</script>

{#snippet children({ props })}
  <div class="flex flex-col gap-2">
    {@render childrenProp?.({ props })}
  </div>
{/snippet}
