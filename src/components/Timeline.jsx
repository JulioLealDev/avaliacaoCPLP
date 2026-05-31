import { useState } from 'react';
import { timeline } from '../data/thesis';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';
import FadeIn from './FadeIn';

const TYPE_CONFIG = {
  cplp:      { bg: 'bg-black',       dot: 'bg-black',       text: 'text-black',       badge: 'bg-gray-100 text-gray-800' },
  brazil:    { bg: 'bg-[#009C3B]',  dot: 'bg-[#009C3B]',  text: 'text-[#009C3B]',  badge: 'bg-green-100 text-green-700' },
  capeverde: { bg: 'bg-[#003893]',  dot: 'bg-[#003893]',  text: 'text-[#003893]',  badge: 'bg-blue-100 text-blue-800' },
  portugal:  { bg: 'bg-[#CC0000]',  dot: 'bg-[#CC0000]',  text: 'text-[#CC0000]',  badge: 'bg-red-100 text-red-700' },
};

const TYPE_LABELS = {
  pt: { cplp: 'CPLP', brazil: 'Brasil', capeverde: 'Cabo Verde', portugal: 'Portugal' },
  en: { cplp: 'CPLP', brazil: 'Brazil', capeverde: 'Cape Verde', portugal: 'Portugal' },
};

const FILTERS = ['all', 'cplp', 'brazil', 'capeverde', 'portugal'];

export default function Timeline() {
  const [filter, setFilter] = useState('all');
  const { lang } = useLanguage();
  const t = ui[lang].timeline;
  const labels = TYPE_LABELS[lang];

  const visible = filter === 'all' ? timeline : timeline.filter(e => e.type === filter);

  return (
    <section id="timeline" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
            <p className="text-gray-500 mt-3">{t.description}</p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === f
                  ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                  : 'text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {f === 'all' ? t.filterAll : labels[f]}
            </button>
          ))}
        </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[68px] top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {visible.map((item, idx) => {
              const cfg = TYPE_CONFIG[item.type];
              const event = lang === 'en' ? item.eventEn : item.event;
              const desc  = lang === 'en' ? item.descEn  : item.desc;
              return (
                <FadeIn key={idx} delay={idx * 60} y={16}>
                <div className="flex gap-6 items-start">
                  <div className="w-14 text-right flex-shrink-0">
                    <span className="text-sm font-bold text-[#0f2236]">{item.year}</span>
                  </div>

                  <div className="relative flex-shrink-0 mt-1.5">
                    <div className={`w-4 h-4 rounded-full ring-4 ring-white ${cfg.dot}`} />
                  </div>

                  <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="font-semibold text-[#0f2236] text-sm">{event}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${cfg.badge}`}>
                        {labels[item.type]}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
