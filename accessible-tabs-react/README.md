# Accessible Tabs — React + TypeScript

Compound `<Tabs>` component using React Context, controlled/uncontrolled state, ARIA roles, roving tabindex, and Arrow Left/Right/Home/End keyboard navigation.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## API
```tsx
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
    <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="a">Panel A</Tabs.Panel>
  <Tabs.Panel value="b">Panel B</Tabs.Panel>
</Tabs>
```

Controlled mode uses `value` and `onValueChange`.
