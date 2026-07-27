import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us | Mama's Kitchen" };

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Mama&apos;s Kitchen</h1>
          <p className="text-gray-600 text-lg">
            Real food, made with love — just like home.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-12">
        <section aria-labelledby="story-heading">
          <h2 id="story-heading" className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mama&apos;s Kitchen started in 2015 when Maria Rodriguez began cooking for friends and family gatherings from her home kitchen. What began as a passion project quickly grew as word spread about her incredible homemade dishes. By 2017, Maria had turned her love of cooking into a full-time catering business.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, Mama&apos;s Kitchen serves hundreds of happy customers each month, providing homemade catering for corporate events, birthday parties, family reunions, and everything in between. Every dish is prepared fresh with locally sourced ingredients, and we never compromise on quality.
          </p>
        </section>

        <section aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe everyone deserves a home-cooked meal, even when hosting a crowd. Our mission is to bring the warmth and comfort of homemade food to your events, making every gathering feel special without the stress of cooking for a large group.
          </p>
        </section>

        <section aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Fresh Ingredients", desc: "We source locally and cook everything from scratch each day. No shortcuts, no frozen meals." },
              { title: "Made with Love", desc: "Every dish is prepared with the same care you'd put into cooking for your own family." },
              { title: "Community First", desc: "We're proud to be part of our local community, supporting local farmers and suppliers." },
            ].map((v) => (
              <div key={v.title} className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="team-heading">
          <h2 id="team-heading" className="text-2xl font-bold text-gray-900 mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Maria Rodriguez", role: "Founder & Head Chef", bio: "With 20+ years of cooking experience, Maria brings authentic flavors from her family recipes." },
              { name: "Carlos Rodriguez", role: "Operations Manager", bio: "Carlos ensures every order is prepared on time and every customer has a great experience." },
              { name: "Sofia Martinez", role: "Sous Chef", bio: "Sofia trained at Le Cordon Bleu and brings a creative twist to our classic recipes." },
            ].map((m) => (
              <div key={m.name} className="text-center">
                <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-3 flex items-center justify-center text-amber-700 text-2xl font-bold" aria-hidden="true">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-amber-700 mb-1">{m.role}</p>
                <p className="text-sm text-gray-500">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
