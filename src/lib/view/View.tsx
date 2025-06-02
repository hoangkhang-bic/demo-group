import { type PropsWithChildren } from "react";
import clsx from "clsx";

export default function View({
  children,
  className,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  //* check not pass text to view component
  if (typeof children === "string") {
    throw new Error("View component does not accept text as children");
  }
  return (
    <div className={clsx("flex-1 w-full h-full", className)} {...props}>
      {children}
    </div>
  );
}
