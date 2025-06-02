import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { constantListCom } from "./constant-list-com";
import "./styles.css";

interface LayoutProps {
  layout: "grid" | "list";
}

interface CommunityItem {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  userCount: number;
  postAverageWeekly: number;
  // Add other properties as needed
}

const AnimatedLayout: React.FC<LayoutProps> = ({ layout }) => {
  const [items] = useState<CommunityItem[]>(constantListCom);

  const renderGridItem = (item: CommunityItem) => (
    <CSSTransition key={item.id} timeout={300} classNames="grid">
      <div className="grid-item">
        <img src={item.icon} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="stats">
          <span>Members: {item.userCount}</span>
          <span>Posts: {item.postAverageWeekly}</span>
        </div>
      </div>
    </CSSTransition>
  );

  const renderListItem = (item: CommunityItem) => (
    <CSSTransition key={item.id} timeout={300} classNames="list">
      <div className="list-item">
        <img src={item.icon} alt={item.name} />
        <div className="list-item-content">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="stats">
            <span>Members: {item.userCount}</span>
            <span>Posts: {item.postAverageWeekly}</span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="layout-transition"
    >
      <div className={`layout ${layout}`}>
        <TransitionGroup
          className={layout === "grid" ? "grid-container" : "list-container"}
        >
          {items.map((item) =>
            layout === "grid" ? renderGridItem(item) : renderListItem(item)
          )}
        </TransitionGroup>
      </div>
    </CSSTransition>
  );
};

export default AnimatedLayout;
