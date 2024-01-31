import Tooltip from "../components/Tooltip.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
};

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: "<Tooltip v-bind='args' />",
  }),
  args: {
    message: "test"
  }
};

export default meta;
