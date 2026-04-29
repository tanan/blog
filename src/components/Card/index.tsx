import type { CSSProperties } from "react";
import type { Props } from "./type";

const SIZE = 88;

const root: CSSProperties = {
	display: "flex",
	gap: 20,
	alignItems: "flex-start",
	padding: "20px 0",
};

const thumb: CSSProperties = {
	width: SIZE,
	height: SIZE,
	flexShrink: 0,
	borderRadius: 14,
	objectFit: "cover",
	backgroundColor: "#ffffff",
	boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
};

const placeholder: CSSProperties = {
	...thumb,
	display: "block",
};

const body: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 8,
	minWidth: 0,
	paddingTop: 2,
};

const titleStyle: CSSProperties = {
	margin: 0,
	fontSize: 16,
	lineHeight: 1.55,
	fontWeight: 700,
	color: "#1f2937",
	letterSpacing: "0.01em",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,
	overflow: "hidden",
};

const metaStyle: CSSProperties = {
	margin: 0,
	fontSize: 13,
	lineHeight: 1.4,
	color: "#6b7280",
};

export function Card({ image, title, meta }: Props) {
	return (
		<article style={root}>
			{image ? (
				<img
					src={image.src}
					alt={image.alt ?? ""}
					loading="lazy"
					width={SIZE}
					height={SIZE}
					style={thumb}
				/>
			) : (
				<div style={placeholder} aria-hidden="true" />
			)}
			<div style={body}>
				<h2 style={titleStyle}>{title}</h2>
				<p style={metaStyle}>{meta}</p>
			</div>
		</article>
	);
}
