import { useNavigate } from 'react-router-dom';
import s from './QuestList.module.css';
import circ from '../../img/circ.jpg';
import povor from '../../img/povor.jpg';
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
          <img className={s.classImg} loading="lazy" src={mon} alt="" />
          <h2 className={s.questTittle}>Прокляття черницi</h2>
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
          <img className={s.classImg} loading="lazy" src={povor} alt="" />
          <h2 className={s.questTittle}>Поворот не туди</h2>
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
        <li className={s.questItem} onClick={openCirc}>
          <img className={s.classImg} loading="lazy" src={circ} alt="" />
          <h2 className={s.questTittle}>Цирк Жахiв</h2>
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
