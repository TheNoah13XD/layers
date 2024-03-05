/// <reference types="nativewind/types" />

declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPO_PUBLIC_FIREBASE_API_KEY: string;
            EXPO_PUBLIC_IOS_CLIENT_ID: string;
            EXPO_PUBLIC_ANDROID_CLIENT_ID: string;
            EXPO_PUBLIC_WEB_CLIENT_ID: string;
        }
    }
}
