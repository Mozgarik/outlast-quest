import s from './Hero.module.css';
import { Link } from 'react-scroll';

export default function Hero() {
  return (
    <div className={s.opas}>
      <div className={s.back}>
        <h2 className={s.heroTittle}>OUTLAST</h2>
      </div>
      <Link to="questi" smooth={true} duration={400}>
        <button className={s.heroButton}>Переглянути квести</button>
      </Link>
    </div>
  );
}
