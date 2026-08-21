import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { adminApi, type AdminStats } from '@/api/adminApi'
import { Button, ErrorText } from '@/components/ui'
import { ROUTES } from '@/constants'

const fade = keyframes`
  from { opacity: 0; transform: translateY(0.3rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  animation: ${fade} 0.35s ease both;
`

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Eyebrow = styled.p`
  margin: 0 0 0.2rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.3rem, 2.4vw, 1.65rem);
  letter-spacing: -0.03em;
`

const Lead = styled.p`
  margin: 0.3rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
`

const Grid = styled.div`
  display: grid;
  gap: 0.65rem;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatCard = styled.article<{ $accent?: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $accent }) =>
    $accent
      ? `linear-gradient(145deg, ${theme.colors.primarySoft}, #fff 55%)`
      : theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: rgba(124, 58, 237, 0.08);
    transform: translate(30%, -30%);
  }
`

const StatLabel = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const StatValue = styled.p`
  position: relative;
  z-index: 1;
  margin: 0.35rem 0 0;
  font-size: clamp(1.45rem, 2.5vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.ink};
`

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
`

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.35rem;
  display: grid;
  gap: 0.35rem;
`

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.7rem;
  border-radius: 0.7rem;
  border: 1px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.elevated};
    border-color: ${({ theme }) => theme.colors.border};
  }
`

const UserMeta = styled.div`
  min-width: 0;
`

const UserName = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`

const UserEmail = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ViewLink = styled(Link)`
  flex-shrink: 0;
  padding: 0.35rem 0.65rem;
  border-radius: 0.55rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.74rem;
  font-weight: 650;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Foot = styled.div`
  padding: 0.65rem 0.85rem 0.85rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    adminApi
      .getStats()
      .then((data) => {
        if (mounted) setStats(data)
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load stats.')
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <Lead>Loading admin overview…</Lead>
  if (error) return <ErrorText>{error}</ErrorText>
  if (!stats) return null

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Overview</Eyebrow>
          <Title>Admin dashboard</Title>
          <Lead>Users, plans, and recent signups at a glance.</Lead>
        </div>
        <Button as={Link} to={ROUTES.adminUsers}>
          Manage users
        </Button>
      </Header>

      <Grid>
        <StatCard $accent>
          <StatLabel>Total users</StatLabel>
          <StatValue>{stats.totals.users}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Active</StatLabel>
          <StatValue>{stats.totals.activeUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Admins</StatLabel>
          <StatValue>{stats.totals.admins}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Verified email</StatLabel>
          <StatValue>{stats.totals.verifiedUsers}</StatValue>
        </StatCard>
      </Grid>

      <Panel>
        <PanelHead>
          <PanelTitle>Recent users</PanelTitle>
          <ViewLink to={ROUTES.adminUsers}>View all</ViewLink>
        </PanelHead>
        <List>
          {stats.recentUsers.map((user) => (
            <Row key={user.id}>
              <UserMeta>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserMeta>
              <ViewLink to={ROUTES.adminUser(user.id)}>View</ViewLink>
            </Row>
          ))}
        </List>
        <Foot>
          <Button as={Link} to={ROUTES.adminUsers} $variant="secondary">
            Manage all users
          </Button>
        </Foot>
      </Panel>
    </Page>
  )
}
