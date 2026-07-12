import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import time from '../../../img/Slider/sliderSvg/9490.svg';
import boo from '../../../img/Slider/sliderSvg/boo_bbixqf37nv44.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './LastGameSlider.module.css';
import img1 from '../../../img/Slider/lastPhoto/last1.png';
import img2 from '../../../img/Slider/lastPhoto/last2.png';
import img3 from '../../../img/Slider/lastPhoto/last3.png';
import img4 from '../../../img/Slider/lastPhoto/last4.png';
import { nanoid } from 'nanoid';

const images = [img1, img2, img3, img4];
const comments = [
  {
    name: 'Настя',
    date: '10.05.2026',
    comment:
      'дуже сподобалось, по страху теж. актор відіграв прям супер!! але -кросівок хахахха',
    grade: '5',
  },
  {
    name: 'Каролина',
    date: '24.03.2026',
    comment:
      'Квест очень понравился, очень хороший актёр, было весело и в тоже время страшно. Спасибо за позитивные эмоции и проверку на хорошую физуху',
    grade: '4.9',
  },
  {
    name: 'Ирина',
    date: '22.12.2025',
    comment:
      'Ходили на квест "последняя игра" 7 человек все остались довольны брали позамежний рiвень,. Все были в восторге, страшно, интересно, необычно, актеры просто супер !!! Мы просили пожоще и ребята отработали на',
    grade: '4.9',
  },
  {
    name: 'Артем',
    date: '17.11.2025',
    comment:
      'Были с друзьями на квесте, ощущения смешанные. До этого ходили в январе и все было супер, решили пойти ещё раз и все было не так круто как в прошлый раз. Актер половину квеста вел себя странно, ходил без шокера и вообще никак не пугал. Некоторые механизмы не работали так как надо, но к этой части вопросов почти нет. Администратор супер, отлично нас проинструктировала и провела игру. Квест хороший, но все же неприятный осадок немного после игры остался.',
    grade: '4.0',
  },
  {
    name: 'Андрей',
    date: '30.08.2025',
    comment:
      'Были на квесте, всё очень понравилось, было безумно страшно, актёр отыграл на 10/10 , в моменте думала потеряю сознание, загадки были интересные и смешные, атмосфера жуткая, страшная , интересная и незабываемые , сюжет запомнится на долго)',
    grade: '5',
  },
];

const videoList = [
  {
    url: 'https://www.youtube.com/embed/XGjVwyydJbg',
  },
  {
    url: 'https://www.youtube.com/embed/gkQRK0sxHMg',
  },
  {
    url: 'https://www.youtube.com/embed/mWQc_QYkRCY',
  },
  {
    url: 'https://www.youtube.com/embed/H0zgU4EQN3I',
  },
];

Modal.setAppElement('#root');

export default function LastGameSimpleSlider() {
  const [modalType, setModalType] = useState(null); // State to track which modal to open
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = (type, index = 0) => {
    setCurrentSlide(index);
    setModalType(type);
    document.body.classList.add('no-scroll'); // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setModalType(null);
    document.body.classList.remove('no-scroll'); // Re-enable scrolling when modal is closed
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    afterChange: current => setCurrentSlide(current),
  };

  return (
    <div>
      <div className={s.sliderSection}>
        <img src={time} alt="" className={s.advantagesImg} />
        <div>
          <h2 className={s.sliderTitle}>Наша робота — дарувати вам емоції.</h2>{' '}
          <br />
          <div className={s.buttonContainer}>
            <button className={s.button} onClick={() => openModal('photos')}>
              Фото
            </button>
            <button className={s.button} onClick={() => openModal('comments')}>
              Вiдгуки
            </button>
            <button className={s.button} onClick={() => openModal('other')}>
              Відео-відгуки
            </button>
          </div>
        </div>
        <img src={boo} alt="" className={s.advantagesImg} />
      </div>

      <Modal
        isOpen={modalType === 'photos'}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <Slider className={s.slider} {...settings}>
          {images.map((img, index) => (
            <div key={nanoid}>
              <img
                src={img}
                alt={`Slide ${index}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Slider>
      </Modal>

      <Modal
        isOpen={modalType === 'comments'}
        onRequestClose={closeModal}
        contentLabel="Comments Modal"
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <Slider className={s.slider} {...settings}>
          {comments.map((comment, index) => (
            <div key={nanoid}>
              <div className={s.commentSlide}>
                <div className={s.commentInfo}>
                  <h4 className={s.commentName}>{comment.name}</h4>
                  <p className={s.commentDate}>{comment.date}</p>
                </div>
                <div className={s.commentBox}>
                  <p className={s.commentText}>{comment.comment}</p>
                </div>
                <div className={s.commentFooter}>
                  <p className={s.commentConfirm}>Пiдтверджено грою</p>
                  <p className={s.commentTop}>
                    Вiдмiтка:
                    <span className={s.commentSpan}>{comment.grade}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Modal>

      <Modal
        isOpen={modalType === 'other'}
        onRequestClose={closeModal}
        contentLabel="Other Modal"
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <Slider {...settings} className={s.slider}>
          {videoList.map((video, index) => (
            <div key={index}>
              <iframe
                className={s.video}
                src={video.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`YouTube video ${index}`}
              />
            </div>
          ))}
        </Slider>
      </Modal>
    </div>
  );
}
