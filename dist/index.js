"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  log: () => log
});
module.exports = __toCommonJS(index_exports);
var log = class {
  level = /* @__PURE__ */ new Map([]);
  Info(msg) {
    process.stdout.write(`${date()} \x1B[33m[INFO]\x1B[0m ${msg}
`);
  }
  Alert(msg) {
    process.stdout.write(`${date()} \x1B[33m[WARN]\x1B[0m ${msg}
`);
  }
  Error(msg) {
    process.stdout.write(`${date()} \x1B[31m[ERROR]\x1B[0m ${msg}
`);
  }
};
function date() {
  const d = /* @__PURE__ */ new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");
  return `[${day}/${month}/${year} ${hour}:${min}:${sec}]`;
  ;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  log
});
