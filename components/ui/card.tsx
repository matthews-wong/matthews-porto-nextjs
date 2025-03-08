import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional variant for different card styles
   */
  variant?: "default" | "outline" | "elevated" | "ghost" | "gradient"
  
  /**
   * Optional size property
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  
  /**
   * If true, removes padding from card content
   */
  noPadding?: boolean
  
  /**
   * Optional hover effect
   */
  hover?: boolean
  
  /**
   * Optional border radius
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  
  /**
   * Optional shadow intensity
   */
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  
  /**
   * Optional color scheme
   */
  colorScheme?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md", 
    hover = false, 
    noPadding = false,
    rounded = "md",
    shadow = "md",
    colorScheme = "default",
    ...props 
  }, ref) => {
    const variants = {
      default: "border bg-card text-card-foreground",
      outline: "border-2 bg-transparent",
      elevated: "border-none bg-card text-card-foreground",
      ghost: "border-none bg-transparent hover:bg-muted/50",
      gradient: "border-none bg-gradient-to-br from-primary/20 to-primary/5 text-card-foreground"
    }
    
    const sizes = {
      xs: "p-2",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10"
    }
    
    const radiusOptions = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-xl",
      lg: "rounded-3xl",
      full: "rounded-full"
    }
    
    const shadowOptions = {
      none: "",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl"
    }
    
    const colorSchemes = {
      default: "",
      primary: "border-primary/20 bg-primary/5 text-primary-foreground",
      secondary: "border-secondary/20 bg-secondary/5 text-secondary-foreground",
      success: "border-green-500/20 bg-green-500/5 text-green-700 dark:text-green-300",
      warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300",
      danger: "border-red-500/20 bg-red-500/5 text-red-700 dark:text-red-300",
      info: "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-200",
          radiusOptions[rounded],
          variants[variant],
          shadowOptions[shadow],
          noPadding ? "" : sizes[size],
          colorScheme !== "default" ? colorSchemes[colorScheme] : "",
          hover && "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional alignment for header content
   */
  align?: "left" | "center" | "right"
  
  /**
   * Optional border at the bottom of header
   */
  bordered?: boolean
  
  /**
   * Optional compact mode for tighter spacing
   */
  compact?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, align = "left", bordered = false, compact = false, ...props }, ref) => {
    const alignments = {
      left: "items-start",
      center: "items-center",
      right: "items-end"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          compact ? "space-y-1 p-4" : "space-y-1.5 p-6",
          bordered && "border-b pb-4",
          alignments[align],
          className
        )}
        {...props}
      />
    )
  }
)
CardHeader.displayName = "CardHeader"

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Optional heading level
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  
  /**
   * Optional size variant
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", size = "md", ...props }, ref) => {
    const sizeClasses = {
      xs: "text-sm",
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl"
    }
    
    return (
      <Component
        ref={ref}
        className={cn(
          "font-semibold leading-none tracking-tight",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Optional size variant
   */
  size?: "xs" | "sm" | "md"
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size = "sm", ...props }, ref) => {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base"
    }
    
    return (
      <p
        ref={ref}
        className={cn(
          "text-muted-foreground",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional padding for content
   */
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  
  /**
   * Optional border at the top of content
   */
  bordered?: boolean
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = "md", bordered = false, ...props }, ref) => {
    const paddings = {
      none: "p-0",
      xs: "px-2 pt-0",
      sm: "px-4 pt-0",
      md: "px-6 pt-0",
      lg: "px-8 pt-0",
      xl: "px-10 pt-0"
    }
    
    return (
      <div 
        ref={ref} 
        className={cn(
          paddings[padding], 
          bordered && "border-t pt-4 mt-4",
          className
        )} 
        {...props} 
      />
    )
  }
)
CardContent.displayName = "CardContent"

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional justification for footer content
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  
  /**
   * Optional border at the top of footer
   */
  bordered?: boolean
  
  /**
   * Optional compact mode for tighter spacing
   */
  compact?: boolean
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = "start", bordered = false, compact = false, ...props }, ref) => {
    const justifications = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          compact ? "p-4 pt-0" : "p-6 pt-0",
          bordered && "border-t mt-4 pt-4",
          justifications[justify],
          className
        )}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }