import React, { useState } from "react";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import { Touchable } from "@/components/touchable/touchable";
import { Button } from "@/components/button/button";
import PageAndroidTransition from "@/components/wrapper-transistion/page.android.transition";
import useSafeAreaInsets from "@/hooks/useSafeAreaInsets";
import { getPlatform } from "@/utils/platform";

const SafeAreaViewDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>("default");
  const insets = useSafeAreaInsets();
  const platform = getPlatform();

  const renderDemo = () => {
    switch (activeDemo) {
      case "default":
        return (
          <SafeAreaView style={{ backgroundColor: "#f0f0f0", height: "100vh" }}>
            <div style={{ padding: "20px" }}>
              <h2>Default SafeAreaView</h2>
              <p>All insets applied (top, bottom, left, right)</p>
              <div style={{ marginTop: "20px" }}>
                <h3>Current Safe Area Insets:</h3>
                <pre
                  style={{
                    background: "#eee",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  {JSON.stringify(insets, null, 2)}
                </pre>
                <p>Platform: {platform}</p>
              </div>
            </div>
          </SafeAreaView>
        );
      case "top-only":
        return (
          <SafeAreaView
            top={true}
            bottom={false}
            left={false}
            right={false}
            style={{ backgroundColor: "#e0f7fa", height: "100vh" }}
          >
            <div style={{ padding: "20px" }}>
              <h2>Top-only SafeAreaView</h2>
              <p>Only top inset applied: {insets.top}px</p>
            </div>
          </SafeAreaView>
        );
      case "bottom-only":
        return (
          <SafeAreaView
            top={false}
            bottom={true}
            left={false}
            right={false}
            style={{ backgroundColor: "#fff3e0", height: "100vh" }}
          >
            <div style={{ padding: "20px" }}>
              <h2>Bottom-only SafeAreaView</h2>
              <p>Only bottom inset applied: {insets.bottom}px</p>
            </div>
          </SafeAreaView>
        );
      case "horizontal":
        return (
          <SafeAreaView
            top={false}
            bottom={false}
            left={true}
            right={true}
            style={{ backgroundColor: "#e8f5e9", height: "100vh" }}
          >
            <div style={{ padding: "20px" }}>
              <h2>Horizontal SafeAreaView</h2>
              <p>Left inset: {insets.left}px</p>
              <p>Right inset: {insets.right}px</p>
            </div>
          </SafeAreaView>
        );
      case "custom":
        return (
          <SafeAreaView
            forceInset={{
              top: "always",
              bottom: 20,
              left: "never",
              right: "never",
            }}
            style={{ backgroundColor: "#e1bee7", height: "100vh" }}
          >
            <div style={{ padding: "20px" }}>
              <h2>Custom Insets SafeAreaView</h2>
              <p>Using forceInset prop:</p>
              <pre
                style={{
                  background: "#eee",
                  padding: "10px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {`{
  top: 'always',
  bottom: 20,
  left: 'never',
  right: 'never'
}`}
              </pre>
            </div>
          </SafeAreaView>
        );
      case "none":
        return (
          <SafeAreaView
            top={false}
            bottom={false}
            left={false}
            right={false}
            style={{ backgroundColor: "#ffebee", height: "100vh" }}
          >
            <div style={{ padding: "20px" }}>
              <h2>No Insets SafeAreaView</h2>
              <p>No safe area insets applied</p>
            </div>
          </SafeAreaView>
        );
      default:
        return null;
    }
  };

  return (
    <PageAndroidTransition>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        {renderDemo()}

        <SafeAreaView
          top={false}
          bottom={true}
          left={false}
          right={false}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderTop: "1px solid #ddd",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Button
              onPress={() => setActiveDemo("default")}
              style={{
                backgroundColor:
                  activeDemo === "default" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              Default
            </Button>
            <Button
              onPress={() => setActiveDemo("top-only")}
              style={{
                backgroundColor:
                  activeDemo === "top-only" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              Top Only
            </Button>
            <Button
              onPress={() => setActiveDemo("bottom-only")}
              style={{
                backgroundColor:
                  activeDemo === "bottom-only" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              Bottom Only
            </Button>
            <Button
              onPress={() => setActiveDemo("horizontal")}
              style={{
                backgroundColor:
                  activeDemo === "horizontal" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              Horizontal
            </Button>
            <Button
              onPress={() => setActiveDemo("custom")}
              style={{
                backgroundColor:
                  activeDemo === "custom" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              Custom
            </Button>
            <Button
              onPress={() => setActiveDemo("none")}
              style={{
                backgroundColor: activeDemo === "none" ? "#007bff" : "#6c757d",
                minWidth: "100px",
              }}
            >
              No Insets
            </Button>
          </div>
        </SafeAreaView>
      </div>
    </PageAndroidTransition>
  );
};

export default SafeAreaViewDemo;
