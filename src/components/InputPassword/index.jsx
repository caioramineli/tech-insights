import './style.css';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function InputPassword({ name = 'senha', placeholder, value, event, required = false, label = 'Senha', bgLabel = 'slate-100' }) {
    const [ver, setVer] = useState(true);

    function Trocar() {
        setVer(prevVer => !prevVer);
    }

    return (
        <section className="passwordContainer divInputModerno">
            <input
                type={ver ? 'password' : 'text'}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={event}
                required={required}
                className={value ? 'filled !w-full !pr-10' : ''}
            />
            {ver ? (
                <IoEyeOff id='EyePassword' onClick={Trocar} />
            ) : (
                <IoEye id='EyePassword' onClick={Trocar} />
            )}
            <label className={`!bg-${bgLabel} ${value ? 'filled' : ''}`}>
                {label}
            </label>
        </section>
    );
}
