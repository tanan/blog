import { createFileRoute, Link } from "@tanstack/react-router";
import parse from "html-react-parser";
import { useEffect, useMemo, useState } from "react";
import { fetchBlog } from "../../server/microcms";
import { formatRelativeFromNow } from "../../utils/date";

export const Route = createFileRoute("/article/$id")({
	component: ArticleDetail,
	loader: ({ params }) => fetchBlog({ data: { id: params.id } }),
});

type TocItem = { level: 1 | 2 | 3; id: string; text: string };

function extractToc(html: string): TocItem[] {
	const result: TocItem[] = [];
	const re = /<h([123])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
	let match: RegExpExecArray | null = re.exec(html);
	while (match !== null) {
		const raw = match[1];
		const level: 1 | 2 | 3 = raw === "1" ? 1 : raw === "2" ? 2 : 3;
		const id = match[2];
		const text = match[3].replace(/<[^>]+>/g, "").trim();
		if (text) result.push({ level, id, text });
		match = re.exec(html);
	}
	return result;
}

function useActiveHeading(ids: readonly string[]): string | null {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (elements.length === 0) return;

		const visible = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target.id);
					else visible.delete(entry.target.id);
				}
				const first = ids.find((id) => visible.has(id));
				setActiveId(first ?? null);
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0 },
		);

		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	}, [ids]);

	return activeId;
}

function buildEyecatchUrl(url: string | undefined) {
	if (!url) return undefined;
	return `${url}?w=240&h=240&fit=crop&fm=webp`;
}

function ArticleDetail() {
	const blog = Route.useLoaderData();
	const toc = useMemo(() => extractToc(blog.content), [blog.content]);
	const ids = useMemo(() => toc.map((t) => t.id), [toc]);
	const activeId = useActiveHeading(ids);
	const eyecatch = buildEyecatchUrl(blog.eyecatch?.url);

	return (
		<main className="article-page">
			<style>{ARTICLE_CSS}</style>
			<Link to="/" className="article-back">
				← Panda3 Blog
			</Link>
			<article>
				<header className="article-header">
					{eyecatch ? (
						<img
							src={eyecatch}
							alt=""
							width={96}
							height={96}
							className="article-eyecatch"
						/>
					) : null}
					<h1 className="article-title">{blog.title}</h1>
					<p className="article-meta">
						<time dateTime={blog.createdAt}>
							{formatRelativeFromNow(blog.createdAt)}
						</time>
						{blog.category ? (
							<>
								<span aria-hidden="true" style={{ margin: "0 8px" }}>
									·
								</span>
								<span>{blog.category.name}</span>
							</>
						) : null}
					</p>
				</header>

				<div className="article-body">
					<div className="article-content">{parse(blog.content)}</div>

					<aside className="toc-sidebar" aria-label="目次">
						{toc.length > 0 ? (
							<nav className="toc">
								<p className="toc-title">目次</p>
								<ol className="toc-list">
									{toc.map((item) => {
										const classes = ["toc-item"];
										if (item.level === 1) classes.push("toc-h1");
										if (item.level === 3) classes.push("toc-h3");
										if (activeId === item.id) classes.push("toc-active");
										return (
											<li key={item.id} className={classes.join(" ")}>
												<a href={`#${item.id}`}>{item.text}</a>
											</li>
										);
									})}
								</ol>
							</nav>
						) : null}
					</aside>
				</div>
			</article>
		</main>
	);
}

