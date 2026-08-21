import styled, { keyframes } from 'styled-components'
import { APP_NAME } from '@/constants'

const ITEMS = [
  `${APP_NAME} AI VIDEO EDITING`,
  'TALKING-HEAD JUMP CUTS',
  'RAPID-CUT FOR REELS',
  'ASMR & UNBOXING MODE',
  'AUTO CAPTIONS',
  '9:16 · 1:1 · 16:9',
  'SOCIAL-READY EXPORTS',
]

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const Strip = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: #0a0a0b;
  overflow: hidden;
  border-block: 1px solid rgba(10, 10, 11, 0.12);
`

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: ${({ theme }) => theme.space.xl};
  padding: 0.95rem 0;
  animation: ${drift} 36s linear infinite;
`

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;

  &::after {
    content: '•';
    opacity: 0.55;
  }
`

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS]

  return (
    <Strip aria-hidden>
      <Track>
        {loop.map((item, index) => (
          <Item key={`${item}-${index}`}>{item}</Item>
        ))}
      </Track>
    </Strip>
  )
}
