import InputMask from 'react-input-mask';

const InputModerno = ({ name, type, placeholder, value, onChange, label, bgLabel, mask, required = false }) => {
    return (
        <div className="divInputModerno">
            {mask ? (
                <InputMask mask={mask} value={value} onChange={onChange}>
                    {() => (
                        <input
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            required={required}
                        />
                    )}
                </InputMask>
            ) : (
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
            <label className={`!bg-${bgLabel}`}>
                {label}
            </label>
        </div>
    );
};

export default InputModerno;

