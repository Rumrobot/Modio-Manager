<script lang="ts">
  import { setContext } from 'svelte';
  import { configSchema } from '$lib/zod';
  import type { Errors, Data } from './utils';

  let { children } = $props();

  let data: Data = $state({});
  let errors: Errors = $derived(configSchema.safeParse(data).error?.flatten().fieldErrors as Errors);

  setContext('data', data);
  setContext('errors', () => errors);
</script>

<div>
  {@render children()}
</div>