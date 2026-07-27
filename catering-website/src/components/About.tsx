import { businessInfo } from '../data/business'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle(`About — ${businessInfo.name}`)
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-warm-brown">
          About {businessInfo.name}
        </h1>
        <p className="mt-2 text-lg text-terracotta">{businessInfo.tagline}</p>
      </header>

      <section aria-labelledby="story-heading" className="mt-10">
        <h2 id="story-heading" className="font-display text-2xl font-semibold text-warm-brown">
          Our Story
        </h2>
        {businessInfo.story.split('\n\n').map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-warm-brown/90">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="values-heading" className="mt-10">
        <h2 id="values-heading" className="font-display text-2xl font-semibold text-warm-brown">
          What We Stand For
        </h2>
        <ul className="mt-6 space-y-6">
          {businessInfo.values.map(({ title, description }) => (
            <li key={title} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-terracotta">{title}</h3>
              <p className="mt-2 text-warm-brown/90">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="owner-heading" className="mt-10">
        <h2 id="owner-heading" className="font-display text-2xl font-semibold text-warm-brown">
          Meet the Chef
        </h2>
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-warm-brown">
            {businessInfo.owner.name}
          </h3>
          <p className="text-sm text-terracotta">{businessInfo.owner.role}</p>
          <p className="mt-3 leading-relaxed text-warm-brown/90">{businessInfo.owner.bio}</p>
          <p className="mt-4 text-sm text-warm-brown/80">
            <abbr title="Established">Est.</abbr> {businessInfo.founded}
          </p>
        </div>
      </section>
    </div>
  )
}
