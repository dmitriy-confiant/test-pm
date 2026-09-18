# CLAUDE.md

Guidance for AI agents working in this repository.

## Purpose

`test-pm` is a dummy **puppet-master** repository — a sandbox for cross-repo
automation experiments. It is the counterpart to the **workerclient** repo,
[dmitriy-confiant/test-wc](https://github.com/dmitriy-confiant/test-wc).

Nothing here is production code. The files exist to give automation — sync
workflows, agents, CI experiments — a realistic shape to act on. By convention
this repo owns the canonical `cajs` scripts; `test-wc` holds mirrored copies
under `cef_client/cajs/`.

## Structure

```
cef/
  cajs/
    cajs.js               canonical CEF-side script
    patch_js_objects.js   canonical JS object patching helpers
.github/
  workflows/
    sync-cajs.yml         dispatches cajs changes downstream to test-wc
    receive-sync-cajs.yml inbound sync receiver
README.md
```

There is no application code, dependency manifest, build, or test suite in this
repo today.

## Working conventions

- **Read `README.md` first.** It is the source of truth for repo layout and for
  the current state of the sync pipeline. Do not restate its details here or in
  new files — point at it, so the two cannot drift apart.
- **Verify before you describe.** Claims about the sync workflows have been
  wrong before and needed a follow-up correction. Read the workflow YAML and
  confirm what it actually does before writing anything that asserts behaviour.
  Both sync workflows are currently non-functional; `README.md` explains why.
  Treat that as the known state, not as a bug to opportunistically fix.
- **Edit `cajs` scripts here, not in `test-wc`.** This repo holds the canonical
  copies. Since no sync pipeline currently works end to end, a change here does
  *not* automatically reach `test-wc` — mirroring is manual.
- **Cross-repo changes:** if a change needs matching edits in `test-wc`, open a
  separate PR there and cross-link the two.
- **Verification:** with no build or tests, "verify" means re-reading the diff
  and confirming edited files still parse/behave as intended. Say so plainly
  rather than implying a test run happened.
- **Branch and PR.** Never commit to `main` directly; open a pull request.

## Related repositories

| Repo | Role | Link |
| --- | --- | --- |
| `test-pm` | puppet-master (this repo) | https://github.com/dmitriy-confiant/test-pm |
| `test-wc` | workerclient | https://github.com/dmitriy-confiant/test-wc |
