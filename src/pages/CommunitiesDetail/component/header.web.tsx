import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import Image from "@/components/Image/Image";
import Avatar from "@/components/Image/avatar";
import View from "@/components/View/View";
import { Touchable } from "@/components/touchable/touchable";

interface HeaderProps {
  coverImage?: string;
  avatarImage?: string;
  communityName: string;
  memberCount: number;
  onChatClick?: () => void;
  onMoreClick?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  coverImage,
  avatarImage,
  communityName,
  memberCount,
  onChatClick,
  onMoreClick,
  activeTab,
  onTabChange,
}) => {
  const isMobile = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = isMobile ? 200 : 400; // Match the header height
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const tabs = [
    { key: "timeline", title: "Timeline" },
    { key: "about", title: "About" },
    { key: "members", title: "Members" },
  ];

  return (
    <div className="flex flex-col w-full bg-white rounded-b-lg">
      <div className="flex flex-col w-full">
        <div
          className={`relative w-full ${isMobile ? "h-[200px]" : "h-[400px]"}`}
        >
          <Image
            source={coverImage || ""}
            width={"100%"}
            height={"90%"}
            resizeMode="cover"
            alt="Community Cover"
          />
        </div>

        <div
          className={`flex flex-row items-end w-full gap-3 px-4 ${
            isMobile ? "-mt-8" : "-mt-14"
          }`}
        >
          <View>
            <View
              alignItems="center"
              justifyContent="center"
              className="relative"
            >
              <Avatar
                source={avatarImage || ""}
                size="xl"
                variant="square"
                alt="Community Avatar"
              />
              <div
                className={`absolute ${isMobile ? "-bottom-8" : "-bottom-10"} ${
                  isMobile ? "w-16" : "w-24"
                } ${
                  isMobile ? "h-8" : "h-10"
                } flex flex-col justify-center items-center`}
              >
                <span
                  className={`${
                    isMobile ? "text-base" : "text-[18px]"
                  } font-semibold text-[#181C32]`}
                >
                  {memberCount}
                </span>
                <span
                  className={`${
                    isMobile ? "text-[8px]" : "text-[10px]"
                  } text-[#2E3660]`}
                >
                  Members
                </span>
              </div>
            </View>
          </View>

          <div className="flex flex-row items-center flex-1 gap-1 z-1">
            <span
              className={`${
                isMobile ? "text-lg" : "text-xl"
              } font-semibold text-[#2E3660] line-clamp-2`}
            >
              {communityName}
            </span>
          </div>

          <div className="flex flex-row gap-2">
            <button
              onClick={onChatClick}
              className={`flex items-center gap-2 ${
                isMobile ? "px-2 py-1.5" : "px-3 py-2"
              } bg-[#ECEEF6] rounded-md hover:bg-[#E2E5F1] transition-colors`}
            >
              <svg
                width={isMobile ? "16" : "20"}
                height={isMobile ? "16" : "20"}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.02 3H15.98C17.09 3 18 3.91 18 5.02V14.97C18 16.09 17.09 17 15.98 17H4.02C2.91 17 2 16.09 2 14.97V5.02C2 3.91 2.91 3 4.02 3Z"
                  fill="#DAC9F0"
                />
                <path
                  d="M4 5.99V14.47C4 15.32 4.67 16 5.52 16H14.48C15.33 16 16 15.32 16 14.47V5.99C16 5.14 15.33 4.47 14.48 4.47H5.52C4.67 4.47 4 5.14 4 5.99Z"
                  fill="#874ECF"
                />
              </svg>
              <span
                className={`${
                  isMobile ? "text-xs" : "text-sm"
                } font-medium text-[#2E3660]`}
              >
                Chat
              </span>
            </button>
            <button
              onClick={onMoreClick}
              className={`flex items-center justify-center bg-[#ECEEF6] rounded-md hover:bg-[#E2E5F1] transition-colors ${
                isMobile ? "w-6 h-6" : "w-8 h-8"
              }`}
            >
              <svg
                width={isMobile ? "16" : "20"}
                height={isMobile ? "16" : "20"}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M2.5 8.33H17.5V11.66H2.5V8.33Z" fill="#444F8E" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-white shadow-md z-50"
            : "mt-2"
        } ${isMobile ? "px-2" : ""} border-b border-[#E5E7EB]`}
      >
        <View
          flex={1}
          flexDirection="row"
          gap={30}
          height={40}
          alignItems="center"
          justifyContent="center"
        >
          {tabs.map((tab) => (
            <View key={tab.key}>
              <Touchable
                onPress={() => onTabChange?.(tab.key)}
                className={`text-sm font-medium ${
                  activeTab === tab.key
                    ? "text-[#874ECF] border-b-2 border-[#874ECF]"
                    : "text-[#6E79B9]"
                }`}
              >
                {tab.title}
              </Touchable>
            </View>
          ))}
        </View>
      </div>
    </div>
  );
};
