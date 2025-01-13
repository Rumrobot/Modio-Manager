<script lang="ts">
  import '../app.pcss';
  import * as Sidebar from '$components/ui/sidebar';
  import * as Form from '$components/ui/form';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { Button } from '$components/ui/button';
  import { Eye, EyeOff, Loader } from '@o7/icon/lucide';
  import { AppTitleBar, AppSidebar } from '$components';
  import { loadApp } from '$lib/utils';
  import { appState } from '$lib/state.svelte';
  import { config } from '$lib/config.svelte';
  import { Input } from '$components/ui/input';
  import { Status } from '$lib/types';
  import { configSchema } from '$lib/zod';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { saveForm } from '$lib/utils/app';

  const { children } = $props();
  loadApp();

  let showToken = $state(false);
  const form = superForm(defaults(zod(configSchema)), {
    SPA: true,
    validators: zod(configSchema),
    id: 'layout',
    async onUpdate({ form }) {
      await saveForm(form);
    }
  });

  const { form: formData, enhance, errors, delayed } = form;
</script>

<ModeWatcher defaultMode="system" />
<Toaster position="top-right" />

<Sidebar.Provider style="--sidebar-width: 150px;">
  <AppSidebar />
  <Sidebar.Inset>
    <AppTitleBar />
    <div class="flex w-full justify-center mt-(--header-height) rounded-tl-lg">
      {#if appState.status === Status.LOADING}
        <div class="state-container text-muted">
          <Loader class="animate-spin" />
          <p class="animate-pulse">
            {appState.message}...
          </p>
        </div>
      {:else}
        {#if appState.status === Status.INVALID_TOKEN}
          <div class="state-container">
            {#if appState.status === Status.INVALID_TOKEN}
              <p class="text-destructive">{appState.message}</p>
            {/if}
            <form method="POST" use:enhance>
              <Form.Field {form} name="token">
                <Form.Control>
                  {#snippet children({ props })}
                    <Form.Label>Mod.io token</Form.Label>
                    <div class="relative">
                      <Input {...props} bind:value={$formData.token}
                             placeholder="Mod.io token" type={showToken ? 'text' : 'password'} />
                      <Button onclick={() => showToken = !showToken} variant="ghost"
                              class="w-8 h-8 p-0 absolute m-1 top-0 right-0 bg-background">
                        {#if showToken}
                          <Eye />
                        {:else }
                          <EyeOff />
                        {/if}
                      </Button>
                    </div>
                  {/snippet}
                </Form.Control>
                <Form.Description>This is your personal Mod.io API token.</Form.Description>
                <Form.FieldErrors />
                <Form.Button disabled={$formData === config.appConfig || !!$errors.token || $delayed}>Save</Form.Button>
              </Form.Field>
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
