# .layers

Layers is an app to help people overcome addiction, depression, suicidal thoughts and to improve mental health in general. Experience AI powered therapy for the first time.

### Why?

We, Students, have experienced this problem a lot. When we looked for a solution, we couldn't find any. So we decided to create one. We, students, have to manage personal life, academic life, work life and social life at the same time. Since we are new to this, at the end, we end up with either depression, addiction or suicidal thoughts. We dont want others to go through the same thing as we did, not just students, but everyone. The suicide rate is increasing day by day, and it is hard for us to look at the people who are close to us do this to themselves.

### What?

Layers is an app that helps people overcome addiction, depression, suicidal thoughts and to improve mental health in general. People who are going through this phenomenon can register as a seeker, people who have gone through the same thing and don't want others to go through the same thing can register as a helper. It is a platform where people can share their thoughts, experiences and get help from others. With plenty of features like, a personal helper who is available as a friend and as a therapist, personalized AI powered therapy, a community where people can share their thoughts, experiences & be an inspiration for others, a journal to write down their thoughts, a mood tracker to track their mood, Emergency SOS, and a lot more to keep you motivated and to help you overcome your problems.

### Who?

Our concept is that anyone can be helper by anyone at anytime, anywhere. We believe that everyone has gone through this phenomenon at least once in their life. So, we want everyone to be a part of this community. We want everyone to be a helper. We want everyone to be a friend.

### How?

This project uses [Expo SDK 50](https://docs.expo.dev/) built on top of [React Native](https://reactnative.dev/) with [Typescript](https://www.typescriptlang.org/). We designed it with the principles of [Material Design 3](https://material.io/). We use [NativeWind](https://www.nativewind.dev/) built on top of [TailwindCSS](https://tailwindcss.com/). We use [Firebase](https://firebase.google.com/) for authentication. We use [Firestore](https://cloud.google.com/firestore?hl=en) and [BigQuery](https://cloud.google.com/bigquery?hl=en) for database and data analytics. We use [Cloud Messaging](https://cloud.google.com/messages?hl=en) for sending notifications. We use [Vertex AI Search and Conversation](https://cloud.google.com/vertex-ai-search-and-conversation?hl=en) along with [Dialogflow](https://cloud.google.com/dialogflow?hl=en) for AI powered therapy. We use [Cloud Storage](https://cloud.google.com/storage?hl=en) for storing datasets and [Google Cloud](https://cloud.google.com/?hl=en) for multiple other services.

## Links

[Design](https://www.figma.com/file/FYlq8ZTtoLgkxarQsX2kPo/.layers_prototype?type=design&node-id=3%3A3&mode=design&t=fnCC89uoS0y6fzt2-1) | [Prototype](https://www.figma.com/proto/FYlq8ZTtoLgkxarQsX2kPo/.layers_prototype?page-id=3%3A3&type=design&node-id=88-11505&viewport=-5474%2C-249%2C0.6&t=xN6tjdsUBuTZSruA-1&scaling=scale-down&starting-point-node-id=88%3A11505&show-proto-sidebar=1&mode=design) | [User Flow](https://www.figma.com/file/2C6qP2njKkj1PWEglLLVYz/.layers_userflow?type=whiteboard&node-id=0%3A1&t=q9W1rmD4DuY2YGsK-1)

## App

Download the expo go app and scan the QR code to see the app in action.

<div style="display: flex" >
  <div>
    <p>android:</p>
    <img src="https://raw.githubusercontent.com/TheNoah13XD/layers/ce7ecfcc2552ec1c8ca23168d5f121fd968729dc/assets/images/qr/android.svg" width="300"/>
  </div>
  <div>
    <p>ios:</p>
    <img src="https://raw.githubusercontent.com/TheNoah13XD/layers/ce7ecfcc2552ec1c8ca23168d5f121fd968729dc/assets/images/qr/ios.svg" width="300"/>
  </div>
</div>

## Screenshots

<img src="https://github.com/TheNoah13XD/layers/blob/main/assets/images/screenshots/dashboard.png?raw=true" width="full"/>

## Installation

Make sure you have installed the current version of [NodeJS](https://nodejs.org/en/), [Android Studio](https://developer.android.com/studio) with a Pixel 7 Pro virtual device (instead of Android Studio, You can also use Expo Go app on your phone).

- First, clone the repo:

  ```bash
  git clone https://github.com/seconds-app/seconds.git
  ```

- Make sure you have the `.env.local` file in the root of the project with all the required credentials. You can copy the `.env` file, rename it to `env.local` that has all the required variables and fill in the values.

- Install dependencies:

  ```bash
  npm i
  ```

## Usage

 - Start the virtual device first or connect to expo go app on your phone.

- Run:

```bash
npm run start
```

 - Run: (for android)

```bash
npm run android
```

- Run: (for ios)

```bash
npm run ios
```

## Tools

- For styling, we use [NativeWind](https://www.nativewind.dev/), a utility-first CSS framework for React Native. If you want auto-completion for NativeWind classes, you can install the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). After the installation, Go to `Settings` > search for `Tailwind CSS Intellisense` > add `stylize` to the `classAttributes` array.

## Troubleshooting

If you encounter any issues in styling, you can run the following command:

```bash
npx expo start -c
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
