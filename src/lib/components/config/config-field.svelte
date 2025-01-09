<script lang="ts">
  import type { AppConfig } from '$lib/types';
  import { setContext } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  let { name, children }: HTMLAttributes<HTMLDivElement> & { name: keyof AppConfig } = $props();

  // let { data, errors } = getConfigContext();

  setContext('name', name);
</script>

<div>
  {@render children?.()}
</div>

