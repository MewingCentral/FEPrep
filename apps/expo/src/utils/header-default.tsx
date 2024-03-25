import Colors from "./colors";

export default function headerDefault(
  colorScheme: "dark" | "light" | undefined,
) {
  return {
    headerStyle: {
      backgroundColor:
        colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
    },
    contentStyle: {
      backgroundColor: colorScheme == "dark" ? Colors.dark_bg : Colors.light_bg,
    },
    headerTintColor:
      colorScheme == "dark"
        ? Colors.dark_primary_text
        : Colors.light_primary_text,
  };
}
