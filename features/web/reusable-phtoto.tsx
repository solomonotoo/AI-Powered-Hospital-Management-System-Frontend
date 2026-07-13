import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarProps = {
  src: string;
  alt?: string;
  fallback?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ReusablePhoto({
  src,
  alt = "Avatar",
  fallback = "NA",
  width = 40,
  height = 40,
  className = "",
}: AvatarProps) {
  return (
    <Avatar
      className={className}
      style={{
        width,
        height,
      }}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
