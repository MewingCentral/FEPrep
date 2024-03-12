import Colors from "./colors";
import { useColorScheme } from "nativewind";

const { colorScheme } = useColorScheme();

const headerDefault = {
    headerStyle: {
        backgroundColor:
            colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
    },
    contentStyle: {
        backgroundColor: colorScheme == "dark" ? "#020817" : "#F8FAFC",
    },
        headerTintColor:
        colorScheme == "dark"
            ? Colors.dark_primary_text
            : Colors.light_primary_text,
};

export default headerDefault;


// export default function headerDefault(colorScheme) {
//     return ({
//         headerStyle: {
//             backgroundColor:
//               colorScheme == "dark" ? Colors.dark_sec : Colors.light_sec,
//           },
//           contentStyle: {
//             backgroundColor: colorScheme == "dark" ? "#020817" : "#F8FAFC",
//           },
//           headerTintColor:
//             colorScheme == "dark"
//               ? Colors.dark_primary_text
//               : Colors.light_primary_text,
//     });
// }
