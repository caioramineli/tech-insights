const TextAreaModerno = ({
    name,
    value,
    onChange,
    placeholder,
    label,
    required = false,
    height = "h-24",
    className = "",
}) => {
    return (
        <div className="divInputModerno mt-1">
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${height} resize-none ${className}`}
            />
            <label className="textarea-label-moderno">{label}</label>
        </div>
    );
};

export default TextAreaModerno;
