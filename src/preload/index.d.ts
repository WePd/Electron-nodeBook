import { GetNots } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNots
      test: () => {}
    }
  }
}
