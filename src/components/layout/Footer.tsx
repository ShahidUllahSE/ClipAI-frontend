import styled from 'styled-components'
import { Container } from '@/components/ui'

const FooterRoot = styled.footer`
  margin-top: auto;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space.xl} 0;
`

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <FooterRoot>
      <Container>
        <FooterText>&copy; {year} VideoWebsite. All rights reserved.</FooterText>
      </Container>
    </FooterRoot>
  )
}
