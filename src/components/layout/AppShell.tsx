import { Link, NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '@/context/AuthContext'
import { PLANS, ROUTES } from '@/constants'

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  background:
    radial-gradient(ellipse 55% 40% at 90% -10%, rgba(124, 58, 237, 0.14), transparent 55%),
    radial-gradient(ellipse 40% 30% at 0% 100%, rgba(30, 27, 75, 0.06), transparent 50%),
    ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 15.25rem 1fr;
  }
`

const Sidebar = styled.aside`
  display: none;
  flex-direction: column;
  padding: 1.15rem 0.9rem 1rem;
  background:
    linear-gradient(180deg, #1e1b4b 0%, #15132f 55%, #12101f 100%);
  color: ${({ theme }) => theme.colors.white};
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
  gap: 0.65rem;
  padding: 0.35rem 0.55rem 1.1rem;
  margin-bottom: 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.65rem;
  background: linear-gradient(145deg, #a78bfa, #7c3aed 55%, #5b21b6);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.35);
`

const BrandText = styled.span`
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #fff;

  em {
    font-style: normal;
    color: #c4b5fd;
  }
`

const NavLabel = styled.p`
  margin: 0.85rem 0.55rem 0.35rem;
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
  grid-template-columns: 1.5rem 1fr;
  align-items: center;
  gap: 0.55rem;
  padding: 0.62rem 0.7rem;
  border-radius: 0.7rem;
  font-size: 0.84rem;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.68);
  transition:
    background 150ms ease,
    color 150ms ease,
    transform 150ms ease;

  span.icon {
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.45rem;
    background: rgba(255, 255, 255, 0.06);
    font-size: 0.72rem;
    font-weight: 700;
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
      rgba(124, 58, 237, 0.45),
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
  gap: 0.65rem;
  padding-top: 0.85rem;
`

const PlanBox = styled(Link)`
  display: block;
  padding: 0.85rem 0.9rem;
  border-radius: 0.85rem;
  background:
    radial-gradient(circle at 100% 0%, rgba(167, 139, 250, 0.35), transparent 45%),
    rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(196, 181, 253, 0.22);
  color: #fff;
  transition:
    transform 150ms ease,
    border-color 150ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(196, 181, 253, 0.45);
  }
`

const PlanLabel = styled.p`
  margin: 0;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`

const PlanValue = styled.p`
  margin: 0.25rem 0 0;
  font-weight: 750;
  font-size: 0.95rem;
  letter-spacing: -0.02em;
`

const PlanEdits = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.75rem;
  color: #c4b5fd;
`

const SignOut = styled.button`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  border-radius: 0.7rem;
  padding: 0.55rem 0.75rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 150ms ease,
    color 150ms ease;

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
  gap: 0.85rem;
  min-height: 3.4rem;
  padding: 0.55rem 0.9rem;
  background:
    linear-gradient(90deg, #1e1b4b 0%, #17152f 45%, #141224 100%);
  border-bottom: 1px solid rgba(196, 181, 253, 0.14);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 10px 28px rgba(30, 27, 75, 0.18);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0.55rem 1.25rem;
  }
`

const TopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`

const MobileBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  flex-shrink: 0;

  span.mark {
    display: grid;
    place-items: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 0.45rem;
    background: linear-gradient(145deg, #a78bfa, #7c3aed);
    color: #fff;
    font-size: 0.65rem;
    box-shadow: 0 6px 14px rgba(124, 58, 237, 0.35);
  }

  span.ai {
    color: #c4b5fd;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const Welcome = styled.div`
  display: none;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

const WelcomeLabel = styled.p`
  margin: 0;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
`

const WelcomeTitle = styled.p`
  margin: 0.1rem 0 0;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 22rem;
`

const PlanChip = styled(Link)`
  display: none;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.28);
  border: 1px solid rgba(196, 181, 253, 0.28);
  color: #e9e4ff;
  font-size: 0.72rem;
  font-weight: 650;
  white-space: nowrap;
  transition:
    background 150ms ease,
    border-color 150ms ease;

  &:hover {
    background: rgba(124, 58, 237, 0.42);
    border-color: rgba(196, 181, 253, 0.45);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
`

const UserPill = styled.div`
  display: none;
  align-items: center;
  gap: 0.45rem;
  padding: 0.22rem 0.6rem 0.22rem 0.22rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`

const Avatar = styled.span`
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: linear-gradient(145deg, #a78bfa, #7c3aed);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 750;
`

const UserName = styled.span`
  display: none;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  padding-right: 0.15rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
  }
`

const UploadBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.6rem;
  background: linear-gradient(145deg, #8b5cf6, #7c3aed 55%, #6d28d9);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  box-shadow: 0 6px 14px rgba(124, 58, 237, 0.3);
  white-space: nowrap;
  transition:
    transform 150ms ease,
    filter 150ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  span.full {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.42rem 0.85rem;

    span.full {
      display: inline;
    }

    span.short {
      display: none;
    }
  }
`

const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 74rem;
  margin: 0 auto;
  padding: 1rem 1rem 1.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1.15rem 1.5rem 2rem;
  }
`

const MobileNav = styled.nav`
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const MobileLink = styled(NavLink)`
  flex-shrink: 0;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid transparent;

  &.active {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primaryMuted};
  }
`

const NAV = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: '◆' },
  { to: ROUTES.newProject, label: 'New project', icon: '+' },
  { to: ROUTES.subscription, label: 'Subscription', icon: '◇' },
  { to: ROUTES.account, label: 'Account', icon: '◎' },
] as const

export function AppShell() {
  const { user, logout, isAdmin } = useAuth()
  const planName =
    PLANS.find((p) => p.id === user?.planId)?.name ?? user?.planId ?? '—'
  const editsLabel =
    user?.planId === 'unlimited'
      ? 'Unlimited edits'
      : `${user?.remainingEdits ?? 0} edits left`
  const initial = (user?.name?.trim()?.[0] ?? 'U').toUpperCase()
  const navLinks = isAdmin
    ? [...NAV, { to: ROUTES.admin, label: 'Admin', icon: '⚙' as const }]
    : [...NAV]

  return (
    <Shell>
      <Sidebar>
        <Brand to={ROUTES.home}>
          <BrandMark>CA</BrandMark>
          <BrandText>
            Clip<em>AI</em>
          </BrandText>
        </Brand>

        <NavLabel>Workspace</NavLabel>
        <Nav>
          {navLinks.map((link) => (
            <SideLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.dashboard}
            >
              <span className="icon" aria-hidden>
                {link.icon}
              </span>
              {link.label}
            </SideLink>
          ))}
        </Nav>

        <SideFoot>
          <PlanBox to={ROUTES.subscription}>
            <PlanLabel>Current plan</PlanLabel>
            <PlanValue>{planName}</PlanValue>
            <PlanEdits>{editsLabel}</PlanEdits>
          </PlanBox>
          <SignOut type="button" onClick={() => void logout()}>
            Sign out
          </SignOut>
        </SideFoot>
      </Sidebar>

      <Main>
        <TopBar>
          <TopLeft>
            <MobileBrand to={ROUTES.home}>
              <span className="mark">CA</span>
              Clip<span className="ai">AI</span>
            </MobileBrand>
            <Welcome>
              <WelcomeLabel>Workspace</WelcomeLabel>
              <WelcomeTitle>
                Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
              </WelcomeTitle>
            </Welcome>
            <PlanChip to={ROUTES.subscription} title={editsLabel}>
              {planName} · {editsLabel}
            </PlanChip>
          </TopLeft>
          <TopRight>
            <UserPill>
              <Avatar aria-hidden>{initial}</Avatar>
              <UserName>{user?.name}</UserName>
            </UserPill>
            <UploadBtn to={ROUTES.newProject}>
              <span className="short">+ Upload</span>
              <span className="full">+ Upload video</span>
            </UploadBtn>
          </TopRight>
        </TopBar>

        <MobileNav>
          {navLinks.map((link) => (
            <MobileLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.dashboard}
            >
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
