import Pricing from "./pricing";
import SectionHeader from "./sectionHeader";
import Container from "./spacing";

export default function PricingSection({
  label = "Pricing",
  title = "Simple, Transparent Pricing",
  subtitle = "Choose a plan that fits your needs.",
  items = [],

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
  planNameVariant = "",
  descriptionVariant = "",
  priceVariant = "",
  perMonthVariant = "",
  billedVariant = "",
  tagVariant = "",
  featureVariant = "",
}) {
  return (
    <Container className="price-section">
      <div className="mainSec">
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align="center"
          // ⭐ APPLY OVERRIDES
          labelTypo={labelVariant}
          sectionHeaderTypo={titleVariant}
          sectionDescTypo={subtitleVariant}
        />

        <div className="price-container">
          {items.map((p, i) => (
            <Pricing
              key={i}
              planName={p.planName}
              description={p.description}
              features={p.features?.map((f) => f.text) || []}
              price={p.price}
              tag={p.tag}
              iconSrc={p.iconSrc}
              variant={p.variant}
              // ⭐ PASS DOWN OVERRIDES TO CARD
              planNameVariant={planNameVariant}
              descriptionVariant={descriptionVariant}
              priceVariant={priceVariant}
              perMonthVariant={perMonthVariant}
              billedVariant={billedVariant}
              tagVariant={tagVariant}
              featureVariant={featureVariant}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
