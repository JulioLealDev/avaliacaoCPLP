import { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = ui[lang].nav;

  const links = [
    { href: '#resumo',      label: t.resumo },
    { href: '#paises',      label: t.paises },
    { href: '#dashboard',   label: t.dashboard },
    { href: '#timeline',    label: t.timeline },
    { href: '#metodologia', label: t.metodologia },
    { href: '#conclusoes',  label: t.conclusoes },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f2236]/95 backdrop-blur shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2 text-white font-semibold text-sm">
          <BookOpen size={20} className="text-blue-300" />
          <span className="hidden sm:inline">Tese CPLP</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-white text-sm transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex bg-white/10 rounded-full p-0.5 gap-0.5">
            <button
              onClick={() => setLang('pt')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'pt' ? 'bg-white text-[#0f2236]' : 'text-white/70 hover:text-white'}`}
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'en' ? 'bg-white text-[#0f2236]' : 'text-white/70 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0f2236] px-4 pb-4 flex flex-col gap-3">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 text-sm py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
