import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import car from "../../../public/car.jpg";
import style from "./Slider.module.scss";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
interface ISliderProps {
  handleModalToggle: () => void;
}

const Slider = ({ handleModalToggle }: ISliderProps) => {
  const [fillCircle, setFillCircle] = useState("0 200");
  const [animation, setAnimation] = useState(false);

  const handleClickNextButton = () => {
    setFillCircle("0 200");
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 10);
  };
  return (
    <section className={style.slider_section}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className={style.carsSlider}>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>
        <SwiperSlide className={style.carsSlider__slide}>
          <div className={style.slide__content}>
            <h2>Авто в лизинг для физических лиц</h2>
            <p>Получите машину за 5 дней</p>
            <button
              className={style.carsSlider__button}
              onClick={handleModalToggle}>
              Оставить заявку
            </button>
          </div>
          <Image src={car} alt={"car"} className={style.carsSlider__img} />
        </SwiperSlide>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next" onClick={handleClickNextButton}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <circle
                r="21"
                cx="24"
                cy="24"
                className="svg-slider-circle2"
                stroke-width="2"
                stroke-dasharray="200"
                stroke="#4C4C4C"
              />
              <circle
                r="21"
                cx="24"
                cy="24"
                className={animation ? "" : "svg-slider-circle1"}
                stroke-width="2"
                stroke-dasharray={fillCircle}
                stroke="white"
              />
            </g>
          </svg>
        </div>
      </Swiper>
    </section>
  );
};

export default Slider;
