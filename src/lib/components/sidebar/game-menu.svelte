<script lang="ts">
  import * as Sidebar from '$components/ui/sidebar';
  import * as Avatar from '$components/ui/avatar';
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import * as Collapsible from '$components/ui/collapsible';
  import { useSidebar } from '$components/ui/sidebar';
  import { ChevronRight } from '@o7/icon/lucide';

  const sidebar = useSidebar();

  const games = [
    {
      title: 'Pavlov',
      url: 'pavlov',
      icon: 'https://thumb.modcdn.io/games/806d/3959/crop_64x64/icon.png'
    }
  ];
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Games</Sidebar.GroupLabel>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each games as game (game.title)}
        <Collapsible.Root open={game.isActive} class="group/collapsible">
          {#snippet child({ props })}
            <Sidebar.MenuItem {...props}>
              <Collapsible.Trigger>
                {#snippet child({ props })}
                  <Sidebar.MenuButton {...props}>
                    {#snippet tooltipContent()}
                      {game.title}
                    {/snippet}
                    {#if game.icon}
                      <game.icon />
                    {/if}
                    <span>{game.title}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </Sidebar.MenuButton>
                {/snippet}
              </Collapsible.Trigger>
              <Collapsible.Content>
                {#if game.items}
                  <Sidebar.MenuSub>
                    {#each game.items as subItem (subItem.title)}
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton>
                          {#snippet child({ props })}
                            <a href={subItem.url} {...props}>
                              <span>{subItem.title}</span>
                            </a>
                          {/snippet}
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    {/each}
                  </Sidebar.MenuSub>
                {/if}
              </Collapsible.Content>
            </Sidebar.MenuItem>
          {/snippet}
        </Collapsible.Root>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>