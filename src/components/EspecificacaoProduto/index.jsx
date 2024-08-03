import React from 'react';
import './style.css'

export default function EspecificacaoProduto({ especificacoes }) {
    return (
        <div className='containerEspecificacaoEDescricao'>
            <h2>Especificações</h2>
            <p>{especificacoes}</p>
        </div>
    );
}