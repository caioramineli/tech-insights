import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import b1 from '../../assets/b1.png'
import b2 from '../../assets/b2.png'
import b3 from '../../assets/b3.png'
import b4 from '../../assets/b4.png'
import b5 from '../../assets/b5.png'

export default function Slider() {
    const slides = [
        {
            id: 1,
            src: b1,
            alt: 'Promoção 1'
        },
        {
            id: 2,
            src: b2,
            alt: 'Promoção 2'
        },
        {
            id: 3,
            src: b3,
            alt: 'Promoção 3'
        },
        {
            id: 4,
            src: b4,
            alt: 'Promoção 4'
        },
        {
            id: 5,
            src: b5,
            alt: 'Promoção 5'
        }
    ];

    return (
        <div className="hidden sm:block slider">
            <Swiper modules={[Navigation, Pagination]} navigation pagination loopAdditionalSlides loop={true}>
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <img src={slide.src} alt={slide.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
