import { type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export default function TextInput({
  className,
  ...props
}: PropsWithChildren<{ className?: string }>) {
  return (
    <input type="text" className={twMerge("input", className)} {...props} />
  );
}
