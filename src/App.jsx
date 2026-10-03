import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, Activity, MapPin, Check, Phone, 
  QrCode, Share2, Copy, X, UserPlus 
} from 'lucide-react';

// Кастомная иконка Instagram
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА (МУЛЬТИЯЗЫЧНОСТЬ)
// ==========================================
const CONTENT = {
  RU: {
    bgImage: '/bg-fitness.webp', 
    avatar: '/avatar-fitness.webp', 
    badge: 'Трансформация',
    name1: 'Карен',
    name2: 'Сарян',
    role: 'Элитный Тренер',
    username: '@karen_sila',
    subUsername: 'Без Отговорок',
    location: 'Очно: Мск / Онлайн',
    tags: ['VIP-сопровождение', 'Коррекция осанки', 'Биохакинг и питание'],
    stat1Title: 'Лет Опыта',
    stat1Value: '8',
    stat2Title: 'Трансформаций',
    stat2Value: '500+',
    waLink: 'https://wa.me/79990000000',
    instLink: 'https://instagram.com/твой_юзернейм',
    actionText: 'Начать работу',
    actionLink: 'https://t.me/твой_юзернейм?text=Хочу%20тело%20мечты!',
    shareTitle: 'Поделиться визиткой',
    shareDesc: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
    copied: 'Скопировано!',
    copy: 'Копировать',
    shareBtn: 'Отправить',
    vcardTitle: 'Моя цифровая визитка',
    vcardDesc: 'Привет! Вот моя визитка с контактами:'
  },
  AM: {
    bgImage: '/bg-fitness.webp', 
    avatar: '/avatar-fitness.webp', 
    badge: 'Տրանսֆորմացիա',
    name1: 'Կարեն',
    name2: 'Սարյան',
    role: 'Էլիտար Մարզիչ',
    username: '@karen_sila',
    subUsername: 'Առանց արդարացումների',
    location: 'Առկա: Մոսկվա / Օնլայն',
    tags: ['VIP ուղեկցում', 'Կեցվածքի շտկում', 'Բիոհաքինգ և սնուցում'],
    stat1Title: 'Տարվա Փորձ',
    stat1Value: '8',
    stat2Title: 'Տրանսֆորմացիա',
    stat2Value: '500+',
    waLink: 'https://wa.me/79990000000',
    instLink: 'https://instagram.com/твой_юзернейм',
    actionText: 'Սկսել աշխատանքը',
    actionLink: 'https://t.me/твой_юзернейм?text=Ուզում%20եմ%20երազանքիս%20մարմինը!',
    shareTitle: 'Կիսվել այցեքարտով',
    shareDesc: 'Թույլ տվեք սկանավորել QR կոդը կամ անմիջապես ուղարկեք հղումը:',
    copied: 'Պատճենված է',
    copy: 'Պատճենել',
    shareBtn: 'Ուղարկել',
    vcardTitle: 'Իմ թվային այցեքարտը',
    vcardDesc: 'Ողջույն։ Ահա իմ այցեքարտը կոնտակտներով՝'
  },
  EN: {
    bgImage: '/bg-fitness.webp', 
    avatar: '/avatar-fitness.webp', 
    badge: 'Transformation',
    name1: 'Karen',
    name2: 'Saryan',
    role: 'Elite Trainer',
    username: '@karen_sila',
    subUsername: 'No Excuses',
    location: 'In-person: MSK / Online',
    tags: ['VIP Coaching', 'Posture Correction', 'Biohacking & Nutrition'],
    stat1Title: 'Years Exp.',
    stat1Value: '8',
    stat2Title: 'Transformations',
    stat2Value: '500+',
    waLink: 'https://wa.me/79990000000',
    instLink: 'https://instagram.com/твой_юзернейм',
    actionText: 'Start Now',
    actionLink: 'https://t.me/твой_юзернейм?text=I%20want%20a%20dream%20body!',
    shareTitle: 'Share Card',
    shareDesc: 'Let them scan the QR code or send the link directly.',
    copied: 'Copied!',
    copy: 'Copy',
    shareBtn: 'Share',
    vcardTitle: 'My digital card',
    vcardDesc: 'Hi! Here is my digital card with contacts:'
  }
};

