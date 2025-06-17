import SafeAreaView from "@/components/seft-area-view/seft-area-view";
import View from "@/components/View/View";
import FacebookItem from "@/components/facebook-item/facebook-item";
interface NewsFeedsProps {
  user: {
    name: string;
    avatar: string;
    timestamp: string;
  };
  content: {
    text?: string;
    images?: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export default function NewsFeeds() {
  const demoData = new Array(10).fill(0).map((_, index) => ({
    user: {
      name: `User ${index + 1}`,
      avatar: `https://via.placeholder.com/150?text=User+${index + 1}`,
      timestamp: `2021-01-01`,
    },
    content: {
      text: `This is the content of the news feed ${index + 1}`,
      images: [
        `https://via.placeholder.com/150?text=News+Feed+${index + 1}`,
        `https://via.placeholder.com/150?text=News+Feed+${index + 1}`,
      ],
    },
    stats: {
      likes: index + 1,
      comments: index + 1,
      shares: index + 1,
    },
    liked: index % 2 === 0,
    onLike: () => {},
    onComment: () => {},
    onShare: () => {},
    id: index,
  }));

  return (
    <SafeAreaView className="flex-1 overflow-y-auto">
      {demoData.map((item) => (
        <View key={item.id} padding={16}>
          <FacebookItem {...item} />
        </View>
      ))}
    </SafeAreaView>
  );
}
