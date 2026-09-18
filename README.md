# test-pm

Dummy **puppet-master** repository, used as a sandbox for cross-repo automation
experiments.

## What this repo is

This is a throwaway stand-in for a puppet-master: the side that owns the
canonical `cajs` scripts and pushes them out to the worker clients that embed
CEF (Chromium Embedded Framework).

Nothing here is production code. The contents exist so that automation — sync
workflows, agents, CI experiments — has a realistic shape to act on.

## Layout

```
app/
  api/
    ping/route.js         GET /api/ping
    call-wc/route.js      GET /api/call-wc
cef/
  cajs/
    cajs.js               canonical CEF-side script
    patch_js_objects.js   canonical JS object patching helpers
.github/
  workflows/
    sync-cajs.yml         detects cajs changes and dispatches them downstream
    receive-sync-cajs.yml inbound sync receiver (not functional, see below)
package.json
README.md
```

## Next.js app

A minimal Next.js app lives in `app/`. It exposes two routes:

- `GET /api/ping` — returns `{"service":"test-pm","status":"ok"}`.
- `GET /api/call-wc` — fetches `/ping` on
  [test-wc](https://github.com/dmitriy-confiant/test-wc) and returns its JSON.
  The base URL comes from `WC_BASE_URL` and defaults to
  `http://localhost:8000`, so the request goes to
  `http://localhost:8000/ping`. Any trailing slash on `WC_BASE_URL` is
  stripped before `/ping` is appended. If test-wc is unreachable, or answers
  with something that isn't JSON, the route responds with `502` and an error
  payload.

Run it in development with:

```
npm install
npm run dev
```

The dev server listens on **port 3000** (`http://localhost:3000`).

## Related repositories

| Repo | Role | Link |
| --- | --- | --- |
| `test-pm` | puppet-master (this repo) | https://github.com/dmitriy-confiant/test-pm |
| `test-wc` | workerclient | https://github.com/dmitriy-confiant/test-wc |

The worker client repository,
[dmitriy-confiant/test-wc](https://github.com/dmitriy-confiant/test-wc),
holds copies of the `cajs` scripts under `cef_client/cajs/`. By convention this
repo's `cef/cajs/` directory holds the canonical copies, but that convention is
not enforced by any automation today — see below.

## Sync flow

There is currently **no working sync pipeline**. The intent is visible in the
workflows, but neither half is wired up end to end:

- `.github/workflows/sync-cajs.yml` watches `cef/cajs/cajs.js` and
  `cef/cajs/patch_js_objects.js`. On a push to `main` — or on a pull request
  that touches those paths — it collects the changed files and fires a
  `sync-from-puppet-master` repository dispatch at
  [test-wc](https://github.com/dmitriy-confiant/test-wc). No workflow in
  `test-wc` listens for that event, so the dispatch is a no-op and nothing is
  ever committed or proposed there.
- `.github/workflows/receive-sync-cajs.yml` listens for the opposite direction
  (`sync-from-workerclient`) and would write into *this* repo's `cef/cajs/`. It
  is also non-functional: its "Check for changes" step has a bash syntax error.

Until both halves are fixed, the mirrored copies in `test-wc` are maintained by
hand, and edits in either repo need to be applied to the other manually.

## Working on this repo

There is no test suite. The only build is the Next.js app described above
(`npm run build`). Clone the repo, edit the files, open a pull request.
