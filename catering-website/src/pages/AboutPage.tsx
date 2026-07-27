import { usePageTitle } from '../utils/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us')

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">About Us</h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-stone-900">Our Story</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          <div className="flex flex-col gap-4 text-stone-700">
            <p>
              Homestyle Catering started in a home kitchen in 2015, when founder Maria Alvarez began cooking
              weekly family-recipe meals for neighbors and coworkers. What began as a handful of orders each
              week has grown into a full catering service, but the recipes — and the home-cooked care behind
              them — haven't changed.
            </p>
            <p>
              Every dish on our menu is prepared in small batches the same way you'd cook for your own family:
              slow-braised, hand-seasoned, and made from scratch. We rotate a different themed menu each day of
              the week, so there's always something new to try.
            </p>
          </div>
          <img
            src="https://picsum.photos/seed/about-kitchen/480/360"
            alt="Maria Alvarez preparing dishes in the catering company's home kitchen"
            className="h-64 w-full rounded-lg object-cover md:h-full"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-stone-900">What Makes Us Different</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>Family recipes passed down for three generations</li>
          <li>Locally sourced, seasonal ingredients</li>
          <li>Made fresh to order — nothing is prepared until you book</li>
        </ul>
      </section>
    </div>
  )
}
