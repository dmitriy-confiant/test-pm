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

`README.md` carries the file tree under **Layout**, and describes what tooling
the repo has under **Working on this repo**. Read them there — they are not
duplicated here.

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

See the **Related repositories** section of `README.md`.
