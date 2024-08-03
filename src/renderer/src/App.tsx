import { useRef } from 'react'
import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkDownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from './components'

const App = (): JSX.Element => {
  // 每次重新选择note之后，需要reset scroll

  const containerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    containerRef.current?.scrollTo(0, 0)
  }
  return (
    <>
      <DraggableTopBar />
      <RootLayout className="bg-zinc-900/70">
        <Sidebar className="p-1">
          <ActionButtonRow className="flex justify-between pt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={containerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-1" />
          <MarkDownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
