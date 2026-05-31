import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell
} from 'recharts';
import { analyticalDimensions, countries } from '../data/thesis';
import { useLanguage } from '../context/LanguageContext';
import { ui } from '../i18n/translations';
import CountryFlag from 'react-country-flag';
import FadeIn from './FadeIn';

const LEVEL_COLORS = {
  'Alto':       'bg-green-100 text-green-700',
  'Médio-Alto': 'bg-blue-100 text-blue-700',
  'Médio':      'bg-yellow-100 text-yellow-700',
  'Médio-Baixo':'bg-orange-100 text-orange-700',
  'Baixo':      'bg-red-100 text-red-700',
};

function CustomPolarAngleTick({ x, y, cx, cy, payload }) {
  const lines  = payload.value.split('\n');
  const isRight = x > cx + 5;
  const isLeft  = x < cx - 5;
  const anchor  = isRight ? 'start' : isLeft ? 'end' : 'middle';
  const lineH   = 13;
  const offsetY = -(lines.length - 1) * lineH / 2;

  return (
    <g>
      {lines.map((line, i) => (
        <text key={i} x={x} y={y + offsetY + i * lineH} textAnchor={anchor} dominantBaseline="central" fill="#6b7280" fontSize={11}>
          {line}
        </text>
      ))}
    </g>
  );
}

function CustomXAxisTick({ x, y, payload }) {
  const words = payload.value.split(' ');
  const lines = words.length > 1
    ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')]
    : [payload.value];

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text key={i} x={0} y={0} dy={14 + i * 14} textAnchor="middle" fill="#6b7280" fontSize={12}>
          {line}
        </text>
      ))}
    </g>
  );
}

function RadarData({ t }) {
  const data = analyticalDimensions.map((dim, idx) => ({
    dimension: t.radarLabels[idx],
    Brasil:       dim.data.find(d => d.countryId === 'brazil').alignment,
    'Cabo Verde': dim.data.find(d => d.countryId === 'capeverde').alignment,
    Portugal:     dim.data.find(d => d.countryId === 'portugal').alignment,
  }));

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4 text-center">
        {t.radarTitle}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data} outerRadius="75%" margin={{ top: 24, right: 48, bottom: 24, left: 48 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="dimension" tick={<CustomPolarAngleTick />} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} tickCount={4} />
          <Radar name="Brasil"      dataKey="Brasil"      stroke="#009C3B" fill="#009C3B" fillOpacity={0.15} strokeWidth={2} />
          <Radar name="Cabo Verde"  dataKey="Cabo Verde"  stroke="#003893" fill="#003893" fillOpacity={0.15} strokeWidth={2} />
          <Radar name="Portugal"    dataKey="Portugal"    stroke="#CC0000" fill="#CC0000" fillOpacity={0.15} strokeWidth={2} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function BarData({ dimensionId, t, lang }) {
  const dim = analyticalDimensions.find(d => d.id === dimensionId);
  if (!dim) return null;

  const data = dim.data.map(d => ({
    name: lang === 'en' ? d.countryEn : d.country,
    Alinhamento: d.alignment,
    color: d.color,
  }));

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4 text-center">
        {t.barTitle}
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 10, bottom: 28, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} interval={0} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
          <Tooltip
            formatter={(v) => [`${v}%`, t.alignment]}
            contentStyle={{ borderRadius: 8, fontSize: 12 }}
          />
          <Bar dataKey="Alinhamento" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ComparisonTable({ t, lang }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-6 text-center">
        {t.tableTitle}
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#0f2236] text-white">
              <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-widest w-48">
                {t.tableDimension}
              </th>
              {countries.map(c => (
                <th key={c.id} className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <CountryFlag
                      countryCode={c.code}
                      svg
                      style={{ width: '2rem', height: '1.4rem', borderRadius: '3px', objectFit: 'cover' }}
                      title={lang === 'en' ? c.nameEn : c.name}
                    />
                    <span className="text-xs font-semibold">{lang === 'en' ? c.nameEn : c.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analyticalDimensions.map((dim, i) => {
              const dimName = lang === 'en' ? dim.nameEn : dim.name;
              return (
                <tr key={dim.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-5 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{dim.icon}</span>
                      <span className="font-medium text-[#0f2236] text-xs leading-snug">{dimName}</span>
                    </div>
                  </td>
                  {dim.data.map(item => {
                    const levelLabel = t.levels[item.level] ?? item.level;
                    const levelClass = LEVEL_COLORS[item.level] ?? 'bg-gray-100 text-gray-600';
                    return (
                      <td key={item.countryId} className="px-4 py-4 text-center border-t border-gray-100">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-xl font-bold text-[#0f2236]">
                            {item.alignment}%
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelClass}`}>
                            {levelLabel}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedDim, setSelectedDim] = useState('finalidades');
  const { lang } = useLanguage();
  const t = ui[lang].dashboard;
  const currentDim = analyticalDimensions.find(d => d.id === selectedDim);

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">{t.sectionLabel}</span>
            <h2 className="text-3xl font-bold text-[#0f2236] mt-2">{t.title}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {t.description} <strong>PECE-CPLP 2022–2026</strong>.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <RadarData t={t} />
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <BarData dimensionId={selectedDim} t={t} lang={lang} />
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {analyticalDimensions.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDim(d.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedDim === d.id
                      ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                      : 'text-gray-600 border-gray-200 hover:border-[#1a3a5c]/40'
                  }`}
                >
                  <span>{d.icon}</span> {lang === 'en' ? d.nameEn : d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>

        {/* Dimension detail */}
        <FadeIn delay={100}>
        <div className="bg-[#f8faff] rounded-2xl border border-blue-100 p-6 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{currentDim.icon}</span>
            <div>
              <h3 className="font-bold text-[#0f2236] text-lg">{lang === 'en' ? currentDim.nameEn : currentDim.name}</h3>
              <p className="text-sm text-gray-500">{lang === 'en' ? currentDim.descriptionEn : currentDim.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {currentDim.data.map(item => {
              const levelLabel = t.levels[item.level] ?? item.level;
              const levelClass = LEVEL_COLORS[item.level] ?? 'bg-gray-100 text-gray-600';
              const country = countries.find(c => c.id === item.countryId);
              const countryName = lang === 'en' ? item.countryEn : item.country;
              const desc = lang === 'en' ? item.descriptionEn : item.description;

              return (
                <div key={item.countryId} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CountryFlag
                        countryCode={country?.code}
                        svg
                        style={{ width: '1.5rem', height: '1.05rem', borderRadius: '2px', objectFit: 'cover' }}
                        title={countryName}
                      />
                      <span className="font-semibold text-sm text-[#0f2236]">{countryName}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelClass}`}>
                      {levelLabel}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{t.alignment}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.alignment}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.alignment}%`, backgroundColor: item.color }} />
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        </FadeIn>

        {/* Comparison table */}
        <FadeIn delay={100}>
          <ComparisonTable t={t} lang={lang} />
        </FadeIn>

      </div>
    </section>
  );
}
