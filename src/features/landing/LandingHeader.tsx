import { Link, useLocation } from 'react-router-dom'
import { useEffect, useId, useState } from 'react'
import styled from 'styled-components'
import { Button, Container } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { useAuthModal } from '@/features/auth'
import { APP_NAME, NAV_LINKS, ROUTES } from '@/constants'

const HeaderRoot = styled.header<{ $solid: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0.65rem 0;
  transition:
    background-color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  ${({ $solid, theme }) =>
    $solid
      ? `
    background: color-mix(in srgb, ${theme.colors.white} 94%, transparent);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid ${theme.colors.border};
    box-shadow: 0 8px 24px rgba(30, 27, 75, 0.06);
    color: ${theme.colors.ink};
  `
      : `
    background: transparent;
    border-bottom: 1px solid transparent;
    color: ${theme.colors.white};
  `}
`

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const Brand = styled(Link)`
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.04em;
  color: inherit;
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.15rem;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    gap: 0.35rem;
  }
`

const NavLink = styled(Link)<{ $solid: boolean }>`
  flex-shrink: 0;
  padding: 0.35rem 0.55rem;
  border-radius: 0.45rem;
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $solid, theme }) =>
    $solid ? theme.colors.textMuted : 'rgba(255, 255, 255, 0.82)'};
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0.35rem 0.65rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &:hover {
    color: ${({ $solid, theme }) =>
      $solid ? theme.colors.primary : theme.colors.white};
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
`

const TextAction = styled.button`
  display: none;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: inherit;
  padding: 0.4rem 0.55rem;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline-flex;
  }

  &:hover {
    opacity: 0.85;
  }
`

const TextLink = styled(Link)`
  display: none;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: inherit;
  padding: 0.4rem 0.55rem;
  line-height: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline-flex;
  }

  &:hover {
    opacity: 0.85;
  }
`

const MenuToggle = styled.button<{ $solid: boolean; $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.55rem;
  border: 1px solid
    ${({ $solid }) =>
      $solid ? 'rgba(30, 27, 75, 0.12)' : 'rgba(255, 255, 255, 0.28)'};
  background: ${({ $solid }) =>
    $solid ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.08)'};
  color: inherit;
  cursor: pointer;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }

  span {
    display: block;
    width: 1rem;
    height: 1.5px;
    border-radius: 1px;
    background: currentColor;
    position: relative;
    transition: transform 160ms ease, opacity 160ms ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: inherit;
      transition: transform 160ms ease;
    }

    &::before {
      top: -5px;
    }

    &::after {
      top: 5px;
    }
  }

  ${({ $open }) =>
    $open &&
    `
    span {
      background: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
        background: currentColor;
      }

      &::after {
        top: 0;
        transform: rotate(-45deg);
        background: currentColor;
      }
    }
  `}
`

const MobilePanel = styled.div<{ $solid: boolean; $open: boolean }>`
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  gap: 0.15rem;
  padding: 0.65rem ${({ theme }) => theme.space.md} 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: ${({ theme }) => theme.space.lg};
    padding-right: ${({ theme }) => theme.space.lg};
  }
  border-top: 1px solid
    ${({ $solid, theme }) =>
      $solid ? theme.colors.border : 'rgba(255, 255, 255, 0.12)'};
  background: ${({ $solid, theme }) =>
    $solid
      ? `color-mix(in srgb, ${theme.colors.white} 96%, transparent)`
      : 'rgba(30, 27, 75, 0.94)'};
  backdrop-filter: blur(14px);
  color: ${({ $solid, theme }) =>
    $solid ? theme.colors.ink : theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

const MobileLink = styled(Link)`
  padding: 0.7rem 0.75rem;
  border-radius: 0.55rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: inherit;

  &:hover {
    background: rgba(124, 58, 237, 0.1);
  }
`

const MobileActions = styled.div`
  display: grid;
  gap: 0.45rem;
  margin-top: 0.45rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(124, 58, 237, 0.15);
`

export function LandingHeader() {
  const { pathname } = useLocation()
  const { openAuth } = useAuthModal()
  const { user, logout } = useAuth()
  const isHome = pathname === ROUTES.home
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const solid = !isHome || scrolled || menuOpen

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <HeaderRoot $solid={solid}>
      <Inner>
        <Brand to={ROUTES.home}>{APP_NAME}</Brand>
        <Nav aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} $solid={solid}>
              {link.label}
            </NavLink>
          ))}
        </Nav>
        <Actions>
          {user ? (
            <>
              <TextLink to={ROUTES.dashboard}>Dashboard</TextLink>
              <Button as={Link} to={ROUTES.newProject} $size="sm">
                Upload
              </Button>
              <TextAction type="button" onClick={() => void logout()}>
                Sign out
              </TextAction>
            </>
          ) : (
            <>
              <TextAction type="button" onClick={() => openAuth('login')}>
                Sign in
              </TextAction>
              <Button
                type="button"
                $size="sm"
                onClick={() => openAuth('register')}
              >
                Get started
              </Button>
            </>
          )}
          <MenuToggle
            type="button"
            $solid={solid}
            $open={menuOpen}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </MenuToggle>
        </Actions>
      </Inner>

      <MobilePanel id={menuId} $solid={solid} $open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <MobileLink key={link.to} to={link.to}>
            {link.label}
          </MobileLink>
        ))}
        <MobileActions>
          {user ? (
            <>
              <Button as={Link} to={ROUTES.dashboard} $variant="secondary" $size="sm">
                Dashboard
              </Button>
              <Button as={Link} to={ROUTES.newProject} $size="sm">
                Upload
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                $variant="secondary"
                $size="sm"
                onClick={() => {
                  setMenuOpen(false)
                  openAuth('login')
                }}
              >
                Sign in
              </Button>
              <Button
                type="button"
                $size="sm"
                onClick={() => {
                  setMenuOpen(false)
                  openAuth('register')
                }}
              >
                Get started
              </Button>
            </>
          )}
        </MobileActions>
      </MobilePanel>
    </HeaderRoot>
  )
}
