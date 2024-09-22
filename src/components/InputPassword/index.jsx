import './style.css';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function InputPassword({ placeholder, value, event, required = false }) {
    const [ver, setVer] = useState(true);

    function Trocar() {
        setVer(prevVer => !prevVer);
    }

    return (
        <section className="passwordContainer divInputModerno">
            <input
                type={ver ? 'password' : 'text'}
                name='senha'
                placeholder={placeholder}
                value={value}
                onChange={event}
                required={required}
                id="passwordInput"
                className={value ? 'filled' : ''}
            />
            {ver ? (
                <IoEyeOff id='EyePassword' onClick={Trocar} />
            ) : (
                <IoEye id='EyePassword' onClick={Trocar} />
            )}
            <label className={`!bg-slate-100 ${value ? 'filled' : ''}`}>
                Senha
            </label>
        </section>
    );
}
