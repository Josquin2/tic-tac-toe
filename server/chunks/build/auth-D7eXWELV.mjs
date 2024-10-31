import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    useRouter();
    const error = ref("");
    const button = ref("Register");
    watch(error, () => {
      setTimeout(() => {
        var _a, _b;
        (_b = (_a = (void 0).getElementById("error-message")) == null ? void 0 : _a.classList) == null ? void 0 : _b.remove("auth__error__message");
        setTimeout(() => {
          error.value = "";
        }, 300);
      }, 1500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "auth-block" }, _attrs))}><div class="auth__header"><h2>Tic Tac Toe</h2><p id="error-message">${ssrInterpolate(unref(error))}</p></div><input type="text" placeholder="Username"${ssrRenderAttr("value", unref(username))}><div class="password-block"><input type="password" placeholder="Password"${ssrRenderAttr("value", unref(password))}><input type="password" class="second__password" placeholder="Confirm Password" id="second-password"${ssrRenderAttr("value", unref(confirmPassword))}></div><div class="buttons"><button>${ssrInterpolate(unref(button))}</button><a>${ssrInterpolate(unref(button) !== "Login" ? "I have an account" : "Create account")}</a></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-D7eXWELV.mjs.map
