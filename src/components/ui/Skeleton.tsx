import styled, { keyframes } from 'styled-components'

const sweep = keyframes`
  100% {
    transform: translateX(100%);
  }
`

export const Skeleton = styled.div<{
  $w?: string
  $h?: string
  $r?: string
  $mt?: string
  $tone?: 'light' | 'dark'
}>`
  position: relative;
  overflow: hidden;
  width: ${({ $w }) => $w ?? '100%'};
  height: ${({ $h }) => $h ?? '0.8rem'};
  margin-top: ${({ $mt }) => $mt ?? '0'};
  border-radius: ${({ $r }) => $r ?? '0.5rem'};
  background: ${({ theme, $tone }) =>
    $tone === 'dark' ? 'rgba(255, 255, 255, 0.12)' : theme.colors.elevated};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ $tone }) =>
        $tone === 'dark' ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.72)'}
        50%,
      transparent 100%
    );
    animation: ${sweep} 1.35s ease-in-out infinite;
  }
`

export const SkeletonBlock = styled(Skeleton)`
  display: block;
`
