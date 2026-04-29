import type { ReactNode } from "react";

export type Props = {
	image?: { src: string; alt?: string };
	title: string;
	meta: ReactNode;
};
