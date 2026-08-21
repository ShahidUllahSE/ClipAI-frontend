import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
