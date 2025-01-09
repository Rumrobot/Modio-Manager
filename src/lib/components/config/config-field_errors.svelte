<script lang="ts">
  import { getConfigContext } from './utils';
  import { cn } from '$lib/utils';
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLInputAttributes } from 'svelte/elements';

  let { class: className, errorClasses }: WithElementRef<HTMLInputAttributes> & {
    errorClasses?: string | undefined | null;
  } = $props();

  let { errors, name } = getConfigContext();
</script>

<div class={cn("space-y-2 text-destructive text-sm font-medium", className)}>
  {#if errors[name].length}
    {#each errors[name] as err}
      <p class={cn(errorClasses)}>{err}</p>
    {/each}
  {/if}
</div>