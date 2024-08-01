import './style.css'

export default function SpanErrorInput({texto = 'teste'}) {
    return (
        <span className='spanError'>{texto}</span>
    )
}
