import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./index";

const PLACEHOLDER =
	"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='192' height='192'><rect width='100%25' height='100%25' fill='%23e5e7eb'/><circle cx='96' cy='96' r='40' fill='%23cbd5e1'/></svg>";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	decorators: [
		(Story) => (
			<div
				style={{
					width: 640,
					padding: "16px 24px",
					backgroundColor: "#f4f8fb",
				}}
			>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		image: { src: PLACEHOLDER, alt: "" },
		title: "サンプルタイトル",
		meta: "1日前",
	},
};

export const LongTitle: Story = {
	args: {
		image: { src: PLACEHOLDER, alt: "" },
		title:
			"とても長いタイトルが入った場合に2行目で末尾が省略されることを確認するための見本テキスト",
		meta: "3日前",
	},
};

export const NoImage: Story = {
	args: {
		title: "画像なしのケース",
		meta: "5日前",
	},
};
