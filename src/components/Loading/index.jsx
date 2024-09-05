import { tailspin } from 'ldrs'

tailspin.register()

export default function Loading({ size = "45", stroke="6", color = "#0e7490" }) {
    return (
        <l-tailspin
            size={size}
            stroke={stroke}
            speed="1"
            color={color}
        ></l-tailspin>
    );
}


