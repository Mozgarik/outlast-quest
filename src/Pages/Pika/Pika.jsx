import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import s from './Pika.module.css';
import time from '../../img/advanstage/time.svg';
import actor from '../../img/advanstage/actor.svg';
import creepy from '../../img/advanstage/creepy.svg';
import doubble from '../../img/advanstage/doubble.svg';
import PikaBookingCalendar from '../../Components/Calendar/PikaCalendar/PikaCalendar';
import { Link } from 'react-scroll'; // Импортируем библиотеку
import { useEffect } from 'react';
import PikaSimpleSlider from 'Components/Slider/pikaSlider/PikaSlider';

export default function Proklatie() {
  const currentDate1 = new Date().getDate();
  const currentDate2 = new Date().getDate() + 1;
  const currentDate3 = new Date().getDate() + 2;
  const currentDate4 = new Date().getDate() + 3;
  const currentDate5 = new Date().getDate() + 4;

  const questName = 'pika';

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
            Ви поїхали в колоритне місто, щоб втекти від сірих буднів і провести
            час на природі. Ви залишили свої речі в готелі та вирушили на лісову
            стежку, незважаючи на попередження господині. У результаті ви
            звернули не туди і заблукали в лісі під час грози і вже темряви. Щоб
            знайти укриття, ви зупинилися в покинутій хатині. Відчувши себе в
            безпеці, ви вирішили зайти всередину, але двері зачинилися за вами,
            і ви опинилися замкнені в цьому місці. Тепер вам доведеться
            дізнатися легенду Пікової дами, пов'язаної з цим будинком, або ж
            загинути в цьому покинутому місці.
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
                Асташкіна 1 , район Приморський
              </span>{' '}
            </li>
            <li className={s.questContactItem}>
              Номер телефону:{' '}
              <span className={s.contactDesc}>+380 99 516 91 66</span>
            </li>
          </ul>
        </div>
      </div>

      <PikaSimpleSlider />

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
        <PikaBookingCalendar questName={questName} />
      </div>
      <Footer />
    </div>
  );
}
