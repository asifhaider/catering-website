import { Leaf, Plus, Utensils } from 'lucide-react';

export default function MenuList({items, onSelect, onAdd}) {
  const groups = ['Protein','Vegetarian','Sides'];
  return <div className="menu-list">
    {groups.map(group => <section className="menu-group" aria-labelledby={`group-${group}`} key={group}>
      <div className="group-heading">
        <span className="group-icon" aria-hidden="true">{group==='Vegetarian'?<Leaf/>:<Utensils/>}</span>
        <div><h3 id={`group-${group}`}>{group}</h3><p>{group==='Protein'?'Center-of-the-table favorites':group==='Vegetarian'?'Garden-forward mains':'Made to complete the meal'}</p></div>
      </div>
      <ul className="food-grid">
        {items.filter(item=>item.category===group).map(item=><li className="food-card" key={item.id}><article>
          <button className="food-image" style={{backgroundPosition:item.pos}} onClick={()=>onSelect(item)} aria-label={`View details for ${item.name}`}></button>
          <div className="food-body"><button className="food-title" onClick={()=>onSelect(item)}><h4>{item.name}</h4></button><p>{item.description}</p>
            <div className="food-meta"><span><strong>${item.price}</strong> / person</span><span>6–30 portions</span></div>
            <button className="add-button" onClick={()=>onAdd(item)}><Plus size={17}/> Add to table</button>
          </div>
        </article></li>)}
      </ul>
    </section>)}
  </div>;
}
