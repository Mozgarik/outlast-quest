import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import s from './ClinicDeath.module.css';
import time from '../../img/advanstage/time.svg';
import actor from '../../img/advanstage/actor.svg';
import creepy from '../../img/advanstage/creepy.svg';
import ClinicDeathBookingCalendar from '../../Components/Calendar/ClinicDeath/ClinicDeathCalendar';
import { Link } from 'react-scroll'; // Импортируем библиотеку
import { useEffect } from 'react';
import ClinicDeathSimpleSlider from 'Components/Slider/ClinicDeathSlider/ClinicDeathSlider';

export default function ClinicDeath() {
  const currentDate1 = new Date().getDate();
  const currentDate2 = new Date().getDate() + 1;
  const currentDate3 = new Date().getDate() + 2;
  const currentDate4 = new Date().getDate() + 3;
  const currentDate5 = new Date().getDate() + 4;

  const questName = 'lastGame';

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
          <h2 className={s.questTittle}>Iсторiя</h2>
          <span className={s.questHist}>
            Ви поринули у світ загадкової клінічної смерті. Зараз ви вже не у
            своєму тілі, але ви маєте повернутися до нього. Але як? Перед вами
            відкривається цілий світ, сповнений таємниць та небезпек. Ви повинні
            спробувати зрозуміти і пройти через всі випробування, щоб
            повернутися в життя. Будьте готові до того, що кожен крок у цьому
            світі може бути небезпечним та загадковим. Ви повинні приймати
            складні рішення, і тільки від вас залежить, чи зможете ви
            повернутися у своє тіло.
          </span>
        </div>
        <div className={s.questAdress}>
          <h3 className={s.contactTittle}>Контакти</h3>
          <ul className={s.questContactList}>
            <li className={s.questContactItem}>
              Мiсто: <span className={s.contactDesc}>Одеса</span>
            </li>
            <li className={s.questContactItem}>
              Адреса:{' '}
              <span className={s.contactDesc}>
                вул. Преображенська 34(Пасаж)
              </span>{' '}
            </li>
            <li className={s.questContactItem}>
              Номер телефону:{''}
              <span className={s.contactDesc}>+380 99 516 91 66</span>
            </li>
          </ul>
        </div>
      </div>

      <ClinicDeathSimpleSlider />

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
        </ul>
      </div>
      <div id="calendar">
        <ClinicDeathBookingCalendar questName={questName} />
      </div>

      <Footer />
    </div>
  );
}
