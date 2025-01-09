<script lang="ts">
  import { Button } from '$components/ui/button';
  import { toast } from 'svelte-sonner';
  import { config } from '$lib/config.svelte';
</script>

<div class="page-container">
  <h1>Welcome to Mod.io Manager!</h1>
  <p>Made by Rumrobot</p>
  <div
    class="flex w-full max-w-[1080px] flex-col items-center justify-center"
  >
    <Button class="inset-ring inset-shadow-sm"
            onclick={() => toast.success(config.appConfig?.token ? config.appConfig?.token : "No token")}>
      Test
    </Button>
  </div>
</div>
