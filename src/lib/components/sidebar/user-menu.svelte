<script lang="ts">
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import * as Sidebar from '$components/ui/sidebar';
  import * as Avatar from '$components/ui/avatar';
  import { useSidebar } from '$components/ui/sidebar';
  import { ChevronsUpDown, Settings, Sun, Moon } from '@o7/icon/lucide';
  import { toggleMode } from 'mode-watcher';
  import { Button } from '$components/ui/button';

  const sidebar = useSidebar();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            {...props}
          >
            <Avatar.Root class="h-8 w-8 rounded-lg">
              <Avatar.Image
                src="https://getwallpapers.com/wallpaper/full/1/e/4/890298-full-size-shrek-wallpapers-2560x1440.jpg" />
              alt="Shrek" />
              <Avatar.Fallback class="rounded-lg">NA</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Shrek</span>
              <span class="truncate text-xs">Shrek@castle.donkey</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
        side={sidebar.isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar.Root class="h-8 w-8 rounded-lg">
              <Avatar.Image
                src="https://getwallpapers.com/wallpaper/full/1/e/4/890298-full-size-shrek-wallpapers-2560x1440.jpg" />
              alt="Shrek" />
              <Avatar.Fallback class="rounded-lg">NA</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Shrek</span>
              <span class="truncate text-xs">Shrek@castle.donkey</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
        <DropdownMenu.GroupHeading class="text-muted-foreground text-xs">App</DropdownMenu.GroupHeading>
        <DropdownMenu.Item class="gap-2 p-2" onSelect={toggleMode} closeOnSelect={false}>
          <Sun class="dark:hidden" />
          <Moon class="hidden dark:block" />
          Theme
        </DropdownMenu.Item>
        <DropdownMenu.Item class="gap-2 p-2">
          <Settings />
          Settings
        </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
