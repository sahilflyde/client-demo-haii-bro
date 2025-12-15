import { useEffect, useState } from "react";
import Container from "./spacing";
import GridSection from "./GridWrapperAdvance";
import ImageCard from "./card";
import { motion } from "framer-motion";
import SectionHeader from "./sectionHeader";

export default function FeaturesSection({
  label = "",
  title = "",
  subtitle = "",
  minColWidth = 280,
  gap = 24,
  columns = 3,
  centerTitle = false,
  items = [],
  desktopOrder = [],

  // Typography overrides
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
  cardHeadingVariant = "",
  cardDescriptionVariant = "",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ⭐ Normalize items so .map() always works
  const normalizedItems = Array.isArray(items)
    ? items
    : typeof items === "object" && items !== null
    ? Object.values(items)
    : [];

  const checkDevice = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 600);
    setIsIpad(width > 600 && width <= 1100);
    setIsDesktop(width > 1024);
  };

  useEffect(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <>
      {/* 📱 MOBILE + TABLET VIEW */}
      {isMobile || isIpad ? (
        <Container variant="primary">
          <GridSection
            label={label}
            title={title}
            subtitle={subtitle}
            labelTypo={labelVariant}
            sectionHeaderTypo={titleVariant}
            sectionDescTypo={subtitleVariant}
            minColWidth={minColWidth}
            gap={gap}
            columns={columns}
            centerTitle={centerTitle}
            items={normalizedItems.map((card) => ({
              component: (
                <ImageCard
                  heading={card.heading}
                  description={card.description}
                  imageLink={card.imageLink}
                  textPosition={card.textPosition}
                  headingVariant={cardHeadingVariant}
                  descriptionVariant={cardDescriptionVariant}
                  className={card.className || ""}
                />
              ),
              rowSpan: Number(card.rowSpan) || 1,
              colSpan: Number(card.colSpan) || 1,
            }))}
          />
        </Container>
      ) : null}

      {/* 🖥️ DESKTOP VIEW */}
      {isDesktop ? (
        <Container variant="section" className="flex flex-col gap-[56px]">
          {/* HEADER */}
          <motion.div
            initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeader
              label={label}
              title={title}
              subtitle={subtitle}
              labelTypo={labelVariant}
              sectionHeaderTypo={titleVariant}
              sectionDescTypo={subtitleVariant}
            />
          </motion.div>

          {/* DESKTOP CARDS WITH REAL GRID (rowSpan + colSpan WORKS) */}
          <motion.div
            className="grid grid-cols-3 gap-[32px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={{ visible: { transition: { staggerChildren: 0.6 } } }}
          >
            {(desktopOrder && Object.keys(desktopOrder).length
              ? Object.values(desktopOrder)
              : normalizedItems.map((_, i) => i)
            ).map((idx) => {
              const f = normalizedItems[idx];
              if (!f) return null;

              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: {
                      y: 80,
                      opacity: 0,
                      filter: "blur(15px)",
                      scale: 0.9,
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        bounce: 0.4,
                        duration: 0.8,
                      },
                    },
                  }}
                  style={{
                    gridRow: `span ${Number(f.rowSpan) || 1}`,
                    gridColumn: `span ${Number(f.colSpan) || 1}`,
                  }}
                >
                  <ImageCard
                    heading={f.heading}
                    description={f.description}
                    imageLink={f.imageLink}
                    textPosition={f.textPosition}
                    headingVariant={cardHeadingVariant}
                    descriptionVariant={cardDescriptionVariant}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      ) : null}
    </>
  );
}
