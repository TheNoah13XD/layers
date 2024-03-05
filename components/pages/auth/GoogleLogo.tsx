import Svg, { SvgProps, Path } from "react-native-svg";

export const GoogelLogo = (props: SvgProps) => (
	<Svg
		width={23}
		height={24}
		fill="none"
		{...props}
	>
		<Path
			fill="#4285F4"
			fillRule="evenodd"
			d="M22.54 12.261c0-.815-.073-1.6-.21-2.352H11.5v4.448h6.19a5.29 5.29 0 0 1-2.296 3.471v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453Z"
			clipRule="evenodd"
		/>
		<Path
			fill="#34A853"
			fillRule="evenodd"
			d="M11.5 23.5c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H1.223v2.98A11.496 11.496 0 0 0 11.5 23.5Z"
			clipRule="evenodd"
		/>
		<Path
			fill="#FBBC05"
			fillRule="evenodd"
			d="M5.065 14.185A6.913 6.913 0 0 1 4.705 12c0-.758.13-1.495.36-2.185v-2.98H1.223A11.496 11.496 0 0 0 0 12c0 1.856.444 3.612 1.223 5.165l3.842-2.98Z"
			clipRule="evenodd"
		/>
		<Path
			fill="#EA4335"
			fillRule="evenodd"
			d="M11.5 5.074c1.688 0 3.204.58 4.396 1.72l3.298-3.299C17.203 1.64 14.6.5 11.5.5A11.496 11.496 0 0 0 1.223 6.835l3.842 2.98c.904-2.718 3.44-4.741 6.435-4.741Z"
			clipRule="evenodd"
		/>
	</Svg>
);
