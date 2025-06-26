import MbHeader from "@/components/bic-components/mb-header/mb-header";
import View from "@/components/View/View";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const HeaderBar = () => {
  const navigate = useNavigate();
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      fitContent={true}
      backgroundColor="red"
      padding={10}
    >
      <View fitContent backgroundColor="blue" className="absolute left-0">
        <IoChevronBack className="text-2xl" />
      </View>
      <span className="text-2xl">Pin Communities</span>
    </View>
  );
};
