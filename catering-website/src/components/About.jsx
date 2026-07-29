import { Heart, Sprout, Users } from 'lucide-react';

export default function About(){
  return <section id="about" className="about-section" aria-labelledby="about-title">
    <div className="about-photo" role="img" aria-label="A welcoming homemade catering spread ready to share"></div>
    <div className="about-copy"><span className="eyebrow">Our little kitchen</span><h2 id="about-title">Made like family is coming over.</h2><p>Hearth &amp; Ladle began with a crowded table, a well-loved recipe box, and the belief that feeding people should feel personal. Every order is prepared in small batches with familiar ingredients and plenty of care.</p><blockquote>“The best meals don’t need to be complicated. They just need to bring people closer.”<cite>— Mara, founder &amp; head cook</cite></blockquote>
      <ul className="values"><li><Sprout aria-hidden="true"/><span><strong>Season-led</strong><small>Fresh ingredients at their best</small></span></li><li><Heart aria-hidden="true"/><span><strong>Made by hand</strong><small>From our kitchen, not a factory</small></span></li><li><Users aria-hidden="true"/><span><strong>Gathering-ready</strong><small>Portioned for 6–30 people</small></span></li></ul>
    </div>
  </section>;
}
