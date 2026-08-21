import styled, { keyframes } from 'styled-components'

const STEPS = [
  { id: 'Queued', label: 'Queued' },
  { id: 'Analyzing', label: 'Analyzing' },
  { id: 'Preparing edit', label: 'Preparing edit' },
  { id: 'Rendering', label: 'Rendering' },
] as const

const COPY: Record<string, string> = {
  Queued: 'Your clip is in the AI edit queue…',
  Analyzing: 'Scanning audio peaks and quiet waits…',
  'Preparing edit': 'Building keep/cut decisions…',
  Rendering: 'Cutting and exporting your social MP4…',
  Uploading: 'Uploading source footage…',
}

function stepIndex(status: string) {
  const i = STEPS.findIndex((s) => s.id === status)
  if (status === 'Uploading') return 0
  return i >= 0 ? i : 0
}

const scan = keyframes`
  0% { transform: translateY(-120%); opacity: 0; }
  15% { opacity: 0.85; }
  100% { transform: translateY(220%); opacity: 0; }
`

const pulse = keyframes`
  0%, 100% { transform: scale(0.92); opacity: 0.55; }
  50% { transform: scale(1.08); opacity: 1; }
`

const orbit = keyframes`
  to { transform: rotate(360deg); }
`

const bar = keyframes`
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
`

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background:
    linear-gradient(180deg, rgba(12, 12, 16, 0.55), rgba(12, 12, 16, 0.82)),
    radial-gradient(ellipse at 50% 20%, rgba(109, 40, 217, 0.28), transparent 55%);
  color: #f8fafc;
  text-align: center;
  overflow: hidden;
  z-index: 2;
`

const ScanLine = styled.div`
  position: absolute;
  left: 8%;
  right: 8%;
  height: 28%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(196, 181, 253, 0.22),
    transparent
  );
  animation: ${scan} 2.4s ease-in-out infinite;
  pointer-events: none;
`

const Core = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 auto 1rem;
`

const Ring = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #c4b5fd;
  border-right-color: rgba(196, 181, 253, 0.35);
  animation: ${orbit} 1.1s linear infinite;
`

const Glow = styled.div`
  position: absolute;
  inset: 18%;
  border-radius: 50%;
  background: radial-gradient(circle, #a78bfa, #6d28d9 70%);
  animation: ${pulse} 1.6s ease-in-out infinite;
`

const Wave = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.28rem;
  height: 1.75rem;
  margin-bottom: 1rem;
`

const WaveBar = styled.span<{ $delay: number }>`
  width: 0.28rem;
  height: 100%;
  border-radius: 999px;
  background: #ddd6fe;
  transform-origin: bottom;
  animation: ${bar} 0.9s ease-in-out infinite;
  animation-delay: ${({ $delay }) => `${$delay}s`};
`

const Status = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: 0.01em;
`

const Hint = styled.p`
  margin: 0 0 1.1rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: rgba(248, 250, 252, 0.72);
  max-width: 16rem;
`

const Track = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
  width: min(100%, 14rem);
  text-align: left;
`

const Step = styled.li<{ $state: 'done' | 'active' | 'todo' }>`
  display: grid;
  grid-template-columns: 0.7rem 1fr;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.72rem;
  color: ${({ $state }) =>
    $state === 'todo'
      ? 'rgba(248, 250, 252, 0.4)'
      : $state === 'active'
        ? '#f5f3ff'
        : 'rgba(196, 181, 253, 0.9)'};

  &::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: ${({ $state }) =>
      $state === 'todo'
        ? 'rgba(248, 250, 252, 0.25)'
        : $state === 'active'
          ? '#c4b5fd'
          : '#86efac'};
    box-shadow: ${({ $state }) =>
      $state === 'active' ? '0 0 0 4px rgba(196, 181, 253, 0.2)' : 'none'};
  }
`

const Progress = styled.div`
  margin-top: 1rem;
  height: 0.28rem;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(248, 250, 252, 0.12);
  width: min(100%, 14rem);

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 42%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      transparent,
      #c4b5fd,
      #a78bfa,
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.4s linear infinite;
  }
`

export function AiProcessingOverlay({ status }: { status: string }) {
  const active = stepIndex(status)
  const copy = COPY[status] || 'AI is editing your video…'

  return (
    <Wrap role="status" aria-live="polite" aria-busy="true">
      <ScanLine aria-hidden />
      <div>
        <Core aria-hidden>
          <Ring />
          <Glow />
        </Core>
        <Wave aria-hidden>
          {[0, 0.12, 0.24, 0.08, 0.2, 0.32, 0.16].map((delay, i) => (
            <WaveBar key={i} $delay={delay} />
          ))}
        </Wave>
        <Status>{status}</Status>
        <Hint>{copy}</Hint>
        <Track>
          {STEPS.map((step, i) => {
            const state =
              i < active ? 'done' : i === active ? 'active' : 'todo'
            return (
              <Step key={step.id} $state={state}>
                {step.label}
              </Step>
            )
          })}
        </Track>
        <Progress aria-hidden />
      </div>
    </Wrap>
  )
}

export function isProjectProcessing(status: string) {
  return (
    status === 'Queued' ||
    status === 'Analyzing' ||
    status === 'Preparing edit' ||
    status === 'Rendering' ||
    status === 'Uploading'
  )
}
