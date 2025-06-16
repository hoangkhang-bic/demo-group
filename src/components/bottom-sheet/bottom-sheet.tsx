import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { BottomSheet as SpringBottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

// Define the ref type that will be exposed to parent components
export interface BottomSheetRefType {
  open: () => void;
  close: () => void;
}

interface BottomSheetProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onDismiss?: () => void;
}

const BottomSheetComponent = forwardRef<BottomSheetRefType, BottomSheetProps>(
  ({ children, header, footer, onDismiss }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    const handleDismiss = () => {
      setIsOpen(false);
      if (onDismiss) {
        onDismiss();
      }
    };

    return (
      <SpringBottomSheet
        open={isOpen}
        onDismiss={handleDismiss}
        header={header}
        footer={footer}
        snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.8]}
      >
        {children}
      </SpringBottomSheet>
    );
  }
);

BottomSheetComponent.displayName = "BottomSheetComponent";

export default BottomSheetComponent;
