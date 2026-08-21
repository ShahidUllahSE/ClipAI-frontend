import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { APP_NAME, ROUTES } from '@/constants'

const FooterRoot = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.space['2xl']} 0 ${theme.space.xl}`};
`

const Inner = styled(Container)`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.3fr 1fr 1fr;
  }
`

const Brand = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.04em;
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  max-width: 28ch;
`

const ColTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Links = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`

const NavItem = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const AccountButton = styled.button`
  display: inline;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Legal = styled.p`
  margin-top: ${({ theme }) => theme.space['2xl']};
  padding-top: ${({ theme }) => theme.space.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function LandingFooter() {
  const year = new Date().getFullYear()
  const { openAuth } = useAuthModal()

  return (
    <FooterRoot>
      <Inner>
        <div>
          <Brand to={ROUTES.home}>{APP_NAME}</Brand>
          <Tagline>
            AI video editing for social creators — clean cuts, clear workflow,
            ready exports.
          </Tagline>
        </div>
        <div>
          <ColTitle>Product</ColTitle>
          <Links>
            <NavItem to={ROUTES.features}>Features</NavItem>
            <NavItem to={ROUTES.services}>Services</NavItem>
            <NavItem to={ROUTES.modes}>Modes</NavItem>
            <NavItem to={ROUTES.how}>How it works</NavItem>
            <NavItem to={ROUTES.pricing}>Pricing</NavItem>
            <NavItem to={ROUTES.about}>About</NavItem>
          </Links>
        </div>
        <div>
          <ColTitle>Account</ColTitle>
          <Links>
            <AccountButton type="button" onClick={() => openAuth('login')}>
              Sign in
            </AccountButton>
            <AccountButton type="button" onClick={() => openAuth('register')}>
              Get started
            </AccountButton>
          </Links>
        </div>
      </Inner>
      <Container>
        <Legal>
          &copy; {year} {APP_NAME}. All rights reserved.
        </Legal>
      </Container>
    </FooterRoot>
  )
}
