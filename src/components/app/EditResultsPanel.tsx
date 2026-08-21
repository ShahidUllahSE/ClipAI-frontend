import styled, { keyframes } from 'styled-components'
import { formatDuration } from '@/utils/video'

type DoneItem = {
  id: string
  title: string
  detail: string
  tone: 'speech' | 'cut' | 'look' | 'audio' | 'export'
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(0.3rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Wrap = styled.section`
  padding: 0.85rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  animation: ${fadeUp} 0.4s ease both;
`

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const HeadText = styled.div`
  min-width: 0;
`

const Eyebrow = styled.p`
  margin: 0 0 0.15rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  letter-spacing: -0.02em;
`

const Lead = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  line-height: 1.4;
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`

const Stat = styled.div`
  min-width: 4.5rem;
  padding: 0.4rem 0.55rem;
  border-radius: 0.55rem;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const StatLabel = styled.p`
  margin: 0;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StatValue = styled.p`
  margin: 0.1rem 0 0;
  font-size: 0.95rem;
  font-weight: 750;
  letter-spacing: -0.03em;
`

const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Item = styled.li<{ $tone: DoneItem['tone'] }>`
  display: grid;
  grid-template-columns: 1.7rem 1fr;
  gap: 0.5rem;
  align-items: start;
  padding: 0.55rem 0.6rem;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const Mark = styled.span<{ $tone: DoneItem['tone'] }>`
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $tone, theme }) => {
    if ($tone === 'cut') return 'rgba(22, 163, 74, 0.12)'
    if ($tone === 'look') return 'rgba(124, 58, 237, 0.12)'
    if ($tone === 'audio') return 'rgba(14, 165, 233, 0.12)'
    if ($tone === 'export') return 'rgba(245, 158, 11, 0.14)'
    return theme.colors.primarySoft
  }};
  color: ${({ $tone, theme }) => {
    if ($tone === 'cut') return theme.colors.success
    if ($tone === 'look') return theme.colors.primary
    if ($tone === 'audio') return '#0284c7'
    if ($tone === 'export') return '#d97706'
    return theme.colors.primary
  }};
`

const ItemTitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 650;
`

const ItemDetail = styled.p`
  margin: 0.1rem 0 0;
  font-size: 0.7rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.textMuted};
`

function iconFor(tone: DoneItem['tone']) {
  if (tone === 'cut') return '✓'
  if (tone === 'look') return '✦'
  if (tone === 'audio') return '♪'
  if (tone === 'export') return '↓'
  return 'AI'
}

function buildItems(
  notes: string[],
  opts?: { removedSeconds?: number; outputDuration?: number },
): DoneItem[] {
  const items: DoneItem[] = []
  const joined = notes.join('\n')

  if (/Groq|Transcript|Whisper|speech/i.test(joined)) {
    items.push({
      id: 'speech',
      tone: 'speech',
      title: 'Speech understood',
      detail: 'Transcribed audio and mapped pauses for jump cuts.',
    })
  }

  if (/Jump cuts|Keep-segments|sound-peak|Quiet waits|removed/i.test(joined)) {
    const removed =
      typeof opts?.removedSeconds === 'number'
        ? ` Cut ~${opts.removedSeconds.toFixed(1)}s of waiting.`
        : ''
    items.push({
      id: 'cuts',
      tone: 'cut',
      title: 'Smart jump cuts',
      detail: `Dead air trimmed for a tighter social cut.${removed}`,
    })
  }

  if (/Segment speed ramp|Playback speed/i.test(joined)) {
    items.push({
      id: 'speed',
      tone: 'cut',
      title: 'Speed ramp',
      detail: 'Key moments at 1×; softer segments accelerated.',
    })
  }

  if (/Timed captions|Caption burn-in/i.test(joined)) {
    items.push({
      id: 'captions',
      tone: 'look',
      title: 'Captions',
      detail: /Timed captions/i.test(joined)
        ? 'Timed speech captions burned into the export.'
        : 'On-screen text added for social readability.',
    })
  }

  if (/Aspect|Crop|Color grade|Fade|Mirror|title card|polish/i.test(joined)) {
    items.push({
      id: 'polish',
      tone: 'look',
      title: 'Studio polish',
      detail: 'Framing, grade, fades, and finish applied locally.',
    })
  }

  if (/Audio normalize/i.test(joined)) {
    items.push({
      id: 'audio-norm',
      tone: 'audio',
      title: 'Audio leveled',
      detail: 'Loudness normalized for phone playback.',
    })
  } else if (/Audio muted/i.test(joined)) {
    items.push({
      id: 'audio-mute',
      tone: 'audio',
      title: 'Audio muted',
      detail: 'Original audio turned off for this export.',
    })
  } else if (!/No source audio/i.test(joined)) {
    items.push({
      id: 'audio-keep',
      tone: 'audio',
      title: 'Audio kept',
      detail: 'Source sound preserved in the final MP4.',
    })
  }

  items.push({
    id: 'ready',
    tone: 'export',
    title: 'Ready to share',
    detail:
      typeof opts?.outputDuration === 'number'
        ? `Finished MP4 · ~${formatDuration(opts.outputDuration)}`
        : 'Edited MP4 ready to preview and download.',
  })

  return items
}

export function EditResultsPanel({
  notes,
  removedSeconds,
  outputDuration,
}: {
  notes: string[]
  removedSeconds?: number
  outputDuration?: number
}) {
  const items = buildItems(notes, { removedSeconds, outputDuration })

  return (
    <Wrap aria-label="What we did for your video">
      <Head>
        <HeadText>
          <Eyebrow>Edit report</Eyebrow>
          <Title>What we did for you</Title>
          <Lead>AI analysis, cuts, and polish applied to this upload.</Lead>
        </HeadText>
        <Stats>
          <Stat>
            <StatLabel>Removed</StatLabel>
            <StatValue>
              {typeof removedSeconds === 'number'
                ? `${removedSeconds.toFixed(1)}s`
                : '—'}
            </StatValue>
          </Stat>
          <Stat>
            <StatLabel>Output</StatLabel>
            <StatValue>
              {typeof outputDuration === 'number'
                ? formatDuration(outputDuration)
                : '—'}
            </StatValue>
          </Stat>
        </Stats>
      </Head>

      <Grid>
        {items.map((item) => (
          <Item key={item.id} $tone={item.tone}>
            <Mark $tone={item.tone} aria-hidden>
              {iconFor(item.tone)}
            </Mark>
            <div>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDetail>{item.detail}</ItemDetail>
            </div>
          </Item>
        ))}
      </Grid>
    </Wrap>
  )
}
