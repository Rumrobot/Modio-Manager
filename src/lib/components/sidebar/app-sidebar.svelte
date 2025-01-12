<script lang="ts">
  import * as Sidebar from '$components/ui/sidebar';
  import UserMenu from './user-menu.svelte';
  import GameMenu from './game-menu.svelte';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    collapsible = 'icon',
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps} class="pt-(--header-height)">
  <Sidebar.Content>
    <GameMenu />
  </Sidebar.Content>
  <Sidebar.Footer>
    <UserMenu />
  </Sidebar.Footer>
</Sidebar.Root>
