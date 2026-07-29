import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';

export default function ItemDetail({item, onClose, onAdd}) {
  const dialogRef = useRef(null);
  const [qty,setQty] = useState(6);
  useEffect(()=>{ if(item) dialogRef.current?.showModal(); },[item]);
  if(!item) return null;
  const close=()=>{ dialogRef.current?.close(); onClose(); };
  return <dialog className="item-dialog" ref={dialogRef} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialogRef.current) close();}} aria-labelledby="item-detail-title" aria-modal="true">
    <div className="detail-layout">
      <div className="detail-photo" style={{backgroundPosition:item.pos}} role="img" aria-label={`Prepared ${item.name}`}></div>
      <div className="detail-content">
        <button className="dialog-close" onClick={close} aria-label="Close food details"><X/></button>
        <span className="eyebrow">{item.category}</span><h2 id="item-detail-title">{item.name}</h2><p className="detail-description">{item.description}</p>
        <section aria-labelledby="ingredients-title"><h3 id="ingredients-title">What’s inside</h3><ul className="ingredients">{item.ingredients.map(i=><li key={i}>{i}</li>)}</ul></section>
        <section aria-labelledby="nutrition-title"><h3 id="nutrition-title">Nutrition per serving</h3><table className="nutrition"><caption className="sr-only">Nutrition facts for {item.name}</caption><tbody>
          <tr><th scope="row">Calories</th><td>{item.calories}</td></tr><tr><th scope="row">Protein</th><td>{item.protein}</td></tr>
          <tr><th scope="row">Carbohydrates</th><td>{item.carbs}</td></tr><tr><th scope="row">Total fat</th><td>{item.fat}</td></tr>
        </tbody></table></section>
        <div className="detail-order"><div><strong>${item.price}</strong><span> per person</span></div><div className="stepper" aria-label="Portion quantity"><button onClick={()=>setQty(q=>Math.max(6,q-1))} disabled={qty===6} aria-label="Decrease portions"><Minus/></button><output aria-live="polite">{qty}</output><button onClick={()=>setQty(q=>Math.min(30,q+1))} disabled={qty===30} aria-label="Increase portions"><Plus/></button></div><button className="primary-button" onClick={()=>{onAdd(item,qty);close();}}>Add {qty} portions</button></div>
      </div>
    </div>
  </dialog>;
}
