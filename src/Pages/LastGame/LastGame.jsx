import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import s from './LastGame.module.css';
import time from '../../img/advanstage/time.svg';
import actor from '../../img/advanstage/actor.svg';
import creepy from '../../img/advanstage/creepy.svg';
import LastGameBookingCalendar from '../../Components/Calendar/LastGameCalendar/LastGameCalendar';
import { Link } from 'react-scroll'; // Импортируем библиотеку
import { useEffect } from 'react';
import LastGameSimpleSlider from 'Components/Slider/LastGameSlider/LastGameSlider';

export default function LastGame() {
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
            Ви опиняєтеся у смертельно небезпечній ситуації, потрапивши разом із
            друзями до квест-кімнати в жанрі хоррору. Спочатку здавалося, що це
            лише гра, але незабаром стає очевидним, що те, що відбувається, — це
            справжнє життя й смерть. Команда починає втрачати своїх гравців, і
            ви розумієте, що актор, який грав роль вбивці, збожеволів і вбиває
            по черзі. Вам залишається лише одне — знайти вихід, перш ніж стане
            запізно. Однак вбивця знає всі коди та проходи, а також стежить за
            вами через камери й володіє кількома знаряддями. У підсумку всі
            учасники команди гинуть, а ви стаєте наступною жертвою гри. Вам
            доведеться боротися за своє життя й вибратися звідси живим, поки не
            стало занадто пізно. Час минає, а ви залишаєтеся в пастці.
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

      <LastGameSimpleSlider />

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
        <LastGameBookingCalendar questName={questName} />
      </div>

      <Footer />
    </div>
  );
}
