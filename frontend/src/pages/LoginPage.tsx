import axios from 'axios'
import { ArrowLeft, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo geoacesso 1.png'
import { useAuth } from '../context/useAuth'

type LoginFormData = {
  email: string
  password: string
}

type LoginPageProps = {
  onBackHome: () => void
  onCreateAccount: () => void
}

export function LoginPage({ onBackHome, onCreateAccount }: LoginPageProps) {
  const { login } = useAuth()
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setFeedbackMessage('')

    try {
      await login(data.email, data.password)
      // Sucesso: redireciona para a home ("/").
      onBackHome()
    } catch (error) {
      setFeedbackType('error')

      const status = axios.isAxiosError(error) ? error.response?.status : undefined

      if (status === 401 || status === 403) {
        setFeedbackMessage('E-mail ou senha inválidos')
      } else {
        setFeedbackMessage('Erro ao conectar com o servidor')
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111827] px-0 py-10 text-white sm:px-6">
      <section className="w-[90%] max-w-md rounded-2xl bg-[#374151] p-6 shadow-lg sm:p-8">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-6 inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-[#E4C31A] transition hover:text-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C31A]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Voltar
        </button>

        <div className="mb-8 text-center">
          <img className="mx-auto h-30 w-auto object-contain" src={logo} alt="GeoAcesso" />
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">
            Acesse sua conta
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
            Entre para salvar locais acessiveis, revisar recursos e acompanhar sua comunidade.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-white">
              Email
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#E4C31A]">
              <Mail className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] placeholder:text-gray-500 focus:outline-none"
                {...register('email', {
                  required: 'Informe seu email.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Informe um email valido.',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm font-medium text-[#F5D742]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-white">
              Senha
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#E4C31A]">
              <Lock className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] placeholder:text-gray-500 focus:outline-none"
                {...register('password', {
                  required: 'Informe sua senha.',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter no minimo 6 caracteres.',
                  },
                })}
              />
            </div>
            {errors.password && (
              <p id="password-error" className="mt-2 text-sm font-medium text-[#F5D742]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
            <a
              href="#esqueci-minha-senha"
              className="text-[#E4C31A] transition hover:text-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C31A]"
            >
              Esqueci minha senha
            </a>
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-[#E4C31A] transition hover:text-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C31A]"
            >
              Criar conta
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#E4C31A] px-4 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D742] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="rounded-xl bg-[#1F2937] px-4 py-3 text-xs leading-5 text-[#9CA3AF]">
            Conta mock inicial: teste@geoacesso.com / 123456. Contas criadas no cadastro ficam
            salvas no navegador.
          </p>

          {feedbackMessage && (
            <p
              className={`rounded-xl bg-[#1F2937] px-4 py-3 text-sm leading-6 ${
                feedbackType === 'success' ? 'text-[#D1D5DB]' : 'text-[#F5D742]'
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
