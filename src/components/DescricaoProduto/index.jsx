import React from 'react';

export default function DescricaoProduto({ descricao }) {
    return (
        <div className='containerEspecificacaoEDescricao'>
            <h2 className='text-xl font-bold'>Descrição</h2>
            <p>{descricao}</p>
        </div>
    );
}