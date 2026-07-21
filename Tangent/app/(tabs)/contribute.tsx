import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logoTangentForREADME.png";
import { Colors } from "../../constants/theme";

const GITHUB_REPO = "https://github.com/DRmadebot/Projects/tree/main/Tangent";
const GITHUB_ISSUES = "https://github.com/DRmadebot/Projects/issues";
const FEEDBACK_EMAIL = "mailto:tangentAppFeedback@proton.me?subject=Tangent%20feedback";

type LinkRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const LinkRow = ({ icon, title, subtitle, onPress }: LinkRowProps) => (
  <Pressable style={styles.row} onPress={onPress}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={20} color={Colors.light.accent} />
    </View>
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} />
  </Pressable>
);

export default function ContributeScreen() {
  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Could not open link:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.heading}>Help shape Tangent</Text>
        <Text style={styles.subheading}>
          Tangent is free and open source. Found a bug, or have an idea? It goes a long way.
        </Text>
      </View>

      <LinkRow
        icon="bug-outline"
        title="Report a bug or suggest a feature"
        subtitle="Share feedback or ideas on GitHub"
        onPress={() => openLink(GITHUB_ISSUES)}
      />
      <LinkRow
        icon="logo-github"
        title="View the source code"
        subtitle="Browse or contribute on GitHub"
        onPress={() => openLink(GITHUB_REPO)}
      />
      <LinkRow
        icon="mail-outline"
        title="Send feedback directly"
        subtitle="Prefer email? Reach out here"
        onPress={() => openLink(FEEDBACK_EMAIL)}
      />

      <Text style={styles.footer}>Tangent is MIT licensed — free to use, modify, and share.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 20, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 28, marginTop: 12 },
  logo: { width: 72, height: 72, marginBottom: 14 },
  heading: {
    fontFamily: "Fraunces_600SemiBold",
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: 6,
    textAlign: "center",
  },
  subheading: {
    fontFamily: "Karla_400Regular",
    fontSize: 14,
    color: Colors.light.textMuted,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowText: { flex: 1 },
  rowTitle: {
    fontFamily: "Karla_700Bold",
    fontSize: 15,
    color: Colors.light.text,
  },
  rowSubtitle: {
    fontFamily: "Karla_400Regular",
    fontSize: 12,
    color: Colors.light.textMuted,
    marginTop: 2,
  },
  footer: {
    fontFamily: "Karla_400Regular",
    fontSize: 12,
    color: Colors.light.textMuted,
    textAlign: "center",
    marginTop: 20,
  },
});