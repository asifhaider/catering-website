import { Link } from 'react-router-dom'

const VALUES = [
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'Every dish is made with whole, fresh ingredients sourced locally whenever possible. No shortcuts, no preservatives.' },
  { icon: '👩‍🍳', title: 'Family Recipes', desc: 'Our recipes have been passed down through three generations. Each dish carries the memory and love of the women who perfected it.' },
  { icon: '🤝', title: 'Community First', desc: 'We believe food brings people together. Whether it\'s a wedding, a milestone birthday, or a family reunion — we\'re honoured to be at the table.' },
  { icon: '✨', title: 'Made to Order', desc: 'Nothing is pre-made and frozen. Your order is prepared fresh, the day before pickup, so every bite tastes like it came straight from the kitchen.' },
]

const TEAM = [
  {
    name: 'Fatima Al-Hassan',
    role: 'Founder & Head Chef',
    bio: 'Fatima grew up in Lahore cooking alongside her mother and grandmother. After moving to Springfield in 2012, she started sharing her food with neighbours — one container at a time. In 2018, Mama\'s Table was born.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80',
  },
  {
    name: 'Aisha Al-Hassan',
    role: 'Pastry & Sides',
    bio: 'Fatima\'s eldest daughter, Aisha handles all the breads, chutneys, and sides. A trained pastry chef, she brings a refined touch to the supporting elements that make each meal complete.',
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=300&h=300&fit=crop&q=80',
  },
  {
    name: 'Tariq Al-Hassan',
    role: 'Operations',
    bio: 'Tariq manages logistics, scheduling, and pickup. He\'s the friendly face you\'ll see when you come to collect your order and ensures everything runs smoothly behind the scenes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80',
  },
]

const TIMELINE = [
  { year: '2012', event: 'Fatima moves to Springfield from Lahore, begins cooking traditional meals for family.' },
  { year: '2015', event: 'Neighbours and friends start requesting Fatima\'s food for their events. Word spreads.' },
  { year: '2018', event: 'Mama\'s Table officially launches as a licensed home catering business.' },
  { year: '2020', event: 'Online ordering begins. Despite the pandemic, business grows through contactless pickup.' },
  { year: '2022', event: 'Menu expands to 7 unique daily rotations. Daughter Aisha joins the team.' },
  { year: '2024', event: 'Mama\'s Table is featured in Springfield\'s "Best Local Eats" guide. A humbling honour.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero */}
      <div className="relative bg-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-warm-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 max-w-2xl leading-tight">
            Cooking from the heart, serving with love.
          </h1>
          <p className="text-brand-200 text-lg max-w-xl leading-relaxed">
            Mama's Table started as one woman's desire to share the flavours of her childhood with a new community.
            Today, it's Springfield's most-loved homemade catering service.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-5">
              Food that feels like coming home.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              There's a difference between food that feeds you and food that nourishes you. At Mama's Table,
              we believe the latter comes from intention — taking time, using real ingredients, and cooking
              with the same care you'd give to someone you love.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every dish on our menu is a recipe that has been tested, refined, and perfected across decades.
              Some of them trace back generations, carried across continents in the memories of grandmothers
              who knew that good food is one of the most powerful forms of love.
            </p>
            <p className="text-gray-600 leading-relaxed">
              When you order from Mama's Table, you're not just getting catering. You're getting a piece
              of that tradition — made fresh, made with care, made for your table.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop&q=80"
              alt="Inside the Mama's Table kitchen"
              className="rounded-3xl shadow-lg w-full object-cover h-80"
            />
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 bg-warm-500 text-white rounded-2xl p-4 shadow-lg">
              <p className="font-bold text-2xl">7+</p>
              <p className="text-xs text-warm-100">Years of love</p>
            </div>
            <div aria-hidden="true" className="absolute -top-4 -right-4 bg-brand-700 text-white rounded-2xl p-4 shadow-lg">
              <p className="font-bold text-2xl">500+</p>
              <p className="text-xs text-brand-200">Events catered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">What we stand for</h2>
            <p className="text-gray-500 max-w-xl mx-auto">These aren't just words on a wall. They shape every decision we make in the kitchen.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">The faces behind the food</h2>
          <p className="text-gray-500 max-w-xl mx-auto">A small, passionate family team dedicated to making your event unforgettable.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map(member => (
            <div key={member.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-56 overflow-hidden bg-warm-100">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-warm-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-brand-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-12 text-center">Our journey</h2>
          <ol aria-label="Company history timeline" className="relative space-y-8">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-700" aria-hidden="true" />
            {TIMELINE.map(item => (
              <li key={item.year} className="flex gap-6 relative">
                <div aria-hidden="true" className="w-16 h-16 bg-warm-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm z-10">
                  {item.year}
                </div>
                <div className="flex-1 pt-4">
                  <p className="text-brand-100 leading-relaxed text-sm">
                    <span className="sr-only">{item.year}: </span>
                    {item.event}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-warm-50 py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Ready to place your order?</h2>
          <p className="text-gray-500 mb-8">Browse our weekly rotating menu and build your perfect spread.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="bg-brand-700 hover:bg-brand-800 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors">
              View This Week's Menu →
            </Link>
            <Link to="/contact" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
