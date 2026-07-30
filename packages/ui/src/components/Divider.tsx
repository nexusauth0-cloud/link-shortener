import { cn } from "../lib/utils"

interface DividerProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Divider({ className, orientation = "horizontal" }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-border",
        orientation === "horizontal" ? "w-full" : "h-full",
        className,
      )}
    />
  )
}
