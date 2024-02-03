# .layers

.layers is an app to help people overcome addiction, depression, suicidal thoughts and to improve mental health in general. Experience AI powered therapy for the first time.

## Installation

This project uses [Expo SDK 50](https://docs.expo.dev/) with Typescript, [NativeWind](https://www.nativewind.dev/) with the principles of [Material Design 3](https://material.io/), [Firebase](https://firebase.google.com/) for authentication and database. Make sure you have installed the current version of [NodeJS](https://nodejs.org/en/), [Android Studio](https://developer.android.com/studio) with a Pixel 7 Pro virtual device (instead of Android Studio, You can also use Expo Go app on your phone).

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

 - Run: (for android)

```bash
npm run android
```

- Run: (for ios)

```bash
npm run ios
```

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
