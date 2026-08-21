import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { LandingFooter, LandingHeader } from '@/features/landing'

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
`

export function AppLayout() {
  return (
    <Shell>
      <LandingHeader />
      <Main>
        <Outlet />
      </Main>
      <LandingFooter />
    </Shell>
  )
}
