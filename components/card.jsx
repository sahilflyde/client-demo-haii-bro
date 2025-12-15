"use client";
import Typography from "./typography";

const ImageCard = ({
  heading = "Demo Heading",
  description = "Lorem Ipsum dolor sits on the wall",
  imageLink = "https://ik.imagekit.io/flyde/Hirezy/Widget.png?updatedAt=1761895813353",
  textPosition = "top",
  classNameCustom,
  imageClassName,
}) => {
  const isRight = textPosition === "right";

  const TextBlock = () => (
    <div className="cardHead flex flex-col gap-2">
      <Typography variant="h3">{heading}</Typography>
      <Typography variant="body-4" className="color-black-400">
        {description}
      </Typography>
    </div>
  );

  return (
    <div
      className={`
        imageCard
        ${isRight ? "!flex-row items-start" : ""}
        ${classNameCustom}
      `}
    >
      {/* When text is on top */}
      {textPosition === "top" && <TextBlock />}

      <img
        src={imageLink}
        alt="image card"
        className={`cardimg ${imageClassName}`}
        style={{
          width: isRight ? "100px" : "auto",
          height: "auto",
          // height: "auto",
          // objectFit : "cover",
          // overflow : "hidden"
        }}
      />

      {/* When text is on bottom */}
      {textPosition === "bottom" && <TextBlock />}

      {textPosition === "right" && <TextBlock />}
    </div>
  );
};


export default ImageCard