import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Si querés forzar otra etiqueta por SEO manteniendo el estilo visual (ej. as="h1" con level={2}) */
  as?: React.ElementType
}

export function Heading({
  level = 2,
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Comp = as || (`h${level}` as React.ElementType)

  return (
    <Comp
      className={cn(
        // Font base para los títulos (Alex Brush)
        "font-primary font-normal text-foreground text-balance",
        {
          "text-7xl": level === 1,
          "text-5xl": level === 2,
          "text-3xl": level === 3,
          "text-2xl": level === 4,
          "text-xl": level === 5,
          "text-lg": level === 6,
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
