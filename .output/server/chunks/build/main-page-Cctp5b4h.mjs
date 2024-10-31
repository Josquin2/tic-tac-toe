import { defineComponent, createElementBlock, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useRouter } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'events';
import 'https';
import 'http';
import 'net';
import 'tls';
import 'crypto';
import 'stream';
import 'url';
import 'zlib';
import 'buffer';
import 'node:fs';
import 'node:path';
import 'engine.io';
import 'socket.io';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const __nuxt_component_0 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});

const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M9.39999 8.616C9.76287 8.74373 10.1491 8.79144 10.5321 8.75585C10.9152 8.72025 11.286 8.6022 11.6191 8.4098C11.9522 8.2174 12.2398 7.9552 12.462 7.64119C12.6843 7.32719 12.836 6.96881 12.9067 6.59067L13.3333 4.29733C15.0877 3.89767 16.9096 3.89767 18.664 4.29733L19.0933 6.59067C19.164 6.96881 19.3157 7.32719 19.5379 7.64119C19.7602 7.9552 20.0477 8.2174 20.3809 8.4098C20.714 8.6022 21.0848 8.72025 21.4679 8.75585C21.8509 8.79144 22.2371 8.74373 22.6 8.616L24.7987 7.84267C26.0225 9.16103 26.9344 10.7377 27.4667 12.456L25.6933 13.976C25.4013 14.2263 25.1668 14.5369 25.0061 14.8864C24.8453 15.2359 24.7621 15.616 24.7621 16.0007C24.7621 16.3853 24.8453 16.7655 25.0061 17.1149C25.1668 17.4644 25.4013 17.775 25.6933 18.0253L27.4667 19.544C26.9344 21.2623 26.0225 22.839 24.7987 24.1573L22.5987 23.384C22.2358 23.2563 21.8496 23.2086 21.4665 23.2442C21.0835 23.2797 20.7127 23.3978 20.3795 23.5902C20.0464 23.7826 19.7589 24.0448 19.5366 24.3588C19.3144 24.6728 19.1627 25.0312 19.092 25.4093L18.6667 27.7027C16.9122 28.1023 15.0904 28.1023 13.336 27.7027L12.9067 25.4093C12.836 25.0312 12.6843 24.6728 12.462 24.3588C12.2398 24.0448 11.9522 23.7826 11.6191 23.5902C11.286 23.3978 10.9152 23.2797 10.5321 23.2442C10.1491 23.2086 9.76287 23.2563 9.39999 23.384L7.20133 24.1573C5.97745 22.839 5.06563 21.2623 4.53333 19.544L6.30666 18.024C6.59849 17.7737 6.83274 17.4632 6.99334 17.1138C7.15393 16.7645 7.23708 16.3845 7.23708 16C7.23708 15.6155 7.15393 15.2355 6.99334 14.8862C6.83274 14.5368 6.59849 14.2263 6.30666 13.976L4.53333 12.456C5.06524 10.7378 5.9766 9.16116 7.19999 7.84267L9.39999 8.616ZM16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20C14.9391 20 13.9217 19.5786 13.1716 18.8284C12.4214 18.0783 12 17.0609 12 16C12 14.9391 12.4214 13.9217 13.1716 13.1716C13.9217 12.4214 14.9391 12 16 12Z" stroke="#CFCFCF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Icons/Settings.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Settings = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MainPlayBlock",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "play-block left--block" }, _attrs))}><button class="play--button">Play Random</button><button class="play--button">Play Friend</button><button class="play--button settings--button">`);
      _push(ssrRenderComponent(Settings, null, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainPlayBlock.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "friends-block right--block" }, _attrs))}><div class="friends__header"><h4>Friends</h4></div><div class="friends__all"><div class="one__friend"><div class="friend__avatar"><img${ssrRenderAttr("src", "")} alt=""></div><div class="friend__info"><h5>Josquin</h5><span class="friend__status friend--online"></span></div></div><div class="one__friend"><div class="friend__avatar"><img${ssrRenderAttr("src", "")} alt=""></div><div class="friend__info"><h5>Testing-long-name</h5><span class="friend__status"></span></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainFriends.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MainUser = __nuxt_component_0;
  const _component_MainPlayBlock = _sfc_main$2;
  const _component_MainFriends = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-page-block" }, _attrs))}><div class="all-about-user-block"><div class="main-page-left">`);
  _push(ssrRenderComponent(_component_MainUser, null, null, _parent));
  _push(ssrRenderComponent(_component_MainPlayBlock, null, null, _parent));
  _push(`</div><div class="main-page-right">`);
  _push(ssrRenderComponent(_component_MainFriends, null, null, _parent));
  _push(`<div class="chat-block right--block"></div></div></div><div class="news-block"><div class="news-heading"></div><div class="all-news"></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/main-page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mainPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { mainPage as default };
//# sourceMappingURL=main-page-Cctp5b4h.mjs.map
