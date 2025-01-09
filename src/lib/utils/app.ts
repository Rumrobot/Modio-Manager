import { config } from '../config.svelte';
import { appState } from '$lib/state.svelte';
import { Status } from '$lib/types';

export const loadApp = async () => {
  console.log('Initializing app');

  if (!(await config.load())) return;
  // Check token

  appState.status = Status.LOADED;
};
