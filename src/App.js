import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LANGUAGES } from './data/languages';
import { COUNTRIES, getLanguagesForCountry } from './data/countryLanguageMap';

const ENGLISH_MESSAGES_LIST = [
  {
    ref: '65-0427',
    title: 'The Choosing Of A Bride',
    location: 'Los Angeles, California, USA',
  },
  {
    ref: '64-0214',
    title: 'The Voice Of The Sign',
    location: 'Tulare, California, USA',
  },
  {
    ref: '63-0324M',
    title: 'The Seventh Seal',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '62-1231',
    title: 'The Contest',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '61-1231M',
    title: 'You Must Be Born Again',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '60-1204E',
    title: 'The Patmos Vision',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '59-1219',
    title: 'Questions And Answers',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '56-0121',
    title: 'The Inter-Veil',
    location: 'Sturgis, Michigan, USA',
  },
  {
    ref: '55-0227',
    title: 'The Position Of A Believer In Christ',
    location: 'Phoenix, Arizona, USA',
  },
  {
    ref: '54-0515',
    title: 'Questions And Answers On Genesis',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '53-0219',
    title: 'Accepting God\'s Provided Way At The End Time',
    location: 'Chicago, Illinois, USA',
  },
  {
    ref: '57-0414',
    title: 'Corinthians, Book Of Correction',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '58-0309M',
    title: 'The Handwriting On The Wall',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '59-0301M',
    title: 'Strait Is The Gate',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '60-0402',
    title: 'Believest Thou This?',
    location: 'Tulsa, Oklahoma, USA',
  },
  {
    ref: '61-0213',
    title: 'And Thy Seed Shall Possess The Gate Of His Enemy',
    location: 'Jeffersonville, Indiana, USA',
  },
  {
    ref: '63-0717',
    title: 'A Prisoner',
    location: 'Jeffersonville, Indiana, USA',
  },
];

function getPrintOptionLabel(id) {
  switch (id) {
    case 'metric-a4-book':
      return 'A4 Book';
    case 'metric-a4-full':
      return 'A4 Full Sheet';
    case 'metric-a5-pocket':
      return 'A5 Pocket';
    case 'us-letter-book':
      return '8.5 × 11 Book';
    case 'us-letter-full':
      return '8.5 × 11 Full Sheet';
    case 'us-letter-twin':
      return '8.5 × 11 Twin Pocket';
    case 'commercial-137x213':
      return '137mm × 213mm';
    default:
      return id;
  }
}

