<script lang="ts">
  import * as Sidebar from '$components/ui/sidebar';
  import { Button } from '$components/ui/button';
  import { Close, Fullscreen, FullscreenExit, Minimize } from '@o7/icon/material';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { onMount } from 'svelte';

  const Window = getCurrentWindow();
  let maximized = $state(false);

  export const resize = async () => {
    maximized = await Window.isMaximized();
  };

  onMount(async () => await resize());
</script>

<svelte:window on:resize={resize} />
<header
  class="grid fixed h-(--header-height) top-0 left-0 w-full grid-cols-5 items-center border-b z-20 bg-header-background text-header-foreground"
  data-tauri-drag-region
>
  <div class="col-span-2 ml-2 flex items-center gap-1"
       data-tauri-drag-region>
    <Sidebar.Trigger />
  </div>
  <p
    class="text-muted pointer-events-none justify-self-center text-sm"
    data-tauri-drag-region
  >
    Mod.io Manager
  </p>
  <div
    class="col-span-2 flex h-full items-center justify-self-end"
    data-tauri-drag-region
  >
    <div class="bg-border h-full w-[1px]"></div>
    <div class="text-muted flex h-full">
      <Button
        variant="ghost"
        class="h-full rounded-none px-4"
        onclick={() => Window.minimize()}
      >
        <Minimize size={18} />
      </Button>
      <Button
        variant="ghost"
        class="h-full rounded-none px-4"
        onclick={() => Window.toggleMaximize()}
      >
        {#if maximized}
          <FullscreenExit size={18} />
        {:else}
          <Fullscreen size={18} />
        {/if}
      </Button>
      <Button
        variant="ghost"
        class="hover:bg-destructive h-full rounded-none px-4"
        onclick={() => Window.close()}
      >
        <Close size={18} />
      </Button>
    </div>
  </div>
</header>