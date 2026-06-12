import { useState, useEffect } from 'react';
import {
    cadastrarEstabelecimento,
    listarEstabelecimentosAdmin,
    atualizarEstabelecimento,
    deletarEstabelecimento,
    type EstabelecimentoPayload,
} from '../services/establishmentService';

type AdminEstablishmentsPageProps = {
    onBackHome: () => void;
    onRefresh?: () => void;
};

const servicos = ['RESTAURANTE', 'MERCADO', 'FARMACIA', 'HOSPITAL', 'ESCOLA', 'PARQUE'];

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
];

export function AdminEstablishmentsPage({ onBackHome, onRefresh }: AdminEstablishmentsPageProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success')

    const [form, setForm] = useState({
        nome: '',
        cep: '',
        cnpj: '',
        servico: 'RESTAURANTE',
        acessibilidades: [] as string[],
        descricao: '',
    })

    function toggleAcessibilidade(item: string) {
        setForm((prev) => ({
            ...prev,
            acessibilidades: prev.acessibilidades.includes(item)
                ? prev.acessibilidades.filter((a) => a !== item)
                : [...prev.acessibilidades, item],
        }))
    }

    // Load description from localStorage when CNPJ changes
    useEffect(() => {
        if (form.cnpj) {
            const saved = localStorage.getItem(`descricaoEstabelecimento:${form.cnpj}`);
            setForm((prev) => ({ ...prev, descricao: saved ?? '' }));
        }
    }, [form.cnpj]);

    // Admin list state
    const [adminEstablishments, setAdminEstablishments] = useState<EstabelecimentoPayload[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Load admin list
    useEffect(() => {
        async function loadAdminList() {
            try {
                const data = await listarEstabelecimentosAdmin();
                setAdminEstablishments(data);
            } catch (e) {
                console.error('Failed to load admin establishments', e);
            }
        }
        loadAdminList();
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setFeedbackMessage('');
        try {
            if (isEditing) {
                if (editingId === null) {
                    throw new Error('ID do estabelecimento não encontrado para edição.');
                }

                // Update existing
                await atualizarEstabelecimento(editingId, {
                    nome: form.nome,
                    cep: form.cep,
                    acessibilidades: form.acessibilidades,
                    servico: form.servico as any,
                });
                // Update local description if changed
                if (form.descricao) {
                    localStorage.setItem(`descricaoEstabelecimento:${form.cnpj}`, form.descricao);
                }
                setFeedbackType('success');
                setFeedbackMessage('Estabelecimento atualizado com sucesso!');
                // Refresh admin list
                const refreshed = await listarEstabelecimentosAdmin();
                setAdminEstablishments(refreshed);
                if (onRefresh) onRefresh();
            } else {
                // Create new
                await cadastrarEstabelecimento({
                    nome: form.nome,
                    cep: form.cep,
                    cnpj: form.cnpj,
                    servico: form.servico as any,
                    acessibilidades: form.acessibilidades,
                });
                if (form.descricao) {
                    localStorage.setItem(`descricaoEstabelecimento:${form.cnpj}`, form.descricao);
                }
                setFeedbackType('success');
                setFeedbackMessage('Estabelecimento cadastrado com sucesso!');
                // Refresh admin list
                const refreshed = await listarEstabelecimentosAdmin();
                setAdminEstablishments(refreshed);
                if (onRefresh) onRefresh();
            }
            // Reset form
            setForm({
                nome: '',
                cep: '',
                cnpj: '',
                servico: 'RESTAURANTE',
                acessibilidades: [],
                descricao: '',
            });
            setIsEditing(false);
            setEditingId(null);
        } catch (error: unknown) {
            setFeedbackType('error');
            const msg = error instanceof Error ? error.message : 'Erro ao processar o estabelecimento. Tente novamente mais tarde.';
            setFeedbackMessage(msg);
        } finally {
            setIsLoading(false);
        }
    }

    function startEdit(est: EstabelecimentoPayload) {
        if (!est.id) {
            setFeedbackType('error');
            setFeedbackMessage('ID do estabelecimento não encontrado. Recarregue a lista e tente novamente.');
            return;
        }

        setIsEditing(true);
        setEditingId(est.id);
        setForm({
            nome: est.nome,
            cep: est.cep,
            cnpj: est.cnpj,
            servico: est.servico,
            acessibilidades: est.acessibilidades || [],
            descricao: localStorage.getItem(`descricaoEstabelecimento:${est.cnpj}`) ?? '',
        });
    }

    async function handleDelete(est: EstabelecimentoPayload) {
        if (!est.id) {
            setFeedbackType('error');
            setFeedbackMessage('ID do estabelecimento não encontrado. Recarregue a lista e tente novamente.');
            return;
        }

        if (!window.confirm('Tem certeza que deseja excluir este estabelecimento?')) return;
        try {
            await deletarEstabelecimento(est.id);
            // Remove from list
            setAdminEstablishments((prev) => prev.filter((e) => e.id !== est.id));
            localStorage.removeItem(`descricaoEstabelecimento:${est.cnpj}`);
            if (onRefresh) onRefresh();
        } catch (e) {
            console.error('Failed to delete', e);
            setFeedbackType('error');
            setFeedbackMessage('Erro ao excluir o estabelecimento. Tente novamente mais tarde.');
        }
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
                    <input className="w-full rounded-xl p-3 text-black" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} disabled={isLoading} />
                    <input className="w-full rounded-xl p-3 text-black" placeholder="CEP" value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} disabled={isLoading} />
                    <input className="w-full rounded-xl p-3 text-black" placeholder="CNPJ" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} disabled={isLoading || isEditing} />
                    <textarea className="w-full rounded-xl p-3 text-black" placeholder="Descrição (visível ao usuário)" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} disabled={isLoading} rows={3} />
                    <select className="w-full rounded-xl p-3 text-black" value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })} disabled={isLoading}>
                        {servicos.map((servico) => (
                            <option key={servico} value={servico}>{servico}</option>
                        ))}
                    </select>

                    <div>
                        <h2 className="mb-3 font-semibold">Recursos acessíveis</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {acessibilidades.map((item) => (
                                <label key={item} className="flex items-center gap-2 rounded-xl bg-[#1F2937] p-3">
                                    <input type="checkbox" checked={form.acessibilidades.includes(item)} onChange={() => toggleAcessibilidade(item)} disabled={isLoading} />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>

                    {feedbackMessage && (
                        <p className={`rounded-xl bg-[#1F2937] px-4 py-3 text-sm leading-6 ${feedbackType === 'success' ? 'text-green-400' : 'text-[#F5D742]'}`}>
                            {feedbackMessage}
                        </p>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-[#E4C31A] py-3 font-semibold text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? (isEditing ? 'Atualizando...' : 'Salvando...') : (isEditing ? 'Atualizar estabelecimento' : 'Salvar estabelecimento')}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setEditingId(null); setForm({ nome: '', cep: '', cnpj: '', servico: 'RESTAURANTE', acessibilidades: [], descricao: '' }); }} className="w-full rounded-xl bg-gray-600 py-2 font-semibold text-white mt-2">
                            Cancelar edição
                        </button>
                    )}
                </form>
            </section>

            {/* Admin list */}
            <section className="mt-10 rounded-[20px] bg-[#374151] p-6 shadow-lg sm:p-8">
                <h2 className="text-2xl font-bold mb-4">Estabelecimentos cadastrados</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left">
                        <thead className="bg-[#1F2937]">
                            <tr>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">CNPJ</th>
                                <th className="px-4 py-2">CEP</th>
                                <th className="px-4 py-2">Serviço</th>
                                <th className="px-4 py-2">Acessibilidades</th>
                                <th className="px-4 py-2">Descrição</th>
                                <th className="px-4 py-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminEstablishments.map((est) => (
                                <tr key={est.id ?? est.cnpj} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{est.nome}</td>
                                    <td className="px-4 py-2">{est.cnpj}</td>
                                    <td className="px-4 py-2">{est.cep}</td>
                                    <td className="px-4 py-2">{est.servico}</td>
                                    <td className="px-4 py-2">{(est.acessibilidades || []).join(', ')}</td>
                                    <td className="px-4 py-2">{localStorage.getItem(`descricaoEstabelecimento:${est.cnpj}`) || '—'}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button onClick={() => startEdit(est)} className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">Editar</button>
                                        <button onClick={() => handleDelete(est)} className="px-3 py-1 bg-red-600 rounded hover:bg-red-700">Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}
