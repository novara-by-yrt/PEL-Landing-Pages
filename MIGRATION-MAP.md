# Previous Site → New Site: Migration Map

Perfect Eyes Ltd — WordPress (`perfecteyesltd.com`) → Next.js.

_Generated 2026-08-01 by probing every URL in the previous site's sitemaps against the new site and comparing content paragraph-by-paragraph._

## How this was verified

1. **URL inventory** — pulled from the previous site's `page-sitemap.xml`, `post-sitemap.xml` and `before-after-sitemap.xml` (246 unique URLs, including the homepage).
2. **Reachability** — every URL requested against the new site; redirects followed to their final destination.
3. **Content comparison** — every `<p>`, `<li>` and `<h2>–<h4>` of 60+ characters extracted from both sites. Paragraphs appearing on more than 35% of pages were classed as site-wide boilerplate (nav, footer, cookie bar) and excluded, so the coverage figures reflect real page copy only.
4. **Page identity** — pages were matched by `<h1>`, not by filename. Filename similarity gave wrong answers (it paired *"are-hooded-eyes-attractive"* with the hooded-eyelids **condition** page, and *"how-long-does-tear-trough-filler-last"* with an article about styes).

## Summary

| | Count |
|---|---|
| URLs on previous site | **246** |
| Reachable on new site | **242** direct + **4** redirected |
| Broken (404) | **0** |
| — pages (incl. homepage) | 57 |
| — blog posts | 178 |
| — before & after | 11 |

### Content coverage (boilerplate excluded)

| Share of previous-site copy present | Pages |
|---|---|
| ≥ 95% | 145 |
| 80–95% | 19 |
| 40–80% | 44 |
| < 40% | 34 |

