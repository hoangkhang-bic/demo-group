import View from "@/components/View/View";

export default function RightComponent() {
  const data = [1, 2, 3];
  return (
    <View
      flex={1}
      flexWrap="wrap"
      width={`100%`}
      overflow="auto"
      fullHeight
      gap={10}
    >
      {data.map((item) => (
        <View key={item} padding={10}>
          <View
            borderRadius={10}
            padding={10}
            height={`200px`}
            width={"100%"}
            backgroundColor="var(--color-primary)"
          >
            <p>Content data {item}</p>
          </View>
        </View>
      ))}
    </View>
  );
}
