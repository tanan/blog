import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/components/**/*.stories.@(ts|tsx)"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	async viteFinal(config) {
		config.plugins = (config.plugins ?? []).filter((plugin) => {
			if (!plugin || typeof plugin !== "object" || Array.isArray(plugin)) {
				return true;
			}
			const name = (plugin as { name?: string }).name ?? "";
			return !name.startsWith("tanstack");
		});
		return config;
	},
};

export default config;
