import { type PropsWithChildren } from "react";
import clsx from "clsx";
import "./Touchable-opacity.css";

export default function TouchableOpacity({
  children,
  className,
  onPress,
  ...props
}: PropsWithChildren<{
  className?: string;
  onPress?: () => void;
}>) {
  return (
    <button
      onClick={onPress}
      className={clsx("touchable-opacity", className)}
      {...props}
    >
      {children}
    </button>
  );
}
