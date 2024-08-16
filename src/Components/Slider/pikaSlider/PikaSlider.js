import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import joker from '../../../img/Slider/sliderSvg/spades_vpo71wc7rmj9.svg';
import boo from '../../../img/Slider/sliderSvg/boo_bbixqf37nv44.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './PikaSlider.module.css';
import img1 from '../../../img/Slider/PikaPhoto/pika1.PNG';
import img2 from '../../../img/Slider/PikaPhoto/pika2.png';
import img3 from '../../../img/Slider/PikaPhoto/pika4.png';
import img4 from '../../../img/Slider/PikaPhoto/pika5.png';

const images = [img1, img2, img3, img4];
const comments = [
  {
    name: 'Виктор Тучемский',
    date: '02.11.2022',
    comment:
      'Один из самых крутых квестов в Одессе, очень крутая игра актёров, загадки на уровне. Всем советую)',
    grade: '4.9',
  },
  {
    name: 'Лера Герман',
    date: '20.10.2022',
    comment: '10000/10',
    grade: '4.8',
  },
  {
    name: 'I am',
    date: '06.08.2023',
    comment: 'Очень понравилось , всем советую!!',
    grade: '4.6',
  },
  {
    name: 'Валерия Holovatuk',
    date: '23.09.2023',
    comment: 'Спасибо за офигенные эмоциии!!!',
    grade: '5',
  },
  {
    name: 'Алексей Серов',
    date: '12.04.2023',
    comment:
      'Персонал дружелюбный, атмосферность на уровне, довольно стремно)) квест понравился)',
    grade: '4.5',
  },
  {
    name: 'Денис',
    date: '22.02.2023',
    comment: 'Все кайф, игра на высоте',
    grade: '4.9',
  },
];

const videoList = [
  {
    url: 'https://youtube.com/embed/Fka4gKCgkLk',
  },
  {
    url: 'https://youtube.com/embed/EJIS2-3U7tA',
  },
  {
    url: 'https://youtube.com/embed/IlvUtq2jsWg',
  },
  {
    url: 'https://youtube.com/embed/9pW-3jjQTx4',
  },
];

Modal.setAppElement('#root');

export default function PikaSimpleSlider() {
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
        <img src={joker} alt="" className={s.advantagesImg} />
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
            <div key={index}>
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
            <div key={index}>
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
