import { ColorValues } from "./data/colors";

export const getColorFromClass = (className: string): string | undefined => {
    return ColorValues[className];
}
