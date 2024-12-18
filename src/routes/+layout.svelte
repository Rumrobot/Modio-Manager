<script>
  import '../app.pcss';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { Button } from '$components/ui/button';
  import {
    Fullscreen,
    FullscreenExit,
    Close,
    Remove,
  } from '@o7/icon/material';
  import { RefreshCcw } from '@o7/icon/lucide';
  import { onMount } from 'svelte';
  import * as Sidebar from '$components/ui/sidebar';
  import { AppSidebar } from '$lib/components';

  const { children } = $props();
  const Window = getCurrentWindow();
  let maximized = $state(false);
  let reload = $state(false);

  const resize = async () => {
    maximized = await Window.isMaximized();
  };

  onMount(async () => {
    await resize();
  });
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-right" />
<svelte:window on:resize={resize} />

<Sidebar.Provider>
  <AppSidebar />
  <div
    class="fixed top-0 grid h-12 w-full grid-cols-5 items-center justify-between border-b bg-background/75 backdrop-blur"
    data-tauri-drag-region
  >
    <div class="col-span-2 ml-2 flex items-center gap-1" data-tauri-drag-region>
      <Sidebar.Trigger class="h-10 w-10" />
      <Button variant="ghost" size="icon" onclick={() => (reload = true)}>
        <RefreshCcw
          class={`animate-spin ease-in direction-reverse repeat-1 ${reload ? 'running' : 'paused'}`}
        />
      </Button>
    </div>
    <p
      class="pointer-events-none justify-self-center text-sm text-muted"
      data-tauri-drag-region
    >
      Mod.io Manager
    </p>
    <div
      class="col-span-2 flex h-full items-center justify-self-end"
      data-tauri-drag-region
    >
      <div class="h-full w-[1px] bg-border"></div>
      <div class="flex h-full text-muted">
        <Button
          variant="ghost"
          class="h-full rounded-none px-4"
          onclick={() => Window.minimize()}
        >
          <Remove size={18} />
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
          class="h-full rounded-none px-4 hover:bg-destructive"
          onclick={() => Window.close()}
        >
          <Close size={18} />
        </Button>
      </div>
    </div>
  </div>

  <div class="mt-12">
    {@render children()}
  </div>
</Sidebar.Provider>
