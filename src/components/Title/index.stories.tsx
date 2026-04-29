import type { Meta, StoryObj } from "@storybook/react-vite";
import { Title } from "./index";

const meta: Meta<typeof Title> = {
	title: "Components/Title",
	component: Title,
	decorators: [
		(Story) => (
			<div style={{ width: 320, border: "1px dashed #ccc", padding: 8 }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
	args: {
		text: "Title",
	},
};

export const Truncated: Story = {
	args: {
		text: "とても長いタイトルテキストが入っても、1行に収めて末尾を省略します",
	},
};
