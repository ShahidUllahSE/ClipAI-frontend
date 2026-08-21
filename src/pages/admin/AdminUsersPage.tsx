import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { adminApi } from '@/api/adminApi'
import { Button, ErrorText, Input } from '@/components/ui'
import { PLANS, ROUTES } from '@/constants'
import type { PlanId, User, UserRole } from '@/types/app'

const fade = keyframes`
  from { opacity: 0; transform: translateY(0.3rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  animation: ${fade} 0.35s ease both;
`

const Header = styled.header`
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

const Filters = styled.form`
  display: grid;
  gap: 0.55rem;
  margin-bottom: 0.85rem;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.9rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr auto;
    align-items: end;
  }
`

const Field = styled.label`
  display: grid;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Select = styled.select`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.84rem;
`

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;

  th,
  td {
    text-align: left;
    padding: 0.7rem 0.85rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    vertical-align: middle;
  }

  th {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
    background: ${({ theme }) => theme.colors.elevated};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.elevated};
  }
`

const Email = styled.div`
  margin-top: 0.15rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Pager = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.85rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Pill = styled.span<{ $tone?: 'ok' | 'warn' | 'muted' }>`
  display: inline-block;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  background: ${({ theme, $tone }) =>
    $tone === 'ok'
      ? theme.colors.primarySoft
      : $tone === 'warn'
        ? 'rgba(220, 38, 38, 0.1)'
        : theme.colors.elevated};
  color: ${({ theme, $tone }) =>
    $tone === 'ok'
      ? theme.colors.primary
      : $tone === 'warn'
        ? theme.colors.error
        : theme.colors.textMuted};
`

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [q, setQ] = useState('')
  const [planId, setPlanId] = useState<PlanId | ''>('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async (nextPage = page) => {
    setLoading(true)
    setError('')
    try {
      const data = await adminApi.listUsers({
        page: nextPage,
        limit: 20,
        q: q || undefined,
        planId: planId || undefined,
        role: role || undefined,
      })
      setUsers(data.items)
      setPage(data.pagination.page)
      setPages(data.pagination.pages)
      setTotal(data.pagination.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    void load(1)
  }

  return (
    <Page>
      <Header>
        <Eyebrow>Directory</Eyebrow>
        <Title>Users</Title>
        <Lead>{total} accounts · search, filter, and manage roles & plans</Lead>
      </Header>
      {error && <ErrorText>{error}</ErrorText>}

      <Filters onSubmit={onSearch}>
        <Field>
          Search
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name or email"
          />
        </Field>
        <Field>
          Plan
          <Select
            value={planId}
            onChange={(e) => setPlanId(e.target.value as PlanId | '')}
          >
            <option value="">All plans</option>
            {PLANS.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          Role
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole | '')}
          >
            <option value="">All roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </Field>
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Filter'}
        </Button>
      </Filters>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <strong>{user.name}</strong>
                  <Email>{user.email}</Email>
                </td>
                <td>{user.planId}</td>
                <td>
                  <Pill $tone={user.role === 'admin' ? 'ok' : 'muted'}>
                    {user.role}
                  </Pill>
                </td>
                <td>
                  <Pill $tone={user.isActive ? 'ok' : 'warn'}>
                    {user.isActive ? 'active' : 'disabled'}
                  </Pill>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={ROUTES.adminUser(user.id)}
                    $variant="secondary"
                  >
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={5}>No users found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrap>

      <Pager>
        <Button
          type="button"
          $variant="secondary"
          disabled={page <= 1 || loading}
          onClick={() => void load(page - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} / {pages}
        </span>
        <Button
          type="button"
          $variant="secondary"
          disabled={page >= pages || loading}
          onClick={() => void load(page + 1)}
        >
          Next
        </Button>
      </Pager>
    </Page>
  )
}
