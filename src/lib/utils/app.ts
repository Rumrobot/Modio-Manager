import { config } from './config';

export const loadApp = async () => {
  console.log('Loading...');

  await config.load();

  console.log('Loaded');
};
