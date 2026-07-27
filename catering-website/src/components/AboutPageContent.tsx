import Link from "next/link";
import { aboutContent } from "@/lib/about-data";

export default function AboutPageContent() {
  const { businessName, intro, story, pickupSteps, whatWeCook, values, image } =
    aboutContent;

  return (
    <article className="section-panel about-page" aria-labelledby="about-heading">
      <h1 id="about-heading" className="section-heading">
        About {businessName}
      </h1>
      <p className="section-lede">{intro}</p>

      <figure className="about-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="detail-image" />
        <figcaption className="field-instructions">
          Scratch cooking in our kitchen, ready for your pickup.
        </figcaption>
      </figure>

      <section aria-labelledby="story-heading">
        <h2 id="story-heading" className="menu-category-heading">
          Our story
        </h2>
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="section-lede">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="pickup-heading">
        <h2 id="pickup-heading" className="menu-category-heading">
          How pickup works
        </h2>
        <ol className="ingredient-list">
          {pickupSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="cook-heading">
        <h2 id="cook-heading" className="menu-category-heading">
          What we cook
        </h2>
        <ul className="ingredient-list">
          {whatWeCook.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="menu-category-heading">
          What we value
        </h2>
        <ul className="ingredient-list">
          {values.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="next-heading">
        <h2 id="next-heading" className="menu-category-heading">
          Next steps
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link href="/#menu" className="button button-primary">
            View our menu
          </Link>
          <Link href="/contact" className="button button-brand">
            Contact Hearth &amp; Plate
          </Link>
        </div>
      </section>
    </article>
  );
}
