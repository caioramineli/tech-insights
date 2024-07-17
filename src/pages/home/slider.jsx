import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import rtx3060 from "../../assets/3060MSI.jpg"
import rtx30602 from "../../assets/3060MSI2.jpg"
import rtx30603 from "../../assets/3060MSI3.jpg"
import rtx30604 from "../../assets/3060MSI4.jpg"
import rtx30605 from "../../assets/3060MSI5.jpg"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Slider() {
    const slides = [
        'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5027/1721163808.png&w=1920&h=400&q=100',
        'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5012/1720873820.png&w=1920&h=400&q=100',
        'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5017/1721044247.png&w=1920&h=400&q=100',
        'https://www.kabum.com.br/core/_next/image?url=https://themes.kabum.com.br/conteudo/layout/5015/1720875258.png&w=1920&h=400&q=100'
    ]

    return (
        <div className="slider">
            <Swiper modules={[Navigation, Pagination]} navigation pagination loop>
                {slides.map(slide => (
                    <SwiperSlide>
                        <img src={slide} alt={slides} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}