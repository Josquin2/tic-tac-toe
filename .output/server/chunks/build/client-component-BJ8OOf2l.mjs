import { defineComponent, ref, provide, createElementBlock, defineAsyncComponent, h } from 'vue';

const clientOnlySymbol = Symbol.for("nuxt:client-only");
const ClientOnly = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const createClientPage = /* @__NO_SIDE_EFFECTS__ */ (loader) => {
  const page = defineAsyncComponent(loader);
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () => h("div", [
        h(ClientOnly, void 0, {
          default: () => h(page, attrs)
        })
      ]);
    }
  });
};

export { createClientPage };
//# sourceMappingURL=client-component-BJ8OOf2l.mjs.map
