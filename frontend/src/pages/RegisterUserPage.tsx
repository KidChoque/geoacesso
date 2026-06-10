import axios from 'axios'
import { ArrowLeft, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo geoacesso 1.png'
import { registerUser } from '../services/authService'

type RegisterUserFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterUserPageProps = {
  onBackHome: () => void
  onLoginClick: () => void
}

export function RegisterUserPage({ onBackHome, onLoginClick }: RegisterUserPageProps) {
  const [successMessage, setSuccessMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  })
  const onSubmit = async (data: RegisterUserFormData) => {
    setSuccessMessage('')
    setSubmitError('')

    try {
      await registerUser({
        nome: data.name.trim(),
        email: data.email,
        senha: data.password,
        confirmarSenha: data.confirmPassword,
      })

      setSuccessMessage('Cadastro realizado com sucesso')
      reset()
      // Redireciona para a tela de login apos o cadastro bem-sucedido.
      setTimeout(() => {
        onLoginClick()
      }, 1500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status

        if (status === 400) {
          const serverMessage =
            typeof error.response?.data === 'string' ? error.response.data.trim() : ''
          setSubmitError(
            serverMessage ||
              'Nao foi possivel concluir o cadastro. Verifique os dados informados.',
          )
          return
        }
      }

      setSubmitError('Erro ao conectar ao servidor')
    }
  }

  const fieldStateClass = (hasError: boolean) =>
    hasError
      ? 'outline outline-2 outline-offset-2 outline-[#F5D742]'
      : 'focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#E4C31A]'

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111827] px-0 py-10 text-white sm:px-6">
      <section className="w-[90%] max-w-lg rounded-2xl bg-[#374151] p-6 shadow-lg sm:p-8">
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
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">Criar conta</h1>
          <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
            Cadastre uma conta mockada para testar o fluxo local de login sem backend.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="register-name" className="text-sm font-semibold text-white">
              Nome
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] ${fieldStateClass(
                Boolean(errors.name),
              )}`}
            >
              <User className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'register-name-error' : undefined}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] placeholder:text-gray-500 focus:outline-none"
                {...register('name', {
                  required: 'Informe seu nome.',
                  minLength: {
                    value: 3,
                    message: 'O nome deve ter no minimo 3 caracteres.',
                  },
                })}
              />
            </div>
            {errors.name && (
              <p id="register-name-error" className="mt-2 text-sm font-medium text-[#F5D742]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="register-email" className="text-sm font-semibold text-white">
              Email
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] ${fieldStateClass(
                Boolean(errors.email),
              )}`}
            >
              <Mail className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'register-email-error' : undefined}
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
              <p id="register-email-error" className="mt-2 text-sm font-medium text-[#F5D742]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="register-password" className="text-sm font-semibold text-white">
              Senha
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] ${fieldStateClass(
                Boolean(errors.password),
              )}`}
            >
              <Lock className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                placeholder="Minimo 6 caracteres"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'register-password-error' : undefined}
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
              <p id="register-password-error" className="mt-2 text-sm font-medium text-[#F5D742]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="register-confirm-password" className="text-sm font-semibold text-white">
              Confirmar senha
            </label>
            <div
              className={`mt-2 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111827] ${fieldStateClass(
                Boolean(errors.confirmPassword),
              )}`}
            >
              <Lock className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
              <input
                id="register-confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Repita sua senha"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={
                  errors.confirmPassword ? 'register-confirm-password-error' : undefined
                }
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] placeholder:text-gray-500 focus:outline-none"
                {...register('confirmPassword', {
                  required: 'Confirme sua senha.',
                  validate: (value) =>
                    value === getValues('password') || 'As senhas precisam ser iguais.',
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p
                id="register-confirm-password-error"
                className="mt-2 text-sm font-medium text-[#F5D742]"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#E4C31A] px-4 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D742] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
          </button>

          <button
            type="button"
            onClick={onLoginClick}
            className="w-full rounded-xl border border-[#E4C31A] px-4 py-3 text-sm font-bold text-[#E4C31A] transition hover:bg-[#E4C31A] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A]"
          >
            Ja tenho conta
          </button>

          {submitError && (
            <p className="rounded-xl bg-[#1F2937] px-4 py-3 text-sm leading-6 text-[#F5D742]">
              {submitError}
            </p>
          )}

          {successMessage && (
            <p className="rounded-xl bg-[#1F2937] px-4 py-3 text-sm leading-6 text-[#D1D5DB]">
              {successMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
