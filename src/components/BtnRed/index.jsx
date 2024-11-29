const BtnRed = ({ text }) => {
    return (
        <button
            className="bg-red-700 hover:bg-red-800 duration-200 rounded-md py-2 px-6 font-bold text-emerald-50"
            type="submit"
        >
            {text}
        </button>
    );
};

export default BtnRed;
