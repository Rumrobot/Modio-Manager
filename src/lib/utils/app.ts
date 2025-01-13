import { config } from '../config.svelte';
import { appState } from '$lib/state.svelte';
import { type AppConfig, Status } from '$lib/types';
import { toast } from 'svelte-sonner';
import type { SuperValidated } from 'sveltekit-superforms';
import { fetchMe } from '$lib/mod.io/utils.svelte';

export const loadApp = async () => {
  console.log('Initializing app');

  if (!(await config.load())) return;
  if (!(await fetchMe())) {
    appState.status = Status.INVALID_TOKEN;
    appState.message = 'Invalid Mod.io token';
    return;
  }

  appState.status = Status.LOADED;
};

export const saveForm = async (form: SuperValidated<AppConfig>) => {
  console.log(form);
  if (form.valid) {
    const me = await fetchMe(form.data.token);
    if (!me) {
      toast.error('Invalid Mod.io token');
    }

    const res = await config.set(form.data);
    if (res) {
      toast.success('Saved config');
    } else {
      toast.error('Failed to save config');
    }
  }
};
