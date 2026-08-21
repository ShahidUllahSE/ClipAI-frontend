import styled from 'styled-components'

export const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.ink};
`

export const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Select = styled.select`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const TextArea = styled.textarea`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  min-height: 5rem;
  resize: vertical;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

export const HelpText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`
