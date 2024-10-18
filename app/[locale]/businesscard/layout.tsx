import { FC } from 'react'
import PageBusinessCard from './page'
/**
 * The root layout component for the cards page.
 *
 * @returns The JSX Element for the layout.
 */
const Layout: FC = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <PageBusinessCard />
      </main>
    </div>
  )
}

export default Layout
