import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBrain, FaClock, FaShieldAlt, FaBullseye } from 'react-icons/fa';
import { GiBrain, GiAnvil, GiHelmet, GiSandsOfTime } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import heroBg from '@assets/generated_images/hero-figure.jpg';
import checklistBg from '@assets/generated_images/checklist-bg.jpg';
import quoteBg from '@assets/generated_images/quote-bg.jpg';

import testimonial1 from '@assets/photo_2026-07-31_05-43-18_1785469420207.jpg';
import testimonial2 from '@assets/photo_2026-07-31_05-43-20_1785469420208.jpg';
import testimonial3 from '@assets/photo_2026-07-31_05-43-21_1785469420209.jpg';
import bookCover from '@assets/photo_2026-07-31_01-19-15_1785468455434.jpg';
import bonus1 from '@assets/photo_2026-07-31_01-19-09_1785468455433.jpg';
import bonus2 from '@assets/photo_2026-07-31_01-19-11_1785468455434.jpg';
import bonus3 from '@assets/photo_2026-07-31_01-19-13_1785468455434.jpg';
import bonus4 from '@assets/photo_2026-07-31_00-37-41_1785468455432.jpg';

/* ─── COUNTDOWN ─── */
function useCountdown(initialHours: number = 24) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const stored = localStorage.getItem('dominio-mental-countdown');
    if (stored) {
      const endTime = parseInt(stored, 10);
      const now = Date.now();
      if (endTime > now) return Math.floor((endTime - now) / 1000);
    }
    const endTime = Date.now() + initialHours * 3600 * 1000;
    localStorage.setItem('dominio-mental-countdown', endTime.toString());
    return initialHours * 3600;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

