import React from 'react';

export default function DescricaoProduto({ descricao }) {
    return (
        <div className='containerEspecificacaoEDescricao'>
            <h2>Descrição</h2>
            <p>{descricao}</p>
        </div>
    );
}