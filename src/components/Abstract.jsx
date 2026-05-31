import { meta, researchQuestion, researchQuestionEn } from '../data/thesis';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';
import FadeIn from './FadeIn';

export default function Abstract() {
  const { lang } = useLanguage();
  const t = ui[lang].abstract;
  const text = lang === 'en' ? meta.abstract : meta.resumo;
  const question = lang === 'en' ? researchQuestionEn : researchQuestion;

  return (
    <section id="resumo" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-10">
            <p className="text-gray-700 leading-relaxed text-base font-serif">{text}</p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-[#0f2236] rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4">
              <Quote size={28} className="text-blue-300 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">{t.questionLabel}</p>
                <p className="text-white/90 font-serif italic text-lg leading-relaxed">{question}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
