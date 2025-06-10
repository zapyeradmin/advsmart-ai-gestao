
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md hover:shadow-lg active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-hover hover:transform hover:translate-y-[-1px]",
        destructive: "bg-destructive text-white hover:bg-destructive-hover hover:transform hover:translate-y-[-1px]",
        outline: "border border-dark-border bg-dark-card text-dark-text hover:bg-dark-surface hover:text-dark-text",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:transform hover:translate-y-[-1px]",
        ghost: "hover:bg-dark-surface hover:text-dark-text text-dark-text-secondary",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
        success: "bg-success text-white hover:bg-success-hover hover:transform hover:translate-y-[-1px]",
        warning: "bg-warning text-white hover:bg-warning-hover hover:transform hover:translate-y-[-1px]",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-button px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
