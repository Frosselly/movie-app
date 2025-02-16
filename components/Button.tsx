import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, RelativePathString, useNavigation } from "expo-router";

type Props = {
  label: string;
  theme?: "primary";
  href: RelativePathString;
  icon?: string;
};

export default function Button({ label, theme, href, icon }: Props) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer]}
      >
        <Link
          href={href as RelativePathString}
          style={[styles.button, { backgroundColor: "#fff" }]}
          asChild
        >
          <Pressable>
            {icon && (
              <FontAwesome
                name={icon as any}
                size={18}
                color="#fff"
                style={styles.buttonIcon}
              />
            )}
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
              {label}
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Link
        href={(href as RelativePathString) ?? "/"}
        style={styles.button}
        asChild
      >
        <Pressable>
          {icon && (
            <FontAwesome
              name={icon as any}
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          )}
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 60,
    
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#fff",
    borderWidth: 2,
    
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
