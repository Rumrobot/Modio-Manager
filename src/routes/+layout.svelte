<script lang="ts">
  import '../app.pcss';
  import * as Sidebar from '$components/ui/sidebar';
  import * as Form from '$components/ui/form';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { toast } from 'svelte-sonner';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import { Button } from '$components/ui/button';
  import { Fullscreen, FullscreenExit, Close, Minimize } from '@o7/icon/material';
  import { Loader } from '@o7/icon/lucide';
  import { onMount } from 'svelte';
  import { AppSidebar } from '$lib/components/sidebar';
  import { loadApp } from '$lib/utils';
  import { appState } from '$lib/state.svelte';
  import { config } from '$lib/config.svelte';
  import { Input } from '$components/ui/input';
  import { Status } from '$lib/types';
  import { configSchema } from '$lib/zod';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';

  const { children } = $props();
  const Window = getCurrentWindow();
  let maximized = $state(false);

  loadApp();

  const form = superForm(defaults(zod(configSchema)), {
    SPA: true,
    validators: zod(configSchema),
    onUpdate({ form }) {
      if (form.valid) {
        console.log(formData);
        // TODO: Call an external API with form.data, await the result and update form
      }
    }
  });
  const { form: formData, enhance } = form;

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

<Sidebar.Provider style="--sidebar-width: 150px;">
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="grid fixed h-(--header-height) top-0 left-0 w-full grid-cols-5 items-center border-b z-20 bg-header-background text-header-foreground"
      data-tauri-drag-region
    >
      <div class="col-span-2 ml-2 flex items-center gap-1"
           data-tauri-drag-region>
        <Sidebar.Trigger>
          T
        </Sidebar.Trigger>
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
    <div class="flex w-full justify-center mt-(--header-height) rounded-tl-lg">
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
            <form method="POST" use:enhance>
              <Form.Field {form} name="token">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Mod.io token</Form.Label>
                    <Input {...props} bind:value={$formData.token} />
                  {/snippet}
                </Form.Control>
                <Form.Description>This is your personal Mod.io API token.</Form.Description>
                <Form.FieldErrors />
              </Form.Field>
              <Form.Button>Save</Form.Button>
            </form>
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
  </Sidebar.Inset>
</Sidebar.Provider>
