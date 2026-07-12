import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import death from '../../../img/Slider/clinicPhoto/death.svg';
import boo from '../../../img/Slider/sliderSvg/boo_bbixqf37nv44.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './ClinicDeathSlider.module.css';
import img1 from '../../../img/Slider/clinicPhoto/IMG_7926.png';
import img2 from '../../../img/Slider/clinicPhoto/IMG_7927.png';
import img3 from '../../../img/Slider/clinicPhoto/IMG_7929.png';
import img4 from '../../../img/Slider/clinicPhoto/IMG_7933.png';
import { nanoid } from 'nanoid';

const images = [img1, img2, img3, img4];
const comments = [
  {
    name: 'Анастасия',
    date: '19.04.2026',
    comment:
      'це найстрашніший вест на якому ми були, а були ми на багатьох квестах. вже на перших хвилинах хотілось показати хрест, бо це було аж занадто страшно. ',
    grade: '5',
  },
  {
    name: 'Марiя',
    date: '14.12.2026',
    comment:
      'Квест чудовий! Актори просто бомба, цікавий і на логіку. Отримали чудові емоції і враження, адреналін на висоті! Обовʼязково ще прийдемо!',
    grade: '4.8',
  },
  {
    name: 'Дарiна',
    date: '04.11.2025',
    comment:
      'Квест хороший, цікавий, але не завжди було зрозуміло що робити, дякую акторам. Брали рівень позамежний, було страшно на початку коли було не зрозуміло, що й куди.',
    grade: '4.9',
  },
  {
    name: 'Александра',
    date: '02.11.2025',
    comment:
      'Супер враження , дуже цікава гра , рекомендуємо кожному спробувати. Будемо повертатися до Вас завжди',
    grade: '4.9',
  },
  {
    name: 'Кiра',
    date: '02.11.2025',
    comment:
      'Квест справив сильне враження! Атмосфера напружена з перших хвилин. Декорації та звукові ефекти створюють повне відчуття присутності в історії. Завдання продумані',
    grade: '4.8',
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

export default function MonahSimpleSlider() {
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
        <img src={death} alt="" className={s.advantagesImg} />
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
