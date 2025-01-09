<script lang="ts">
  import '../app.pcss';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { toast } from 'svelte-sonner';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { Button } from '$components/ui/button';
  import { Fullscreen, FullscreenExit, Close, Minimize } from '@o7/icon/material';
  import { Loader } from '@o7/icon/lucide';
  import { onMount } from 'svelte';
  import * as Sidebar from '$components/ui/sidebar';
  import { AppSidebar } from '$lib/components';
  import { loadApp } from '$lib/utils';
  import { appState } from '$lib/state.svelte';
  import { config } from '$lib/config.svelte';
  import { Input } from '$components/ui/input';
  import { Status } from '$lib/types';
  import { configSchema } from '$lib/zod';

  const { children } = $props();
  const Window = getCurrentWindow();
  let maximized = $state(false);

  let token: string | undefined = $state(undefined);
  let tokenTest = $derived(configSchema.safeParse({ ...config.appConfig, token }));
  let tokenErrors = $derived(tokenTest.success || !token ? [] : tokenTest.error?.issues.filter(issue => issue.path[0] === 'token'));


  loadApp();

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
    class="bg-background/75 fixed top-0 grid h-12 w-full grid-cols-5 items-center justify-between border-b backdrop-blur"
    data-tauri-drag-region
  >
    <div class="col-span-2 ml-2 flex items-center gap-1" data-tauri-drag-region>
      <Sidebar.Trigger class="h-10 w-10 " />
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
  </div>

  <div class="mt-12 w-full">
    {#if appState.status === Status.LOADING}
      <div class="state-container text-muted">
        <Loader class="animate-spin" />
        <p class="animate-pulse">
          {appState.message}...
        </p>
      </div>
    {:else}
      {#if appState.status === Status.NO_TOKEN}
        <div class="state-container">
          Mod.io API token
          <div class="flex gap-2">
            <Input placeholder="Token" bind:value={token} class={`${tokenTest.success || !token ? "" : "!ring-destructive"}`} />
            <Button disabled={!tokenTest.success} onclick={async () => {
              const result = await config.set({token});
              if (result) {
                toast.success("Saved Mod.io token");
                appState.status = Status.LOADED;
              } else {
                toast.success("Filed to save Mod.io token");
              }
            }}>Save
            </Button>
          </div>
          {#if tokenErrors.length > 0}
            <div class="text-destructive italic">
              <ul>
                {#each tokenErrors as error}
                  <li>{error.message}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {:else if appState.status === Status.FIRST_LAUNCH}
        <div class="state-container">
          First time
        </div>
      {:else}
        {@render children()}
      {/if}
    {/if}
  </div>
</Sidebar.Provider>
