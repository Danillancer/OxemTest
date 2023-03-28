import { useEffect, useState } from "react";
import style from "./Calc.module.scss";


interface ICalcProps {
  handleModalToggle: () => void;
}

const Calc = ({handleModalToggle}:ICalcProps) => {
  const rate = 0.035;
  const [carPrice, setCarPrice] = useState(3300000);
  const [carPriceInput, setCarPriceInput] = useState(carPrice);
  const [initialFee, setInitialFee] = useState(13);
  const [initialFeeInput, setInitialFeeInput] = useState(initialFee);
  const [initialPrice, setInitiatPrice] = useState(
    Math.round(carPrice * (initialFee / 100))
  );
  const [monthsCount, setMonthsCount] = useState(60);
  const [monthsCountInput, setMonthsCountInput] = useState(monthsCount);
  const [monthPay, setMonthPay] = useState(
    (carPrice - initialPrice) *
      ((rate * Math.pow(1 + rate, monthsCount)) /
        (Math.pow(1 + rate, monthsCount) - 1))
  );
  const [totalPay, setTotalPay] = useState(
    monthsCount * monthPay + initialPrice
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitiatPrice(Math.round(carPrice * (initialFee / 100)));
  }, [carPrice, initialFee]);

  useEffect(() => {
    setCarPriceInput(carPrice);
  }, [carPrice]);

  useEffect(() => {
    setInitialFeeInput(initialFee);
  }, [initialFee]);

  useEffect(() => {
    setMonthsCountInput(monthsCount);
  }, [monthsCount]);

  useEffect(() => {
    setMonthPay(
      (carPrice - initialPrice) *
        ((rate * Math.pow(1 + rate, monthsCount)) /
          (Math.pow(1 + rate, monthsCount) - 1))
    );
  }, [carPrice, initialPrice, monthsCount]);

  useEffect(() => {
    setTotalPay(monthsCount * monthPay + initialPrice);
  }, [initialPrice, monthPay, monthsCount]);

  function beautifyPrice(price:number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className={style.calc}>
      <h2 className={style.calc__title}>
        Рассчитайте стоимость <br></br> автомобиля в лизинг
      </h2>
      <ul className={style.calc__inputs}>
        <li className={style.calc__input_item}>
          <label className={style.calc__label}>Стоимость автомобиля</label>
          <div
            className={`${style.calc__input} ${
              isLoading ? `${style.calc__input_disabled}` : ""
            }`}>
            <div className={style.calc__text_wrpr}>
              <input
                disabled={isLoading}
                className={style.calc__text}
                type="text"
                value={beautifyPrice(carPriceInput)}
                onChange={(e) => {
                  const inputValue = Number(e.target.value.split(" ").join(""));
                  if (isNaN(inputValue)) {
                    setCarPriceInput(carPriceInput);
                  } else {
                    setCarPriceInput(inputValue);
                  }
                }}
                onKeyDown={(event)=>{
                  if (event.key === "Enter") {
                    if (carPriceInput < 1000000) {
                      setCarPrice(1000000);
                      setCarPriceInput(1000000);
                    } else if (carPriceInput > 6000000) {
                      setCarPrice(6000000);
                      setCarPriceInput(6000000);
                    } else {
                      setCarPrice(carPriceInput);
                    }
                  }
                }}
                onBlur={() => {
                  if (carPriceInput < 1000000) {
                    setCarPrice(1000000);
                    setCarPriceInput(1000000);
                  } else if (carPriceInput > 6000000) {
                    setCarPrice(6000000);
                    setCarPriceInput(6000000);
                  } else {
                    setCarPrice(carPriceInput);
                  }
                }}
              />
              <p className={style.calc__text}>&#8381;</p>
            </div>
            <input
              className={style.calc__range}
              type="range"
              min={1000000}
              max={6000000}
              value={carPrice}
              disabled={isLoading}
              onChange={(e) => {
                setCarPrice(Number(e.target.value));
              }}
            />
          </div>
        </li>
        <li className={style.calc__input_item}>
          <label className={style.calc__label}>Первоначальный взнос</label>
          <div
            className={`${style.calc__input} ${style.calc__input_initial} ${
              isLoading ? `${style.calc__input_disabled}` : ""
            }`}>
            <div className={style.calc__text_wrpr}>
              <p className={style.calc__text}>
                {beautifyPrice(initialPrice)} &#8381;
              </p>
              <div className={`${style.calc__text} ${style.calc__text_initial}`}>
                <input
                  disabled={isLoading}
                  className={style.calc__text_initial_input}
                  type="text"
                  value={`${initialFeeInput}`}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    if (isNaN(inputValue)) {
                      setInitialFeeInput(initialFeeInput);
                    } else {
                      setInitialFeeInput(inputValue);
                    }
                  }}
                  onKeyDown={(event)=>{
                    if (event.key === "Enter") {
                      if (initialFeeInput < 10) {
                        setInitialFee(10);
                        setInitialFeeInput(10);
                      } else if (initialFeeInput > 60) {
                        setInitialFee(60);
                        setInitialFeeInput(60);
                      } else {
                        setInitialFee(initialFeeInput);
                      }
                    }
                  }}
                  onBlur={() => {
                    if (initialFeeInput < 10) {
                      setInitialFee(10);
                      setInitialFeeInput(10);
                    } else if (initialFeeInput > 60) {
                      setInitialFee(60);
                      setInitialFeeInput(60);
                    } else {
                      setInitialFee(initialFeeInput);
                    }
                  }}
                />
                <p>%</p>
              </div>
            </div>
            <input
              className={style.calc__range}
              type="range"
              min={10}
              max={60}
              value={initialFee}
              disabled={isLoading}
              onChange={(e) => {
                setInitialFee(Number(e.target.value));
              }}
            />
          </div>
        </li>
        <li className={style.calc__input_item}>
          <label className={style.calc__label}>Срок лизинга</label>
          <div
            className={`${style.calc__input} ${
              isLoading ? `${style.calc__input_disabled}` : ""
            }`}>
            <div className={style.calc__text_wrpr}>
              <input
                disabled={isLoading}
                type="text"
                className={style.calc__text}
                value={monthsCountInput}
                onChange={(e) => {
                  const inputValue = Number(e.target.value);
                  if (isNaN(inputValue)) {
                    setMonthsCountInput(monthsCountInput);
                  } else {
                    setMonthsCountInput(inputValue);
                  }
                }}
                onKeyDown={(event)=>{
                  if (event.key === "Enter") {
                    if (monthsCountInput < 1) {
                      setMonthsCount(1);
                      setMonthsCountInput(1);
                    } else if (monthsCountInput > 60) {
                      setMonthsCount(60);
                      setMonthsCountInput(60);
                    } else {
                      setMonthsCount(monthsCountInput);
                    }
                  }
                }}
                onBlur={() => {
                  if (monthsCountInput < 1) {
                    setMonthsCount(1);
                    setMonthsCountInput(1);
                  } else if (monthsCountInput > 60) {
                    setMonthsCount(60);
                    setMonthsCountInput(60);
                  } else {
                    setMonthsCount(monthsCountInput);
                  }
                }}
              />
              <p className={style.calc__text}>мес.</p>
            </div>
            <input
              className={style.calc__range}
              type="range"
              min={1}
              max={60}
              value={monthsCount}
              disabled={isLoading}
              onChange={(e) => {
                setMonthsCount(Number(e.target.value));
              }}
            />
          </div>
        </li>
      </ul>
      <div className={style.calc__totals_wrpr}>
        <ul className={style.calc__totals}>
          <li>
            <p className={style.calc__label}>Сумма договора лизинга</p>
            <p className={style.calc__total}>
              {beautifyPrice(Math.round(totalPay))} <span> &#8381;</span>
            </p>
          </li>
          <li>
            <p className={style.calc__label}>Ежемесячный платеж от</p>
            <p className={style.calc__total}>
              {beautifyPrice(Math.round(monthPay))} <span> &#8381;</span>
            </p>
          </li>
        </ul>
        <button className={style.calc__submit} onClick={handleModalToggle} disabled={isLoading}>
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default Calc;
