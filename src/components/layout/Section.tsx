import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  size?: "default" | "small"
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  size = "default",
  className,
  ...props
}, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden w-full",
        size === "default" ? "py-16" : "py-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
})
Section.displayName = "Section"
