import { useMarkdownEditor } from '@/hooks/useMarkdownEditor'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'

export const MarkDownEditor = () => {
  const { selectNote, handleAutoSave, editorRef, handleBlur } = useMarkdownEditor()

  if (!selectNote) return null

  return (
    <MDXEditor
      ref={editorRef}
      markdown={selectNote?.content}
      key={selectNote.title}
      onChange={handleAutoSave}
      onBlur={handleBlur}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
