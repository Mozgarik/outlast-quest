import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import monah from '../../../img/Slider/sliderSvg/nun_j6xll1ba57t8.svg';
import boo from '../../../img/Slider/sliderSvg/boo_bbixqf37nv44.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './MonahSlider.module.css';
import img1 from '../../../img/Slider/monahPhoto/monah1.png';
import img2 from '../../../img/Slider/monahPhoto/monah2.png';
import img3 from '../../../img/Slider/monahPhoto/monah3.png';
import img4 from '../../../img/Slider/monahPhoto/monah4.png';
import img5 from '../../../img/Slider/monahPhoto/IMG_0353.png';
import { nanoid } from 'nanoid';

const images = [img1, img2, img3, img4, img5];
const comments = [
  {
    name: 'Вікторія Будзян',
    date: '05.10.2023',
    comment: 'Все сподобалось, актор молодець👍',
    grade: '4.4',
  },
  {
    name: 'Владислав',
    date: '20.11.2022',
    comment:
      'Этот квест очень впечатлил главной героиней этой истории. До мурашек и истерики! Очень приятный администратор, все понравилось',
    grade: '4.8',
  },
  {
    name: 'Ольга Билач',
    date: '13.04.2022',
    comment:
      'Спасибо, было страшно круто и драйвово🔥🔥🔥море эмоций и адреналина.',
    grade: '4.9',
  },
  {
    name: 'Инна Медина',
    date: '15.05.2022',
    comment:
      'Классный квест , в Одессе проездом, посетила, осталась довольна. Всем рекомендую',
    grade: '4.9',
  },
  {
    name: 'Маргарита Москович',
    date: '04.01.2023',
    comment:
      'Было очень страшно и в то же время интересно. Обязательно придем еще',
    grade: '4.8',
  },
  {
    name: 'Игорь',
    date: '28.02.2021',
    comment: 'Спасибо за прекрасные впечатления! Ждем новых приключений!',
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
        <img src={monah} alt="" className={s.advantagesImg} />
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
