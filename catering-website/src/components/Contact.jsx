import { AtSign, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact(){
  const [sent,setSent]=useState(false);
  const submit=e=>{e.preventDefault();e.currentTarget.reset();setSent(true);};
  return <section id="contact" className="contact-section" aria-labelledby="contact-title">
    <div className="contact-intro"><span className="eyebrow">Say hello</span><h2 id="contact-title">Let’s talk about your table.</h2><p>Planning something special, navigating an allergy, or just wondering how much potato salad is enough? We’re happy to help.</p>
      <address><a href="tel:+14085550147"><Phone aria-hidden="true"/><span><small>Call or text</small>(408) 555-0147</span></a><a href="mailto:hello@hearthandladle.example"><Mail aria-hidden="true"/><span><small>Email us</small>hello@hearthandladle.example</span></a><span><MapPin aria-hidden="true"/><span><small>Pickup kitchen</small>1847 Willow Street, San Jose</span></span><a href="https://instagram.com" target="_blank" rel="noreferrer"><AtSign aria-hidden="true"/><span><small>Follow us on Instagram</small>@hearthandladle</span></a></address>
    </div>
    <form className="contact-form" onSubmit={submit}><h3>Send us a note</h3><div className="form-grid"><label>Your name<input name="name" autoComplete="name" required/></label><label>Email address<input type="email" name="email" autoComplete="email" required/></label></div><label>What can we help with?<select name="subject" defaultValue="Planning an order"><option>Planning an order</option><option>Ingredients &amp; allergies</option><option>Pickup question</option><option>Something else</option></select></label><label>Message<textarea name="message" rows="5" required></textarea></label><button className="place-button" type="submit">Send message</button><p className="form-success" role="status" aria-live="polite">{sent?'Thanks! Your note has been sent. We’ll reply soon.':''}</p></form>
    <footer><div className="brand"><span className="brand-mark">H</span><span>Hearth &amp; Ladle<small>Homemade catering</small></span></div><p>Made with care in Willow Glen · © {new Date().getFullYear()} Hearth &amp; Ladle</p><a href="#top">Back to top ↑</a></footer>
  </section>;
}
