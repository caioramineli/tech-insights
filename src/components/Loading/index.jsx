import { ring } from 'ldrs'

ring.register()

export default function Loading({ size = "45", stroke = "6", color = "#0e7490" }) {
    return (
        <l-ring
            size={size}
            stroke={stroke}
            speed="1"
            color={color}
        ></l-ring>

    );
}




