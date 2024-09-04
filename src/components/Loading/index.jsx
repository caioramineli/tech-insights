import { tailspin } from 'ldrs'

tailspin.register()

export default function Loading() {
    return (
        <l-tailspin
            size="40"
            stroke="6"
            speed="1"
            color="#0e7490"
        ></l-tailspin>
    );
}


