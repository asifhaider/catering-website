import { usePageTitle } from "../hooks/usePageTitle";

const VALUES = [
  {
    title: "Made from scratch",
    description: "Every dish is cooked in small batches the same week you pick it up — no shortcuts, no premade bases.",
  },
  {
    title: "Local ingredients",
    description: "We source produce and meat from farms within 50 miles whenever the season allows.",
  },
  {
    title: "Family recipes",
    description: "Our weekly menus are built from recipes passed down through three generations of home cooks.",
  },
];

export default function AboutPage() {
  usePageTitle("About");
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-900">About Homestead Catering Co.</h1>
        <img
          src="https://picsum.photos/seed/homestead-kitchen/960/400"
          alt="The Homestead Catering Co. kitchen team preparing trays of food together"
          className="w-full h-64 object-cover rounded-lg"
        />
        <p className="text-brand-800">
          Homestead Catering Co. started in 2015 out of a home kitchen in Maple Grove, when founder Dana Whitfield
          began cooking weekly family-style dinners for a handful of neighbors. Word spread, the neighbors brought
          friends, and within two years Dana had turned a hobby into a full-time catering business built on the same
          idea: honest, homemade food, made fresh and picked up warm.
        </p>
        <p className="text-brand-800">
          Today our small team cooks a brand new themed menu every day of the week, so no two pickups ever taste the
          same. We still do everything the way Dana started — from-scratch sauces, hand-portioned trays, and a menu
          planned around what's actually in season.
        </p>
      </section>

      <section aria-labelledby="values-heading" className="space-y-4">
        <h2 id="values-heading" className="text-xl font-bold text-brand-900">
          What we care about
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
          {VALUES.map((value) => (
            <li key={value.title} className="bg-white border border-brand-200 rounded-lg p-4">
              <h3 className="font-semibold text-brand-900 mb-1">{value.title}</h3>
              <p className="text-sm text-brand-700">{value.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hours-heading" className="space-y-2">
        <h2 id="hours-heading" className="text-xl font-bold text-brand-900">
          Kitchen &amp; pickup hours
        </h2>
        <p className="text-brand-800">Open every day for pickup, 11:00 AM – 4:00 PM.</p>
        <p className="text-brand-800">1420 Maple Grove Road, Maple Grove, MN 55369</p>
      </section>
    </div>
  );
}
