import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './CircCalendar.module.css';
import time from '../../../img/advanstage/time.svg';
import calendar from '../../../img/calendar.svg';
import dollar from '../../../img/dollar.svg';
import Notiflix from 'notiflix';

const timeSlots = [
  { time: '11:00', price: 1000 },
  { time: '12:20', price: 1000 },
  { time: '13:40', price: 1200 },
  { time: '15:00', price: 1200 },
  { time: '16:20', price: 1200 },
  { time: '17:40', price: 1300 },
  { time: '19:00', price: 1300 },
  { time: '20:20', price: 1400 },
];

const weekendTimeSlots = [
  { time: '11:00', price: 1000 },
  { time: '12:20', price: 1100 },
  { time: '13:40', price: 1200 },
  { time: '15:00', price: 1200 },
  { time: '16:20', price: 1300 },
  { time: '17:40', price: 1300 },
  { time: '19:00', price: 1400 },
  { time: '20:20', price: 1500 },
];

const getNextSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    days.push(day);
  }
  return days;
};

const CircBookingCalendar = ({ questName }) => {
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [nextSevenDays, setNextSevenDays] = useState(getNextSevenDays());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    players: '2', // Дефолтное количество игроков
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://outlast-56f6a045daee.herokuapp.com/api/${questName}`
        );
        const data = await response.json();
        const parsedBookings = data.reduce((acc, booking) => {
          const date = new Date(booking.reserved.split(' ')[0]).toDateString();
          const time = booking.reserved.split(' ')[1];
          if (!acc[date]) acc[date] = [];
          acc[date].push(time);
          return acc;
        }, {});
        setBookings(parsedBookings);
        deleteExpiredBookings(data);
      } catch (error) {
        console.error('Помилка при отриманні даних про бронювання:', error);
        Notiflix.Notify.failure('Помилка при отриманні даних про бронювання.');
      }
    };

    const deleteExpiredBookings = async bookings => {
      const now = new Date();
      for (const booking of bookings) {
        const bookingDate = new Date(
          `${booking.reserved.split(' ')[0]}T${
            booking.reserved.split(' ')[1]
          }:00`
        );
        if (bookingDate < now) {
          try {
            await fetch(
              `https://outlast-56f6a045daee.herokuapp.com/api/${questName}/${booking._id}`,
              {
                method: 'DELETE',
              }
            );
            console.log(`Видалено застаріле бронювання з ID: ${booking._id}`);
          } catch (error) {
            console.error(
              `Ошибка при удалении бронирования с ID: ${booking._id}`,
              error
            );
            Notiflix.Notify.failure(
              `Ошибка при удалении бронирования с ID: ${booking._id}`
            );
          }
        }
      }
    };

    fetchBookings();
    setNextSevenDays(getNextSevenDays());
  }, [questName]);

  const handleBooking = (day, timeSlot) => {
    setSelectedDate(day);
    setSelectedTimeSlot(timeSlot.time);
    setSelectedPrice(timeSlot.price);
    setModalIsOpen(true);
  };

  const handleConfirmBooking = async e => {
    e.preventDefault();

    // Проверка номера телефона
    if (!validatePhoneNumber(formData.phone)) {
      Notiflix.Notify.failure(
        'Будь ласка, введіть номер телефону у форматі: +1234567890 або 123-456-7890'
      );
      return;
    }

    const newBooking = {
      name: formData.name,
      phone: formData.phone,
      reserved: `${
        selectedDate.toISOString().split('T')[0]
      } ${selectedTimeSlot}`,
      mail: formData.email,
      players: formData.players, // Добавление количества игроков
      price: getTotalPrice(), // Добавление стоимости
    };

    console.log(newBooking);
    try {
      const response = await fetch(
        `https://outlast-56f6a045daee.herokuapp.com/api/${questName}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBooking),
        }
      );

      if (!response.ok) {
        throw new Error('Помилка мережі:' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Бронювання підтверджено з даними:', responseData);

      // Обновление состояния бронирований
      const dateString = selectedDate.toDateString();
      const updatedBookings = {
        ...bookings,
        [dateString]: [...(bookings[dateString] || []), selectedTimeSlot],
      };
      setBookings(updatedBookings);

      // Сброс данных формы
      setFormData({
        name: '',
        phone: '',
        email: '',
        players: '2', // Сброс количества игроков к дефолтному значению
      });

      // Закрытие модального окна
      closeModal();

      Notiflix.Notify.success('Бронювання успішно підтверджено.');
    } catch (error) {
      console.error('Помилка підтвердження бронювання:', error);
      Notiflix.Notify.failure('Помилка підтвердження бронювання.');
    }
  };

  const validatePhoneNumber = phone => {
    const phonePattern = /^[+]?[0-9\s-]{7,15}$/;
    return phonePattern.test(phone);
  };

  const isBooked = (date, time) => {
    const dateString = date.toDateString();
    return bookings[dateString] && bookings[dateString].includes(time);
  };

  const isPastTime = (date, time) => {
    const selectedDateTime = new Date(`${date.toDateString()} ${time}`);
    return selectedDateTime < new Date();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setSelectedPrice(null);
    document.body.style.overflow = ''; // Удаление блокировки прокрутки
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden'; // Блокировка прокрутки
    } else {
      document.body.style.overflow = ''; // Удаление блокировки прокрутки
    }

    return () => {
      document.body.style.overflow = ''; // Очистка блокировки при размонтировании компонента
    };
  }, [modalIsOpen]);

  // Определение стоимости в зависимости от количества игроков
  const getTotalPrice = () => {
    const basePrice = selectedPrice || 0;
    const additionalPlayers = parseInt(formData.players, 10) - 4;
    return basePrice + (additionalPlayers > 0 ? additionalPlayers * 250 : 0);
  };

  const isWeekend = day => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0; // 6 - суббота, 0 - воскресенье
  };

  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const weekday = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][date.getDay()];
    return `${day}.${month}, ${weekday}`;
  };

  return (
    <div className={styles.calendarContainer}>
      <h2 className={styles.calendarTitle}>Обери зручну дату та час</h2>
      <p className={styles.cost}>
        *Базова вартість за гру вказана за 4 гравців, доплата за кожного
        наступного гравця 250 грн, максимальна кількість гравців - 8.
      </p>
      <div className={styles.daysContainer}>
        {nextSevenDays.map((day, index) => (
          <div key={index} className={styles.daySlot}>
            <h4 className={styles.day}>{formatDate(day)}</h4>
            <div className={styles.timeSlots}>
              {(isWeekend(day) ? weekendTimeSlots : timeSlots).map(
                (timeSlot, idx) => (
                  <button
                    key={idx}
                    className={`${styles.timeSlot} ${
                      isBooked(day, timeSlot.time) ||
                      isPastTime(day, timeSlot.time)
                        ? styles.booked
                        : ''
                    } ${isWeekend(day) ? styles.weekendTimeSlot : ''}`}
                    onClick={() => handleBooking(day, timeSlot)}
                    disabled={
                      isBooked(day, timeSlot.time) ||
                      isPastTime(day, timeSlot.time)
                    }
                  >
                    {timeSlot.time} <br />
                    <p className={styles.timePrice}>({timeSlot.price} грн)</p>
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Бронювання часу"
      >
        <form onSubmit={handleConfirmBooking}>
          <div className={styles.reservInfo}>
            <h3 className={styles.reservTitle}>Бронювання квесту</h3>
            <p className={styles.reservDate}>
              <img src={time} alt="" className={styles.timeSvg} />
              <span className={styles.dateInformTittle}>Час:</span>{' '}
              <span className={styles.reservDateInfo}>{selectedTimeSlot}</span>
            </p>
            <p className={styles.reservDate}>
              <img src={calendar} alt="" className={styles.timeSvg} />
              <span className={styles.dateInformTittle}>Дата:</span>
              <span className={styles.reservDateInfo}>
                {selectedDate ? formatDate(selectedDate) : ''}
              </span>
            </p>
            <p className={styles.reservDate}>
              <img src={dollar} alt="" className={styles.timeSvg} />
              <span className={styles.dateInformTittle}>Ціна: </span>
              <span className={styles.reservDateInfo}>
                {getTotalPrice()} грн
              </span>
            </p>
            <p className={styles.infoDescription}>
              * Бронювання цього квесту потребує передоплати в розмірі 200 грн.
            </p>
            <p className={styles.infoDescription}>
              * Після заповнення форми з вами зв'яжеться адміністратор по номеру
              телефону для підтвердження бронювання.
            </p>
          </div>
          <div className={styles.formLeftDecoration}></div>
          <div className={styles.formRightDecoration}></div>
          <div className={styles.circle}></div>
          <div className={styles.formInner}>
            <input
              type="text"
              placeholder="Ім'я"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Телефон"
              required
              value={formData.phone}
              onChange={e =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="players" className={styles.label}>
              <p className={styles.members}>Кількість гравців:</p>
              <select
                id="players"
                value={formData.players}
                onChange={e =>
                  setFormData({ ...formData, players: e.target.value })
                }
                className={styles.select}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </label>
            <input type="submit" value="Забронювати гру" />
            <button
              className={styles.modalClose}
              type="button"
              onClick={closeModal}
            >
              Відміна
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CircBookingCalendar;
