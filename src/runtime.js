const { core } = Deno;
const { ops } = core;

function argsToMessage(...args) {
  return args.map((arg) => JSON.stringify(arg)).join(" ");
}

const console = {
  log: (...args) => {
    core.print(`[out]: ${argsToMessage(...args)}\n`, false);
  },
  error: (...args) => {
    core.print(`[err]: ${argsToMessage(...args)}\n`, true);
  },
};

const runjs = {
  readFile: async (path) => {
    return await core.opAsync("op_read_file", path);
  },
  writeFile: async (path, contents) => {
    return await core.opAsync("op_write_file", path, contents);
  },
  removeFile: async (path) => {
    return await core.opAsync("op_remove_file", path);
  },
  fetch: async (url) => {
    return await core.opAsync("op_fetch", url);
  },
};

globalThis.setTimeout = (callback, delay) => {
  core.opAsync("op_set_timeout", delay).then(callback);
};

globalThis.console = console;
globalThis.runjs = runjs;
