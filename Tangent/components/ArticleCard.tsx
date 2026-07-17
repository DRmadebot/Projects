import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import type { Article } from "../services/types/article";

type ArticleCardProps = {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
};

const ArticleCard = ({
  article,
  isBookmarked,
  onToggleBookmark,
}: ArticleCardProps) => {
  const words = article.summary.split(" ");

  // Text that appears beside the image
  const firstPart = words.slice(0, 24).join(" ");

  // Text that appears below the image
  const secondPart = words.slice(24).join(" ");

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{article.title}</Text>

      <View style={styles.topSection}>
        <Text style={styles.summaryTop}>{firstPart}</Text>

        {article.image && (
          <Image
            source={{ uri: article.image }}
            style={styles.thumbnail}
            contentFit="cover"
            transition={200}
          />
        )}
      </View>

      {secondPart && (
        <Text style={styles.summaryBottom}>{secondPart}</Text>
      )}

      <View style={styles.actions}>
        <Pressable onPress={() => onToggleBookmark(article)}>
          <MaterialIcons
            name={isBookmarked ? "bookmark" : "bookmark-border"}
            size={30}
            color={isBookmarked ? "#e9e50d" : "#22223b"}
          />
        </Pressable>

        <Pressable
          onPress={async () => {
            try {
              if (article.url) {
                await Linking.openURL(article.url);
              }
            } catch (error) {
              console.log("Could not open link:", error);
            }
          }}
        >
          <Text style={styles.button}>Read more</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    margin: 16,
    overflow: "hidden",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  summaryTop: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    maxHeight: 96,
    textAlign: "justify",
  },

  summaryBottom: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    textAlign: "justify",
  },

  thumbnail: {
    width: 130,
    height: 100,
    borderRadius: 8,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  bookmarkText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default memo(ArticleCard);