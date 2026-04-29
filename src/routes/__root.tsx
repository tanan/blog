import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Panda3 Blog" },
		],
	}),
	shellComponent: RootDocument,
});

const bodyStyle = {
	margin: 0,
	minHeight: "100vh",
	backgroundColor: "#f4f8fb",
	color: "#1f2937",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif',
	WebkitFontSmoothing: "antialiased" as const,
	MozOsxFontSmoothing: "grayscale" as const,
};

function RootDocument() {
	return (
		<html lang="ja">
			<head>
				<HeadContent />
			</head>
			<body style={bodyStyle}>
				<Outlet />
				<Scripts />
			</body>
		</html>
	);
}
