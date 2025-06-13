// store/useLeituraStore.js
import { create } from 'zustand';

export const useLeituraStore = create((set) => ({
  textos: [],
  setTextos: (novosTextos) => set({ textos: novosTextos }),

  textoSelecionado: null,
  setTextoSelecionado: (texto) => set({ textoSelecionado: texto }),

  form: { dificuldade: '', tema: '', conteudo: '' },
  setForm: (novoForm) => set({ form: novoForm }),

  modoEdicao: false,
  setModoEdicao: (valor) => set({ modoEdicao: valor }),

  showFormulario: false,
  toggleFormulario: () => set((state) => ({ showFormulario: !state.showFormulario })),

  adicionarTexto: (novoTexto) =>
    set((state) => ({
      textos: [...state.textos, novoTexto],
    })),

  atualizarTexto: (indice, textoAtualizado) =>
    set((state) => {
      const textosAtualizados = [...state.textos];
      textosAtualizados[indice] = textoAtualizado;
      return { textos: textosAtualizados };
    }),

  excluirTexto: (indice) =>
    set((state) => ({
      textos: state.textos.filter((_, i) => i !== indice),
    })),
}));
