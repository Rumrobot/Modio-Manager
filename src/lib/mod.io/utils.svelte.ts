import Bottleneck from 'bottleneck';
import { config } from '$lib/config.svelte';

const limiter = new Bottleneck({
  minTime: 100,
});

type APIOptions = {
  headers: Record<string, string>;
  body: string;
  method: string;
};
export const modioAPI = async (url: string, opts?: Partial<APIOptions>) => {
  const headers = {
    Authorization: `Bearer ${config.appConfig?.token}`,
    Accept: 'application/json',
    ...opts?.headers,
  };

  return await limiter.schedule(() =>
    fetch('https://api.mod.io/v1' + url, {
      method: opts?.method ? opts?.method : 'GET',
      headers,
      body: opts?.body,
    }),
  );
};

export const fetchMe = async (token = config.appConfig?.token) => {
  if (!token) return null;
  const res = await modioAPI('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  return JSON.parse(await res.text());
};
