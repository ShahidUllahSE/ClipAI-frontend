import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { Button } from './Button'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.7rem) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space.lg};
  background: rgba(30, 27, 75, 0.52);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.18s ease both;
`

const Dialog = styled.div`
  position: relative;
  width: min(100%, 24.5rem);
  padding: 1.65rem 1.65rem 1.4rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 24px 60px rgba(30, 27, 75, 0.18);
  animation: ${riseIn} 0.26s ${({ theme }) => theme.transitions.slow} both;
`

const IconWrap = styled.div<{ $danger?: boolean }>`
  width: 3.1rem;
  height: 3.1rem;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background: ${({ $danger }) =>
    $danger ? 'rgba(220, 38, 38, 0.1)' : '#f5f3ff'};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error : theme.colors.primary};
`

const Title = styled.h2`
  margin: 0 0 0.4rem;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
`

const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.5;
`

const Detail = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.8125rem;
  font-weight: 650;
  line-height: 1.4;
  overflow-wrap: anywhere;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  margin-top: 1.35rem;
`

interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  detail?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  busy?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmModal({
  open,
  title,
  description,
  detail,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  busy = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, busy, onCancel])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel()
      }}
    >
      <Dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
      >
        <IconWrap $danger={danger} aria-hidden>
          {danger ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 7h15M9.5 7V5.6A1.6 1.6 0 0111.1 4h1.8A1.6 1.6 0 0114.5 5.6V7m3 0v11.2A1.8 1.8 0 0115.7 20H8.3A1.8 1.8 0 016.5 18.2V7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11v5M14 11v5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 8v5M12 16.2h.01"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </IconWrap>
        <Title id="confirm-modal-title">{title}</Title>
        <Lead id="confirm-modal-desc">{description}</Lead>
        {detail ? <Detail>{detail}</Detail> : null}
        <Actions>
          <Button
            ref={cancelRef}
            type="button"
            $variant="secondary"
            disabled={busy}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            $variant={danger ? 'danger' : 'primary'}
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? 'Deleting…' : confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Overlay>,
    document.body,
  )
}
