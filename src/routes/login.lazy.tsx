import { LoginForm } from '@/components/LoginForm'
import { login } from '@/lib/auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Login
})

function Login() {
    return (
        <div>
            <LoginForm login={login} />
        </div>
    )
}