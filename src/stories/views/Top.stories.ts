import Top from "../../components/views/Top.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof Top>;

const meta: Meta<typeof Top> = {
  title: "Top",
  component: Top,
};

export const Default: Story = {
  render: () => ({
    components: { Top },
    template: "<Top />",
  }),
};

export default meta;
