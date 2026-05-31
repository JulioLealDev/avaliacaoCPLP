import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Abstract from './components/Abstract';
import Countries from './components/Countries';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Methodology from './components/Methodology';
import Conclusions from './components/Conclusions';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Abstract />
        <Countries />
        <Dashboard />
        <Timeline />
        <Methodology />
        <Conclusions />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
