import Link from "next/link";
import Image from "next/image";
import Container from "./spacing";
import SectionHeader from "./sectionHeader";
import Typography from "./typography";
import { Button } from "./button";
import FAQ from "./faq";

export default function FAQSection({
  label = "FAQ",
  title = "Frequently Asked Questions",
  subtitle = "Find answers to the most common questions.",
  items = [],
  ctaTitle = "Got more questions?",
  ctaDescription = "Get in touch and we’ll take care of the rest.",
  ctaButtonText = "Contact Us",
  ctaButtonLink = "/contact-us",

  // ⭐ NEW TYPOGRAPHY OVERRIDES
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
  ctaTitleVariant = "",
  ctaDescriptionVariant = "",
  ctaButtonVariant = "",
  questionVariant = "",
  answerVariant = "",
}) {
  return (
    <Container className="page-faq-container">
      <div className="faq-header">
        {/* ⭐ Section Header with overrides */}
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align="start"
          labelTypo={labelVariant}
          sectionHeaderTypo={titleVariant}
          sectionDescTypo={subtitleVariant}
        />

        {/* CTA BLOCK */}
        <div className="faq-cta-section">
          <Typography variant="h3" overrideVariant={ctaTitleVariant}>
            {ctaTitle}
          </Typography>

          <Typography variant="body-4" overrideVariant={ctaDescriptionVariant}>
            {ctaDescription}
          </Typography>

          <Link href={ctaButtonLink} passHref>
            <Button
              variant="primary"
              size="smTwo"
              showIcon={true}
              icon={
                <Image
                  src="https://ik.imagekit.io/a9uxeuyhx/Arrow%20Right.png?updatedAt=1763619992791"
                  width={14}
                  height={12}
                  alt="Arrow Right"
                />
              }
            >
              <Typography variant="h4" overrideVariant={ctaButtonVariant}>
                {ctaButtonText}
              </Typography>
            </Button>
          </Link>
        </div>
      </div>

      {/* ⭐ FAQ items with own typography */}
      <div className="faq-content">
        <FAQ
          faqs={items}
          questionVariant={questionVariant}
          answerVariant={answerVariant}
        />
      </div>
    </Container>
  );
}
