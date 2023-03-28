import { useState, FC } from "react";

import style from "./Header.module.scss";
interface IHeaderProps {
  handleModalToggle: () => void;
}
const Header = ({handleModalToggle}:IHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <header className={style.header}>
        <div className={style.header__wrapper}>
          <div className={style.header__logo}>
            <p className={style.header__company_name}>
              <a href="#">
                Leasing<span>Car</span>
              </a>
            </p>
            <span className={style.header__spacer}></span>
            <p className={style.header__text}>лизинговая компания</p>
          </div>

          <div
            className={`${style.header__menu}
            ${isMenuOpen ? `${style.active}` : ""}`}>
            <div className={style.header__menu_wrapper}>
              <ul className={style.header__nav}>
                <li className={style.header__nav_item}>
                  <div className={style.dropdown}>
                    <a className={style.dropdown__button} href="#">
                      Лизинг
                    </a>
                    <ul className={style.dropdown__nav}>
                      <li className={style.dropdown__item}>
                        <a href="#">Для личного пользования</a>
                      </li>
                      <li className={style.dropdown__item}>
                        <a href="#">Для юридических диц</a>
                      </li>
                      <li className={style.dropdown__item}>
                        <a href="#">Калькулятор</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={style.header__nav_item}>
                  <a href="#">Каталог</a>
                </li>
                <li className={style.header__nav_item}>
                  <a href="#">О нас</a>
                </li>
              </ul>

              <button className={style.header__button} onClick={handleModalToggle}>Оставить заявку</button>
            </div>
          </div>
          <div
            className={`${style.burger_menu}
            ${isMenuOpen ? `${style.active}` : ""}
          `}
            onClick={handleMenuToggle}>
            <span className={style.burger_line}></span>
            <span className={style.burger_line}></span>
            <span className={`${style.burger_line} ${style.short}`}></span>
          </div>
        </div>
      </header>
      
      <div style={{}}></div>
    </div>
  );
};
export default Header;
