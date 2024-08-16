import logo from '../../img/logo.svg';
import s from './logo.module.css';

export default function Logo() {
  return <img src={logo} className={s.logo} alt="" />;
}
