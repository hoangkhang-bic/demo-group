import { Touchable } from "@/components/touchable/touchable";
import View from "@/components/View/View";
import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";

export const ModalCreateGroup = forwardRef<
  {
    open: () => void;
    close: () => void;
  },
  {
    onClose: () => void;
    children: React.ReactNode;
  }
>(({ onClose, children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  });
  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        <View flex={1} height="100%">
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding={20}
            backgroundColor="white"
          >
            <h1 className="text-2xl font-bold">Create Group</h1>
            <Touchable onPress={handleClose}>
              <span className="text-2xl font-bold">X</span>
            </Touchable>
          </View>
          <View
            flex={1}
            backgroundColor="white"
            overflow="hidden"
            style={{ height: "calc(100% - 76px)" }}
          >
            {children}
          </View>
        </View>
      </Modal>
    </div>
  );
});
