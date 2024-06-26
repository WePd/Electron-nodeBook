import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = (): JSX.Element => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout className="bg-zinc-900/70">
        <Sidebar className="p-1">
          <ActionButtonRow className="flex justify-between pt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
