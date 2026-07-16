import { Image } from "expo-image";
import { memo } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import type { Article } from "../services/types/article";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps)=>{
    return (
        <View style={styles.card}>
            {article.image && (
            <Image
                source={{ uri: article.image }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            )}
             <Text style={styles.title}>{article.title}</Text>

            <Text style={styles.summary}>{article.summary}</Text>

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
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        margin: 16,
        overflow: "hidden",
    },  
    image: {
    width: "100%",
    height: 180,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },

    summary: {
        fontSize: 16,
        lineHeight: 24,
    },

    button: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    },
});

export default memo(ArticleCard);