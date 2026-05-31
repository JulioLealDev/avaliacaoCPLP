import { useState } from 'react';
import { countries } from '../data/thesis';
import { MapPin, BookOpen, ClipboardList, Globe } from 'lucide-react';
import CountryFlag from 'react-country-flag';
import FadeIn from './FadeIn';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';

function AlignmentBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span className="font-semibold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function Countries() {
  const [selected, setSelected] = useState(null);
  const { lang } = useLanguage();
  const t = ui[lang].countries;

  return (
    <section id="paises" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">{t.description}</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {countries.map((c, idx) => {
            const name        = lang === 'en' ? c.nameEn        : c.name;
            const continent   = lang === 'en' ? c.continentEn   : c.continent;
            const population  = lang === 'en' ? c.populationEn  : c.population;
            const system      = lang === 'en' ? c.systemEn      : c.system;
            const assessDesc  = lang === 'en' ? c.assessmentDescriptionEn : c.assessmentDescription;
            const capital     = lang === 'en' ? (c.capitalEn ?? c.capital) : c.capital;

            return (
              <FadeIn key={c.id} delay={idx * 120}>
              <div
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelected(selected === c.id ? null : c.id)}
              >
                <div className="px-6 pt-6 pb-4" style={{ borderTop: `4px solid ${c.color}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <CountryFlag
                      countryCode={c.code}
                      svg
                      style={{ width: '3rem', height: '2.1rem', borderRadius: '4px', objectFit: 'cover' }}
                      title={name}
                    />
                    <span className="text-xs font-medium px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.color }}>
                      {continent}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0f2236]">{name}</h3>
                  <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                    <MapPin size={11} /> {capital} · {population}
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
                    style={{ backgroundColor: c.colorLight, color: c.color }}
                  >
                    <ClipboardList size={13} />
                    {c.mainAssessment}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{assessDesc}</p>

                  <div className="space-y-3">
                    <AlignmentBar label={t.alignPece} value={c.peceCplpAlignment} color={c.color} />
                    <AlignmentBar label={t.alignOds}  value={c.ods4Alignment}     color={c.color} />
                  </div>

                  <button
                    className="mt-4 text-xs font-medium w-full py-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: c.color + '40',
                      color: selected === c.id ? '#fff' : c.color,
                      backgroundColor: selected === c.id ? c.color : 'transparent',
                    }}
                  >
                    {selected === c.id ? t.hideDetails : t.showDetails}
                  </button>
                </div>

                {selected === c.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <BookOpen size={11} /> {t.law}
                      </p>
                      <p className="text-sm text-gray-700">{c.law}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{t.system}</p>
                      <p className="text-sm text-gray-700">{system}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Globe size={11} /> {t.intlAssessments}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {c.internationalAssessments.map(a => (
                          <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t.basicEd}</p>
                      <div className="space-y-1.5">
                        {c.basicEducation.map(e => (
                          <div key={e.stage} className="flex justify-between text-xs">
                            <span className="text-gray-700 font-medium">{lang === 'en' ? e.stageEn : e.stage}</span>
                            <span className="text-gray-400">{lang === 'en' ? e.agesEn : e.ages}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
