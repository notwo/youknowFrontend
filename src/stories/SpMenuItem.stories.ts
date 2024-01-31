import SpMenuItem from "../components/SpMenuItem.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof SpMenuItem>;

const meta: Meta<typeof SpMenuItem> = {
  title: "SpMenuItem",
  component: SpMenuItem,
};

export const Default: Story = {
  render: () => ({
    components: { SpMenuItem },
    template: "<SpMenuItem />",
  }),
};

export default meta;
