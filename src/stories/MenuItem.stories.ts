import MenuItem from "../components/MenuItem.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof MenuItem>;

const meta: Meta<typeof MenuItem> = {
  title: "MenuItem",
  component: MenuItem,
};

export const Default: Story = {
  render: () => ({
    components: { MenuItem },
    template: "<MenuItem />",
  }),
};

export default meta;
