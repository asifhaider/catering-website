import { aboutContent } from '../data/about';
import PageWrapper from '../components/layout/PageWrapper';

export default function AboutPage() {
  return (
    <PageWrapper title="About">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-50 to-terracotta-50 rounded-2xl p-8 sm:p-12 mb-12 border border-amber-100">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          {aboutContent.heroHeading}
        </h1>
        <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
          {aboutContent.heroSubtext}
        </p>
      </div>

      {/* Story */}
      <section aria-labelledby="our-story" className="mb-14">
        <h2 id="our-story" className="font-display text-2xl font-bold text-stone-900 mb-6">
          Our Story
        </h2>
        <div className="space-y-4 max-w-3xl">
          {aboutContent.storyParagraphs.map((para, i) => (
            <p key={i} className="text-stone-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="our-values" className="mb-14">
        <h2 id="our-values" className="font-display text-2xl font-bold text-stone-900 mb-6">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aboutContent.values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900 text-base mb-2">{v.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="meet-team" className="mb-14">
        <h2 id="meet-team" className="font-display text-2xl font-bold text-stone-900 mb-6">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutContent.teamMembers.map((member) => (
            <article
              key={member.name}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col gap-3"
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl"
                aria-hidden="true"
              >
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">{member.name}</h3>
                <p className="text-sm text-amber-700 font-medium">{member.role}</p>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-it-works" className="bg-stone-900 rounded-2xl p-8 sm:p-12 text-white">
        <h2 id="how-it-works" className="font-display text-2xl font-bold text-amber-400 mb-6">
          How It Works
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Choose Your Date', desc: 'Select a catering date at least 2 days in advance. Our menus rotate weekly.' },
            { step: '2', title: 'Build Your Order', desc: 'Pick your favourite dishes from our menu. Set your portion size (6–30 guests).' },
            { step: '3', title: 'Pickup & Enjoy', desc: 'Pay at pickup. Your food is prepared fresh the same morning and ready for you.' },
          ].map(({ step, title, desc }) => (
            <li key={step} className="flex flex-col gap-3">
              <span className="text-4xl font-bold text-amber-500 font-display" aria-hidden="true">
                {step}
              </span>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageWrapper>
  );
}