// ==========================================
// 🎨 ГЛОБАЛЬНЫЕ СТИЛИ
// ==========================================
const globalStyles = `
  :root {
    --card-h: calc(min(26rem, 52dvh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(26rem, 52dvh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Физика и 3D */
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  /* Искры */
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* Эффект сгорания бумаги */
  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%;
      mask-size: 300% 300%;
      -webkit-mask-position: 100% 0%;
      mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: mask-position, -webkit-mask-position;
    }
    .burn-fire-edge {
      background: 
        linear-gradient(224deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        ),
        linear-gradient(226deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        );
      background-size: 300% 300%;
      background-position: 100% 0%;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 8px var(--burn-c2)) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: background-position, opacity;
    }
  }

  @media (max-width: 639px) {
    @keyframes mobile-fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .smooth-mask-wipe {
      opacity: 0;
      animation: mobile-fade-in 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: opacity;
    }
    .burn-fire-edge {
      display: none;
    }
  }
`;

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ
// ==========================================
const BurnRevealImage = ({ src, className, style, imgClassName = "" }) => {
  const theme = { 
    c1: 'rgba(153, 27, 27, 0.9)', 
    c2: 'rgba(220, 38, 38, 1)', 
    c3: 'rgba(248, 113, 113, 0.8)' 
  };
  
  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': theme.c1,
          '--burn-c2': theme.c2,
          '--burn-c3': theme.c3,
        }}
      />
    </div>
  );
};