function countryCodeToFlagEmoji(code) {
  if (!code) return '🌐';
  const upper = code.toUpperCase();
  const codePoints = upper.split('').map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function App() {
  const [page, setPage] = useState('languages'); // 'languages' | 'englishMessages' | 'tutorial'

  const handleSelectLanguage = (language) => {
    setPage('englishMessages');
  };

  const handleOpenTutorial = (event) => {
    if (event) {
      event.preventDefault();
    }
    setPage('tutorial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content;
  if (page === 'languages') {
    content = <LanguagesGrid onSelectLanguage={handleSelectLanguage} />;
  } else if (page === 'englishMessages') {
    content = <EnglishMessagesPage onBack={() => setPage('languages')} />;
  } else {
    content = <TutorialPage onBack={() => setPage('languages')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 text-sm md:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo.png"
              alt="Message Hub logo"
              className="h-14 w-auto sm:h-16 md:h-20"
            />
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px] sm:flex-row sm:items-center sm:gap-3">
            <p className="text-slate-300">
              94 translated language names from around the world.
            </p>
            <a
              href="#tutorial"
              onClick={handleOpenTutorial}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sky-500 px-3 py-1 font-semibold text-slate-950 shadow-sm hover:bg-sky-400"
            >
              <i className="ri-question-line text-xs" />
              Tutorial
            </a>
            <a
              href="/translators/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-3 py-1 font-medium text-slate-100 shadow-sm hover:border-sky-400 hover:text-white"
            >
              Translators login
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-10">
        {content}
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6 lg:px-10">
          <p className="text-[11px]">
            Message Hub applications help you study the Message and Bible on web, desktop and mobile.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.lovedivinefellowship.com/software/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 shadow-sm hover:border-sky-500 hover:text-sky-700"
            >
              <i className="ri-computer-line text-xs" />
              Desktop (OpenMessageView)
            </a>
            <a
              href="https://apps.apple.com/ca/app/the-message-hub/id1489254894"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 shadow-sm hover:border-sky-500 hover:text-sky-700"
            >
              <i className="ri-apple-fill text-xs" />
              iOS app
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=info.messagehub.search"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 shadow-sm hover:border-sky-500 hover:text-sky-700"
            >
              <i className="ri-google-play-fill text-xs" />
              Android app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LanguagesGrid({ onSelectLanguage }) {
  const [view, setView] = useState('translated'); // 'translated' | 'english'
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const languageButtonRefs = useRef({});
  const languages = LANGUAGES;

  return (
    <section aria-labelledby="languages-title">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Languages
          </p>
          <h2
            id="languages-title"
            className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Select a language.
          </h2>
        </div>
        <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[12px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Tap a language name to get started.
          </span>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs text-slate-600 shadow-sm">
              <button
                type="button"
                onClick={() => setView('translated')}
                className={`rounded-full px-4 py-1.5 transition ${
                  view === 'translated'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Translated names
              </button>
              <button
                type="button"
                onClick={() => setView('english')}
                className={`rounded-full px-4 py-1.5 transition ${
                  view === 'english'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                English names
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCountryModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:border-sky-500 hover:text-sky-700 sm:w-auto"
            >
              <i className="ri-earth-line text-sm" />
              View by country
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/60">
        <div className="grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {languages.map((language) => (
            <button
              key={language.id}
              ref={(el) => {
                if (el) {
                  languageButtonRefs.current[language.id] = el;
                }
              }}
              type="button"
              onClick={() => onSelectLanguage && onSelectLanguage(language)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-left text-slate-800 whitespace-nowrap transition hover:-translate-y-0.5 hover:border-sky-500/70 hover:bg-sky-50 hover:text-sky-900"
            >
              {view === 'translated' ? language.translatedName : language.englishName}
            </button>
          ))}
        </div>
      </div>

      {countryModalOpen && (
        <CountryLanguagesModal
          onClose={() => setCountryModalOpen(false)}
          onSelectLanguage={(language) => {
            setCountryModalOpen(false);

            const button = languageButtonRefs.current[language.id];
            if (button && button.scrollIntoView) {
              button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }

            if (button) {
              button.classList.add('ring-2', 'ring-sky-500', 'ring-offset-2', 'ring-offset-slate-50');
              setTimeout(() => {
                button.classList.remove(
                  'ring-2',
                  'ring-sky-500',
                  'ring-offset-2',
                  'ring-offset-slate-50'
                );
              }, 1600);
            }

            onSelectLanguage && onSelectLanguage(language);
          }}
        />
      )}
    </section>
  );
}

function EnglishMessagesPage({ onBack }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(ENGLISH_MESSAGES_LIST);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printMessage, setPrintMessage] = useState(null);
  const [selectedPrintOption, setSelectedPrintOption] = useState('metric-a4-book');

  useEffect(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      setResults(ENGLISH_MESSAGES_LIST);
      return;
    }

    const filtered = ENGLISH_MESSAGES_LIST.filter((msg) => {
      const ref = msg.ref.toLowerCase();
      const title = msg.title.toLowerCase();
      const location = msg.location.toLowerCase();
      return (
        ref.includes(value) ||
        title.includes(value) ||
        location.includes(value)
      );
    });

    setResults(filtered);
  }, [query]);

  const handleClear = () => {
    setQuery('');
  };

  const openPrintModal = (message) => {
    setPrintMessage(message);
    setPrintModalOpen(true);
  };

  const closePrintModal = () => {
    setPrintModalOpen(false);
  };

  useEffect(() => {
    if (!printModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPrintModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [printModalOpen]);

  return (
    <section aria-labelledby="english-messages-title" className="space-y-6">
      <nav className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 hover:border-sky-500 hover:text-sky-700"
        >
          <i className="ri-arrow-left-line text-xs" />
          Back to languages
        </button>
      </nav>

      <div>
        <h2
          id="english-messages-title"
          className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          English Messages
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <i className="ri-printer-line text-lg" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Printed Books</p>
            <p className="text-xs text-slate-500">View printed Message books in English.</p>
          </div>
        </article>
        <article className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <i className="ri-book-open-line text-lg" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Read Online</p>
            <p className="text-xs text-slate-500">Read the English Messages directly in your browser.</p>
          </div>
        </article>
        <article className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <i className="ri-volume-up-line text-lg" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Audio</p>
            <p className="text-xs text-slate-500">Access audio recordings of the Messages.</p>
          </div>
        </article>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm text-slate-700">
          Search for a message by typing its reference number, title and/or location:
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="e.g. 65-0427, The Choosing of a Bride, Jeffersonville…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:border-slate-300"
            >
              Clear
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-500"
            >
              Search
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">
          Available formats will be listed once you select a message from the results.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900">English Messages</p>
          <p className="text-xs text-slate-500">
            Showing {results.length} of {ENGLISH_MESSAGES_LIST.length} messages.
          </p>
        </div>

        {/* Mobile: card list */}
        <div className="space-y-3 md:hidden">
          {results.length === 0 ? (
            <p className="px-1 py-2 text-center text-xs text-slate-500">
              No messages found. Try a different reference, title or location.
            </p>
          ) : (
            results.map((msg) => (
              <article
                key={msg.ref}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-700">
                    {msg.ref}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white"
                      aria-label="View printable version"
                      title="View printable book"
                      onClick={() => openPrintModal(msg)}
                    >
                      <i className="ri-printer-line text-xs text-sky-600" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white"
                      aria-label="Read message online"
                      title="Read message online"
                    >
                      <i className="ri-book-open-line text-xs text-emerald-600" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white"
                      aria-label="Listen to audio"
                      title="Listen to audio"
                    >
                      <i className="ri-volume-up-line text-xs text-amber-500" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-slate-900">{msg.title}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">{msg.location}</p>
              </article>
            ))
          )}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Ref #</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2 text-right">Formats</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 py-4 text-center text-xs text-slate-500"
                      colSpan={4}
                    >
                      No messages found. Try a different reference, title or location.
                    </td>
                  </tr>
                ) : (
                  results.map((msg) => (
                    <tr key={msg.ref} className="border-b border-slate-100 last:border-0">
                      <td className="px-3 py-2 align-top font-mono text-xs text-slate-700">
                        {msg.ref}
                      </td>
                      <td className="px-3 py-2 align-top text-slate-900">{msg.title}</td>
                      <td className="px-3 py-2 align-top text-xs text-slate-600">
                        {msg.location}
                      </td>
                      <td className="px-3 py-2 align-top">
                        <div className="flex justify-end gap-1.5 text-slate-500">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-slate-300"
                            aria-label="View printable version"
                            title="View printable book"
                            onClick={() => openPrintModal(msg)}
                          >
                            <i className="ri-printer-line text-sm text-sky-600" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-slate-300"
                            aria-label="Read message online"
                            title="Read message online"
                          >
                            <i className="ri-book-open-line text-sm text-emerald-600" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-slate-300"
                            aria-label="Listen to audio"
                            title="Listen to audio"
                          >
                            <i className="ri-volume-up-line text-sm text-amber-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {printModalOpen && printMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePrintModal();
            }
          }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="print-options-title"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div>
                <h3 id="print-options-title" className="text-base font-semibold text-slate-900">
                  Print book options
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {printMessage.ref} – {printMessage.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closePrintModal}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                aria-label="Close"
              >
                <i className="ri-close-line text-sm" />
              </button>
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4 text-sm">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Metric paper sizes
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <PrintOptionCard
                    id="metric-a4-book"
                    label="A4 Book"
                    description="Folded A4 booklet layout for standard printers."
                    size="210mm × 297mm"
                    selected={selectedPrintOption === 'metric-a4-book'}
                    onSelect={setSelectedPrintOption}
                  />
                  <PrintOptionCard
                    id="metric-a4-full"
                    label="A4 Full Sheet"
                    description="Single full A4 page per sheet."
                    size="210mm × 297mm"
                    selected={selectedPrintOption === 'metric-a4-full'}
                    onSelect={setSelectedPrintOption}
                  />
                  <PrintOptionCard
                    id="metric-a5-pocket"
                    label="A5 Pocket"
                    description="Compact A5 pocket-sized booklet."
                    size="148mm × 210mm"
                    selected={selectedPrintOption === 'metric-a5-pocket'}
                    onSelect={setSelectedPrintOption}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  U.S. paper sizes
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <PrintOptionCard
                    id="us-letter-book"
                    label="8.5 × 11 Book"
                    description="Letter-size booklet for common U.S. printers."
                    size="8.5in × 11in"
                    selected={selectedPrintOption === 'us-letter-book'}
                    onSelect={setSelectedPrintOption}
                  />
                  <PrintOptionCard
                    id="us-letter-full"
                    label="8.5 × 11 Full Sheet"
                    description="Single full letter-size page per sheet."
                    size="8.5in × 11in"
                    selected={selectedPrintOption === 'us-letter-full'}
                    onSelect={setSelectedPrintOption}
                  />
                  <PrintOptionCard
                    id="us-letter-twin"
                    label="8.5 × 11 Twin Pocket"
                    description="Two pocket-sized pages per sheet."
                    size="8.5in × 11in"
                    selected={selectedPrintOption === 'us-letter-twin'}
                    onSelect={setSelectedPrintOption}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Commercial paper sizes
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <PrintOptionCard
                    id="commercial-137x213"
                    label="137mm × 213mm"
                    description="Commercial trim size used by many printers."
                    size="137mm × 213mm"
                    selected={selectedPrintOption === 'commercial-137x213'}
                    onSelect={setSelectedPrintOption}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-3">
              <p className="text-xs text-slate-500">
                Selected:{' '}
                <span className="font-medium text-slate-700">
                  {getPrintOptionLabel(selectedPrintOption)}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closePrintModal}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PrintOptionCard({ id, label, description, size, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`flex h-full w-full flex-col items-start rounded-xl border px-3 py-2 text-left text-xs transition ${
        selected
          ? 'border-sky-500 bg-sky-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50/60'
      }`}
    >
      <div className="mb-1 flex w-full items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-slate-900">{label}</span>
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
            selected
              ? 'border-sky-500 bg-sky-600 text-white'
              : 'border-slate-300 bg-white text-slate-400'
          }`}
        >
          {selected ? '✓' : ''}
        </span>
      </div>
      <p className="mb-1 text-[11px] text-slate-500">{description}</p>
      <p className="text-[11px] font-medium text-slate-700">{size}</p>
    </button>
  );
}

function CountryLanguagesModal({ onClose, onSelectLanguage }) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return COUNTRIES;
    return COUNTRIES.filter((country) => country.name.toLowerCase().includes(value));
  }, [query]);

  const regions = useMemo(() => {
    const map = new Map();
    filteredCountries.forEach((country) => {
      const region = country.region || 'Other';
      if (!map.has(region)) {
        map.set(region, []);
      }
      map.get(region).push(country);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCountries]);

  const languagesForSelectedCountry = selectedCountry
    ? getLanguagesForCountry(selectedCountry.code)
    : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:max-h-[90vh] md:flex-row">
        <div className="border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r md:px-5 md:py-4 md:w-1/2">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">Select your country</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              aria-label="Close"
            >
              <i className="ri-close-line text-xs" />
            </button>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="w-full rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Search countries…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto pr-1 text-xs md:max-h-full">
            {regions.map(([region, countries]) => (
              <div key={region}>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {region}
                </p>
                <div className="space-y-1">
                  {countries.map((country) => {
                    const isSelected = selectedCountry?.code === country.code;
                    return (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => setSelectedCountry(country)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition ${
                          isSelected
                            ? 'bg-sky-50 text-sky-800'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="text-[13px] leading-none">
                            {countryCodeToFlagEmoji(country.code)}
                          </span>
                          <span>{country.name}</span>
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-medium text-sky-600">Selected</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4 py-3 md:px-5 md:py-4">
          {selectedCountry ? (
            <>
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Languages in {selectedCountry.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Tap a language to jump to it in the main list.
                  </p>
                </div>
              </div>
              {languagesForSelectedCountry.length === 0 ? (
                <p className="mt-4 text-[11px] text-slate-500">
                  No languages are currently mapped for this country yet.
                </p>
              ) : (
                <div className="mt-2 grid max-h-72 gap-2 overflow-y-auto text-xs md:max-h-full">
                  {languagesForSelectedCountry.map((language) => (
                    <button
                      key={language.id}
                      type="button"
                      onClick={() => onSelectLanguage(language)}
                      className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left transition hover:border-sky-500 hover:bg-sky-50"
                    >
                      <span className="text-[13px] font-semibold text-slate-900">
                        {language.translatedName}
                      </span>
                      {language.englishName && language.englishName !== language.translatedName && (
                        <span className="text-[11px] text-slate-500">{language.englishName}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-xs text-slate-500">
              <i className="ri-earth-line mb-2 text-lg text-slate-400" />
              <p className="max-w-xs">
                Choose a country on the left to see all Message Hub languages available there.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TutorialPage({ onBack }) {
  const [language, setLanguage] = useState('en'); // 'en' | 'es'

  const videoSrc =
    language === 'en'
      ? '/assets/tutorials/Message_Hub_Website_User_Guide.mp4'
      : '/assets/tutorials/Navegando_el_sitio_web_de_Message_Hub.mp4';

  return (
    <section aria-labelledby="tutorial-title" className="space-y-6">
      <nav className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 hover:border-sky-500 hover:text-sky-700"
        >
          <i className="ri-arrow-left-line text-xs" />
          Back to languages
        </button>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Tutorial
          </p>
          <h1
            id="tutorial-title"
            className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            How to use the Message Hub website
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Watch a quick walkthrough of how to choose your language, search the Message and Bible,
            and open the English Messages page.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs text-slate-600 shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-full px-4 py-1.5 transition ${
              language === 'en'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('es')}
            className={`rounded-full px-4 py-1.5 transition ${
              language === 'es'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Español
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-900/5">
          <video
            key={videoSrc}
            src={videoSrc}
            controls
            className="h-full w-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Choose English or Español above to watch the tutorial in your preferred language.
        </p>
      </div>
    </section>
  );
}

export default App;
