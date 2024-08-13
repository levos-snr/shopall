import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./buttonVariants";

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
Button.propTypes = {
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

export { Button };
