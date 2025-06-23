import React from "react";
import View from "@components/View/View";
import { FaLock, FaGlobe } from "react-icons/fa";

export interface Community {
  id: string;
  name: string;
  avatar?: string;
  isPrivate?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  status?: "active" | "deactivated";
}

export interface CommunitySection {
  title: string;
  communities: Community[];
}

interface ListCommunitiesProps {
  sections: CommunitySection[];
  onSelectCommunity?: (community: Community) => void;
}

const ListCommunities: React.FC<ListCommunitiesProps> = ({
  sections,
  onSelectCommunity,
}) => {
  return (
    <View className="w-[407px] h-screen bg-white p-4 space-y-4">
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          {/* Section Title */}
          <div className="flex items-center justify-center">
            <span className="text-[#5D5D5D] text-xs font-medium">
              {section.title}
            </span>
          </div>

          {/* Communities List */}
          <div className="bg-white rounded-xl p-2 space-y-2">
            {section.communities.map((community) => (
              <div
                key={community.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  community.isSelected ? "bg-[#E7F0FF]" : "hover:bg-gray-50"
                } ${community.isDisabled ? "opacity-60" : ""}`}
                onClick={() =>
                  !community.isDisabled && onSelectCommunity?.(community)
                }
              >
                {/* Avatar with Privacy Icon */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img
                      src={community.avatar || "https://via.placeholder.com/40"}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                    {community.isPrivate ? (
                      <FaLock className="text-[#6F32BB] text-xs" />
                    ) : (
                      <FaGlobe className="text-[#6F32BB] text-xs" />
                    )}
                  </div>
                </div>

                {/* Community Name and Status */}
                <div className="ml-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        community.isDisabled
                          ? "text-[#979797]"
                          : "text-[#171717]"
                      }`}
                    >
                      {community.name}
                    </span>
                    {community.status === "deactivated" && (
                      <span className="text-xs font-medium text-[#494949] bg-[#ECECEC] px-2 py-1 rounded-full">
                        Deactivated
                      </span>
                    )}
                  </div>
                </div>

                {/* Selected Check Icon */}
                {community.isSelected && (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="text-[#0B69FF]">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </View>
  );
};

export default ListCommunities;
