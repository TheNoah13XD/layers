import { ColorValues } from "./colors";

export const getColorFromClass = (className: string): string | undefined => {
    return ColorValues[className];
}
