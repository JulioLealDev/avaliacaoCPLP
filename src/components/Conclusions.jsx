import { conclusions, countries } from '../data/thesis';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';
import CountryFlag from 'react-country-flag';
import FadeIn from './FadeIn';

export default function Conclusions() {
  const { lang } = useLanguage();
  const t = ui[lang].conclusions;

  return (
    <section id="conclusoes" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">{t.description}</p>
          </div>
        </FadeIn>

        {/* Per-country findings */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {conclusions.countries.map((entry, idx) => {
            const country = countries.find(c => c.id === entry.countryId);
            const name = lang === 'en' ? country.nameEn : country.name;
            const findings = lang === 'en' ? entry.findingsEn : entry.findings;

            return (
              <FadeIn key={entry.countryId} delay={idx * 120}>
              <div className="bg-[#f8faff] rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
                {/* Country header */}
                <div className="flex items-center gap-3">
                  <CountryFlag
                    countryCode={country.code}
                    svg
                    style={{ width: '2.2rem', height: '1.5rem', borderRadius: '4px', objectFit: 'cover' }}
                    title={name}
                  />
                  <div>
                    <p className="font-bold text-[#0f2236] text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{t.overallAlignment}</p>
                  </div>
                  <span className="ml-auto text-2xl font-bold" style={{ color: country.color }}>
                    {entry.overallAlignment}%
                  </span>
                </div>

                {/* Alignment bar */}
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${entry.overallAlignment}%`, backgroundColor: country.color }}
                  />
                </div>

                {/* Findings list */}
                <ul className="space-y-3 mt-1">
                  {findings.map((f, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ backgroundColor: country.color }}>
                        {i + 1}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Synthesis */}
        <FadeIn delay={80}>
        <div>
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400">{t.synthesisTitle}</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">{t.synthesisDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {conclusions.synthesis.map((s, i) => {
              const title = lang === 'en' ? s.titleEn : s.title;
              const text  = lang === 'en' ? s.textEn  : s.text;
              return (
                <FadeIn key={i} delay={i * 120}>
                <div className="bg-[#0f2236] rounded-2xl p-6 text-white">
                  <span className="text-3xl">{s.icon}</span>
                  <h4 className="font-bold text-sm mt-3 mb-2 leading-snug">{title}</h4>
                  <p className="text-white/70 text-xs leading-relaxed">{text}</p>
                </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
        </FadeIn>

        {/* Disclaimer note */}
        <p className="mt-10 text-center text-xs text-gray-400 italic">{t.note}</p>
      </div>
    </section>
  );
}
