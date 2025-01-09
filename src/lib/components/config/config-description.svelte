<script lang="ts">
  import { getConfigContext } from './utils';
  import { cn } from '$lib/utils';
  import type { WithElementRef } from 'bits-ui';
  import type { HTMLInputAttributes } from 'svelte/elements';

  let { class: className, children }: WithElementRef<HTMLInputAttributes> = $props();

  let { errors, name } = getConfigContext();
</script>

{#if !errors[name].length}
  <div class={cn("text-muted-foreground text-sm font-medium", className)}>
    {@render children?.()}
  </div>
{/if}
