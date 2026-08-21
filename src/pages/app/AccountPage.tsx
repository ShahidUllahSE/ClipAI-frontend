import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { authApi } from '@/api'
import { Button, ErrorText, Field, HelpText, Input } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'

const Title = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Card = styled.form`
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.lg};
`

const Ok = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

export function AccountPage() {
  const { user, updateProfile, changePassword, refreshUser } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [profileMsg, setProfileMsg] = useState('')
  const [profileErr, setProfileErr] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [passErr, setPassErr] = useState('')
  const [verifyMsg, setVerifyMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const onProfile = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setProfileErr('')
    setProfileMsg('')
    try {
      await updateProfile({ name, email })
      setProfileMsg('Profile updated.')
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : 'Update failed.')
    } finally {
      setBusy(false)
    }
  }

  const onPassword = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setPassErr('')
    setPassMsg('')
    try {
      await changePassword(currentPassword, newPassword)
      setPassMsg('Password changed.')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setPassErr(err instanceof Error ? err.message : 'Could not change password.')
    } finally {
      setBusy(false)
    }
  }

  const onResend = async () => {
    setBusy(true)
    setVerifyMsg('')
    try {
      const result = await authApi.resendVerification()
      setVerifyMsg(result.message)
      await refreshUser()
    } catch (err) {
      setVerifyMsg(err instanceof Error ? err.message : 'Could not resend.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Title>Account settings</Title>
      <Lead>Profile, email verification, and password.</Lead>

      <Grid>
        <Card onSubmit={(e) => void onProfile(e)}>
          <CardTitle>Profile</CardTitle>
          {profileErr && <ErrorText>{profileErr}</ErrorText>}
          {profileMsg && <Ok>{profileMsg}</Ok>}
          <Field>
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field>
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <HelpText>
            Email verified: {user?.emailVerified ? 'Yes' : 'Pending'}
          </HelpText>
          {verifyMsg && <Ok>{verifyMsg}</Ok>}
          {!user?.emailVerified && (
            <Button
              type="button"
              $variant="ghost"
              disabled={busy}
              onClick={() => void onResend()}
              style={{ marginTop: '0.5rem' }}
            >
              Resend verification email
            </Button>
          )}
          <Button type="submit" disabled={busy} style={{ marginTop: '1rem' }}>
            Save profile
          </Button>
        </Card>

        <Card onSubmit={(e) => void onPassword(e)}>
          <CardTitle>Password</CardTitle>
          {passErr && <ErrorText>{passErr}</ErrorText>}
          {passMsg && <Ok>{passMsg}</Ok>}
          <Field>
            Current password
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Field>
          <Field>
            New password
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </Field>
          <Button type="submit" disabled={busy} $variant="secondary">
            Update password
          </Button>
        </Card>
      </Grid>
    </div>
  )
}
