import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/theme";
import type { Article } from "../services/types/article";

type ArticleCardProps = {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
};

const ArticleCard = ({ article, isBookmarked, onToggleBookmark }: ArticleCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!article.url) return;
    await Clipboard.setStringAsync(article.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={styles.mark}></Text>
        {article.title}
      </Text>

      <View style={styles.contentRow}>
        <Text style={styles.summary}>{article.summary}</Text>

        {article.image && (
          <Image
            source={{ uri: article.image }}
            style={styles.thumbnail}
            contentFit="cover"
            transition={200}
          />
        )}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => onToggleBookmark(article)}>
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={18}
            color={Colors.light.accent}
          />
          <Text style={[styles.actionText, { color: Colors.light.accent }]}>
            {isBookmarked ? "Saved" : "Save"}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShare}>
          <Ionicons
            name={copied ? "checkmark" : "link-outline"}
            size={18}
            color={Colors.light.accentMoss}
          />
          <Text style={[styles.actionText, { color: Colors.light.accentMoss }]}>
            {copied ? "Copied!" : "Share"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={async () => {
            try {
              if (article.url) await Linking.openURL(article.url);
            } catch (error) {
              console.log("Could not open link:", error);
            }
          }}
        >
          <Text style={styles.readMore}>Read more →</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 18,
    borderRadius: 16,
    margin: 16,
    shadowColor: "#B8712C",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  mark: {
    color: Colors.light.accent,
  },

  title: {
    fontFamily: "Fraunces_600SemiBold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 10,
    lineHeight: 28,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  summary: {
    flex: 1,
    fontFamily: "Karla_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textMuted,
  },

  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  actionText: {
    fontFamily: "Karla_600SemiBold",
    fontSize: 14,
  },

  readMore: {
    fontFamily: "Karla_700Bold",
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: "auto",
  },
});

export default memo(ArticleCard);