// ==========================================
// 🏋️ КОМПОНЕНТ ВИЗИТКИ (ФИТНЕС-ТРЕНЕР)
// ==========================================
const FitnessCard = ({ lang }) => {
  const t = CONTENT[lang];

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА (Все отступы, шрифты и иконки на clamp + cqw) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(225,29,72,0.4)] overflow-hidden bg-black text-white flex flex-col p-[clamp(1rem,6cqw,1.5rem)] group-hover:shadow-[0_20px_80px_rgba(244,63,94,0.6)] transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-rose-500 to-orange-500 opacity-70 mix-blend-normal sm:mix-blend-screen"></div>
        
        {/* Темный градиент под фото */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/50 to-transparent"></div>
        
        {/* Сгорающий фон (Красный огонь) */}
        <BurnRevealImage src={t.bgImage} className="opacity-50" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-[#151515]/95 sm:bg-black/60 sm:backdrop-blur-md px-[clamp(0.5rem,3cqw,0.75rem)] py-[clamp(0.2rem,1.5cqw,0.35rem)] rounded-full border border-red-500/50 flex items-center gap-[clamp(0.25rem,1.5cqw,0.35rem)] transform -skew-x-6 shadow-[4px_4px_0_rgba(225,29,72,0.5)]">
              <Flame className="w-[clamp(0.6rem,3cqw,0.85rem)] h-[clamp(0.6rem,3cqw,0.85rem)] text-orange-400 transform skew-x-6" />
              <span className="text-[clamp(0.45rem,2.5cqw,0.6rem)] font-black italic tracking-widest uppercase text-rose-100 transform skew-x-6">{t.badge}</span>
            </div>
            <Activity className="w-[clamp(1.5rem,8cqw,2rem)] h-[clamp(1.5rem,8cqw,2rem)] text-rose-200/80 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
          </div>

          <div>
            <h2 className="text-[clamp(1.8rem,9cqw,2.25rem)] leading-tight font-black italic mb-[clamp(0.15rem,1cqw,0.25rem)] uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(220,38,38,0.8)]">
              {t.name1}
              <br />
              {t.name2}
            </h2>
            <p className="text-rose-300 font-black italic text-[clamp(0.6rem,3cqw,0.75rem)] uppercase tracking-[0.2em] mt-[clamp(0.35rem,2cqw,0.5rem)] border-l-4 border-orange-500 pl-[clamp(0.5rem,3cqw,0.75rem)]">
              {t.role}
            </p>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (Все отступы, шрифты и иконки на clamp + cqw) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(225,29,72,0.4)] overflow-hidden bg-[#0a0a0a] flex flex-col p-[clamp(0.85rem,5cqw,1.25rem)] text-white border-2 border-red-600/30" style={{ transform: 'rotateY(180deg)' }}>
        
        {/* Агрессивный фон: диагональные гоночные полосы */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 3px, #dc2626 3px, #dc2626 6px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full gap-[clamp(0.75rem,4cqw,1rem)]">
          
          {/* Хедер: Аватар и Имя со скосом */}
          <div className="flex items-center gap-[clamp(0.75rem,4cqw,1rem)] mt-[clamp(0.15rem,1cqw,0.25rem)]">
            <div className="relative w-[clamp(3rem,16cqw,4rem)] h-[clamp(3rem,16cqw,4rem)] shrink-0 transform -skew-x-6 overflow-hidden border-b-4 border-r-4 border-red-600 bg-zinc-800 shadow-[4px_4px_15px_rgba(220,38,38,0.3)]">
              <img src={t.avatar} alt={t.name1} className="w-full h-full object-cover transform skew-x-6 scale-125 grayscale contrast-125" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[clamp(1.1rem,6cqw,1.5rem)] font-black uppercase italic tracking-tighter text-white leading-none drop-shadow-[2px_2px_0px_#dc2626]">{t.username}</h3>
              <div className="flex flex-col gap-[clamp(0.25rem,1.5cqw,0.375rem)] mt-[clamp(0.25rem,1.5cqw,0.375rem)]">
                 <p className="text-white text-[clamp(0.45rem,2.2cqw,0.56rem)] uppercase tracking-[0.2em] font-black bg-red-600 w-fit px-[clamp(0.4rem,2.5cqw,0.625rem)] py-[clamp(0.1rem,0.5cqw,0.125rem)] transform -skew-x-6 shadow-[2px_2px_0px_#7f1d1d]">{t.subUsername}</p>
                 <p className="text-zinc-400 text-[clamp(0.4rem,2cqw,0.5rem)] uppercase tracking-[0.1em] font-black w-fit px-[clamp(0.15rem,1cqw,0.25rem)] flex items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)]"><MapPin className="w-[clamp(0.45rem,2.5cqw,0.625rem)] h-[clamp(0.45rem,2.5cqw,0.625rem)] text-red-500" /> {t.location}</p>
              </div>
            </div>
          </div>
          
          {/* Кольца активности (Smartwatch UI) */}
          <div className="flex justify-around items-center bg-[#151515]/95 sm:bg-zinc-900/80 sm:backdrop-blur-md py-[clamp(0.75rem,4cqw,1rem)] px-[clamp(0.35rem,2cqw,0.5rem)] border-y-2 border-red-600/50 transform -skew-x-3 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
            {/* Кольцо 1 */}
            <div className="flex flex-col items-center transform skew-x-3">
              <div className="relative w-[clamp(3rem,16cqw,4rem)] h-[clamp(3rem,16cqw,4rem)] mb-[clamp(0.35rem,2cqw,0.5rem)]">
                {/* Исправлено: добавлен viewBox для корректного масштабирования содержимого SVG */}
                <svg viewBox="0 0 64 64" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                  <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800" />
                  <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray="163" strokeDashoffset="32" className="text-red-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-black italic text-[clamp(0.9rem,4.5cqw,1.125rem)] text-white drop-shadow-md">{t.stat1Value}</span>
                </div>
              </div>
              <p className="text-[clamp(0.45rem,2.2cqw,0.56rem)] text-zinc-400 uppercase font-black tracking-widest leading-none">{t.stat1Title}</p>
            </div>
            
            {/* Вертикальный разделитель */}
            <div className="w-0.5 h-[clamp(2.25rem,12cqw,3rem)] bg-zinc-800 transform skew-x-3"></div>

            {/* Кольцо 2 */}
            <div className="flex flex-col items-center transform skew-x-3">
              <div className="relative w-[clamp(3rem,16cqw,4rem)] h-[clamp(3rem,16cqw,4rem)] mb-[clamp(0.35rem,2cqw,0.5rem)]">
                {/* Исправлено: добавлен viewBox для корректного масштабирования содержимого SVG */}
                <svg viewBox="0 0 64 64" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                  <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800" />
                  <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray="163" strokeDashoffset="8" className="text-orange-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-black italic text-[clamp(0.7rem,3.5cqw,0.875rem)] text-orange-400 drop-shadow-md">{t.stat2Value}</span>
                </div>
              </div>
              <p className="text-[clamp(0.45rem,2.2cqw,0.56rem)] text-zinc-400 uppercase font-black tracking-widest leading-none">{t.stat2Title}</p>
            </div>
          </div>

          {/* Теги специализации */}
          <div className="flex-1 flex flex-col justify-center gap-[clamp(0.4rem,2.5cqw,0.625rem)] my-[clamp(0.15rem,1cqw,0.25rem)] w-full pr-[clamp(0.15rem,1cqw,0.25rem)]">
            {t.tags.map((tag, idx) => (
               <div key={idx} className="bg-zinc-900 border border-zinc-800 transform -skew-x-6 shadow-[3px_3px_0_rgba(0,0,0,0.5)] px-[clamp(0.75rem,4cqw,1rem)] py-[clamp(0.4rem,2.5cqw,0.625rem)] flex items-center gap-[clamp(0.5rem,3cqw,0.75rem)] w-full">
                 <Check className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] text-red-600 transform skew-x-6 shrink-0" />
                 <span className="font-black italic uppercase text-[clamp(0.5rem,2.5cqw,0.625rem)] tracking-widest text-zinc-300 transform skew-x-6 leading-tight break-words">{tag}</span>
               </div>
            ))}
          </div>

          {/* Соцсети и Главная кнопка */}
          <div className="flex flex-col gap-[clamp(0.35rem,2cqw,0.5rem)] mt-auto no-tilt" onClick={e => e.stopPropagation()}>
            <div className="flex gap-[clamp(0.35rem,2cqw,0.5rem)] w-full">
               <a href={t.waLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-zinc-900 border border-zinc-800 py-[clamp(0.4rem,2.5cqw,0.625rem)] flex items-center justify-center text-green-400 hover:bg-zinc-800 transition-colors transform -skew-x-6 shadow-[3px_3px_0_rgba(0,0,0,0.5)] group">
                 <Phone className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] transform skew-x-6 group-hover:scale-110 transition-transform" />
               </a>
               <a href={t.instLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-zinc-900 border border-zinc-800 py-[clamp(0.4rem,2.5cqw,0.625rem)] flex items-center justify-center text-pink-500 hover:bg-zinc-800 transition-colors transform -skew-x-6 shadow-[3px_3px_0_rgba(0,0,0,0.5)] group">
                 <InstagramIcon className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)] transform skew-x-6 group-hover:scale-110 transition-transform" />
               </a>
            </div>
            
            <a href={t.actionLink} className="w-full bg-red-600 text-white font-black italic uppercase tracking-widest py-[clamp(0.6rem,3.5cqw,0.875rem)] flex items-center justify-center gap-[clamp(0.35rem,2cqw,0.5rem)] hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] transform -skew-x-6 border-b-[5px] border-r-[3px] border-red-900 active:border-b-0 active:border-r-0 active:translate-y-[5px] active:translate-x-[3px]">
              <span className="transform skew-x-6 flex items-center justify-center gap-[clamp(0.35rem,2cqw,0.5rem)] text-[clamp(0.6rem,3cqw,0.75rem)] w-full px-[clamp(0.75rem,4cqw,1rem)] text-center">
                {t.actionText} <Flame className="w-[clamp(0.75rem,4cqw,1rem)] h-[clamp(0.75rem,4cqw,1rem)]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// 🚀 ОСНОВНОЕ ПРИЛОЖЕНИЕ
// ==========================================
const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('RU');
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isFlippingRef = useRef(false);

  const glowColor = 'rgba(225,29,72,0.6)';
  const modalTheme = { bg: 'rgba(225,29,72,0.15)', border: 'rgba(225,29,72,0.3)', icon: 'text-rose-400' };

  // Параллакс фона
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // 3D наклон
  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current || isFlipped) return;
    
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  // Звук переворота
  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleFlip = () => {
    playFlipSound();
    
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's',
          size: Math.random() * 2.5 + 1.5 + 'px',
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const t = CONTENT[lang];
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.vcardTitle,
          text: t.vcardDesc,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const downloadVCard = () => {
    const t = CONTENT[lang];
    let phoneStr = '';
    if (t.waLink) {
      const match = t.waLink.match(/\d+/);
      if (match) phoneStr = `+${match[0]}`;
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${t.name1} ${t.name2}`,
      `TITLE:${t.role}`,
      phoneStr ? `TEL;TYPE=CELL,VOICE:${phoneStr}` : '',
      phoneStr ? `URL;TYPE=WhatsApp:https://wa.me/${phoneStr.replace('+', '')}` : '',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const t = CONTENT[lang]; // Для модального окна

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none relative overflow-hidden justify-center items-center p-4 sm:p-8">
      <style>{globalStyles}</style>

      {/* Параллакс (Скрыт на мобильных для производительности) */}
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] hidden sm:block pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] hidden sm:block pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* Основной контейнер с применением flex-1 min-h-0 для идеального центрирования */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative z-40">
        
        {/* Карточка */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none @container"
          style={{ perspective: '1500px', maxWidth: 'min(26rem, 94vw, 52dvh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ boxShadow: `0 0 60px ${glowColor}` }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px ${glowColor}` }} 
              />

              <FitnessCard lang={lang} />

              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  zIndex: 50,
                }}
              />
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  zIndex: 50,
                }}
              />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ КНОПОК ПОД ВИЗИТКОЙ (Фиксированная и компактная) */}
        <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 bg-[#181818]/95 sm:bg-white/5 sm:backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-0.5 px-1">
            {['RU', 'AM', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest transition-all duration-500 ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                {lang === l && (
                  <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] pointer-events-none"></span>
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-white/20 mx-0.5"></div>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowShare(true);
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              downloadVCard();
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="bg-[#151515]/95 sm:bg-[rgba(225,29,72,0.15)] sm:backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ borderColor: modalTheme.border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${modalTheme.icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${modalTheme.icon}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{t.shareTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{t.shareDesc}</p>
            
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? t.copied : t.copy}
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                {t.shareBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;