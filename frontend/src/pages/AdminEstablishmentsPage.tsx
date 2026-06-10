import { useState } from 'react'

type AdminEstablishmentsPageProps = {
    onBackHome: () => void
}

const servicos = ['RESTAURANTE', 'MERCADO', 'FARMACIA', 'HOSPITAL', 'ESCOLA', 'PARQUE']

const acessibilidades = [
    'RAMPA',
    'BANHEIRO_ADAPTADO',
    'ELEVADOR',
    'PISO_TATIL',
    'VAGA_PCD',
    'SINALIZACAO_BRAILE',
    'ATENDIMENTO_LIBRAS',
    'SINALIZACAO_VISUAL',
    'SINALIZACAO_SIMPLES',
    'ATENDIMENTO_PRIORITARIO',
]

export function AdminEstablishmentsPage({ onBackHome }: AdminEstablishmentsPageProps) {
    const [form, setForm] = useState({
        nome: '',
        cep: '',
        cnpj: '',
        servico: 'RESTAURANTE',
        acessibilidades: [] as string[],
    })

    function toggleAcessibilidade(item: string) {
        setForm((prev) => ({
            ...prev,
            acessibilidades: prev.acessibilidades.includes(item)
                ? prev.acessibilidades.filter((a) => a !== item)
                : [...prev.acessibilidades, item],
        }))
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log(form)
        alert('Formulário pronto. Próximo passo: conectar ao backend.')
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
            <button onClick={onBackHome} className="mb-6 font-semibold text-[#E4C31A]">
                ← Voltar
            </button>

            <section className="rounded-[20px] bg-[#374151] p-6 shadow-lg sm:p-8">
                <h1 className="text-3xl font-bold">Cadastrar estabelecimento</h1>
                <p className="mt-2 text-[#D1D5DB]">
                    Cadastre locais acessíveis para aparecerem na busca do GeoAcesso.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <input className="w-full rounded-xl p-3 text-black" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                    <input className="w-full rounded-xl p-3 text-black" placeholder="CEP" value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} />
                    <input className="w-full rounded-xl p-3 text-black" placeholder="CNPJ" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} />

                    <select className="w-full rounded-xl p-3 text-black" value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })}>
                        {servicos.map((servico) => (
                            <option key={servico} value={servico}>{servico}</option>
                        ))}
                    </select>

                    <div>
                        <h2 className="mb-3 font-semibold">Recursos acessíveis</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {acessibilidades.map((item) => (
                                <label key={item} className="flex items-center gap-2 rounded-xl bg-[#1F2937] p-3">
                                    <input type="checkbox" checked={form.acessibilidades.includes(item)} onChange={() => toggleAcessibilidade(item)} />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="w-full rounded-xl bg-[#E4C31A] py-3 font-semibold text-[#111827]">
                        Salvar estabelecimento
                    </button>
                </form>
            </section>
        </main>
    )
}