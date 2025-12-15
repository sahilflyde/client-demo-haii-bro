"use client";
import clsx from "clsx";

export default function HeroImageSection({
  mainImage,
  leftImage,
  rightImage,
  className,
  variant = "default",
}) {
  if (variant === "full") {
    return (
      <section
        className={clsx("w-full flex justify-center pb-[50px] imageSec !p-0 !bg-none !px-0", className)}
      >
        <div className="w-full  ">
          {mainImage && (
            <img
              src={mainImage}
              alt="hero"
              className="
                w-full h-auto 
                rounded-[20px]   
                object-cover border-none
              "
            />
          )}
        </div>
      </section>
    );
  }

  // ----------------------------
  // DEFAULT VARIANT (3 IMAGES)
  // ----------------------------
  return (
    <section
      className={clsx(
        "w-full flex justify-center imageSec pb-[50px]",
        className
      )}
    >
      <div className="relative w-full flex justify-center items-center">
        {/* MAIN IMAGE */}
        <div className="relative mainImageHome">
          {mainImage && (
            <img
              src={mainImage}
              alt="center"
              width={704}
              height={500}
              className="object-cover 
                w-[278px] mx-auto
                md:w-[337px]
                lg:w-[704px]"
            />
          )}

          {/* LEFT IMAGE (Desktop) */}
          {leftImage && (
            <div className="hidden lg:block absolute -left-[239px] top-0">
              <img src={leftImage} alt="left" width={189} height={200} />
            </div>
          )}

          {/* RIGHT IMAGE (Desktop) */}
          {rightImage && (
            <div className="hidden lg:block absolute -right-[250px] bottom-0">
              <img src={rightImage} alt="right" width={202} height={200} />
            </div>
          )}
        </div>

        {/* Mobile & iPad overlap images */}
        {leftImage && (
          <div className="block lg:hidden absolute left-2 top-[16px]">
            <img
              src={leftImage}
              alt="left"
              className="w-[63px] md:w-[93px]"
              height={100}
              width={100}
            />
          </div>
        )}

        {rightImage && (
          <div className="block lg:hidden absolute right-2 bottom-0">
            <img
              src={rightImage}
              alt="right"
              className="w-[79px] md:w-[103px]"
              height={100}
              width={100}
            />
          </div>
        )}
      </div>
    </section>
  );
}
