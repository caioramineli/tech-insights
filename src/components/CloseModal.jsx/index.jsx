const CloseModal = ({ setEstadoModal }) => {
    return () => {
        setEstadoModal(false);
        document.body.style.overflow = 'auto';
    };
};

export default CloseModal;
