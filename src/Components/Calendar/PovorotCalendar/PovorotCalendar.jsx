/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './PovorotCalendar.module.css';
import time from '../../../img/advanstage/time.svg';
import calendar from '../../../img/calendar.svg';
import dollar from '../../../img/dollar.svg';
import Notiflix from 'notiflix';

// Время и цены для обычных дней
const timeSlots = [
  { time: '11:00', price: 1500 },
  { time: '12:20', price: 1400 },
  { time: '13:40', price: 1400 },
  { time: '15:00', price: 1400 },
  { time: '16:20', price: 1500 },
  { time: '17:40', price: 1500 },
  { time: '19:00', price: 1600 },
  { time: '20:20', price: 1700 },
];

// Время и цены для выходных
const weekendTimeSlots = [
  { time: '11:00', price: 1500 },
  { time: '12:20', price: 1400 },
  { time: '13:40', price: 1400 },
  { time: '15:00', price: 1400 },
  { time: '16:20', price: 1500 },
  { time: '17:40', price: 1500 },
  { time: '19:00', price: 1600 },
  { time: '20:20', price: 1700 },
];

// Функция для получения следующих семи дней
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

const PovorotBookingCalendar = ({ questName }) => {
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
    players: '2',
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://outlast-2efa57d39805.herokuapp.com/api/${questName}`
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
          `${booking.reserved.split(' ')[0]}T${booking.reserved.split(' ')[1]}:00`
        );
        if (bookingDate < now) {
          try {
            await fetch(
              `https://outlast-2efa57d39805.herokuapp.com/api/${questName}/${booking._id}`,
              { method: 'DELETE' }
            );
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

    if (!validatePhoneNumber(formData.phone)) {
      Notiflix.Notify.failure(
        'Будь ласка, введіть номер телефону у форматі: +1234567890 або 123-456-7890'
      );
      return;
    }

    const newBooking = {
      name: formData.name,
      phone: formData.phone,
      reserved: `${selectedDate.toISOString().split('T')[0]} ${selectedTimeSlot}`,
      mail: formData.email,
      players: formData.players,
      price: getTotalPrice(),
    };

    try {
      const response = await fetch(
        `https://outlast-2efa57d39805.herokuapp.com/api/${questName}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBooking),
        }
      );

      if (!response.ok)
        throw new Error('Помилка мережi: ' + response.statusText);

      const dateString = selectedDate.toDateString();
      const updatedBookings = {
        ...bookings,
        [dateString]: [...(bookings[dateString] || []), selectedTimeSlot],
      };
      setBookings(updatedBookings);

      setFormData({ name: '', phone: '', email: '', players: '2' });
      closeModal();
      Notiflix.Notify.success('Бронювання успішно підтверджено.');
    } catch (error) {
      console.error('Помилка підтвердження бронювання:', error);
      Notiflix.Notify.failure('Помилка підтвердження бронювання.');
    }
  };

  const validatePhoneNumber = phone => /^[+]?[0-9\s-]{7,15}$/.test(phone);

  const isBooked = (date, time) => {
    const dateString = date.toDateString();
    return bookings[dateString] && bookings[dateString].includes(time);
  };

  // Проверка: забронировать можно только за 1 час до игры
  const isUnavailable = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes, 0, 0);
    return slotDateTime.getTime() - new Date().getTime() < 60 * 60 * 1000; // 1 час
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setSelectedPrice(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    document.body.style.overflow = modalIsOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIsOpen]);

  const getTotalPrice = () => {
    const basePrice = selectedPrice || 0;
    const additionalPlayers = parseInt(formData.players, 10) - 4;
    return basePrice + (additionalPlayers > 0 ? additionalPlayers * 300 : 0);
  };

  const isWeekend = day => [0, 6].includes(day.getDay());

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const weekday = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][date.getDay()];
    return `${day}.${month}, ${weekday}`;
  };

  return (
    <div className={styles.calendarContainer}>
      <h2 className={styles.calendarTitle}>Обери зручну дату та час</h2>
      <p className={styles.cost}>
        *Базова вартість за гру вказана за 4 гравцiв, доплата за кожного
        наступного гравця 300 грн, максимальна кількість гравців - 10.
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
                    className={`${styles.timeSlot} ${isBooked(day, timeSlot.time) || isUnavailable(day, timeSlot.time) ? styles.booked : ''} ${isWeekend(day) ? styles.weekendTimeSlot : ''}`}
                    onClick={() => handleBooking(day, timeSlot)}
                    disabled={
                      isBooked(day, timeSlot.time) ||
                      isUnavailable(day, timeSlot.time)
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
        contentLabel="Бронирование времени"
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
              * Бронювання цього квесту потребує передоплати в розмірі 300 грн.
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
                {[...Array(9)].map((_, i) => (
                  <option key={i} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
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

export default PovorotBookingCalendar;
