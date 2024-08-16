import Header from '../../Components/Header/Header';
import Hero from '../../Components/Hero/Hero';
import QuestList from '../../Components/QuestList/QuestList';
import Qualitat from '../../Components/Qualitat/Qualitat';
import Footer from '../../Components/Footer/Footer';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Qualitat />
      <QuestList />
      <Footer />
    </div>
  );
}
