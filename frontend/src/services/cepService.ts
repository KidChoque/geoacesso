export type ViaCepResponse = {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export type Endereco = {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  cep: string
}

const cepCache: Record<string, Endereco> = {}

export async function buscarEnderecoPorCep(cep: string): Promise<Endereco> {
  const cleanedCep = cep.replace(/\D/g, '')
  if (cleanedCep.length !== 8) {
    throw new Error('CEP deve conter exatamente 8 dígitos.')
  }

  if (cepCache[cleanedCep]) {
    return cepCache[cleanedCep]
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
  if (!response.ok) {
    throw new Error('Erro ao buscar o CEP.')
  }

  const data: ViaCepResponse = await response.json()
  if (data.erro) {
    throw new Error('CEP não encontrado')
  }

  const mappedEndereco: Endereco = {
    logradouro: data.logradouro,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf,
    cep: data.cep,
  }

  cepCache[cleanedCep] = mappedEndereco
  return mappedEndereco
}
