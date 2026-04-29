import type { Props } from "./type";

export function Title({ text }: Props) {
	return (
		<h2
			style={{
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}}
		>
			{text}
		</h2>
	);
}
