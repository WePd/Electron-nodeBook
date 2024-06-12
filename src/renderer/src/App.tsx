import { Content, DraggableTopBar, RootLayout, Sidebar } from './components'

const App = (): JSX.Element => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">Sidebar</Sidebar>
        <Content className="border-1 bg-zinc-300/50 border-l-black/50">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