Scores below 100% are mostly **intentional**, not defects — see [Interpreting the coverage figures](#interpreting-the-coverage-figures).

---

## Treatments — URL structure changed

The migration originally produced flat slugs. These now use the previous site's nested paths, with the flat slug 301-ing to the nested one so each treatment has exactly one indexable URL.

Mappings were verified against the previous site's `page-sitemap.xml` and each page's `rel="canonical"`. Source of truth: [`content/treatment-paths.json`](content/treatment-paths.json).

| Previous site URL — now also the new site URL | Was (flat slug, now 301s) | Copy |
|---|---|---|
| `/non-surgical/chemical-peel-treatment-uk` | `/chemical-peel` | 76% |
| `/non-surgical/emface-treatment-uk` | `/emface` | 71% |
| `/non-surgical/endolift-for-malar-bags-uk` | `/endolift` | 78% |
| `/non-surgical/morpheus8-treatment-uk` | `/morpheus8` | 62% |
| `/non-surgical/polynucleotide-treatment-uk` | `/polynucleotides` | 72% |
| `/non-surgical/sofwave-treatment-uk` | `/sofwave` | 75% |
| `/non-surgical/tear-trough-fillers-uk` | `/non-surgical-tear-trough-fillers-uk` | 75% |
| `/non-surgical/ultraclear-laser-treatment-uk` | `/non-surgical-ultraclear-laser-treatment-uk` | 80% |
| `/surgical/browlift-treatment-uk` | `/surgical-brow-lift-uk` | 88% |
| `/surgical/eyelid-surgery/chalazion-removal-uk` | `/surgical-eyelid-surgery-chalazion-removal-uk` | 79% |
| `/surgical/eyelid-surgery/double-eyelids-asian-blepharoplasty-uk` | `/double-eyelid-surgery` | 64% |
| `/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk` | `/ptosis-surgery` | 76% |
| `/surgical/eyelid-surgery/eye-bag-removal-blepharoplasty-uk` | `/eye-bag-removal-blepharoplasty-uk` | 66% |
| `/surgical/eyelid-surgery/lump-on-eyelid-bumps-treatment-uk` | `/eyelid-lump-bump-removal` | 74% |
| `/surgical/eyelid-surgery/revision-blepharoplasty-uk` | `/surgical-eyelid-surgery-revision-blepharoplasty-uk` | 78% |
| `/surgical/eyelid-surgery/upper-eyelid-blepharoplasty-uk` | `/upper-eyelid-lift-surgery-blepharoplasty` | 61% |
| `/surgical/festoons-malar-bags-treatment-uk` | `/surgical-festoons-malar-bags-treatment-uk` | 67% |
| `/surgical/thyroid-lid-lowering-surgery` | `/surgical-thyroid-lid-lowering-surgery` | 75% |

**Legacy alias** — `/surgical/droopy-eyelid/ptosis-surgery-uk` 301s to `/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk`, mirroring the previous site's own `rel="canonical"`.

## Eye conditions

| Previous site | New site | Status | Copy |
|---|---|---|---|
| `/condition/chalazion` | `/condition/chalazion` | unchanged | 85% |
| `/condition/crows-feet` | `/condition/crows-feet` | unchanged | 84% |
| `/condition/dark-circles-under-eyes` | `/condition/dark-circles-under-eyes` | unchanged | 91% |
| `/condition/droopy-ptosis-eye` | `/condition/droopy-ptosis-eye` | unchanged | 91% |
| `/condition/eyelid-cancer` | `/condition/eyelid-cancer` | unchanged | 95% |
| `/condition/hollow-sunken-eyes` | `/condition/hollow-sunken-eyes` | unchanged | 88% |
| `/condition/monolids` | `/condition/monolids` | unchanged | 85% |
| `/condition/thyroid-disease-puffy-eyes` | `/condition/thyroid-disease-puffy-eyes` | unchanged | 93% |
| `/condition/xanthelasma` | `/condition/xanthelasma` | unchanged | 95% |

## Before &amp; After

| Previous site | New site | Status | Copy |
|---|---|---|---|
| `/before-after` | `/before-after` | unchanged | 0% |
| `/before-after/asian-blepharoplasty` | `/before-after/asian-blepharoplasty` | unchanged | 50% |
| `/before-after/lower-blepharoplasty-eyebag-removal` | `/before-after/lower-blepharoplasty-eyebag-removal` | unchanged | 75% |
| `/before-after/morpheus8` | `/before-after/morpheus8` | unchanged | 50% |
| `/before-after/polynucleotides` | `/before-after/polynucleotides` | unchanged | 67% |
| `/before-after/ptosis-surgery` | `/before-after/ptosis-surgery` | unchanged | 50% |
| `/before-after/revision-blepharoplasty` | `/before-after/revision-blepharoplasty` | unchanged | 67% |
| `/before-after/sofwave` | `/before-after/sofwave` | unchanged | 67% |
| `/before-after/superior-sulcus-filler` | `/before-after/superior-sulcus-filler` | unchanged | 50% |
| `/before-after/ultraclear-laser` | `/before-after/ultraclear-laser` | unchanged | 50% |
| `/before-after/upper-blepharoplasty` | `/before-after/upper-blepharoplasty` | unchanged | 50% |

## Other pages

| Previous site | New site | Status | Copy |
|---|---|---|---|
| `/` (homepage) | `/` | unchanged | 50% |
| `/about-drsabrina` | `/about-drsabrina` | unchanged | 91% |
| `/blog` | `/blog` | unchanged | 100% |
| `/case-studies` | `/case-studies` | unchanged | — |
| `/contact-cosmetic-eye-surgeon` | `/contact-cosmetic-eye-surgeon` | unchanged | 75% |
| `/dr-sabrina-shah-desai/non-surgical-terms-conditions` | `/dr-sabrina-shah-desai/non-surgical-terms-conditions` | unchanged | 100% |
| `/helphound` | `/helphound` | unchanged | — |
| `/journey-of-eye-care` | `/journey-of-eye-care` | unchanged | 48% |
| `/non-surgical/baby-glow-skin-treatment-uk` | `/non-surgical/baby-glow-skin-treatment-uk` | unchanged | 62% |
| `/non-surgical/bonta-wrinkle-treatment-uk` | `/non-surgical/bonta-wrinkle-treatment-uk` | unchanged | 64% |
| `/non-surgical/ellanse-filler-uk` | `/non-surgical/ellanse-filler-uk` | unchanged | 65% |
| `/non-surgical/facial-contouring-uk` | `/non-surgical/facial-contouring-uk` | unchanged | 64% |
| `/non-surgical/injectable-skin-boosters-the-perfect-360-skin-programme` | `/non-surgical/injectable-skin-boosters-the-perfect-360-skin-programme` | unchanged | 77% |
| `/non-surgical/julaine-treatment-uk` | `/non-surgical/julaine-treatment-uk` | unchanged | 60% |
| `/non-surgical/medication-driven-weight-loss-face-restoration-the-perfect-360-approach` | `/non-surgical/medication-driven-weight-loss-face-restoration-the-perfect-360-approach` | unchanged | 80% |
| `/non-surgical/microneedling-under-eyes-uk` | `/non-surgical/microneedling-under-eyes-uk` | unchanged | 67% |
| `/non-surgical/midface-lift-uk` | `/non-surgical/midface-lift-uk` | unchanged | 53% |
| `/non-surgical/non-surgical-blepharoplasty-uk` | `/non-surgical/non-surgical-blepharoplasty-uk` | unchanged | 55% |
| `/non-surgical/plexr-plasma-pen` | `/non-surgical/plexr-plasma-pen` | unchanged | 53% |
| `/non-surgical/radiofrequency-uk` | `/non-surgical/radiofrequency-uk` | unchanged | 54% |
| `/non-surgical/temple-fillers-uk` | `/non-surgical/temple-fillers-uk` | unchanged | 58% |
| `/non-surgical/the-perfect-360-eye-programme-periorbital-treatment` | `/non-surgical/the-perfect-360-eye-programme-periorbital-treatment` | unchanged | 87% |
| `/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london` | `/oculoplastic-surgeon-eyelid-cosmetic-surgeon-london` | unchanged | 91% |
| `/privacy-notice-1` | `/privacy-notice-1` | unchanged | 100% |
| `/privacy-notice-2` | `/privacy-notice-2` | unchanged | 100% |
| `/self-test-survey` | `/self-test-survey` | unchanged | — |
| `/surgical/droopy-eyelid/ptosis-surgery-uk` | `/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk` | 301 → `/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk` | 76% |
| `/surgical/reconstructive-surgery-uk` | `/surgical/reconstructive-surgery-uk` | unchanged | 59% |
| `/surgical/xanthelasma-removal-uk` | `/surgical/xanthelasma-removal-uk` | unchanged | 60% |
| `/thank-you` | `/thank-you` | unchanged | 100% |

<details>
<summary><strong>Blog &amp; publications (178 URLs)</strong> — click to expand</summary>

| Previous site | New site | Status | Copy |
|---|---|---|---|
| `/blog/a-skin-crease-preserving-modification-of-open-sky-mullerectomy-for-blepharoptosis-correction-ophthal-plast-reconstr-surg` | `/blog/a-skin-crease-preserving-modification-of-open-sky-mullerectomy-for-blepharoptosis-correction-ophthal-plast-reconstr-surg` | unchanged | 0% |
| `/blog/alternatives-to-tear-trough-filler` | `/blog/alternatives-to-tear-trough-filler` | unchanged | 100% |
| `/blog/an-unusual-case-of-ocular-aspergillosis-after-evisceration` | `/blog/an-unusual-case-of-ocular-aspergillosis-after-evisceration` | unchanged | 0% |
| `/blog/are-hooded-eyes-attractive` | `/blog/are-hooded-eyes-attractive` | unchanged | 100% |
| `/blog/asymmetrical-eyes` | `/blog/asymmetrical-eyes` | unchanged | 100% |
| `/blog/awareness-of-management-of-hyaluronic-acid-induced-visual-loss-a-british-nationa` | `/blog/awareness-of-management-of-hyaluronic-acid-induced-visual-loss-a-british-nationa` | unchanged | 0% |
| `/blog/beginning-stages-of-eye-stye` | `/blog/beginning-stages-of-eye-stye` | unchanged | 100% |
| `/blog/benefits-of-ice-on-face` | `/blog/benefits-of-ice-on-face` | unchanged | 100% |
| `/blog/benefits-of-microneedling` | `/blog/benefits-of-microneedling` | unchanged | 100% |
| `/blog/benefits-of-polynucleotide-treatment-explained` | `/blog/benefits-of-polynucleotide-treatment-explained` | unchanged | 100% |
| `/blog/best-blepharoplasty-surgeons-and-clinics-in-london` | `/blog/best-blepharoplasty-surgeons-and-clinics-in-london` | unchanged | 95% |
| `/blog/best-food-for-eye-health` | `/blog/best-food-for-eye-health` | unchanged | 100% |
| `/blog/best-oculoplastic-surgeon-in-london-and-how-to-choose` | `/blog/best-oculoplastic-surgeon-in-london-and-how-to-choose` | unchanged | 100% |
| `/blog/best-supplement-for-eyesight` | `/blog/best-supplement-for-eyesight` | unchanged | 100% |
| `/blog/best-treatment-for-large-pores` | `/blog/best-treatment-for-large-pores` | unchanged | 98% |
| `/blog/best-xanthelasma-removal-in-london` | `/blog/best-xanthelasma-removal-in-london` | unchanged | 100% |
| `/blog/blepharoplasty-eyelid-recovery-guide` | `/blog/blepharoplasty-eyelid-recovery-guide` | unchanged | 100% |
| `/blog/blepharoplasty-pros-and-cons` | `/blog/blepharoplasty-pros-and-cons` | unchanged | 93% |
| `/blog/blepharoplasty-vs-brow-lift` | `/blog/blepharoplasty-vs-brow-lift` | unchanged | 100% |
| `/blog/botched-eyelid-surgery-causes-and-complications` | `/blog/botched-eyelid-surgery-causes-and-complications` | unchanged | 100% |
| `/blog/brow-lift-cost-uk` | `/blog/brow-lift-cost-uk` | unchanged | 100% |
| `/blog/can-a-stye-cause-blurry-vision-causes-symptoms-and-treatments` | `/blog/can-a-stye-cause-blurry-vision-causes-symptoms-and-treatments` | unchanged | 100% |
| `/blog/can-eye-colour-change-with-age` | `/blog/can-eye-colour-change-with-age` | unchanged | 100% |
| `/blog/case-study-dermal-filler-liquid-face-lift` | `/blog/case-study-dermal-filler-liquid-face-lift` | unchanged | 100% |
| `/blog/case-study-for-revision-droopy-eyelid-ptosis-surgery` | `/blog/case-study-for-revision-droopy-eyelid-ptosis-surgery` | unchanged | 100% |
| `/blog/case-study-male-blepharoplasty` | `/blog/case-study-male-blepharoplasty` | unchanged | 0% |
| `/blog/case-study-revision-eye-bag-surgery` | `/blog/case-study-revision-eye-bag-surgery` | unchanged | 100% |
| `/blog/case-study-scarless-droopy-eyelid-ptosis-repair` | `/blog/case-study-scarless-droopy-eyelid-ptosis-repair` | unchanged | 20% |
| `/blog/case-study-skin-cancer` | `/blog/case-study-skin-cancer` | unchanged | 100% |
| `/blog/case-study-surgery-for-hooded-eyelids-blepharoplasty` | `/blog/case-study-surgery-for-hooded-eyelids-blepharoplasty` | unchanged | 100% |
| `/blog/case-study-thyoid-eye-disease` | `/blog/case-study-thyoid-eye-disease` | unchanged | 100% |
| `/blog/causes-of-eye-infections` | `/blog/causes-of-eye-infections` | unchanged | 100% |
| `/blog/causes-of-eye-strain-symptoms` | `/blog/causes-of-eye-strain-symptoms` | unchanged | 100% |
| `/blog/causes-of-pain-behind-the-eye-and-treatments` | `/blog/causes-of-pain-behind-the-eye-and-treatments` | unchanged | 100% |
| `/blog/chalazion-healing-stages` | `/blog/chalazion-healing-stages` | unchanged | 100% |
| `/blog/chemical-peel-benefits` | `/blog/chemical-peel-benefits` | unchanged | 100% |
| `/blog/cholesterol-bumps-under-eyes-causes-treatments` | `/blog/cholesterol-bumps-under-eyes-causes-treatments` | unchanged | 100% |
| `/blog/cold-compress-on-eyes-benefits-and-treatments` | `/blog/cold-compress-on-eyes-benefits-and-treatments` | unchanged | 100% |
| `/blog/cosmetic-filler-induced-vascular-occlusion-a-rising-threat-presenting-to-emergency-departments-annals-of-emergency-medicine` | `/blog/cosmetic-filler-induced-vascular-occlusion-a-rising-threat-presenting-to-emergency-departments-annals-of-emergency-medicine` | unchanged | 0% |
| `/blog/cure-under-eye-circles` | `/blog/cure-under-eye-circles` | unchanged | 100% |
| `/blog/dark-circles-vs-eye-bags` | `/blog/dark-circles-vs-eye-bags` | unchanged | 100% |
| `/blog/do-polynucleotides-work` | `/blog/do-polynucleotides-work` | unchanged | 100% |
| `/blog/does-microneedling-work` | `/blog/does-microneedling-work` | unchanged | 98% |
| `/blog/early-stage-of-eyelid-cancer` | `/blog/early-stage-of-eyelid-cancer` | unchanged | 100% |
| `/blog/effective-ways-to-tighten-loose-skin` | `/blog/effective-ways-to-tighten-loose-skin` | unchanged | 100% |
| `/blog/elevating-aesthetics-patient-specific-treatment-with-hyaluronic-acid-fillers-to-improve-appearance-and-psychosocial-wellbeing` | `/blog/elevating-aesthetics-patient-specific-treatment-with-hyaluronic-acid-fillers-to-improve-appearance-and-psychosocial-wellbeing` | unchanged | 0% |
| `/blog/endolift-recovery-and-side-effects` | `/blog/endolift-recovery-and-side-effects` | unchanged | 100% |
| `/blog/etiology-of-delayed-inflammatory-reaction-induced-by-hyaluronic-acid-filler-archives-of-plastic-surgery` | `/blog/etiology-of-delayed-inflammatory-reaction-induced-by-hyaluronic-acid-filler-archives-of-plastic-surgery` | unchanged | 0% |
| `/blog/evaluation-of-scleral-contact-lens` | `/blog/evaluation-of-scleral-contact-lens` | unchanged | 0% |
| `/blog/evaluation-of-scleral-contact-lens-as-a-treatment-modality-in-complex-ptosis` | `/blog/evaluation-of-scleral-contact-lens-as-a-treatment-modality-in-complex-ptosis` | unchanged | 0% |
| `/blog/exosomes-for-thinning-hair-and-hair-loss` | `/blog/exosomes-for-thinning-hair-and-hair-loss` | unchanged | 100% |
| `/blog/eye-bags-effective-removal-treatments` | `/blog/eye-bags-effective-removal-treatments` | unchanged | 100% |
| `/blog/eye-irritation` | `/blog/eye-irritation` | unchanged | 100% |
| `/blog/eye-shapes` | `/blog/eye-shapes` | unchanged | 100% |
| `/blog/eyelid-anatomy` | `/blog/eyelid-anatomy` | unchanged | 100% |
| `/blog/eyelid-bumps-symptoms-causes-treatments` | `/blog/eyelid-bumps-symptoms-causes-treatments` | unchanged | 100% |
| `/blog/eyelid-workout-to-strengthen-eyelid` | `/blog/eyelid-workout-to-strengthen-eyelid` | unchanged | 100% |
| `/blog/facial-overfilled-syndrome-what-it-is-and-how-we-can-help-you-treat-it-safely` | `/blog/facial-overfilled-syndrome-what-it-is-and-how-we-can-help-you-treat-it-safely` | unchanged | 100% |
| `/blog/fastest-ways-to-heal-swollen-eyelids` | `/blog/fastest-ways-to-heal-swollen-eyelids` | unchanged | 100% |
| `/blog/functional-aesthetic-outcomes-of-tarsal-transposition-flap-in-eyelid-reconstruction` | `/blog/functional-aesthetic-outcomes-of-tarsal-transposition-flap-in-eyelid-reconstruction` | unchanged | 0% |
| `/blog/heal-broken-blood-vessels-in-eye-fast` | `/blog/heal-broken-blood-vessels-in-eye-fast` | unchanged | 100% |
| `/blog/hooded-eyes-causes-and-symptoms` | `/blog/hooded-eyes-causes-and-symptoms` | unchanged | 100% |
| `/blog/how-do-you-rest-your-eyes` | `/blog/how-do-you-rest-your-eyes` | unchanged | 100% |
| `/blog/how-is-a-chalazion-removed` | `/blog/how-is-a-chalazion-removed` | unchanged | 100% |
| `/blog/how-long-after-blepharoplasty-can-i-have-botox` | `/blog/how-long-after-blepharoplasty-can-i-have-botox` | unchanged | 100% |
| `/blog/how-long-chalazion-last` | `/blog/how-long-chalazion-last` | unchanged | 90% |
| `/blog/how-long-do-polynucleotides-take-to-work` | `/blog/how-long-do-polynucleotides-take-to-work` | unchanged | 100% |
| `/blog/how-long-does-a-black-eye-last` | `/blog/how-long-does-a-black-eye-last` | unchanged | 100% |
| `/blog/how-long-does-a-stye-last` | `/blog/how-long-does-a-stye-last` | unchanged | 100% |
| `/blog/how-long-does-eyelid-surgery-last` | `/blog/how-long-does-eyelid-surgery-last` | unchanged | 100% |
| `/blog/how-long-does-tear-trough-filler-last` | `/blog/how-long-does-tear-trough-filler-last` | unchanged | 100% |
| `/blog/how-much-is-a-blepharoplasty-in-the-uk` | `/blog/how-much-is-a-blepharoplasty-in-the-uk` | unchanged | 100% |
| `/blog/how-to-cure-blepharitis-fast` | `/blog/how-to-cure-blepharitis-fast` | unchanged | 100% |
| `/blog/how-to-cure-eyes-permanently` | `/blog/how-to-cure-eyes-permanently` | unchanged | 100% |
| `/blog/how-to-eliminate-fine-lines-under-eyes-causes-treatments` | `/blog/how-to-eliminate-fine-lines-under-eyes-causes-treatments` | unchanged | 100% |
| `/blog/how-to-fix-droopy-eyelids-without-surgery` | `/blog/how-to-fix-droopy-eyelids-without-surgery` | unchanged | 97% |
| `/blog/how-to-get-a-sharper-jawline` | `/blog/how-to-get-a-sharper-jawline` | unchanged | 100% |
| `/blog/how-to-get-rid-of-bags-under-eyes-in-men` | `/blog/how-to-get-rid-of-bags-under-eyes-in-men` | unchanged | 100% |
| `/blog/how-to-get-rid-of-double-chin` | `/blog/how-to-get-rid-of-double-chin` | unchanged | 100% |
| `/blog/how-to-get-rid-of-eye-bags-causes-risks-treatments` | `/blog/how-to-get-rid-of-eye-bags-causes-risks-treatments` | unchanged | 100% |
| `/blog/how-to-get-rid-of-frown-lines` | `/blog/how-to-get-rid-of-frown-lines` | unchanged | 100% |
| `/blog/how-to-get-rid-of-hooded-eyes` | `/blog/how-to-get-rid-of-hooded-eyes` | unchanged | 95% |
| `/blog/how-to-get-rid-of-marionette-lines` | `/blog/how-to-get-rid-of-marionette-lines` | unchanged | 100% |
| `/blog/how-to-get-rid-of-puffiness-around-eyes` | `/blog/how-to-get-rid-of-puffiness-around-eyes` | unchanged | 100% |
| `/blog/how-to-get-rid-of-stye-on-eyelid-fast` | `/blog/how-to-get-rid-of-stye-on-eyelid-fast` | unchanged | 100% |
| `/blog/how-to-get-rid-of-sunken-eyes` | `/blog/how-to-get-rid-of-sunken-eyes` | unchanged | 100% |
| `/blog/how-to-get-rid-of-turkey-neck` | `/blog/how-to-get-rid-of-turkey-neck` | unchanged | 100% |
| `/blog/how-to-get-rid-of-under-eye-wrinkles` | `/blog/how-to-get-rid-of-under-eye-wrinkles` | unchanged | 100% |
| `/blog/how-to-improve-eyesight` | `/blog/how-to-improve-eyesight` | unchanged | 100% |
| `/blog/how-to-keep-eyes-healthy` | `/blog/how-to-keep-eyes-healthy` | unchanged | 100% |
| `/blog/how-to-lift-eyebrows-naturally-for-a-youthful-appearance` | `/blog/how-to-lift-eyebrows-naturally-for-a-youthful-appearance` | unchanged | 100% |
| `/blog/how-to-minimise-blepharoplasty-scars` | `/blog/how-to-minimise-blepharoplasty-scars` | unchanged | 96% |
| `/blog/how-to-qualify-for-eyelid-surgery` | `/blog/how-to-qualify-for-eyelid-surgery` | unchanged | 100% |
| `/blog/how-to-reduce-and-prevent-eye-crows-feet` | `/blog/how-to-reduce-and-prevent-eye-crows-feet` | unchanged | 95% |
| `/blog/how-to-remove-dark-circles-under-eyes-permanently` | `/blog/how-to-remove-dark-circles-under-eyes-permanently` | unchanged | 100% |
| `/blog/how-to-remove-sun-damage-on-face` | `/blog/how-to-remove-sun-damage-on-face` | unchanged | 96% |
| `/blog/how-to-shrink-pores-permanently` | `/blog/how-to-shrink-pores-permanently` | unchanged | 100% |
| `/blog/how-to-stop-watery-eyes` | `/blog/how-to-stop-watery-eyes` | unchanged | 100% |
| `/blog/how-to-take-care-of-your-eyes` | `/blog/how-to-take-care-of-your-eyes` | unchanged | 100% |
| `/blog/how-to-treat-eczema-around-eyes` | `/blog/how-to-treat-eczema-around-eyes` | unchanged | 100% |
| `/blog/hyaluronic-acid` | `/blog/hyaluronic-acid` | unchanged | 100% |
| `/blog/is-blepharoplasty-safe` | `/blog/is-blepharoplasty-safe` | unchanged | 100% |
| `/blog/is-laser-eye-surgery-safe` | `/blog/is-laser-eye-surgery-safe` | unchanged | 100% |
| `/blog/itchy-watery-eyes` | `/blog/itchy-watery-eyes` | unchanged | 100% |
| `/blog/joganathan-v-j-novel-technique-of-non-surgical-rejuvenation-of-infraorbital-dark-circles` | `/blog/joganathan-v-j-novel-technique-of-non-surgical-rejuvenation-of-infraorbital-dark-circles` | unchanged | 0% |
| `/blog/journal-aesthetic-nursing-injectors-prevent-speed-bumps-sausages-eyes` | `/blog/journal-aesthetic-nursing-injectors-prevent-speed-bumps-sausages-eyes` | unchanged | 0% |
| `/blog/journal-of-bombay-ophthalmologists-association` | `/blog/journal-of-bombay-ophthalmologists-association` | unchanged | 0% |
| `/blog/long-term-outcomes-of-surgical-approaches-to-the-treatment-of-floppy-eyelid-syndrome` | `/blog/long-term-outcomes-of-surgical-approaches-to-the-treatment-of-floppy-eyelid-syndrome` | unchanged | 0% |
| `/blog/loose-skin-under-eyes` | `/blog/loose-skin-under-eyes` | unchanged | 100% |
| `/blog/malar-bags-causes-and-treatments` | `/blog/malar-bags-causes-and-treatments` | unchanged | 100% |
| `/blog/marionette-lines-filler-cost-uk` | `/blog/marionette-lines-filler-cost-uk` | unchanged | 100% |
| `/blog/marionette-lines-filler-gone-wrong` | `/blog/marionette-lines-filler-gone-wrong` | unchanged | 100% |
| `/blog/microneedling-side-effects` | `/blog/microneedling-side-effects` | unchanged | 100% |
| `/blog/microneedling-vs-laser` | `/blog/microneedling-vs-laser` | unchanged | 100% |
| `/blog/microneedling-what-it-is-uses-benefits-results` | `/blog/microneedling-what-it-is-uses-benefits-results` | unchanged | 100% |
| `/blog/monolids-vs-double-eyelids-difference` | `/blog/monolids-vs-double-eyelids-difference` | unchanged | 100% |
| `/blog/out-come-of-ptosis-repair` | `/blog/out-come-of-ptosis-repair` | unchanged | 0% |
| `/blog/outcome-of-ptosis-repair-a-digital-image-analysis-ophthal-plast-reconstr-surg` | `/blog/outcome-of-ptosis-repair-a-digital-image-analysis-ophthal-plast-reconstr-surg` | unchanged | 0% |
| `/blog/painful-blind-eye-efficacy-of-enucleation-and-evisceration-in-resolving-ocular-pain` | `/blog/painful-blind-eye-efficacy-of-enucleation-and-evisceration-in-resolving-ocular-pain` | unchanged | 0% |
| `/blog/periorbital-venous-stasis-may-be-involved-with-filler-induced-malar-edema-a-duplex-ultrasoundimagingbased-case-series` | `/blog/periorbital-venous-stasis-may-be-involved-with-filler-induced-malar-edema-a-duplex-ultrasoundimagingbased-case-series` | unchanged | 0% |
| `/blog/polynucleotide-injection-side-effects` | `/blog/polynucleotide-injection-side-effects` | unchanged | 100% |
| `/blog/polynucleotides-aftercare` | `/blog/polynucleotides-aftercare` | unchanged | 100% |
| `/blog/polynucleotides-gone-wrong` | `/blog/polynucleotides-gone-wrong` | unchanged | 100% |
| `/blog/polynucleotides-vs-profhilo` | `/blog/polynucleotides-vs-profhilo` | unchanged | 100% |
| `/blog/profhilo-vs-teosyal-redensity-1-which-hyaluronic-acid-injectable-is-right-for-you` | `/blog/profhilo-vs-teosyal-redensity-1-which-hyaluronic-acid-injectable-is-right-for-you` | unchanged | 100% |
| `/blog/ptosis-surgery-recovery` | `/blog/ptosis-surgery-recovery` | unchanged | 100% |
| `/blog/red-eyes-causes-and-treatments` | `/blog/red-eyes-causes-and-treatments` | unchanged | 100% |
| `/blog/remove-bags-under-eye-permanently` | `/blog/remove-bags-under-eye-permanently` | unchanged | 95% |
| `/blog/repair-of-over-corrected-upper-lid-lowering-for-thyroid-eye-disease-using-nylon-hang-back-sutures-ophthal-plast-reconstr-surg` | `/blog/repair-of-over-corrected-upper-lid-lowering-for-thyroid-eye-disease-using-nylon-hang-back-sutures-ophthal-plast-reconstr-surg` | unchanged | 0% |
| `/blog/role-of-the-lower-lid-retractors-in-involutional-ectropion-repair` | `/blog/role-of-the-lower-lid-retractors-in-involutional-ectropion-repair` | unchanged | 0% |
| `/blog/sagging-jowls` | `/blog/sagging-jowls` | unchanged | 100% |
| `/blog/saggy-skin-under-eyes` | `/blog/saggy-skin-under-eyes` | unchanged | 100% |
| `/blog/signs-of-ageing-eyes` | `/blog/signs-of-ageing-eyes` | unchanged | 100% |
| `/blog/signs-of-diabetes-in-eyes-and-symptoms` | `/blog/signs-of-diabetes-in-eyes-and-symptoms` | unchanged | 100% |
| `/blog/skin-crease-preserving-modification-open-sky-mullerectomy-blepharoptosis-correction` | `/blog/skin-crease-preserving-modification-open-sky-mullerectomy-blepharoptosis-correction` | unchanged | 0% |
| `/blog/stability-and-predictability-of-lid-position-following-a-new-technique-of-anterior-graded-approach-lid-lowering-for-dysthyroid-upper-lid-retraction` | `/blog/stability-and-predictability-of-lid-position-following-a-new-technique-of-anterior-graded-approach-lid-lowering-for-dysthyroid-upper-lid-retraction` | unchanged | 0% |
| `/blog/stye-inside-eyelid` | `/blog/stye-inside-eyelid` | unchanged | 100% |
| `/blog/sudden-droopy-eyelids` | `/blog/sudden-droopy-eyelids` | unchanged | 100% |
| `/blog/sunburned-eyes-best-way-to-treat` | `/blog/sunburned-eyes-best-way-to-treat` | unchanged | 100% |
| `/blog/sunken-cheeks-causes-and-treatments` | `/blog/sunken-cheeks-causes-and-treatments` | unchanged | 100% |
| `/blog/surgical-correction-of-entropion-and-excess-upper-eyelid-skin-in-congenital-cutis-laxa-a-case-report` | `/blog/surgical-correction-of-entropion-and-excess-upper-eyelid-skin-in-congenital-cutis-laxa-a-case-report` | unchanged | 0% |
| `/blog/tear-trough-filler-cost` | `/blog/tear-trough-filler-cost` | unchanged | 100% |
| `/blog/tear-trough-filler-gone-wrong` | `/blog/tear-trough-filler-gone-wrong` | unchanged | 100% |
| `/blog/tear-trough-filler-side-effects` | `/blog/tear-trough-filler-side-effects` | unchanged | 100% |
| `/blog/tear-trough-filler-swelling-stages` | `/blog/tear-trough-filler-swelling-stages` | unchanged | 100% |
| `/blog/the-house-brackman-system-and-assessment-of-corneal-risk-in-facial-nerve-palsy` | `/blog/the-house-brackman-system-and-assessment-of-corneal-risk-in-facial-nerve-palsy` | unchanged | 0% |
| `/blog/the-lax-eyelid-syndrome-or-progeria-of-eyelid-tissues` | `/blog/the-lax-eyelid-syndrome-or-progeria-of-eyelid-tissues` | unchanged | 0% |
| `/blog/the-ultimate-guide-to-blepharoplasty` | `/blog/the-ultimate-guide-to-blepharoplasty` | unchanged | 94% |
| `/blog/thin-lips-causes-and-prevention` | `/blog/thin-lips-causes-and-prevention` | unchanged | 94% |
| `/blog/things-you-should-know-about-eyelid-lift` | `/blog/things-you-should-know-about-eyelid-lift` | unchanged | 100% |
| `/blog/thyroid-eye-disease-symptoms-and-treatment` | `/blog/thyroid-eye-disease-symptoms-and-treatment` | unchanged | 100% |
| `/blog/thyroid-orbitopathy-possibly-predisposes-to-late-onset-of-periocular-lymphoma` | `/blog/thyroid-orbitopathy-possibly-predisposes-to-late-onset-of-periocular-lymphoma` | unchanged | 0% |
| `/blog/tired-eyes-causes-symptoms-and-why-it-happens` | `/blog/tired-eyes-causes-symptoms-and-why-it-happens` | unchanged | 100% |
| `/blog/top-non-surgical-treatments-to-lift-eyelids` | `/blog/top-non-surgical-treatments-to-lift-eyelids` | unchanged | 100% |
| `/blog/two-new-cases-of-metastatic-bcc` | `/blog/two-new-cases-of-metastatic-bcc` | unchanged | 0% |
| `/blog/types-of-dark-circles` | `/blog/types-of-dark-circles` | unchanged | 100% |
| `/blog/ultimate-guide-to-upper-blepharoplasty` | `/blog/ultimate-guide-to-upper-blepharoplasty` | unchanged | 100% |
| `/blog/understanding-nasolabial-folds-causes-treatments-and-prevention` | `/blog/understanding-nasolabial-folds-causes-treatments-and-prevention` | unchanged | 100% |
| `/blog/use-of-70-vicryl-coated-polyglactin-910` | `/blog/use-of-70-vicryl-coated-polyglactin-910` | unchanged | 0% |
| `/blog/use-of-eyeliner-to-mask-mild-ptosis` | `/blog/use-of-eyeliner-to-mask-mild-ptosis` | unchanged | 0% |
| `/blog/warm-compress-for-eyes-benefit` | `/blog/warm-compress-for-eyes-benefit` | unchanged | 100% |
| `/blog/what-are-festoons-and-malar-bags` | `/blog/what-are-festoons-and-malar-bags` | unchanged | 100% |
| `/blog/what-causes-styes-in-adults` | `/blog/what-causes-styes-in-adults` | unchanged | 100% |
| `/blog/what-colour-are-my-eyes` | `/blog/what-colour-are-my-eyes` | unchanged | 100% |
| `/blog/what-is-emface-and-how-does-it-work` | `/blog/what-is-emface-and-how-does-it-work` | unchanged | 95% |
| `/blog/what-is-fox-eye-surgery` | `/blog/what-is-fox-eye-surgery` | unchanged | 100% |
| `/blog/which-concerns-can-ellanse-treat` | `/blog/which-concerns-can-ellanse-treat` | unchanged | 100% |
| `/blog/white-spots-under-eyes` | `/blog/white-spots-under-eyes` | unchanged | 100% |
| `/blog/why-are-my-bloodshot-eyes` | `/blog/why-are-my-bloodshot-eyes` | unchanged | 100% |
| `/blog/why-do-i-have-a-lump-on-my-eyelid` | `/blog/why-do-i-have-a-lump-on-my-eyelid` | unchanged | 96% |
| `/blog/why-do-i-suddenly-keep-getting-styes` | `/blog/why-do-i-suddenly-keep-getting-styes` | unchanged | 100% |
| `/blog/why-do-my-eyes-keep-watering` | `/blog/why-do-my-eyes-keep-watering` | unchanged | 100% |
| `/blog/why-is-my-eye-twitching` | `/blog/why-is-my-eye-twitching` | unchanged | 100% |
| `/blog/why-is-my-vision-blurry` | `/blog/why-is-my-vision-blurry` | unchanged | 100% |
| `/blog/why-my-eyelid-is-swollen` | `/blog/why-my-eyelid-is-swollen` | unchanged | 100% |
| `/nylon-hang-sutures-repair-secondary-ptosis-overcorrected-dysthyroid-upper-eyelid-retraction` | `/blog/nylon-hang-back-sutures-in-the-repair-of-secondary-ptosis-following-overcorrected-dysthyroid-upper-eyelid-retraction` | 301 → `/blog/nylon-hang-back-sutures-in-the-repair-of-secondary-ptosis-following-overcorrected-dysthyroid-upper-eyelid-retraction` | 0% |
| `/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction` | `/blog/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction` | 301 → `/blog/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction` | 0% |
| `/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids` | `/blog/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids` | 301 → `/blog/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids` | 0% |

</details>

---

## Interpreting the coverage figures

A page scoring below 100% is usually **not** missing content. Three distinct causes, in order of how many pages they explain:

### 1. Sidebar bio not rendered — 33 pages

These score near 0% but their **article text is fully present**. The only paragraphs absent are the four-paragraph Dr Sabrina biography that the previous site repeated in a sidebar on every publication post:

> - *"Dr Sabrina Shah-Desai … MS, FRCS (Ed) Ophth … With over two decades of surgical and non-surgical experience …"*
> - *"She is now listed on the Royal College of Surgeons of England register …"*
> - *"Her extensive training, in combination with her caring and empathetic nature …"*
> - *"For this reason, Dr Sabrina has been consistently recognised in the Tatler Top Doctors Guide …"*

This is chrome, not article content. The new site carries the same material in the shared `TreatmentExpert` component. **No action needed** unless you want the bio on blog posts too.

### 2. Deliberate restructure — 17 treatment pages

The rich treatment template renders curated copy from `content/treatment-meta.json` rather than the previous site's verbatim text. For example the previous site's *"Invisible scar: Cut is hidden in the natural eyelid crease"* is carried as an advantage titled *"Invisible Scarring"*. Same substance, rewritten. These sit at 61–80% by design.

### 3. Before &amp; After pages

Two blocks were removed on purpose:

- The scraped *"Filter By Procedure"* `<table>` — replaced by a real navigation component.
- The line *"Enhance your natural features by removing excess skin…"* — boilerplate that is **factually wrong** on the non-surgical pages (Morpheus8, UltraClear, fillers and polynucleotides do not remove skin).

---

## Fixes applied

19 previous-site URLs returned 404 before this audit. Every one was a routing or slug problem — **the content was already exported, just unreachable**.

| Issue | URLs | Fix |
|---|---|---|
| Mapped to the wrong page | 1 | `/non-surgical/temple-fillers-uk` pointed at `superior-sulcus-filler`. Verified by coverage: the correct file matches 18/51 previous-site paragraphs vs 3/51 for the wrong one. Corrected in `content/url-map.json`. |
| Misspelled filename | 1 | `content/before-after/sulpulcus-filler.mdx` → `superior-sulcus-filler.mdx` (plus 2 stale references) |
| Not mapped | 1 | `/non-surgical/microneedling-under-eyes-uk` → `microneedling` |
| Slug drift on blog posts | 14 | e.g. `how-to-minimise-blepharoplasty-scars` → `blepharoplasty-scars`. Added to `content/url-map.json` under both the full path and bare slug. |
| Served at site root, content in `posts` | 3 | 301 to the canonical `/blog/…` URL (`next.config.ts`) |

---

## Outstanding — content genuinely not exported

These pages resolve and render, but some previous-site copy exists in **no local content file**. The migration snapshot appears to predate later edits on the live site.

| Page | Copy present |
|---|---|
| `/non-surgical/midface-lift-uk` | 53% |
| `/non-surgical/plexr-plasma-pen` | 53% |
| `/non-surgical/radiofrequency-uk` | 54% |
| `/non-surgical/non-surgical-blepharoplasty-uk` | 55% |
| `/non-surgical/temple-fillers-uk` | 58% |
| `/surgical/reconstructive-surgery-uk` | 59% |
| `/non-surgical/julaine-treatment-uk` | 60% |
| `/surgical/xanthelasma-removal-uk` | 60% |
| `/non-surgical/baby-glow-skin-treatment-uk` | 62% |
| `/non-surgical/bonta-wrinkle-treatment-uk` | 64% |
| `/non-surgical/facial-contouring-uk` | 64% |
| `/non-surgical/ellanse-filler-uk` | 65% |
| `/non-surgical/microneedling-under-eyes-uk` | 67% |
| `/surgical/droopy-eyelid/ptosis-surgery-uk` | 76% |
| `/non-surgical/injectable-skin-boosters-the-perfect-360-skin-programme` | 77% |

Example of text present on the previous site but in no local file — `/non-surgical/temple-fillers-uk`:

> *"This involves injecting small amounts of transparent hyaluronic acid gel into the temporal areas or a hollow upper lid (called 'A frame deformity')…"*

**Not actioned deliberately.** Re-scraping would overwrite copy that was intentionally rewritten during the migration, and the two cases are indistinguishable from the outside. Confirm which pages should take the current live copy and it can be pulled in.

---

## Where the mappings live

| File | Purpose |
|---|---|
| [`content/treatment-paths.json`](content/treatment-paths.json) | Canonical nested URL for each of the 18 treatments. Single source of truth — imported by `lib/treatment-urls.ts`, `next.config.ts` (redirects), `app/sitemap.ts` and `lib/mdx.ts`. |
| [`content/url-map.json`](content/url-map.json) | Previous-site URL → MDX filename, for legacy and drifted slugs. |
| [`next.config.ts`](next.config.ts) | 301 redirects: flat treatment slugs, the ptosis alias, and 3 root-level publications. |

> **Note on `content/treatment-paths.json`** — it is a JSON file rather than a TypeScript module because `next.config.ts` needs the same map, and importing a `.ts` module there causes every page to fail at runtime under Turbopack. JSON imports are safe in both places.

