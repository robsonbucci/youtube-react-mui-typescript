import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  cidadId: number;
  email: string;
}

interface IDetalhepPessoa {
  id: number;
  nomeCompleto: string;
  cidadId: number;
  email: string;
}

// outro tipo de estrutura para retornar listagem pessoas com a quantidade total de registro
type TPessoaComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};
/**
 * O retorno será lista de pessoas e quantidade total que tem no banco de dados
 */
const getAll = async (page = 1, filter = ''): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data)
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalhepPessoa | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);

    if (data) return data;

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

// Omit do typescript não vai pedir id - vem automatico
const create = async (dados: Omit<IDetalhepPessoa, 'id'>): Promise<number | Error> => {
  try {
    const urlRelativa = '/pessoas';
    const { data } = await Api.post<IDetalhepPessoa>(urlRelativa, dados);

    if (data) return data.id;

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhepPessoa): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}/`;
    await Api.put(urlRelativa, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atulizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    await Api.delete(urlRelativa);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
