import Image, { StaticImageData } from "next/image";

type ReusableImageProps = {
  src: string | StaticImageData;
  alt?: string;

  fill?: boolean;
  width?: number;
  height?: number;

  priority?: boolean;
  quality?: number;
  sizes?: string;

  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";

  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";

  className?: string;
  containerClassName?: string;
};

export default function ReusableImage({
  src,
  alt = "Image",
  fill = false,
  width = 800,
  height = 600,
  priority = false,
  quality = 85,
  sizes = "(max-width:768px) 100vw, 50vw",
  objectFit = "cover",
  rounded = "lg",
  className = "",
  containerClassName = "",
}: ReusableImageProps) {

  // Put them here
  const fitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  const roundedClass = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={`${fill ? "relative w-full h-full" : ""} ${containerClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        quality={quality}
        sizes={fill ? sizes : undefined}
        className={`${fitClass} ${roundedClass} ${className}`}
      />
    </div>
  );
}