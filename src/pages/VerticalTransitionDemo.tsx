import React, { useState } from "react";
import PageVerticalTransition from "@/components/wrapper-transistion/page.transittio.vertical";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import { Button } from "@/components/button/button";
import { Touchable } from "@/components/touchable/touchable";

const VerticalTransitionDemo: React.FC = () => {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [disableTransition, setDisableTransition] = useState(false);
  const [duration, setDuration] = useState(300);
  const [showContent, setShowContent] = useState(true);

  const toggleDirection = () => {
    setDirection((prev) => (prev === "up" ? "down" : "up"));
  };

  const toggleTransition = () => {
    setDisableTransition((prev) => !prev);
  };

  const changeDuration = (newDuration: number) => {
    setDuration(newDuration);
  };

  const resetContent = () => {
    setShowContent(false);
    setTimeout(() => setShowContent(true), 50);
  };

  return (
    <SafeAreaView style={{ height: "100vh" }}>
      <div style={{ padding: "20px", height: "100%" }}>
        <h1>Vertical Transition Demo</h1>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <Button
              onPress={toggleDirection}
              variant={direction === "up" ? "primary" : "secondary"}
            >
              Direction: {direction}
            </Button>

            <Button
              onPress={toggleTransition}
              variant={disableTransition ? "primary" : "secondary"}
            >
              Transitions: {disableTransition ? "Disabled" : "Enabled"}
            </Button>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Button
              onPress={() => changeDuration(150)}
              variant={duration === 150 ? "primary" : "outline"}
              size="small"
            >
              Fast (150ms)
            </Button>

            <Button
              onPress={() => changeDuration(300)}
              variant={duration === 300 ? "primary" : "outline"}
              size="small"
            >
              Normal (300ms)
            </Button>

            <Button
              onPress={() => changeDuration(600)}
              variant={duration === 600 ? "primary" : "outline"}
              size="small"
            >
              Slow (600ms)
            </Button>
          </div>

          <Button onPress={resetContent}>Reset Animation</Button>
        </div>

        <div
          style={{
            height: "calc(100% - 200px)",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {showContent && (
            <PageVerticalTransition
              direction={direction}
              duration={duration}
              disableTransition={disableTransition}
              onTransitionEnd={() => console.log("Transition ended")}
              style={{ height: "100%" }}
            >
              <div style={{ padding: "20px" }}>
                <h2>Content with {direction} transition</h2>
                <p>
                  This content slides in from the{" "}
                  {direction === "up" ? "bottom" : "top"}
                </p>

                <div style={{ marginTop: "20px" }}>
                  <p>Transition settings:</p>
                  <ul>
                    <li>
                      Direction: <strong>{direction}</strong>
                    </li>
                    <li>
                      Duration: <strong>{duration}ms</strong>
                    </li>
                    <li>
                      Transitions:{" "}
                      <strong>
                        {disableTransition ? "Disabled" : "Enabled"}
                      </strong>
                    </li>
                  </ul>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <h3>Scrollable Content</h3>
                  {Array(20)
                    .fill(0)
                    .map((_, i) => (
                      <p key={i}>Scroll content item #{i + 1}</p>
                    ))}
                </div>
              </div>
            </PageVerticalTransition>
          )}
        </div>
      </div>
    </SafeAreaView>
  );
};

export default VerticalTransitionDemo;
