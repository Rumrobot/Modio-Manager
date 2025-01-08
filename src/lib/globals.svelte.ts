export const app: {
  status: string;
  loaded: boolean;
} = $state({
  status: 'Initializing',
  loaded: false,
});
