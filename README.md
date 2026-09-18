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
cef/
  cajs/
    cajs.js               canonical CEF-side script
    patch_js_objects.js   canonical JS object patching helpers
.github/
  workflows/
    sync-cajs.yml         detects cajs changes and dispatches them downstream
    receive-sync-cajs.yml handles inbound sync dispatches
README.md
```

## Related repositories

| Repo | Role | Link |
| --- | --- | --- |
| `test-pm` | puppet-master (this repo) | https://github.com/dmitriy-confiant/test-pm |
| `test-wc` | workerclient | https://github.com/dmitriy-confiant/test-wc |

The worker client repository,
[dmitriy-confiant/test-wc](https://github.com/dmitriy-confiant/test-wc),
consumes the `cajs` scripts owned here. This repo's `cef/cajs/` directory is the
source of truth; `test-wc` receives copies under `cef_client/cajs/`.

## Sync flow

`.github/workflows/sync-cajs.yml` watches `cef/cajs/cajs.js` and
`cef/cajs/patch_js_objects.js`. On a push to `main` — or on a pull request that
touches those paths — it collects the changed files and dispatches them to
[test-wc](https://github.com/dmitriy-confiant/test-wc), where they land as an
automated pull request rather than a direct commit.

Because of that, the rule of thumb is:

- Edit `cajs.js` / `patch_js_objects.js` **here**, in `cef/cajs/`.
- Do not hand-edit the mirrored copies in `test-wc`; they will be overwritten by
  the next sync.

## Working on this repo

There is no build, no dependency manifest, and no test suite. Clone it, edit the
files, open a pull request.
