import React from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';

import { Form } from '@unform/web';
import { useNavigate, useParams } from 'react-router-dom';

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

  const handleSalvar = () => {
    console.log('Salvar');
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
          aoClicarEmSalvar={handleSalvar}
          aoClicarEmSalvarEFechar={handleSalvar}
          aoClicarEmApagar={() => handleDeletar(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <Form
        onSubmit={dados => console.log(dados)}
        placeholder="Altere o nome"
      >
        <VTextField name="nomeCompleto" />
        <VTextField name="email" />
        <VTextField name="cidadeId" />

        <button type="submit">Submit</button>
      </Form>
    </LayoutBaseDePagina>
  );
};
