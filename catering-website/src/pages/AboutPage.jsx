import { usePageTitle } from '../hooks/usePageTitle'
import { aboutData } from '../data/aboutData'

export default function AboutPage() {
  usePageTitle('About')

  const { businessName, tagline, ownerName, ownerTitle, ownerPhoto, ownerPhotoAlt, story, values, yearsInBusiness, ordersServed, happyCustomers } = aboutData

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Page heading */}
      <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">About {businessName}</h1>
      <p className="text-lg text-stone-500 mb-10">{tagline}</p>

      {/* Stats */}
      <section aria-labelledby="stats-heading" className="mb-12">
        <h2 id="stats-heading" className="sr-only">By the numbers</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Business highlights">
          {[
            { label: 'Years in business', value: yearsInBusiness },
            { label: 'Orders served', value: ordersServed },
            { label: 'Happy customers', value: happyCustomers },
          ].map(({ label, value }) => (
            <li key={label} className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold font-serif text-brand-700">{value}</p>
              <p className="text-stone-600 text-sm mt-1">{label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Our Story + owner photo */}
      <section aria-labelledby="story-heading" className="mb-12">
        <h2 id="story-heading" className="text-2xl font-serif font-bold text-stone-800 mb-5">Our Story</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          {/* Photo — DOM order: photo before text to match visual layout on desktop */}
          <figure className="sm:col-span-1 flex flex-col items-center sm:items-start">
            <img
              src={ownerPhoto}
              alt={ownerPhotoAlt}
              className="w-52 h-52 sm:w-full sm:h-auto rounded-2xl object-cover shadow-md"
              width="400"
              height="400"
            />
            <figcaption className="mt-3 text-center sm:text-left">
              <p className="font-semibold text-stone-800">{ownerName}</p>
              <p className="text-stone-500 text-sm">{ownerTitle}</p>
            </figcaption>
          </figure>

          <div className="sm:col-span-2 space-y-4">
            {story.map((para, i) => (
              <p key={i} className="text-stone-700 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Our values */}
      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-serif font-bold text-stone-800 mb-5">Our Values</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Our values">
          {values.map(({ heading, body }) => (
            <li key={heading} className="bg-white border-2 border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-800 mb-1">{heading}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
