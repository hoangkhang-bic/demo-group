import React, { useState } from "react";
import MbHeader from "@/components/bic-components/mb-header/mb-header";
import View from "@/components/View/View";
import PageAndroidTransition from "@components/wrapper-transistion/page.android.transition";
import { useNavigate } from "react-router";
import { Button } from "@/components/button/button";
import { useIsDesktop, useIsMobile } from "@/hooks/useMediaQuery";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";

interface CommunityFormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  type: "public" | "private";
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
  "🚀",
  "💻",
  "🎯",
  "⚡",
  "🔥",
  "🌟",
  "💡",
  "🎨",
  "🛠️",
  "🎭",
];

export const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState<CommunityFormData>({
    name: "",
    description: "",
    icon: defaultIcons[0],
    color: defaultColors[0],
    type: "public",
  });

  const handleSubmit = () => {
    // Here you would typically make an API call to create the community
    console.log("Form submitted:", formData);
    navigate("/communities");
  };

  const handleInputChange = (field: keyof CommunityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const content = (
    <View flex={1} className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="space-y-6">
        {/* Header */}
        <View className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Community
          </h1>
          <p className="mt-2 text-gray-600">
            Create a new community to connect with people who share your
            interests.
          </p>
        </View>

        {/* Community Name */}
        <View className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Community Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter community name"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            placeholder="Describe your community"
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
          </View>
        </View>

        {/* Action Buttons */}
        <View flexDirection="row" gap={12} className="mt-6">
          <Button
            variant="outline"
            onPress={() => navigate("/communities")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={handleSubmit}
            className="flex-1"
            disabled={!formData.name || !formData.description}
          >
            Create Community
          </Button>
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
          title="Create Community"
          fixed={true}
          onBackClick={() => navigate("/communities")}
        />
        {content}
      </SafeAreaView>
    </PageAndroidTransition>
  );
};

export default CreateCommunityPage;
