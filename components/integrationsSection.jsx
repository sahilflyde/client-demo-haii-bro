import SectionHeader from "./sectionHeader";
import Container from "./spacing";
import { motion } from "framer-motion";
import Tools from "./tools";

export default function IntegrationSection({
  label = "Integrations",
  title = "Connect Your Favorite Tools",
  subtitle = "Integrate your workflow with popular platforms",
  items = [
    { name: "Integration 1", src: "https://placehold.co/80x80" },
    { name: "Integration 2", src: "https://placehold.co/80x80" },
    { name: "Integration 3", src: "https://placehold.co/80x80" },
    { name: "Integration 4", src: "https://placehold.co/80x80" },
    { name: "Integration 5", src: "https://placehold.co/80x80" },
  ],

  isMobile = false,
  isIpad = false,

  // ⭐ NEW TYPOGRAPHY OVERRIDE PROPS
  labelVariant = "",
  titleVariant = "",
  subtitleVariant = "",
}) {



  console.log(items)

  return (
    <Container
      variant="primary"
      className="flex flex-wrap justify-between items-start gap-16"
    >
      <div>
        <SectionHeader
          label={label}
          title={title}
          subtitle={subtitle}
          align={isMobile || isIpad ? "center" : "left"}
          className="lg:max-w-[510px] w-full"
          // ⭐ APPLY OVERRIDES
          labelTypo={labelVariant}
          sectionHeaderTypo={titleVariant}
          sectionDescTypo={subtitleVariant}
        />
      </div>

      <motion.div
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          bounce: 0.4,
          duration: 0.8,
        }}
      >
        <Tools items={items} />
      </motion.div>
    </Container>
  );
}
