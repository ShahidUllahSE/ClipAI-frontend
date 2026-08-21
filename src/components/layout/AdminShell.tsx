import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants'

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  background:
    radial-gradient(ellipse 50% 35% at 100% 0%, rgba(124, 58, 237, 0.12), transparent 55%),
    ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 15rem 1fr;
  }
`

const Sidebar = styled.aside`
  display: none;
  flex-direction: column;
  padding: 1.1rem 0.85rem 1rem;
  background: linear-gradient(180deg, #1e1b4b 0%, #15132f 60%, #12101f 100%);
  color: #fff;
  border-right: 1px solid rgba(196, 181, 253, 0.12);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    position: sticky;
    top: 0;
    height: 100vh;
  }
`

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.3rem 0.5rem 0.95rem;
  margin-bottom: 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  background: linear-gradient(145deg, #a78bfa, #7c3aed 55%, #5b21b6);
  font-size: 0.72rem;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.35);
`

const BrandText = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  span {
    display: block;
    margin-top: 0.1rem;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(196, 181, 253, 0.75);
  }
`

const NavLabel = styled.p`
  margin: 0.85rem 0.5rem 0.35rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
`

const Nav = styled.nav`
  display: grid;
  gap: 0.2rem;
`

const SideLink = styled(NavLink)`
  display: grid;
  grid-template-columns: 1.45rem 1fr;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 0.65rem;
  border-radius: 0.65rem;
  font-size: 0.84rem;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.68);

  span.icon {
    display: grid;
    place-items: center;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 0.4rem;
    background: rgba(255, 255, 255, 0.06);
    font-size: 0.7rem;
    color: #c4b5fd;
  }

  &:hover:not(.active) {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  &.active {
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(124, 58, 237, 0.48),
      rgba(124, 58, 237, 0.18)
    );
    box-shadow: inset 0 0 0 1px rgba(196, 181, 253, 0.22);

    span.icon {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }
  }
`

const SideFoot = styled.div`
  margin-top: auto;
  display: grid;
  gap: 0.45rem;
  padding-top: 0.85rem;
`

const FootLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.7rem;
  border-radius: 0.65rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 650;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`

const SignOut = styled.button`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 0.65rem;
  padding: 0.5rem 0.7rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
`

const Main = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 3.35rem;
  padding: 0.5rem 0.9rem;
  background: linear-gradient(90deg, #1e1b4b 0%, #17152f 50%, #141224 100%);
  border-bottom: 1px solid rgba(196, 181, 253, 0.14);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 10px 28px rgba(30, 27, 75, 0.16);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0.5rem 1.2rem;
  }
`

const TopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
`

const MobileBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  font-weight: 800;
  letter-spacing: -0.03em;

  span.mark {
    display: grid;
    place-items: center;
    width: 1.65rem;
    height: 1.65rem;
    border-radius: 0.45rem;
    background: linear-gradient(145deg, #a78bfa, #7c3aed);
    font-size: 0.62rem;
  }

  span.muted {
    color: #c4b5fd;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const Context = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

const ContextLabel = styled.p`
  margin: 0;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
`

const ContextTitle = styled.p`
  margin: 0.1rem 0 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
`

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: auto;
`

const EmailChip = styled.span`
  display: none;
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.72rem;
  font-weight: 600;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline-flex;
  }
`

const TopBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.7rem;
  border-radius: 0.55rem;
  background: linear-gradient(145deg, #8b5cf6, #7c3aed);
  color: #fff;
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 6px 14px rgba(124, 58, 237, 0.28);

  &:hover {
    filter: brightness(1.05);
  }
`

const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 74rem;
  margin: 0 auto;
  padding: 1rem 1rem 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1.1rem 1.4rem 2rem;
  }
`

const MobileNav = styled.nav`
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding: 0.5rem 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const MobileLink = styled(NavLink)`
  flex-shrink: 0;
  padding: 0.38rem 0.7rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};

  &.active {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const links = [
  { to: ROUTES.admin, label: 'Overview', icon: '◆', end: true },
  { to: ROUTES.adminUsers, label: 'Users', icon: '◎', end: false },
]

export function AdminShell() {
  const { user, logout } = useAuth()

  return (
    <Shell>
      <Sidebar>
        <Brand to={ROUTES.admin}>
          <BrandMark>CA</BrandMark>
          <BrandText>
            <strong>ClipAI</strong>
            <span>Admin console</span>
          </BrandText>
        </Brand>

        <NavLabel>Manage</NavLabel>
        <Nav>
          {links.map((link) => (
            <SideLink key={link.to} to={link.to} end={link.end}>
              <span className="icon" aria-hidden>
                {link.icon}
              </span>
              {link.label}
            </SideLink>
          ))}
        </Nav>

        <SideFoot>
          <FootLink to={ROUTES.dashboard}>← User app</FootLink>
          <SignOut type="button" onClick={() => void logout()}>
            Sign out
          </SignOut>
        </SideFoot>
      </Sidebar>

      <Main>
        <TopBar>
          <TopLeft>
            <MobileBrand to={ROUTES.admin}>
              <span className="mark">CA</span>
              ClipAI <span className="muted">Admin</span>
            </MobileBrand>
            <Context>
              <ContextLabel>Control center</ContextLabel>
              <ContextTitle>Platform administration</ContextTitle>
            </Context>
          </TopLeft>
          <TopRight>
            <EmailChip title={user?.email}>{user?.email}</EmailChip>
            <TopBtn to={ROUTES.dashboard}>User app</TopBtn>
          </TopRight>
        </TopBar>

        <MobileNav>
          {links.map((link) => (
            <MobileLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </MobileLink>
          ))}
        </MobileNav>

        <Content>
          <Outlet />
        </Content>
      </Main>
    </Shell>
  )
}
