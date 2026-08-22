# /hailee

Currently **switched off**. `index.html` serves a short "not here anymore"
notice styled like the rest of the site, and nothing else on the site links
to this path.

## Files

- `index.html` — the "not here anymore" notice that is live now.
- `tulips.html.disabled` — the full tulip animation, intact and unchanged.
  The `.disabled` extension keeps browsers from rendering it, so the flowers
  are not reachable while the page is off.
- `ART-DIRECTION.md` — the Kurzgesagt-style methodology the animation follows.

## Turning it back on

```sh
git mv hailee/index.html hailee/off.html.disabled
git mv hailee/tulips.html.disabled hailee/index.html
```

Then commit and push. To switch it off again, swap the two names back.
