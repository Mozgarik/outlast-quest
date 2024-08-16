import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import s from './Cirk.module.css';
import time from '../../img/advanstage/time.svg';
import actor from '../../img/advanstage/actor.svg';
import creepy from '../../img/advanstage/creepy.svg';
import doubble from '../../img/advanstage/doubble.svg';
import CircBookingCalendar from '../../Components/Calendar/CircCalendar/CircCalendar';
import { Link } from 'react-scroll'; // Импортируем библиотеку
import { useEffect } from 'react';
import CircSimpleSlider from 'Components/Slider/CircSlider/CircSlider';

export default function Proklatie() {
  const currentDate1 = new Date().getDate();
  const currentDate2 = new Date().getDate() + 1;
  const currentDate3 = new Date().getDate() + 2;
  const currentDate4 = new Date().getDate() + 3;
  const currentDate5 = new Date().getDate() + 4;

  const questName = 'circus';

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
            Головними дійовими особами перформансу, який захопив увагу
            найдосвідченіших квестоманів міста, як ви розумієте, є - клоуни. Так
            склалося, що ви стали бранцями в покинутому цирку. Ви будете
            кричати, але не від захвату... а від жаху! Вам належить розгадати
            таємниці загадкового зникнення людей. З етичних міркувань ми
            опустимо, яка печаль спіткала клоунів і які жахи на нас чекали під
            час проходження квесту. Але попередити вас про те, до чого вам
            готуватися - наш професійний обов'язок. Отже... Це зовсім не цирк!
            Це поганий сон, марення, яке все тягнеться і ніяк не закінчиться.
            Цей цирк - зовсім не веселий: тут немає акробатів і дресированих
            песиків, жонглерів і тигрів. Зате є клоуни. Але персонажі не
            настільки прості...
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
                Провулок Нахімова 6 , район Приморський
              </span>{' '}
            </li>
            <li className={s.questContactItem}>
              Номер телефону:{' '}
              <span className={s.contactDesc}>+380 99 516 91 66</span>
            </li>
          </ul>
        </div>
      </div>

      <CircSimpleSlider />

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
        <CircBookingCalendar questName={questName} />
      </div>

      <Footer />
    </div>
  );
}
