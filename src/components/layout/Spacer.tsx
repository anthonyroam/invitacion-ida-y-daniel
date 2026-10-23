import { cn } from "@/lib/utils"

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl"

interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize
}

const sizeClasses: Record<SpacerSize, string> = {
  xs: "h-1",
  sm: "h-2",
  md: "h-4",
  lg: "h-8",
  xl: "h-12"
}

export function Spacer({
  size = "md",
  className,
  ...props
}: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
}
