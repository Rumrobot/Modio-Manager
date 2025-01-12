<script lang="ts">
  import * as Form from '$components/ui/form';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { configSchema } from '$lib/zod';
  import { Input } from '$components/ui/input';
  import { Separator } from '$components/ui/separator';
  import { config } from '$lib/config.svelte';
  import type { AppConfig } from '$lib/types';
  import { Button } from '$components/ui/button';
  import { Eye, EyeOff } from '@o7/icon/lucide';
  import { saveForm } from '$lib/utils/app';
  import { appState } from '$lib/state.svelte';

  const form = superForm(defaults(zod(configSchema)), {
    SPA: true,
    validators: zod(configSchema),
    async onUpdate({ form }) {
      await saveForm(form);
    }
  });
  const { form: formData, enhance, errors } = form;

  $formData = config.appConfig as AppConfig;
  let showToken = $state(false);

</script>

<div class="space-y-1 mt-5 w-md">
  <h1>Settings</h1>
  <Separator />
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
      <Form.Button disabled={$formData === config.appConfig || !!$errors.token?.length}>Save</Form.Button>
    </Form.Field>
  </form>
</div>
