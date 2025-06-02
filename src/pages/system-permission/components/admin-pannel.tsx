import React from "react";
import { Avatar, Badge, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  FlagOutlined,
  HistoryOutlined,
  FileOutlined,
  SettingOutlined,
  ShieldOutlined,
  TrophyOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 320px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  padding: 16px 16px 8px;
`;

const ProfileSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #d6d9eb;
  border-radius: 16px;
  cursor: pointer;

  .profile-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .profile-name {
    font-family: Inter;
    font-weight: 600;
    font-size: 14px;
    color: #2e3660;
  }
`;

const SectionTitle = styled.div`
  padding: 4px 8px 4px 12px;
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  color: #9099ca;
`;

const SidebarContent = styled.div`
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuItem = styled(Menu.Item)`
  &.ant-menu-item {
    margin: 0;
    padding: 8px 12px;
    border-radius: 8px;
    height: auto;
    line-height: 1.5;

    &:hover,
    &.ant-menu-item-selected {
      background: #eceef6;
    }
  }

  .ant-menu-title-content {
    font-family: Inter;
    font-weight: 500;
    font-size: 14px;
    color: #2e3660;
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-dot {
    background: #0961ed;
    border: 1px solid #ffffff;
  }
`;

const AdminPanel: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <ProfileSelection>
          <div className="profile-info">
            <Avatar
              size={40}
              src="avatar.jpg"
              style={{ borderRadius: "12px", border: "1.5px solid #F8F8FB" }}
            />
            <span className="profile-name">Neuroscientists & Musicque</span>
          </div>
          <DownOutlined style={{ color: "#444F8E", fontSize: 16 }} />
        </ProfileSelection>
      </SidebarHeader>

      <SidebarContent>
        <section>
          <SectionTitle>Administration</SectionTitle>
          <Menu mode="inline" selectable>
            <MenuItem icon={<DashboardOutlined style={{ color: "#444F8E" }} />}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<TeamOutlined style={{ color: "#444F8E" }} />}>
              Group management
            </MenuItem>
            <MenuItem icon={<UserOutlined style={{ color: "#444F8E" }} />}>
              <StyledBadge dot>Member management</StyledBadge>
            </MenuItem>
            <MenuItem icon={<FlagOutlined style={{ color: "#444F8E" }} />}>
              <StyledBadge dot>Report management</StyledBadge>
            </MenuItem>
            <MenuItem icon={<HistoryOutlined style={{ color: "#444F8E" }} />}>
              Activity log
            </MenuItem>
            <MenuItem icon={<FileOutlined style={{ color: "#444F8E" }} />}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Pending post
                <Badge
                  count="Upcoming"
                  style={{
                    backgroundColor: "#D6E5FD",
                    color: "#0961ED",
                    borderRadius: "9999px",
                  }}
                />
              </div>
            </MenuItem>
          </Menu>
        </section>

        <section>
          <SectionTitle>Settings</SectionTitle>
          <Menu mode="inline" selectable>
            <MenuItem icon={<SettingOutlined style={{ color: "#444F8E" }} />}>
              Profile info
            </MenuItem>
            <MenuItem
              icon={<ShieldOutlined style={{ color: "#444F8E" }} />}
              className="ant-menu-item-selected"
            >
              Permission set
            </MenuItem>
            <MenuItem icon={<TrophyOutlined style={{ color: "#444F8E" }} />}>
              Badge
            </MenuItem>
          </Menu>
        </section>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default AdminPanel;
