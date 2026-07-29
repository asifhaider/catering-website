import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const iso = (date) => date.toISOString().slice(0,10);

export default function MenuDatePicker({value, onChange}) {
  const [error, setError] = useState('');
  const today = new Date();
  const min = new Date(today); min.setDate(today.getDate()+2);
  const max = new Date(today); max.setDate(today.getDate()+14);
  const selected = new Date(`${value}T12:00:00`);
  const move = (amount) => { const next = new Date(selected); next.setDate(next.getDate()+amount); onChange(iso(next)); };
  const atMin = value <= iso(min); const atMax = value >= iso(max);
  const choose = (next) => {
    if (next < iso(min) || next > iso(max)) {
      setError(`Choose a date between ${min.toLocaleDateString()} and ${max.toLocaleDateString()}.`);
      return;
    }
    setError('');
    onChange(next);
  };
  return <section className="date-card" aria-labelledby="date-heading">
    <div className="date-copy"><span className="eyebrow"><CalendarDays size={15}/> Pickup date</span><h2 id="date-heading">What day are we cooking for you?</h2><p>Menus change daily. Choose a date 2–14 days ahead.</p></div>
    <div className="date-control">
      <button className="icon-button" onClick={()=>move(-1)} disabled={atMin} aria-label="Previous available date"><ChevronLeft/></button>
      <label><span className="sr-only">Catering pickup date</span><input type="date" value={value} min={iso(min)} max={iso(max)} aria-describedby="date-help date-error" onChange={e=>choose(e.target.value)}/></label>
      <button className="icon-button" onClick={()=>move(1)} disabled={atMax} aria-label="Next available date"><ChevronRight/></button>
    </div>
    <span id="date-help" className="sr-only">Available from two days through fourteen days from today.</span>
    <p id="date-error" className="field-error" role="status">{error}</p>
  </section>;
}
