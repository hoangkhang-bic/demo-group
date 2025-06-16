import React, { useState } from "react";
import { Touchable } from "@/components/touchable/touchable";
import SafeAreaView from "@/components/seft-area-view/seft-area-view";

const TouchableExample: React.FC = () => {
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ height: "100vh" }}>
      <div style={{ padding: "20px" }}>
        <h1>Touchable Component Examples</h1>
        <p>Default padding is now set to 0</p>

        <div style={{ marginTop: "20px" }}>
          <h2>Default Touchable (No Padding)</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Touchable
              onPress={() => setPressed("default")}
              style={{
                backgroundColor: pressed === "default" ? "#28a745" : "#007bff",
                borderRadius: "4px",
                color: "white",
              }}
            >
              <div style={{ padding: "10px 16px" }}>
                Default Touchable (Child has padding)
              </div>
            </Touchable>

            <div style={{ display: "flex", gap: "10px" }}>
              <Touchable
                onPress={() => setPressed("icon1")}
                style={{
                  backgroundColor: pressed === "icon1" ? "#dc3545" : "#6c757d",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                +
              </Touchable>

              <Touchable
                onPress={() => setPressed("icon2")}
                style={{
                  backgroundColor: pressed === "icon2" ? "#dc3545" : "#6c757d",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                -
              </Touchable>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2>Touchable with Custom Padding</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Touchable
              onPress={() => setPressed("padding10")}
              padding="10px"
              style={{
                backgroundColor:
                  pressed === "padding10" ? "#28a745" : "#007bff",
                borderRadius: "4px",
                color: "white",
              }}
            >
              <div>Touchable with 10px padding</div>
            </Touchable>

            <Touchable
              onPress={() => setPressed("padding20")}
              padding="20px 10px"
              style={{
                backgroundColor:
                  pressed === "padding20" ? "#28a745" : "#007bff",
                borderRadius: "4px",
                color: "white",
              }}
            >
              <div>Touchable with 20px vertical, 10px horizontal padding</div>
            </Touchable>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2>Comparison</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div>
                <p>No padding (default):</p>
                <Touchable
                  onPress={() => setPressed("compare1")}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "1px dashed red",
                  }}
                >
                  <div style={{ padding: "10px" }}>Click me</div>
                </Touchable>
              </div>

              <div>
                <p>With padding=10px:</p>
                <Touchable
                  onPress={() => setPressed("compare2")}
                  padding="10px"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "1px dashed red",
                  }}
                >
                  <div>Click me</div>
                </Touchable>
              </div>
            </div>
          </div>
        </div>

        {pressed && (
          <div
            style={{
              marginTop: "30px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            Last pressed: {pressed}
          </div>
        )}
      </div>
    </SafeAreaView>
  );
};

export default TouchableExample;
