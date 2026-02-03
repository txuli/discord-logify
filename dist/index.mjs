// src/index.ts
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
export {
  log
};
