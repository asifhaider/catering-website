import { Link } from 'react-router-dom'

// SC 2.4.8 Location — breadcrumb trail
export default function Breadcrumb({ crumbs }) {
  // crumbs: [{ label, to? }]  — last item has no `to` (current page)
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <div className="container">
        <ol className="breadcrumb__list">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1
            return (
              <li key={idx} className="breadcrumb__item">
                {isLast ? (
                  <span
                    className="breadcrumb__current"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.to} className="breadcrumb__link">
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
