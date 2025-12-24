import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const liquidButtonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-cyan-bright/50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 text-white",
        primary: "bg-gradient-to-r from-cyan-bright to-magenta text-white hover:brightness-110 hover:scale-105 shadow-lg hover:shadow-cyan-bright/30",
        secondary: "bg-gradient-to-b from-slate-blue/20 to-slate-blue/10 text-slate-300 hover:text-white hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 text-xs gap-1.5 px-4",
        lg: "h-12 px-8",
        xl: "h-14 px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "relative group",
        liquidButtonVariants({ variant, size, className })
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { liquidButtonVariants }
