import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import joker from '../../../img/Slider/sliderSvg/joker_80grjm2rq9zy.svg';
import boo from '../../../img/Slider/sliderSvg/boo_bbixqf37nv44.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './CircSlider.module.css';
import img1 from '../../../img/Slider/cirkPhoto/etot.jpg';
import img2 from '../../../img/Slider/cirkPhoto/ietot.jpg';
import img3 from '../../../img/Slider/cirkPhoto/circ1.PNG';
import img4 from '../../../img/Slider/cirkPhoto/circ2.PNG';
import img5 from '../../../img/Slider/cirkPhoto/circ3.PNG';

const images = [img1, img2, img3, img4, img5];
const comments = [
  {
    name: 'Игорь',
    date: '03.12.2023',
    comment: 'Всё очень понравилось актеры супер, было страшно и интересно',
    grade: '4.6',
  },
  {
    name: 'Ника',
    date: '20.11.2023',
    comment: 'були з друзями та залишились дуууже задоволені',
    grade: '4.7',
  },
  {
    name: 'дарина',
    date: '06.08.2023',
    comment: 'Отлично провели время с друзьями, всё понравилось!',
    grade: '4.9',
  },
  {
    name: 'Егор',
    date: '30.07.2023',
    comment:
      'Круто лично мне понравилось главное иметь умных друзей и еще самому думать страшно и атмосферно очень круто рекомендую к посещению',
    grade: '5',
  },
  {
    name: 'Анна',
    date: '23.07.2023',
    comment:
      'Квест дужеее сподобався. Дівчинка адмін та актори молодці, лячно стало ще до початку квесту. А як ми тікали наприкінці, треба було бачити. Спробувати варто',
    grade: '4.9',
  },
  {
    name: 'Ната',
    date: '28.05.2023',
    comment:
      'В цілому квест сподобався,не дуже страшний,не дуже складні завдання,підійде для першого разу на хоррор касетах,мені сподобалось як для різноманіття',
    grade: '5',
  },
];

const videoList = [
  {
    url: 'https://youtube.com/embed/-gAvfkG9eQA',
  },
  {
    url: 'https://youtube.com/embed/4t2BvQEVixA',
  },
];

Modal.setAppElement('#root');

export default function CircSimpleSlider() {
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