const ARTICLE_CSS = `
.article-page {
	max-width: 1080px;
	margin: 0 auto;
	padding: 32px 20px 96px;
}
.article-back {
	display: inline-block;
	margin-bottom: 24px;
	font-size: 13px;
	color: #6b7280;
	text-decoration: none;
}
.article-header {
	margin-bottom: 48px;
	text-align: center;
}
.article-eyecatch {
	width: 96px;
	height: 96px;
	border-radius: 18px;
	margin-bottom: 24px;
	object-fit: cover;
	background-color: #ffffff;
	box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.article-title {
	margin: 0;
	font-size: 30px;
	line-height: 1.45;
	font-weight: 800;
	color: #0f172a;
	letter-spacing: -0.01em;
}
.article-meta {
	margin-top: 20px;
	margin-bottom: 0;
	font-size: 13px;
	color: #6b7280;
}
.article-body {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 260px;
	gap: 56px;
	align-items: start;
}
.article-content {
	min-width: 0;
}
@media (max-width: 960px) {
	.article-body {
		grid-template-columns: 1fr;
		gap: 0;
	}
	.toc-sidebar {
		display: none;
	}
}

.toc-sidebar {
	position: sticky;
	top: 32px;
	max-height: calc(100vh - 64px);
	overflow-y: auto;
	padding: 4px 0 4px 4px;
}
.toc-item.toc-h1 {
	padding-left: 22px;
}
.toc-item.toc-h1 a {
	font-size: 14px;
	font-weight: 700;
	color: #0f172a;
}
.toc-title {
	font-size: 14px;
	font-weight: 700;
	color: #0f172a;
	margin: 0 0 18px;
}
.toc-list {
	list-style: none;
	margin: 0;
	padding: 0;
	position: relative;
}
.toc-list::before {
	content: "";
	position: absolute;
	left: 5px;
	top: 8px;
	bottom: 8px;
	width: 2px;
	background: #e2e8f0;
	border-radius: 2px;
}
.toc-item {
	position: relative;
	padding: 6px 0 6px 22px;
}
.toc-item::before {
	content: "";
	position: absolute;
	left: 1px;
	top: 13px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #cbd5e1;
	box-shadow: 0 0 0 3px #f4f8fb;
	transition: background-color 140ms, box-shadow 140ms;
}
.toc-item.toc-h3 {
	padding-left: 38px;
}
.toc-item.toc-h3::before {
	width: 6px;
	height: 6px;
	left: 19px;
	top: 15px;
	background: #e2e8f0;
}
.toc-item.toc-active::before {
	background: #2563eb;
	box-shadow: 0 0 0 3px #f4f8fb, 0 0 0 5px rgba(37, 99, 235, 0.15);
}
.toc-item a {
	display: block;
	color: #64748b;
	text-decoration: none;
	font-size: 13px;
	line-height: 1.55;
	transition: color 140ms;
}
.toc-item.toc-active a {
	color: #0f172a;
	font-weight: 700;
}
.toc-item a:hover {
	color: #2563eb;
}

.article-content {
	font-size: 16px;
	line-height: 1.9;
	color: #1f2937;
	word-break: break-word;
}
.article-content p {
	margin: 1em 0;
}
.article-content h1 {
	font-size: 26px;
	font-weight: 800;
	color: #0f172a;
	margin: 2.8em 0 1em;
	padding-bottom: 0.5em;
	border-bottom: 2px solid #e5e7eb;
	scroll-margin-top: 24px;
	letter-spacing: -0.01em;
}
.article-content h2 {
	font-size: 22px;
	font-weight: 700;
	color: #0f172a;
	margin: 2.6em 0 1em;
	padding-bottom: 0.5em;
	border-bottom: 2px solid #e5e7eb;
	scroll-margin-top: 24px;
}
.article-content h3 {
	font-size: 18px;
	font-weight: 700;
	color: #0f172a;
	margin: 2.2em 0 0.8em;
	scroll-margin-top: 24px;
}
.article-content a {
	color: #2563eb;
	text-decoration: underline;
	text-underline-offset: 3px;
	word-break: break-all;
}
.article-content a:hover {
	text-decoration-thickness: 2px;
}
.article-content code {
	font-family: ui-monospace, SFMono-Regular, Menlo, "Liberation Mono", monospace;
	font-size: 0.88em;
	background: rgba(15, 23, 42, 0.06);
	padding: 2px 6px;
	border-radius: 4px;
}
.article-content pre {
	background: #0f172a;
	color: #e2e8f0;
	padding: 18px 22px;
	border-radius: 12px;
	overflow-x: auto;
	margin: 1.6em 0;
	font-size: 13px;
	line-height: 1.7;
}
.article-content pre code {
	background: none;
	padding: 0;
	color: inherit;
	font-size: inherit;
}
.article-content ul,
.article-content ol {
	padding-left: 1.6em;
	margin: 1em 0;
}
.article-content li {
	margin: 0.4em 0;
}
.article-content blockquote {
	margin: 1.4em 0;
	padding: 8px 18px;
	border-left: 4px solid #cbd5e1;
	color: #475569;
	background: rgba(148, 163, 184, 0.08);
	border-radius: 0 8px 8px 0;
}
.article-content img {
	max-width: 100%;
	height: auto;
	border-radius: 8px;
}
.article-content hr {
	border: none;
	border-top: 1px solid #e5e7eb;
	margin: 2.4em 0;
}
.article-content table {
	border-collapse: collapse;
	width: 100%;
	margin: 1.4em 0;
	font-size: 14px;
}
.article-content th,
.article-content td {
	border: 1px solid #e5e7eb;
	padding: 8px 12px;
	text-align: left;
}
.article-content th {
	background: #f8fafc;
	font-weight: 700;
}
`;
