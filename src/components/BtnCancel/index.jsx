const BtnCancelar = ({ onClick }) => {
    return (
        <button
            className="bg-gray-300 hover:bg-gray-400 duration-200 rounded-md py-2 px-6"
            type="button"
            onClick={onClick}
        >
            Cancelar
        </button>
    );
};

export default BtnCancelar;
