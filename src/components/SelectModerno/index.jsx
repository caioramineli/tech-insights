import './style.css'

const SelectModerno = ({ name, value, onChange, label, bgLabel, options, required = false }) => {
    return (
        <div className="divSelectModerno">
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <label className={`!bg-${bgLabel}`}>
                {label}
            </label>
        </div>
    );
};

export default SelectModerno;
