import { config } from '../config.svelte';
import { appState } from '$lib/state.svelte';

export const loadApp = async () => {
  console.log('Initializing app');

  if (!(await config.load())) return (appState.loading = false);
  // Check token

  appState.loading = false;
};
