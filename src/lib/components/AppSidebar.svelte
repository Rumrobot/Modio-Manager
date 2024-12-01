<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar';

  const items = [
    {
      title: 'Home',
      url: '#'
    },
    {
      title: 'Inbox',
      url: '#'
    },
    {
      title: 'Calendar',
      url: '#'
    },
    {
      title: 'Search',
      url: '#'
    },
    {
      title: 'Settings',
      url: '#'
    }
  ];
</script>

<Sidebar.Root class="mt-12">
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>