function TimerBar() {
  const { hours, minutes, seconds } = useCountdown(24);
  return (
    <div className="w-full bg-gradient-to-r from-[#4A0808] via-[#6B0F0F] to-[#4A0808] py-2.5 px-4 flex items-center justify-center gap-4 text-white border-b border-[#C9A84C]/20">
      <div className="flex items-center gap-2">
        <FaClock className="text-[#C9A84C] flex-shrink-0 text-sm animate-pulse" />
        <span
          className="tracking-[0.2em] uppercase text-sm md:text-base text-white/90"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.18em' }}
        >
          Oferta por tiempo limitado
        </span>
      </div>

      <div className="w-px h-4 bg-[#C9A84C]/40" />

      <div className="hidden md:flex items-center gap-2">
        <span
          className="text-white/50 text-sm line-through"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400 }}
        >
          $47
        </span>
        <span
          className="text-[#C9A84C] text-lg leading-none"
          style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif", letterSpacing: '0.05em' }}
        >
          $15
        </span>
        <span
          className="bg-[#C9A84C] text-black text-xs font-black px-1.5 py-0.5 uppercase tracking-wide"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          –68%
        </span>
      </div>

      <div className="hidden md:block w-px h-4 bg-[#C9A84C]/40" />

      <div className="flex items-center gap-1" style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}>
        {[hours, minutes, seconds].map((val, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="flex flex-col items-center">
              <span
                className="bg-black/50 border border-[#C9A84C]/30 px-2.5 py-0.5 text-[#C9A84C] text-lg md:text-xl leading-none transition-all duration-300"
                style={{ minWidth: '2.2rem', textAlign: 'center', letterSpacing: '0.05em' }}
              >
                {val}
              </span>
            </div>
            {i < 2 && (
              <span className="text-[#C9A84C] text-lg font-bold leading-none mb-0.5">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FADE IN ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── CTA BUTTON ─── */
function CTAButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const handleClick = () => {
    const el = document.getElementById('precio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button
      onClick={handleClick}
      className={`bg-[#C9A84C] text-black font-black text-base md:text-lg px-8 py-3 uppercase tracking-widest hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── GOLD DIVIDER ─── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]" />
      <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

/* ══════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[85vw] md:min-h-[70vh]">
        {/* LEFT: text */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-10 py-10 md:py-12">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="font-black text-5xl md:text-6xl lg:text-7xl text-[#C9A84C] leading-none tracking-widest mb-3"
            style={{ fontFamily: "'EB Garamond', Georgia, serif", textShadow: '0 0 40px rgba(201,168,76,0.35)' }}
          >
            DOMINIO<br />MENTAL
          </motion.h1>

          <GoldDivider />

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            className="text-white/90 text-base md:text-lg mb-2 leading-snug"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            Este material no es teoría para coleccionar frases.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="text-[#8B1A1A] font-black text-lg md:text-xl uppercase tracking-wide mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            ES UN ARMA.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
            className="text-white/70 text-sm md:text-base mb-8 leading-relaxed"
          >
            Un manual de disciplina, filosofía y combate interior.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
          >
            <CTAButton>QUIERO EMPEZAR</CTAButton>
          </motion.div>
        </div>

        {/* RIGHT: philosopher image */}
        <div className="relative overflow-hidden">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   2. PROMISE — "EN 30 DÍAS" + book
══════════════════════════════════════════════ */
function PromiseSection() {
  return (
    <FadeIn className="bg-[#111111] py-10 md:py-14 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-[#8B1A1A] font-black text-xl md:text-2xl uppercase tracking-wide mb-2"
             style={{ fontFamily: "'Oswald', sans-serif" }}>
            EN 30 DÍAS,
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            DEJÁS DE SOBREVIVIR Y EMPEZÁS A GOBERNARTE A TI MISMO.
          </h2>
          <GoldDivider />
          <p className="text-white/75 text-sm md:text-base leading-relaxed mt-3">
            No vas a "sentirte mejor". Vas a sustituir hábitos débiles por disciplina, enfoque y fuerza mental.
          </p>
          <p className="text-[#C9A84C] text-sm mt-3 italic">
            Un protocolo estoico de 30 días, aplicado al mundo real.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          {bookCover ? (
            <img
              src={bookCover}
              alt="Dominio Mental"
              className="w-52 md:w-64 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(201,168,76,0.15)' }}
            />
          ) : (
            <div
              className="w-52 md:w-64 bg-[#1a1a1a] border border-[#C9A84C]/30 flex items-center justify-center rotate-2 hover:rotate-0 transition-transform duration-500"
              style={{ aspectRatio: '3/4', boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(201,168,76,0.15)' }}
            >
              <p className="text-[#C9A84C]/60 text-xs text-center px-4">Portada del libro</p>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   3. CHECKLIST
══════════════════════════════════════════════ */
const checklistItems = [
  { icon: GiBrain, text: 'Por qué esperás tener más para ser mejor (y por qué eso te condena a no tenerlo nunca)' },
  { icon: GiSandsOfTime, text: 'Cómo recuperar la autoridad que le regalaste al gobierno, a la opinión ajena y a las redes' },
  { icon: GiHelmet, text: 'La diferencia real entre amor propio y autoindulgencia' },
  { icon: FaShieldAlt, text: 'Cómo construir un sistema de protección personal sin volverte cínico' },
  { icon: GiAnvil, text: 'Un método concreto de acción, no solo teoría' },
];

function ChecklistSection() {
  return (
    <section className="relative overflow-hidden bg-[#0D0D0D]">
      <div className="grid md:grid-cols-2">
        {/* LEFT: content */}
        <FadeIn className="relative z-10 py-10 md:py-14 px-6 md:px-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#C9A84C] mb-2"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            ¿QUÉ VAS A APRENDER?
          </h2>
          <GoldDivider />
          <div className="space-y-5 mt-5">
            {checklistItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-3 items-start"
              >
                <item.icon className="text-[#C9A84C] text-xl flex-shrink-0 mt-0.5" />
                <p className="text-white/85 text-sm md:text-base leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* RIGHT: dark scholar image */}
        <div className="relative hidden md:block">
          <img src={checklistBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   4. FOUR PILLARS
══════════════════════════════════════════════ */
const pillars = [
  { icon: FaBullseye, title: 'MÉTODO PRÁCTICO', sub: 'Aplicación real' },
  { icon: FaBrain, title: 'CONTENIDO COMPLETO', sub: 'Ebook + 4 bonos + app' },
  { icon: GiHelmet, title: 'MENTALIDAD ESTOICA', sub: 'Para toda la vida' },
  { icon: GiAnvil, title: 'DISCIPLINA Y RESULTADOS', sub: 'En el mundo real' },
];

function PillarsSection() {
  return (
    <FadeIn className="bg-[#141414] py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center text-center p-4 border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all duration-300"
          >
            <p.icon className="text-[#C9A84C] text-3xl mb-2" />
            <p className="text-[#C9A84C] font-black text-xs md:text-sm uppercase tracking-wide leading-tight mb-1"
               style={{ fontFamily: "'Oswald', sans-serif" }}>
              {p.title}
            </p>
            <p className="text-white/60 text-xs">{p.sub}</p>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   5. IMPACT QUOTE
══════════════════════════════════════════════ */
function ImpactQuote() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      <div className="grid md:grid-cols-2">
        {/* LEFT: philosopher image */}
        <div className="relative h-56 md:h-auto">
          <img src={quoteBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]" />
        </div>

        {/* RIGHT: quote text */}
        <FadeIn className="relative z-10 flex flex-col justify-center py-10 md:py-14 px-6 md:px-10">
          <div className="border border-[#C9A84C]/40 p-6 md:p-8 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A84C] -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C9A84C] translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C9A84C] -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A84C] translate-x-0.5 translate-y-0.5" />

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              LA MENTE ES LO QUE PRECEDE A TODO.
            </h2>
            <p className="text-[#8B1A1A] font-black text-xl md:text-2xl mb-2 uppercase tracking-wide"
               style={{ fontFamily: "'Oswald', sans-serif" }}>
              30 DÍAS PARA TRANSFORMAR TU MENTE.
            </p>
            <p className="text-[#C9A84C] font-black text-2xl md:text-3xl uppercase tracking-widest"
               style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}>
              PARA SIEMPRE.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   6. PRICE BLOCK
══════════════════════════════════════════════ */
function PriceBlock({ id }: { id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    if (isInView) setTimeout(() => setStruck(true), 400);
  }, [isInView]);

  return (
    <FadeIn className="bg-[#111111] py-10 md:py-14 px-4">
      <div ref={ref} id={id} className="max-w-xl mx-auto text-center">
        <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-bold mb-4"
           style={{ fontFamily: "'Oswald', sans-serif" }}>
          OBTENÉ ACCESO COMPLETO
        </p>

        <div className="mb-2 relative inline-block">
          <span className="text-gray-500 text-2xl font-bold">$47</span>
          <span
            className="absolute left-0 top-1/2 h-0.5 bg-gray-400 transition-all duration-700"
            style={{ width: struck ? '100%' : '0%' }}
          />
        </div>

        <div className="text-[#C9A84C] text-7xl md:text-8xl font-black mb-2"
             style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}>
          $15
        </div>
        <p className="text-gray-500 text-sm mb-6">Pago único. Sin suscripciones ocultas.</p>

        <CTAButton className="w-full max-w-sm">QUIERO DOMINAR MI MENTE</CTAButton>

        <div className="mt-8 border border-dashed border-gray-700/60 p-6 rounded">
          {/*
            ==========================================
            PEGAR ACÁ EL CÓDIGO DEL WIDGET DE HOTMART
            ==========================================
          */}
          <p className="text-gray-600 text-xs">
            [ Botón de pago Hotmart — pegar script aquí ]
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   7. BONUS E-BOOKS
══════════════════════════════════════════════ */
const bonuses = [
  { image: bonus1, title: 'Disciplina No Es Sufrimiento', sub: 'El mito que te hizo abandonar todo' },
  { image: bonus2, title: 'El Enemigo Que Te Mira en el Espejo', sub: 'El autosabotaje que no ves venir' },
  { image: bonus3, title: 'Nadie Te Debe Nada', sub: 'Nadie viene a salvarte' },
  { image: bonus4, title: 'El Dios Que Te Vendieron', sub: 'Esperar no es fe' },
];

function BonusSection() {
  return (
    <FadeIn className="bg-[#0A0A0A] py-10 md:py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-1"
             style={{ fontFamily: "'Oswald', sans-serif" }}>
            LLEVÁS TODO ESTO JUNTO CON DOMINIO MENTAL
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            + <span className="text-[#C9A84C]">4</span> E-BOOKS<br className="md:hidden" />
            <span className="text-[#C9A84C]"> BONOS EXCLUSIVOS</span>
          </h2>
        </div>

        {/* Book covers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {bonuses.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {b.image ? (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className="w-full bg-[#1a1a1a] border border-[#C9A84C]/20 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: '3/4' }}
                >
                  <p className="text-[#C9A84C]/50 text-xs text-center px-2">{b.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          {bonuses.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-3 items-start border border-[#C9A84C]/15 p-4"
            >
              <FaShieldAlt className="text-[#C9A84C] text-lg flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#C9A84C] font-black text-sm md:text-base"
                   style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {b.title}
                </p>
                <p className="text-white/60 text-xs md:text-sm">{b.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   8. GUARANTEE
══════════════════════════════════════════════ */
function GuaranteeSection() {
  return (
    <FadeIn className="bg-[#111111] py-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="border border-[#C9A84C]/30 p-6 md:p-8 flex gap-5 items-center">
          <FaShieldAlt className="text-[#C9A84C] text-5xl flex-shrink-0" />
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#C9A84C] mb-1"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              Garantía de 7 días
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              Si sentís que esto no es para vos, te devolvemos tu dinero. Sin preguntas.
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   9. TESTIMONIALS
══════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    photo: testimonial1,
    name: 'Mario Gonzales',
    text: 'Llevaba años buscando algo que realmente me moviera por dentro. Dominio Mental no te da motivación vacía — te da herramientas concretas. En menos de un mes dejé de posponer lo que más importaba en mi vida.',
  },
  {
    photo: testimonial2,
    name: 'Lucas Crespo',
    text: 'Lo leí en tres días porque no podía parar. Cada capítulo me confrontaba con algo que estaba evitando. Hoy tengo más claridad y disciplina de la que tuve en toda mi adolescencia junta.',
  },
  {
    photo: testimonial3,
    name: 'Alexa Aguilar',
    text: 'Pensé que era otro libro de autoayuda genérico. Me equivoqué completamente. La sección sobre el combate interior me cambió la forma de ver el esfuerzo. Ahora el esfuerzo duele menos porque lo entiendo diferente.',
  },
];

function TestimonialsSection() {
  return (
    <FadeIn className="bg-[#0A0A0A] py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="bg-[#1C1C1C] border border-[#C9A84C]/15 p-6 flex flex-col items-center">
            <img
              src={t.photo}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#C9A84C]/40"
            />
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, j) => (
                <AiFillStar key={j} className="text-[#C9A84C] text-base" />
              ))}
            </div>
            <p className="text-white/70 text-sm text-center italic mb-3">"{t.text}"</p>
            <p className="text-[#C9A84C] text-center text-sm font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      <TimerBar />
      <HeroSection />
      <PromiseSection />
      <ChecklistSection />
      <BonusSection />
      <PriceBlock id="precio" />
      <PillarsSection />
      <ImpactQuote />
      <GuaranteeSection />
      <TestimonialsSection />
      <PriceBlock />
      <TimerBar />
    </div>
  );
}
