import React, { useRef, useEffect, useState } from "react";
import { IonContent, createGesture, Gesture } from "@ionic/react";
import "./bottom-sheet.css";

interface BottomSheetProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen = false,
  onClose,
}) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const THRESHOLD = 100;

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    const gesture = createGesture({
      el: bottomSheetRef.current,
      threshold: 0,
      gestureName: "bottom-sheet",
      onStart: (ev) => {
        setIsDragging(true);
        startY.current = ev.startY;
        currentY.current =
          bottomSheetRef.current?.getBoundingClientRect().y || 0;
      },
      onMove: (ev) => {
        if (!bottomSheetRef.current) return;
        const newY = currentY.current + (ev.currentY - startY.current);
        if (newY > 0) {
          bottomSheetRef.current.style.transform = `translateY(${newY}px)`;
        }
      },
      onEnd: (ev) => {
        setIsDragging(false);
        if (!bottomSheetRef.current) return;

        const finalY = currentY.current + (ev.currentY - startY.current);
        if (finalY > THRESHOLD) {
          bottomSheetRef.current.style.transform = "translateY(100%)";
          onClose?.();
        } else {
          bottomSheetRef.current.style.transform = "translateY(0)";
        }
      },
    });

    gesture.enable();

    return () => {
      gesture.destroy();
    };
  }, [onClose]);

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    if (isOpen) {
      bottomSheetRef.current.style.transform = "translateY(0)";
    } else {
      bottomSheetRef.current.style.transform = "translateY(100%)";
    }
  }, [isOpen]);

  return (
    <IonContent className="bottom-sheet-wrapper">
      <div
        ref={bottomSheetRef}
        className={`bottom-sheet-container ${isOpen ? "open" : ""}`}
      >
        <div className="handle-bar" />
        <div className="bottom-sheet-content">{children}</div>
      </div>
    </IonContent>
  );
};

export default BottomSheet;
