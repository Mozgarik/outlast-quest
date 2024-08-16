import Logo from "../Logo/Logo";
import s from "./header.module.css";
import inst from "../../img/inst.svg";
import phone from "../../img/phone.svg";
import email from "../../img/mail.svg";
import tikTok from '../../img/tiktok_usz520v0xpov.svg'

export default function Header() {
  return (
    <header>
      <a className={s.hLink} href="/">
        <div className={s.logotype}>
          <Logo className={s.logo} />
          <span className={s.outlast}>Outlast</span>
        </div>
      </a>
      <div className={s.contacts}>
       
        <ul className={s.contactsList}>
           <h5 className={s.contactCity}>м. Одеса</h5>
          <li className={s.contactItem}>
            <a href="https://www.instagram.com/outlast.quest/">
              <img className={s.instIcon} src={inst} alt="" /> 
            </a>
          </li>
          <li className={s.contactItem}>
            <a href="tel:+380 99 516 91 66">
              <img className={s.instIcon} src={phone} alt="" />
            </a>
          </li>
          <li className={s.contactItem}>
            <a href="https://www.instagram.com/direct/t/103391174389104">
              <img className={s.instIcon} src={email} alt="" />
            </a>
          </li>
          <li className={s.contactItem}>
            <a href="https://www.tiktok.com/@outlast.quest?_t=8ogP71XtKTt&_r=1">
              <img className={s.instIconTik} src={tikTok} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
