import team from '../../img/team.svg';
import ind from '../../img/ind.svg';
import age from '../../img/age.svg';
import safety from '../../img/safety.svg';
import s from './Qualitat.module.css';

export default function Qualitat() {
  return (
    <div className={s.qualitatSection}>
      <h2 className={s.why}>Чому саме ми?</h2>
      <ul className={s.qualitatList}>
        <li className={s.qualitatItem}>
          <img className={s.qualitatImg} src={team} alt="Команда акторiв" />
          <h3 className={s.qualitatTittle}>Команда акторів</h3>
          <span className={s.qualitatDesc}>
            Гра наших акторів не залишить вас байдужими, адже вони проходять
            складне навчання, перш ніж стати настрашнішими маніяками та
            демонами.
          </span>
        </li>
        <li className={s.qualitatItem}>
          <img
            className={s.qualitatImg}
            src={ind}
            alt="Індивідуальний підхід"
          />
          <h3 className={s.qualitatTittle}>Індивідуальний підхід</h3>
          <span className={s.qualitatDesc}>
            Актори та адміністратори завжди намагаються знайти підхід до кожного
            з вас, щоб ви отримали максимум вражень.
          </span>
        </li>
        <li className={s.qualitatItem}>
          <img className={s.qualitatImg} src={age} alt="Вік" />
          <h3 className={s.qualitatTittle}>Вік</h3>
          <span className={s.qualitatDesc}>
            Наші квести підходять для будь-якого віку. Віковий діапазон наших
            команд від 10 до 50 років.
          </span>
        </li>
        <li className={s.qualitatItem}>
          <img className={s.qualitatImg} src={safety} alt="Безпека" />
          <h3 className={s.qualitatTittle}>Безпека</h3>
          <span className={s.qualitatDesc}>
            Ми за безпечне проходження квестів, тому кожна кімната обладнана
            камерами, а адміністратор уважно спостерігає за вами протягом усієї
            гри.
          </span>
        </li>
      </ul>
    </div>
  );
}
