import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import s from './Proklatie.module.css';
import time from '../../img/advanstage/time.svg';
import actor from '../../img/advanstage/actor.svg';
import creepy from '../../img/advanstage/creepy.svg';
import doubble from '../../img/advanstage/doubble.svg';
import MonahBookingCalendar from '../../Components/Calendar/MonahCalendar/MonahCalendar';
import { Link } from 'react-scroll';
import { useEffect } from 'react';
import MonahSimpleSlider from 'Components/Slider/MonahSlider/MonahSlider';

export default function Proklatie() {
  const currentDate1 = new Date().getDate();
  const currentDate2 = new Date().getDate() + 1;
  const currentDate3 = new Date().getDate() + 2;
  const currentDate4 = new Date().getDate() + 3;
  const currentDate5 = new Date().getDate() + 4;

  const questName = 'monah';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const arrDate = [];

  arrDate.push(
    currentDate1,
    currentDate2,
    currentDate3,
    currentDate4,
    currentDate5
  );

  return (
    <div>
      <Header />
      <div className={s.opas}>
        <Link to="calendar" smooth={true} duration={400}>
          <button className={s.heroButton}>Забронювати гру</button>
        </Link>
      </div>

      <div className={s.opys}>
        <div className={s.hist}>
          <h2 className={s.questTittle}>Історія</h2>
          <span className={s.questHist}>
            Ви вирушаєте в абатство Сент-Карта разом зі священиком Бруком і
            молодою послушницею Айрін, щоб розслідувати загадковий інцидент із
            черницею та стародавньою реліквією. Вам доведеться зіткнутися зі
            злом, яке набуло вигляду демонічної черниці і готове на все, щоб
            захопити ваші душі. Ви повинні бути готові до небезпеки, ризикуючи
            своїм життям, вірою та душею. Ваше завдання - зупинити злісну силу,
            перш ніж вона завдасть ще більшої шкоди.
          </span>
        </div>
        <div className={s.questAdress}>
          <h3 className={s.contactTittle}>Контакти</h3>
          <ul className={s.questContactList}>
            <li className={s.questContactItem}>
              Місто: <span className={s.contactDesc}>Одеса</span>
            </li>
            <li className={s.questContactItem}>
              Адреса:{' '}
              <span className={s.contactDesc}>
                вул. Гоголя 1/3, перший під’їзд, код 2к, район Приморський
              </span>{' '}
            </li>
            <li className={s.questContactItem}>
              Номер телефону:{' '}
              <span className={s.contactDesc}>+380 99 516 91 66</span>
            </li>
          </ul>
        </div>
      </div>

      <MonahSimpleSlider />

      <div className={s.advantages}>
        <ul className={s.advantagesList}>
          <li className={s.advantagesItem}>
            <img src={time} alt="" className={s.advantagesImg} /> <br />
            <span className={s.advantagesDesc}>
              Проходження цього квесту займає приблизно 60 хвилин
            </span>
          </li>
          <li className={s.advantagesItem}>
            <img src={actor} alt="" className={s.advantagesImg} /> <br />
            <span className={s.advantagesDesc}>
              Проходження цього квесту містить гру актора
            </span>
          </li>
          <li className={s.advantagesItem}>
            <img src={creepy} alt="" className={s.advantagesImg} /> <br />
            <span className={s.advantagesDesc}>Цей квест є квестом жахів</span>
          </li>
          <li className={s.advantagesItem}>
            <img src={doubble} alt="" className={s.advantagesImg} /> <br />
            <span className={s.advantagesDesc}>
              Додатково ви можете придбати другий рівень страху (+200 грн)
            </span>
          </li>
        </ul>
      </div>
      <div id="calendar">
        <MonahBookingCalendar questName={questName} />
      </div>
      <Footer />
    </div>
  );
}
