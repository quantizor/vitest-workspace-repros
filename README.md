# Vitest workspace repros

Two minimal pnpm workspaces, each with one linked package (`@repro/lib`) and one test that imports it.

## `optimizer-changed/`

A linked workspace package listed in `test.deps.optimizer.ssr` is invisible to `--changed`, `related` and watch mode. `PREBUNDLE=1` turns the optimizer on.

```sh
cd optimizer-changed
pnpm install
git init -b main && git add -A && git commit -m init
printf 'export const helper = () => 2;\n' > packages/lib/src/helper.ts
cd packages/app
PREBUNDLE=0 pnpm exec vitest run --changed   # selects uses-lib.test.ts, which fails
PREBUNDLE=1 pnpm exec vitest run --changed   # "No affected test files found", exit 0
PREBUNDLE=1 pnpm exec vitest related ../lib/src/helper.ts --run   # same
```

## `fscache-watch/`

With `fsModuleCache` on (the 5.x default), watch mode stops rerunning tests for an edit to a file outside `root` once the cache is warm.

```sh
cd fscache-watch
pnpm install
cd packages/app
pnpm exec vitest --watch   # edit packages/lib/src/helper.ts: RERUN (cold cache)
# quit, start again
pnpm exec vitest --watch   # edit it again: no rerun (warm cache)
pnpm exec vitest --watch --fsModuleCache=false   # edit it again: RERUN
```
