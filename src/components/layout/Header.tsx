import styled from 'styled-components'
import { Container } from '@/components/ui'

const HeaderRoot = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.md} 0;
`

const HeaderInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.ink};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`

const NavLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export function Header() {
  return (
    <HeaderRoot>
      <HeaderInner>
        <Logo href="/">VideoWebsite</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/videos">Videos</NavLink>
          <NavLink href="/about">About</NavLink>
        </Nav>
      </HeaderInner>
    </HeaderRoot>
  )
}
