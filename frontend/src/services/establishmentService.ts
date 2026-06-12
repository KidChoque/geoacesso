import { api } from './api'

export type EstabelecimentoPayload = {
  id?: number;
  nome: string;
  cep: string;
  acessibilidades: string[];
  servico: string;
  cnpj: string;
}

export type AtualizarEstabelecimentoPayload = Pick<
  EstabelecimentoPayload,
  'nome' | 'cep' | 'acessibilidades' | 'servico'
>

export async function cadastrarEstabelecimento(data: EstabelecimentoPayload): Promise<EstabelecimentoPayload> {
  const response = await api.post('/admin/cadastrar_estabelecimentos', data)
  return response.data
}

// List all establishments for admin view
export async function listarEstabelecimentosAdmin(): Promise<EstabelecimentoPayload[]> {
  const response = await api.get('/admin/listar_estabelecimentos')
  return response.data
}

export async function atualizarEstabelecimento(id: number, data: AtualizarEstabelecimentoPayload): Promise<void> {
  await api.put(`/admin/estabelecimentos/${id}`, data)
}

export async function deletarEstabelecimento(id: number): Promise<void> {
  await api.delete(`/admin/estabelecimentos/delete/${id}`)
}

export async function listarEstabelecimentosPublico(): Promise<EstabelecimentoPayload[]> {
  const response = await api.get('/estabelecimentos')
  return response.data
}
