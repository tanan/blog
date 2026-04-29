import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "../components/Card";
import { fetchBlogs } from "../server/microcms";
import { formatRelativeFromNow } from "../utils/date";

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => fetchBlogs(),
});

function buildThumbnailUrl(url: string | undefined) {
	if (!url) return undefined;
	return `${url}?w=192&h=192&fit=crop&fm=webp`;
}

function Home() {
	const data = Route.useLoaderData();
	return (
		<main
			style={{
				maxWidth: 720,
				margin: "0 auto",
				padding: "40px 20px 80px",
			}}
		>
			<h1
				style={{
					margin: "0 0 24px",
					fontSize: 28,
					fontWeight: 800,
					letterSpacing: "-0.01em",
					color: "#0f172a",
				}}
			>
				Panda3 Blog
			</h1>
			<ul
				style={{
					listStyle: "none",
					padding: 0,
					margin: 0,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{data.contents.map((blog) => {
					const src = buildThumbnailUrl(blog.eyecatch?.url);
					return (
						<li
							key={blog.id}
							style={{ borderTop: "1px solid rgba(15, 23, 42, 0.06)" }}
						>
							<Link
								to="/article/$id"
								params={{ id: blog.id }}
								style={{
									display: "block",
									color: "inherit",
									textDecoration: "none",
								}}
							>
								<Card
									image={src ? { src, alt: "" } : undefined}
									title={blog.title}
									meta={
										<time dateTime={blog.createdAt}>
											{formatRelativeFromNow(blog.createdAt)}
										</time>
									}
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
