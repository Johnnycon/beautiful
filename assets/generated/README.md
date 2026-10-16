# Generated images (not deployed)

Spare AI-generated images from the home hero redesign (October 2026), kept for future use: About, Services, social posts, or a different reflection in the hero mirror. Nothing in this folder is used by the site, and it isn't deployed (only `public/` is served).

**These are AI-generated people, not clients.** Don't use them as portfolio pieces, in reviews, or anywhere that implies they're Lizbeth's real work. Real client photos live in `public/images/gallery`.

All images were made with ChatGPT image generation (via the Codex CLI) at 1086 × 1448 (3:4) and saved here as JPG. The two hero images in use are `public/images/hero/bride-at-vanity.jpg` and `public/images/hero/quinceanera-salon.jpg`.

## Bride

All the same woman: midnight-blue satin robe, low chignon, pearl and crystal hairpiece, soft-glam makeup, dim navy room. The hero uses a pulled-back version of `looking-down`.

| File | Notes | Prompt |
|---|---|---|
| `bride/bride-robe-looking-down-close.jpg` | Eyes lowered, eyeshadow showing; tight head-and-shoulders crop | `prompts/bride-portraits.md` (B) |
| `bride/bride-robe-looking-down-wide.jpg` | Same, canvas extended so she's ~70% the size | `prompts/bride-pull-back.md` |
| `bride/bride-robe-eyes-to-camera.jpg` | Three-quarter view, eye contact | `prompts/bride-portraits.md` (A) |
| `bride/bride-robe-touching-earring.jpg` | Near profile, hand at a drop earring | `prompts/bride-portraits.md` (C) |
| `bride/bride-robe-half-smile.jpg` | Facing camera, soft half-smile | `prompts/bride-portraits.md` (D) |

## Quinceañera

Deep rouge ballgown with a high illusion neckline and a crystal tiara. All in the same dim navy room as the bride (the hero now uses a party-hall version instead, so the two reflections don't look alike).

| File | Notes | Prompt |
|---|---|---|
| `quinceanera/quince-light-complexion-navy-room.jpg` | Light complexion, light-brown hair, soft updo | `prompts/quince-light-complexion.md` |
| `quinceanera/quince-puerto-rican-american-navy-room.jpg` | Soft updo with loose curls | `prompts/quince-by-ethnicity.md` |
| `quinceanera/quince-mexican-american-navy-room.jpg` | Updo with loose curls | `prompts/quince-by-ethnicity.md` |
| `quinceanera/quince-guatemalan-american-navy-room.jpg` | Updo with loose curls | `prompts/quince-by-ethnicity.md` |
| `quinceanera/quince-fringe-black-curls-navy-room.jpg` | Curtain fringe, long black curls, lilac makeup, open smile | `prompts/quince-fringe.md` |

## Making more

The prompt files are exactly what was sent, including the file names used at the time (`hero-B.png` is the close bride, `hero-B-80.png` the one in the hero, `quince4-2.png` the Puerto Rican-American quinceañera). `framing-guides/` has the composition guides used as the only reference image, with the HTML they were drawn from, so new images can match the hero framing.

What we learned:

- Never pass a photo of one person as a reference for a different person: the face carries over.
- Use a neutral guide (outlines only). A guide with a skin-coloured face shape steers every result to that skin tone and head shape, and any furniture boxes in it (lamp, headboard) show up in every image.
- Keep the framing specific and the person's description vague. Detailed facial features pin every run to one face; the model also drifts to one "default face" per scene, so change the setting, hair or complexion to get visibly different people.
- Editing a realistic person's skin tone is blocked by the safety system; generate a new image instead.
