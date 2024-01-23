import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSalvar = () => {
    console.log('Salvar');
  };
  const handleDeletar = () => {
    console.log('Deletar');
  };
  return (
    <LayoutBaseDePagina
      titulo="Detalhe de pessoas"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={handleSalvar}
          aoClicarEmSalvarEFechar={handleSalvar}
          aoClicarEmApagar={handleDeletar}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />
      }
    >
      <p>DetalheDePessoas {id}</p>;
    </LayoutBaseDePagina>
  );
};
