import type { AppState } from '$lib/types';

export const appState: AppState = $state({
  status: 'init',
  loading: true,
  message: 'Initializing',
  error: null,
  firstLaunch: false,
});
