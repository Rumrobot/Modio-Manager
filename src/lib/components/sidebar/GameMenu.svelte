<script lang="ts">
  import * as Sidebar from '$components/ui/sidebar';
  import * as Avatar from '$components/ui/avatar';
  import * as Collapsible from '$components/ui/collapsible';
  import { ChevronRight } from '@o7/icon/lucide';

  const games: {
    title: string;
    url: string;
    icon: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[] = [
    {
      title: 'Pavlov',
      url: 'pavlov',
      icon: 'https://thumb.modcdn.io/games/806d/3959/crop_64x64/icon.png',
      items: [{
        title: 'Server list',
        url: 'pavlov/serverlist'
      }]
    }
  ];
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Games</Sidebar.GroupLabel>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each games as game (game.title)}
        <Collapsible.Root open={game.isActive} class="group/collapsible">
          {#snippet child({ props })}
            <Sidebar.MenuItem {...props}>
              <Collapsible.Trigger>
                {#snippet child({ props })}
                  <Sidebar.MenuButton {...props} size="lg">
                    {#snippet tooltipContent()}
                      {game.title}
                    {/snippet}
                    <Avatar.Root class="h-8 w-8 rounded-lg">
                      <Avatar.Image
                        src={game.icon} />
                      alt={`${game.title} icon`} />
                      <Avatar.Fallback class="rounded-md">N/A</Avatar.Fallback>
                    </Avatar.Root>
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