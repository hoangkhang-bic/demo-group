import React, { useRef, useState, useEffect } from "react";
import View from "@/components/View/View";
import Avatar from "@/components/Image/avatar";
import {
  IoChevronDown,
  IoChevronUp,
  IoLockClosed,
  IoPeople,
  IoTrash,
  IoPencil,
  IoPersonAdd,
} from "react-icons/io5";
import { Group } from "@/services/communities-services";
import { Touchable } from "@/components/touchable/touchable";

interface GroupItemProps {
  group: Group;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onInvite?: () => void;
}

const useHoverState = () => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [ref, isHovering] as const;
};

export const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onClick,
  onEdit,
  onDelete,
  onInvite,
}) => {
  const [elementRef, isHovering] = useHoverState();

  const ActionButton = ({
    icon: Icon,
    label,
    onClick,
    color = "text-gray-600 hover:text-gray-900",
    hoverBg = "hover:bg-gray-100",
  }: {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    color?: string;
    hoverBg?: string;
  }) => (
    <Touchable onPress={onClick}>
      <View
        flexDirection="row"
        alignItems="center"
        gap={4}
        padding={6}
        borderRadius={6}
        className={`transition-colors ${hoverBg}`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <Icon size={18} className={color} />
        <span className={`text-sm ${color}`}>{label}</span>
      </View>
    </Touchable>
  );

  return (
    <View
      ref={elementRef}
      flexDirection="column"
      gap={isHovering ? 8 : 0}
      className="transition-all duration-200"
    >
      <Touchable onPress={onClick}>
        <View
          flexDirection="row"
          alignItems="center"
          padding={12}
          backgroundColor="white"
          borderRadius={12}
          gap={12}
          className={`shadow-sm transition-all duration-200 ${
            isHovering ? "bg-gray-50" : ""
          }`}
        >
          <Avatar source={group.avatarUrl || ""} size="lg" variant="square" />

          <View flex={1} gap={4}>
            <View flexDirection="row" alignItems="center" gap={8}>
              <span className="text-base font-semibold text-gray-900">
                {group.name}
              </span>
              {group.type === "private" && (
                <IoLockClosed size={16} className="text-gray-500" />
              )}
            </View>
            <View flexDirection="row" alignItems="center" gap={4}>
              <IoPeople size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">
                {group.memberCount} members
              </span>
            </View>
          </View>
        </View>
      </Touchable>

      {/* Action buttons that appear on hover */}
      {isHovering && (
        <View
          flexDirection="row"
          gap={4}
          paddingHorizontal={12}
          className="animate-fade-in"
        >
          <ActionButton icon={IoPencil} label="Edit" onClick={onEdit} />
          <ActionButton
            icon={IoPersonAdd}
            label="Invite"
            onClick={onInvite}
            color="text-purple-600 hover:text-purple-700"
            hoverBg="hover:bg-purple-50"
          />
          <ActionButton
            icon={IoTrash}
            label="Delete"
            onClick={onDelete}
            color="text-red-600 hover:text-red-700"
            hoverBg="hover:bg-red-50"
          />
        </View>
      )}
    </View>
  );
};
const TypeIcon: {
  [key: string]: {
    icon: React.ReactNode;
    color: string;
  };
} = {
  private: {
    icon: (
      <IoLockClosed
        size={18}
        className="text-amber-300 absolute right-0 bottom-0"
      />
    ),
    color: "amber-300",
  },
  public: {
    icon: (
      <IoPeople
        size={18}
        className="text-green-300 absolute right-[-3px] bottom-[-2px]"
      />
    ),
    color: "green-300",
  },
  secret: {
    icon: (
      <IoLockClosed
        size={18}
        className="text-blue-300 absolute right-0 bottom-0"
      />
    ),
    color: "blue-300",
  },
};

export const GroupItemLight = ({
  avatarUrl,
  name,
  type,
  expand,
  onExpandClick,
  isSelected,
  onSelectClick,
}: {
  avatarUrl?: string;
  name?: string;
  type?: "private" | "public" | "secret";
  expand?: boolean;
  isSelected?: boolean;
  onExpandClick?: () => void;
  onSelectClick?: () => void;
}) => {
  const Icon = TypeIcon[`${type}`]?.icon;
  const color = TypeIcon[`${type}`]?.color;
  const [isExpand, setIsExpand] = useState(expand || false);

  const handleExpandClick = () => {
    onExpandClick?.();
    setIsExpand(!isExpand);
  };
  const handleSelectClick = () => {
    onSelectClick?.();
  };
  return (
    <View
      flexDirection="row"
      alignItems="center"
      gap={10}
      width="100%"
      padding={10}
      borderRadius={10}
      backgroundColor={isSelected ? "var(--color-primary-light)" : "white"}
    >
      {expand ? (
        <Touchable onPress={handleExpandClick}>
          {isExpand ? <IoChevronUp size={10} /> : <IoChevronDown size={10} />}
        </Touchable>
      ) : (
        <div className="w-[10px] h-[10px] bg-transparent" />
      )}
      <Touchable onPress={handleSelectClick}>
        <View fitContent>
          <Avatar source={avatarUrl || ""} size="sm" variant="square" />
          {Icon}
        </View>
      </Touchable>
      <span className="text-sm text-primary-dark">{name}</span>
    </View>
  );
};
