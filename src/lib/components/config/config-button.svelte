<script lang="ts">
import { Button } from '$components/ui/button';
import type { AppConfig } from '$lib/types';
import { getContext } from 'svelte';

let data = getContext("data");


</script>

<Button onclick={async () => {

}}>
  <slot></slot>
</Button>