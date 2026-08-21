import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.space.xl};
  }
`
