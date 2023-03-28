import { FC, useState } from "react";
import style from "./Modal.module.scss";

interface IModalProps {
  handleModalToggle: () => void;
  isModalOpen: boolean;
}

const Modal = ({ handleModalToggle, isModalOpen }: IModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmite() {
    setIsSubmit(true);
    setTimeout(() => {
      setName("");
      setPhoneNumber("");
      setIsSubmit(false);
      handleModalToggle()
    }, 2000);
  }

  function handlePhoneInputChange(event:React.ChangeEvent<HTMLInputElement>) {
    const phone = event.target.value;
    const formattedPhone = formatPhone(phone);
    setPhoneNumber(formattedPhone);
    if (phone.length == 18) setPhoneError("");
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (regex.test(inputName) || inputName == "") {
      setName(inputName);
      setNameError("");
    } else {
      setNameError("Имя должно содержать только буквы");
    }
    if (inputName.length >= 3) {
      setNameError("");
    }
  };

  function formatPhone(phone:string) {
    const phoneNumberArr = phone.replace(/[^\d]/g, "").split("");
    if (phoneNumberArr.length > 0 && phoneNumberArr[0] !== "7") {
      phoneNumberArr.splice(0, 0, "7");
    }
    let formattedPhoneNumber = `+${phoneNumberArr.slice(0, 1).join("")}`;
    if (phoneNumberArr.slice(1, 4).length > 0) {
      formattedPhoneNumber += ` (${phoneNumberArr.slice(1, 4).join("")}`;
    }
    if (phoneNumberArr.slice(4, 7).length > 0) {
      formattedPhoneNumber += `) ${phoneNumberArr.slice(4, 7).join("")}`;
    }
    if (phoneNumberArr.slice(7, 9).length > 0) {
      formattedPhoneNumber += `-${phoneNumberArr.slice(7, 9).join("")}`;
    }
    if (phoneNumberArr.slice(9, 11).length > 0) {
      formattedPhoneNumber += `-${phoneNumberArr.slice(9, 11).join("")}`;
    }
    return formattedPhoneNumber;
  }

  function handlePhoneBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length < 18) {
      setPhoneError("Неправильный формат телефона");
    } else {
      setPhoneError("");
    }
  }
  function handleNameBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length < 3) {
      setNameError("Имя должно содержать не менее 3 символов");
    }
  }

  return (
    <div className={`${style.modal} ${isModalOpen ? `${style.active}` : ""}`}>
      <div
        className={`${style.modal__wrapper} ${
          isModalOpen ? `${style.active}` : ""
        }`}>
        <div className={style.modal__close_btn} onClick={handleModalToggle}>
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="24" fill="#F3F3F4" />
            <path
              d="M30.5996 17.4004L17.4003 30.5997"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.4004 17.4004L30.5997 30.5997"
              stroke="#828282"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 className={style.modal__title}>Онлайн-заявка</h2>
        <p className={style.modal__text}>
          Заполните форму, и мы вскоре свяжимся с вами, чтобы
          <br /> ответить на все вопросы{" "}
        </p>
        <div className={style.modal__form}>
          <div className={style.modal__form_item}>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneInputChange}
              onBlur={handlePhoneBlur}
              placeholder="+7 (___) ___-__-__"
              maxLength={18}
              required
              className={`${style.modal__form_input} ${
                phoneError ? `${style.error}` : ""
              }`}
            />
            <span className={style.phone_placeholder}>Телефон</span>
            {phoneError && (
              <p style={{ color: "red", position: "absolute" }}>{phoneError}</p>
            )}
            <span
              id="phone_success"
              style={{
                display: `${phoneNumber.length == 18 ? "block" : "none"}`,
              }}>
              <svg
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33337 4.99984L4.66671 8.33317L11.3334 1.6665"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className={style.modal__form_item}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              required
              className={`${style.modal__form_input} ${
                nameError ? `${style.error}` : ""
              }`}
            />
            {nameError && (
              <p style={{ color: "red", position: "absolute" }}>{nameError}</p>
            )}
            <span
              id="name_success"
              style={{ display: `${name.length >= 3 ? "block" : "none"}` }}>
              <svg
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33337 4.99984L4.66671 8.33317L11.3334 1.6665"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className={style.modal__terms}>
          <p>
            Нажимая на кнопку "Оставить заявку", я даю согласие{" "}
            <span>на обработку персональных данных</span>
          </p>
          <button
            className={`${style.modal__btn} ${
              isSubmit ? `${style.spiner}` : ""
            }`}
            onClick={()=>{ if(name.length >= 3 && phoneNumber.length == 18) handleSubmite()}}>
            {isSubmit ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" />
              </svg>
            ) : (
              "Оставить заявку"
            )}
          </button>
        </div>
        <div className={style.modal__contacts}>
          <a href="https://web.whatsapp.com/" target="_blank">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0001 0.799927C4.92731 0.799927 0.800108 4.92713 0.800108 9.99993C0.800108 11.5839 1.20931 13.1415 1.98531 14.5159L0.814908 18.6919C0.776508 18.8291 0.813708 18.9763 0.912908 19.0783C0.989308 19.1571 1.09331 19.1999 1.20011 19.1999C1.23211 19.1999 1.26451 19.1959 1.29611 19.1883L5.65451 18.1087C6.98531 18.8231 8.48411 19.1999 10.0001 19.1999C15.0729 19.1999 19.2001 15.0727 19.2001 9.99993C19.2001 4.92713 15.0729 0.799927 10.0001 0.799927ZM14.6281 13.2463C14.4313 13.7911 13.4873 14.2883 13.0337 14.3551C12.6265 14.4147 12.1113 14.4403 11.5457 14.2627C11.2029 14.1547 10.7629 14.0115 10.1993 13.7711C7.83011 12.7607 6.28291 10.4051 6.16451 10.2495C6.04651 10.0939 5.20011 8.98513 5.20011 7.83753C5.20011 6.68993 5.81011 6.12553 6.02691 5.89193C6.24371 5.65833 6.49931 5.59993 6.65691 5.59993C6.81451 5.59993 6.97171 5.60193 7.10971 5.60833C7.25491 5.61553 7.44971 5.55353 7.64131 6.00873C7.83811 6.47593 8.31051 7.62353 8.36891 7.74073C8.42811 7.85753 8.46731 7.99393 8.38891 8.14953C8.31051 8.30513 8.27131 8.40233 8.15291 8.53873C8.03451 8.67513 7.90491 8.84273 7.79851 8.94753C7.68011 9.06393 7.55731 9.18993 7.69491 9.42353C7.83251 9.65713 8.30651 10.4207 9.00891 11.0391C9.91091 11.8335 10.6721 12.0799 10.9081 12.1967C11.1441 12.3135 11.2821 12.2939 11.4197 12.1383C11.5573 11.9823 12.0101 11.4571 12.1673 11.2239C12.3245 10.9907 12.4821 11.0291 12.6989 11.1071C12.9157 11.1847 14.0769 11.7487 14.3129 11.8655C14.5489 11.9823 14.7065 12.0407 14.7657 12.1379C14.8249 12.2347 14.8249 12.7019 14.6281 13.2463Z"
                fill="#575757"
              />
            </svg>
          </a>
          <a href="https://web.telegram.org/z/" target="_blank">
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.61862 11.2189L16.7717 16.7684C17.7021 17.2414 18.3736 16.9965 18.6053 15.9726L21.924 1.56445C22.2638 0.30941 21.4048 -0.259816 20.5147 0.112461L1.0272 7.03535C-0.303004 7.5269 -0.295249 8.21061 0.784733 8.51526L5.78567 9.95328L17.3634 3.22393C17.9099 2.91858 18.4116 3.08274 17.9998 3.41939"
                fill="#575757"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
