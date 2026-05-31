import { methodology, peceAxes, analyticalDimensions, meta } from '../data/thesis';
import { CheckCircle, Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';
import FadeIn from './FadeIn';

export default function Methodology() {
  const { lang } = useLanguage();
  const t = ui[lang].methodology;

  return (
    <section id="metodologia" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">{t.proceduresTitle}</h3>
            <div className="grid grid-cols-2 gap-3">
              {methodology.map(m => (
                <div key={m.type} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">{lang === 'en' ? m.typeEn : m.type}</p>
                  <p className="text-sm font-semibold text-[#0f2236]">{lang === 'en' ? m.valueEn : m.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">{t.axesTitle}</h3>
            <div className="space-y-2">
              {peceAxes.map(ax => (
                <div
                  key={ax.num}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border text-sm transition-all ${
                    ax.focus
                      ? 'bg-[#1a3a5c] border-[#1a3a5c] text-white font-semibold'
                      : 'bg-gray-50 border-gray-100 text-gray-600'
                  }`}
                >
                  {ax.focus ? (
                    <CheckCircle size={16} className="text-blue-300 flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-gray-300 flex-shrink-0" />
                  )}
                  <span className="font-mono text-xs opacity-60 flex-shrink-0">{ax.num}</span>
                  <span>{lang === 'en' ? ax.nameEn : ax.name}</span>
                  {ax.focus && (
                    <span className="ml-auto text-xs bg-blue-400/30 rounded-full px-2 py-0.5">{t.axisFocus}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>

        <FadeIn delay={100}>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
            {t.matrixTitle}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {analyticalDimensions.map((d, i) => {
              const numerals = ['i', 'ii', 'iii', 'iv', 'v'];
              return (
                <div key={d.id} className="bg-[#f8faff] border border-blue-100 rounded-xl p-5 text-center">
                  <span className="text-2xl">{d.icon}</span>
                  <p className="text-xs font-mono text-blue-300 mt-2 mb-1">({numerals[i]})</p>
                  <p className="text-xs font-semibold text-[#0f2236] leading-snug">
                    {lang === 'en' ? d.nameEn : d.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        </FadeIn>

        <FadeIn delay={100}>
        <div className="mt-12 pt-10 border-t border-gray-100 grid sm:grid-cols-2 gap-6 text-sm text-gray-500">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t.institution}</p>
            <p className="font-medium text-[#0f2236]">{meta.institution}</p>
            <p className="text-xs mt-1">{lang === 'en' ? meta.programEn : meta.program}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t.orientation}</p>
            <p><span className="font-medium text-[#0f2236]">{t.orientador}:</span> {meta.advisor}</p>
            <p className="mt-1"><span className="font-medium text-[#0f2236]">{t.coorientador}:</span> {meta.coadvisor}</p>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
