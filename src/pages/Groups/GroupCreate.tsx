import React, { useState, useRef } from "react";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import View from "@/components/View/View";
import PageAndroidTransition from "@components/wrapper-transistion/page.android.transition";
import { useNavigate } from "react-router";
import { Button } from "@/components/button/button";
import { useIsDesktop, useIsMobile } from "@/hooks/useMediaQuery";
import { CreateGroupParams, useCreateGroup } from "@/services/group-services";
import { Community, Group } from "@/services/communities-services";
import { Touchable } from "@/components/touchable/touchable";
import Avatar, { AvatarPlaceholder } from "@/components/Image/avatar";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";

interface GroupFormData extends Omit<CreateGroupParams, "parentCommunityId"> {
  parentCommunityId?: string;
  avatar?: string;
}

const defaultColors = [
  "#34a853",
  "#4285f4",
  "#ea4335",
  "#fbbc05",
  "#9c27b0",
  "#ff6d01",
  "#00bcd4",
  "#8bc34a",
  "#607d8b",
  "#e91e63",
];

const defaultIcons = [
  "👥",
  "🎯",
  "💡",
  "🔥",
  "⚡",
  "🌟",
  "🎨",
  "🛠️",
  "📚",
  "🎭",
];

export const GroupCreate = ({
  parentGroup,
  rootCommunity,
  onClose,
}: {
  parentGroup?: Group | undefined;
  rootCommunity?: Community | undefined;
  onClose?: () => void;
}) => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const createGroupMutation = useCreateGroup();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    icon: defaultIcons[0],
    color: defaultColors[0],
    type: "public",
    parentId: parentGroup?.id,
    avatar: "",
  });

  const handleSubmit = async ({ isMobile }: { isMobile: boolean }) => {
    if (!formData.parentId) return;
    try {
      await createGroupMutation.mutateAsync({
        data: formData,
        parentCommunityId: rootCommunity?.id,
        parentGroupId: parentGroup?.id,
      });
      if (isMobile) {
        navigate(-1); // Go back to previous page on success
      } else {
        onClose?.();
      }
    } catch (error) {
      console.error("Failed to create group:", error);
      // Here you would typically show an error message to the user
    }
  };

  const handleInputChange = (field: keyof GroupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleInputChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const content = (
    <View flex={1} className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="space-y-6">
        {/* Avatar Upload */}
        <View className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Group Avatar
          </label>
          <View className="flex items-center justify-center">
            <Touchable onPress={handleAvatarClick}>
              {formData.avatar ? (
                <Avatar
                  source={formData.avatar}
                  size="xl"
                  alt="Group avatar"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              ) : (
                <AvatarPlaceholder
                  size="xl"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              )}
            </Touchable>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </View>
          <p className="text-sm text-gray-500 text-center mt-2">
            Click to upload group avatar
          </p>
        </View>

        {/* Parent Community Selection */}
        <View className="space-y-2">
          <label
            htmlFor="parentCommunity"
            className="block text-sm font-medium text-gray-700"
          >
            Parent Group
            <View flexDirection="row" gap={10}>
              {rootCommunity && (
                <View key={rootCommunity.id}>
                  <h1 className="text-xl font-bold text-gray-500">
                    {rootCommunity.name}
                  </h1>
                </View>
              )}
              {parentGroup && (
                <View key={parentGroup.id}>
                  <h1 className="text-xl font-bold text-gray-500">
                    {parentGroup.name}
                  </h1>
                </View>
              )}
            </View>
          </label>
        </View>

        {/* Group Name */}
        <View className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            placeholder="Enter group name"
            required
          />
        </View>

        {/* Description */}
        <View className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] bg-white"
            placeholder="Describe your group"
            required
          />
        </View>

        {/* Icon Selection */}
        <View className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Choose an Icon
          </label>
          <View flexDirection="row" flexWrap="wrap" gap={8}>
            {defaultIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => handleInputChange("icon", icon)}
                className={`w-10 h-10 text-xl flex items-center justify-center rounded-lg transition-all ${
                  formData.icon === icon
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {icon}
              </button>
            ))}
          </View>
        </View>

        {/* Color Selection */}
        <View className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Choose a Color
          </label>
          <View flexDirection="row" flexWrap="wrap" gap={8}>
            {defaultColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleInputChange("color", color)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  formData.color === color
                    ? "ring-2 ring-offset-2 ring-purple-500"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </View>
        </View>

        {/* Privacy Setting */}
        <View className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Privacy Setting
          </label>
          <View flexDirection="row" gap={16}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.type === "public"}
                onChange={() => handleInputChange("type", "public")}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span>Public</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.type === "private"}
                onChange={() => handleInputChange("type", "private")}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span>Private</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.type === "secret"}
                onChange={() => handleInputChange("type", "secret")}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span>Secret</span>
            </label>
          </View>
        </View>

        {/* Action Buttons */}
        <View flexDirection="row" gap={12} className="mt-6">
          <Touchable
            fullWidth
            style={{
              height: 60,
              borderRadius: 10,
              backgroundColor: "gray",
            }}
            onPress={() => {
              onClose?.();
            }}
            className="flex-1 bg-gray-200"
          >
            Cancel
          </Touchable>
          <Touchable
            fullWidth
            style={{
              height: 60,
              borderRadius: 10,
              backgroundColor: "primary",
            }}
            onPress={() => handleSubmit({ isMobile: isMobile || false })}
            className="flex-1 bg-primary"
            disabled={
              !formData.name || !formData.description || !formData.parentId
            }
          >
            Create Group
          </Touchable>
        </View>
      </div>
    </View>
  );

  return isDesktop ? (
    <View
      flex={1}
      className="min-h-screen bg-gray-50 pt-[var(--top-header-height-desktop)]"
    >
      {content}
    </View>
  ) : (
    <PageAndroidTransition disableTransition={true}>
      <SafeAreaView>
        <MbHeader
          title="Create Group"
          onBackClick={() => navigate(-1)}
          style={{
            height: "var(--top-header-height-mobile)",
          }}
        />
        <View flex={1} className="max-w-3xl mx-auto p-4 md:p-6 overflow-auto">
          {content}
        </View>
      </SafeAreaView>
    </PageAndroidTransition>
  );
};

export default GroupCreate;
