import { useNavigate } from 'react-router-dom';
import s from './QuestList.module.css';
import circ from '../../img/circ.jpg';
import povor from '../../img/povor.jpg';
import pik from '../../img/pik.jpg';
import mon from '../../img/mon.jpg';

export default function QuestList() {
  const navigate = useNavigate();

  const openProkl = () => {
    navigate('/proklyattya');
  };

  const openCirc = () => {
    navigate('/circus');
  };

  const openPika = () => {
    navigate('/pikova');
  };

  const openPovorot = () => {
    navigate('/povorot');
  };

  return (
    <div id="questi">
      <h1 className={s.sectionTittle}>Квест кiмнати</h1>
      <ul className={s.questList}>
        <li className={s.questItem} onClick={openProkl}>
          <img className={s.classImg} src={mon} alt="" />
          <h3 className={s.questTittle}>Прокляття черницi</h3>
          <h4 className={s.questDescription}>
            Ви вирушаєте в абатство Сент-Карта разом зі священиком Бруком і
            молодою послушницею Айрін, щоб розслідувати загадковий інцидент із
            черницею та стародавньою реліквією.
          </h4>
          <button
            onClick={e => {
              e.stopPropagation();
              openProkl();
            }}
            className={s.questButton}
          >
            Детальнiше
          </button>
        </li>
        <li className={s.questItem} onClick={openPovorot}>
          <img className={s.classImg} src={povor} alt="" />
          <h3 className={s.questTittle}>Поворот не туди</h3>
          <h4 className={s.questDescription}>
            Натхнений знаменитим фільмом жахів "Поворот не туди", ескейп-рум
            відправить вас до глухих гор Західної Вірджинії, де знаходиться
            покинутий завод з переробки отрутохімікатів.
          </h4>
          <button
            onClick={e => {
              e.stopPropagation();
              openPovorot();
            }}
            className={s.questButton}
          >
            Детальнiше
          </button>
        </li>
        <li className={s.questItem} onClick={openPika}>
          <img className={s.classImg} src={pik} alt="" />
          <h3 className={s.questTittle}>Пiкова дама</h3>
          <h4 className={s.questDescription}>
            Ви поїхали в колоритне місто, щоб втекти від сірих буднів і провести
            час на природі. Ви залишили свої речі в готелі та вирушили на лісову
            стежку, незважаючи на попередження господині. У результаті ви
            звернули не туди і заблукали в лісі під час грози і вже темряви.
          </h4>
          <button
            onClick={e => {
              e.stopPropagation();
              openPika();
            }}
            className={s.questButton}
          >
            Детальнiше
          </button>
        </li>
        <li className={s.questItem} onClick={openCirc}>
          <img className={s.classImg} src={circ} alt="" />
          <h3 className={s.questTittle}>Цирк Жахiв</h3>
          <h4 className={s.questDescription}>
            Квест в реальності "Цирк жахів" є інтригуючим і захоплюючим
            хорор-перформансом, де ви опиняєтеся в покинутому цирку в ролі
            бранців.
          </h4>
          <button
            onClick={e => {
              e.stopPropagation();
              openCirc();
            }}
            className={s.questButton}
          >
            Детальнiше
          </button>
        </li>
      </ul>
    </div>
  );
}
