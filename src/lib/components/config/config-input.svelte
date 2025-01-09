<script lang="ts">
import { Input } from '$components/ui/input';
import type { AppConfig } from '$lib/types';

let { config } = $props();
</script>

<Input bind:value={config} />