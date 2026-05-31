import { meta, countries, analyticalDimensions, peceAxes, timeline } from '../data/thesis';
import { Globe } from 'lucide-react';
import CountryFlag from 'react-country-flag';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';

export default function Hero() {
  const { lang } = useLanguage();
  const t = ui[lang].hero;
  const ts = ui[lang].statsBar;
  const keywords = lang === 'en' ? meta.keywordsEn : meta.keywords;

  const stats = [
    { value: countries.length,            label: ts.countries },
    { value: analyticalDimensions.length, label: ts.dimensions },
    { value: peceAxes.length,             label: ts.axes },
    { value: `${timeline.length}+`,       label: ts.milestones },
  ];

  return (
    <section
      id="top"
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f2236 0%, #1a3a5c 50%, #0f3460 100%)' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        <div className="flex justify-center gap-6 mb-8">
          {countries.map(c => (
            <CountryFlag
              key={c.id}
              countryCode={c.code}
              svg
              style={{ width: '2.5rem', height: '1.75rem', borderRadius: '4px', objectFit: 'cover' }}
              title={lang === 'en' ? c.nameEn : c.name}
            />
          ))}
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium mb-6 text-blue-200">
          <Globe size={14} />
          {t.label}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
          {t.title}
        </h1>
        <p className="text-blue-200 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto font-serif italic">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/70 mb-10">
          <div>
            <span className="text-white/40 uppercase text-xs tracking-widest block mb-0.5">{t.author}</span>
            <span className="text-white font-medium">{meta.author}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div>
            <span className="text-white/40 uppercase text-xs tracking-widest block mb-0.5">{t.advisor}</span>
            <span className="text-white font-medium">{meta.advisor}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div>
            <span className="text-white/40 uppercase text-xs tracking-widest block mb-0.5">{t.coadvisor}</span>
            <span className="text-white font-medium">{meta.coadvisor}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {keywords.map(kw => (
            <span key={kw} className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-blue-200">
              {kw}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <a href="#dashboard" className="bg-white text-[#1a3a5c] font-semibold px-6 py-3 rounded-full text-sm hover:bg-blue-50 transition-colors">
            {t.ctaExplore}
          </a>
          <a href="#resumo" className="border border-white/30 text-white px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
            {t.ctaRead}
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white">{s.value}</span>
              <span className="text-xs text-blue-300 leading-snug text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
        <span>scroll</span>
        <div className="w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </section>
  );
}
