import styled, { css } from 'styled-components'

export const Button = styled.button<{
  $variant?: 'primary' | 'secondary' | 'ghost' | 'light'
  $size?: 'sm' | 'md'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
  }

  ${({ $size = 'md' }) =>
    $size === 'sm'
      ? css`
          padding: 0.4rem 0.85rem;
          font-size: 0.8125rem;
          border-radius: 0.6rem;
          box-shadow: none;

          &:hover {
            transform: none;
          }
        `
      : css`
          padding: 0.65rem 1.2rem;
          font-size: 0.875rem;
        `}

  ${({ theme, $variant = 'primary', $size = 'md' }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.ink};
          border-color: ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
          }
        `
      case 'light':
        return `
          background: ${theme.colors.primarySoft};
          color: ${theme.colors.primary};
          border-color: transparent;

          &:hover {
            background: ${theme.colors.elevated};
            color: ${theme.colors.primaryHover};
          }
        `
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textMuted};

          &:hover {
            color: ${theme.colors.text};
          }
        `
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          box-shadow: ${
            $size === 'sm'
              ? '0 4px 12px rgba(124, 58, 237, 0.22)'
              : '0 8px 20px rgba(124, 58, 237, 0.28)'
          };

          &:hover {
            background: ${theme.colors.primaryHover};
          }
        `
    }
  }}
`
