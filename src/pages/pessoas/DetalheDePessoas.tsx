import React from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useNavigate, useParams } from 'react-router-dom';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  const formRef = React.useRef<FormHandles>(null);

  const handleSalvar = (dados: IFormData) => {
    console.log(dados);
  };

  const handleDeletar = (id: number) => {
    if (confirm('Realmmente deseja apagar um registro?')) {
      PessoasService.deleteById(id).then(result => {
        if (result instanceof Error) return alert(result.message);
        alert('Registro deletado com sucesso!');
        navigate('/pessoas');
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Pessoa' : `Editar - ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDeletar(Number(id))}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form
        ref={formRef}
        onSubmit={dados => handleSalvar(dados)}
        placeholder="Altere o nome"
      >
        <VTextField name="nomeCompleto" />
        <VTextField name="email" />
        <VTextField name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
