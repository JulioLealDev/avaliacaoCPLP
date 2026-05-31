import { meta, countries } from '../data/thesis';
import { BookOpen } from 'lucide-react';
import CountryFlag from 'react-country-flag';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const program = lang === 'en' ? meta.programEn : meta.program;

  return (
    <footer className="bg-[#0f2236] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <BookOpen size={22} className="text-blue-300" />
            <div>
              <p className="font-semibold">{meta.author}</p>
              <p className="text-blue-300 text-sm">{meta.institution} · {meta.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {countries.map(c => (
              <CountryFlag
                key={c.id}
                countryCode={c.code}
                svg
                style={{ width: '2.2rem', height: '1.5rem', borderRadius: '4px', objectFit: 'cover' }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/40 text-xs italic font-serif">
            "{meta.subtitle}"
          </p>
          <p className="text-center text-white/30 text-xs mt-4">
            {program}
          </p>
        </div>
      </div>
    </footer>
  );
}
