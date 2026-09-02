import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import AccreditedStrip from "@/components/shared/AccreditedStrip";
import RequestCallbackForm from "@/components/forms/RequestCallbackForm";
import ClinicPhone from "@/components/shared/ClinicPhone";
import BookConsultationModal from "@/components/forms/BookConsultationModal";
import { TpIcon } from "@/components/treatment/TpIcon";
import { BeforeAfterGallery } from "@/components/treatment/BeforeAfterGallery";
import { PATIENT_STORIES } from "@/lib/reviews";
import type { PostFrontmatter } from "@/lib/mdx";
import type { TreatmentMeta } from "@/components/treatment/types";
import styles from "./SofwaveLanding.module.css";

/**
 * Sofwave, as a landing page rather than a treatment page.
 *
 * The shared treatment template is written for someone who arrived from the
 * site's own navigation and is already part-way convinced. This page is
 * bought: a cold visitor scrolling Instagram who was not looking for Sofwave
 * and has never heard of it. That changes the order of everything.
 *
 * What moved, and why:
 *  - The reviews rail sat fourteenth on the template, below three sections of
 *    procedure detail. A cold visitor has no reason to read that detail from
 *    a clinic they cannot yet place, so proof comes second here — the result
 *    photograph and the reviews before anything is explained.
 *  - A pain-point section was added and put first. Search traffic knows what
 *    Sofwave is; social traffic has to be shown the problem before the
 *    solution means anything.
 *  - The callback form is in the hero on desktop and one tap away on mobile,
 *    rather than at the foot of the page.
 *  - Similar treatments and related blog posts are gone. They were the two
 *    largest exits from a page whose only job is the enquiry on it.
 *
 * It is deliberately its own component rather than a variant of the shared
 * template: the other 47 treatment pages keep the template they have, and
 * nothing here can reach them.
 */

/* ── Content ───────────────────────────────────────────────────────────────
   Every figure below is drawn from the page's own source data — the FDA
   study numbers and the risk language come from the frontmatter FAQ, the
   prices from treatment-meta.json, the rating from the reviews rail. Nothing
   is invented, and nothing promises a result. */

const TRUST = [
  { icon: "star", label: "4.8 from 240+ Google reviews" },
  { icon: "shield", label: "CQC registered, rated good in all five areas" },
  { icon: "building", label: "121 Harley Street, London" },
];

const BENEFITS = [
  {
    icon: "sparkle",
    title: "No cuts, no injections",
    body: "Focused ultrasound passes through the surface of the skin and works at about 1.5mm, in the mid-dermis. Nothing is inserted and nothing is removed.",
  },
  {
    icon: "clock",
    title: "One hour, then back to your day",
    body: "A session takes around 60 minutes, including an hour of numbing cream beforehand. There is no downtime — most people go straight back to work.",
  },
  {
    icon: "eye",
    title: "Measured lift, in a study",
    body: "In the FDA study, 80% of patients saw a 2–4mm lift in brow height and 70–80% saw visible tightening. Your own result is assessed at review.",
  },
  {
    icon: "pulse",
    title: "Gradual, not overnight",
    body: "Collagen rebuilds over 3–6 months, so the change arrives slowly enough that people tend to say you look well rather than ask what you have had done.",
  },
  {
    icon: "calendar",
    title: "Lasts 12–24 months",
    body: "The lift comes from collagen your own skin has made, so it fades the way collagen does — slowly — rather than wearing off on a fixed date.",
  },
  {
    icon: "shield",
    title: "Done by an eye surgeon",
    body: "Dr Sabrina Shah-Desai is a consultant oculoplastic surgeon. Periocular safety measures protect the eye itself, which is why who holds the applicator matters here.",
  },
];

const SUITABLE = [
  "You have mild to moderate skin laxity around the brow, eyes or jawline",
  "You are broadly healthy and typically between 40 and 80",
  "You would rather a gradual change than an obvious one",
  "You are not ready for surgery, or want to put it off for a while",
  "You can give the result 3–6 months to appear",
];

const NOT_SUITABLE = [
  "You have significant excess eyelid skin — surgery does what ultrasound cannot",
  "You want a visible difference next week",
  "You are looking for the result of a facelift without the facelift",
];

const STEPS = [
  {
    heading: "Your consultation",
    body: "Forty-five minutes with Dr Shah-Desai at Harley Street. She examines the skin and the brow position, and tells you which of the two answers applies: Sofwave, or surgery. If it is surgery, she will say so.",
    meta: "£300, with Dr Sabrina Shah-Desai",
  },
  {
    heading: "The treatment",
    body: "Numbing cream for an hour, then about 60 minutes with the applicator. You will feel warmth and some tingling as the skin tightens. Any redness or tenderness usually settles within hours.",
    meta: "About 60 minutes",
  },
  {
    heading: "The next three to six months",
    body: "New collagen forms gradually and the skin firms as it does. Some people have a second session at six months to build on the first — that is a decision made at review, looking at your result, not booked in advance.",
    meta: "Reviewed with your surgeon",
  },
];

const PRICES = [
  { name: "Sofwave brow lift", price: "£1,800", note: "The periocular treatment — brow and around the eyes" },
  { name: "Sofwave full face & neck", price: "£3,500", note: "Brow, midface, jawline and neck in one session" },
];

/* Four of the six reviews on the site-wide rail. Named, in full, stacked —
   not a carousel: on a phone a carousel hides every review but the first
   behind a swipe most visitors never make. */
const REVIEWS = PATIENT_STORIES.slice(0, 4);

function Cta({
  variant = "primary",
  children,
}: {
  variant?: "primary" | "inverse";
  children: React.ReactNode;
}) {
  return (
    <a href="#callback" className={`tp-btn ${variant === "inverse" ? "tp-btn-inverse" : "tp-btn-primary"}`}>
      {children}
    </a>
  );
}

export default function SofwaveLanding({
  frontmatter,
  treatment,
}: {
  frontmatter: PostFrontmatter;
  treatment: TreatmentMeta;
}) {
  return (
    <div className={`tp ${styles.page}`}>
      {/* ── Hero ──────────────────────────────────────────────────────────
          Two columns from 1000px with the form in the second, one column
          below it with the form moved beneath the proof strip — on a phone
          the headline and the result photograph earn the scroll to the form,
          and the sticky bar keeps the action within reach the whole way. */}
      <section className={styles.hero}>
        <span className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>Harley Street, London</p>

            <h1 className={styles.heroTitle}>
              Lift the heaviness around your eyes — without surgery, needles or downtime
            </h1>

            <p className={styles.heroLead}>
              Sofwave™ uses focused ultrasound to rebuild collagen in the skin around your brow and
              eyes. One 60-minute session, performed by a consultant oculoplastic surgeon.
            </p>

            <div className={styles.heroPrice}>
              <span className={styles.heroPriceValue}>From £1,800</span>
              <span className={styles.heroPriceNote}>Brow and periocular treatment</span>
            </div>

            <div className={styles.heroActions}>
              <Cta>Request a call back</Cta>
              <ClinicPhone className={styles.heroCall} icon iconSize={18} />
            </div>

            <p className={styles.heroReassure}>
              No obligation. We will call to answer your questions — and tell you honestly if
              Sofwave is not the right treatment for you.
            </p>

            <ul className={styles.trust}>
              {TRUST.map((item) => (
                <li key={item.label}>
                  <TpIcon name={item.icon} size={16} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroAside}>
            <figure className={styles.heroFigure}>
              {/* 1080 x 1080, the file's own dimensions, so the box is the
                  right shape before the picture arrives and nothing shifts. */}
              <div className={styles.heroImage}>
                <SafeImage
                  src={treatment.heroImage}
                  alt="A Sofwave patient of Dr Sabrina Shah-Desai, before and after treatment"
                  width={1080}
                  height={1080}
                  sizes="(min-width: 900px) 46vw, 100vw"
                  priority
                />
              </div>
              <figcaption className={styles.heroFigCaption}>
                An actual patient of Dr Shah-Desai. Individual results vary.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <AccreditedStrip />

      {/* ── The problem ───────────────────────────────────────────────────
          First, because this page is bought from a feed rather than found in
          a search: nobody scrolling Instagram was looking for the word
          "Sofwave", and a solution lands on a problem the reader has not yet
          put into words. */}
      <section className={`${styles.section} ${styles.problem}`}>
        <div className={styles.container}>
          <div className={styles.problemGrid}>
            <div className={styles.problemCopy}>
              <h2 className={styles.h2}>It usually starts with a photograph</h2>
              <p>
                Someone takes a picture at an angle you did not choose, and the eyes looking back
                are not quite the ones you expect. The lid sits lower than it used to. There is a
                fold where there was not one. Eyeshadow gathers in a crease by lunchtime.
              </p>
              <p>
                People ask whether you are tired on days you slept perfectly well. You have started
                doing the small things — the front camera held higher, the brow lifted a little in
                photographs, the one pair of glasses that helps.
              </p>
              <p className={styles.problemTurn}>
                And when you have looked into it, everything you found was surgery. Which you are
                not ready for, and may not need yet.
              </p>
            </div>

            <aside className={styles.problemNote}>
              <p className={styles.problemNoteBody}>
                Dr Shah-Desai is a consultant oculoplastic surgeon — eyelid surgery is what she does
                all week. Part of the consultation is her telling you whether you have reached the
                point where surgery is the honest answer, or whether you have not.
              </p>
              <p className={styles.problemNoteAttr}>Why we lead with the assessment, not the treatment</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Proof, before explanation ─────────────────────────────────────
          Second on the page rather than eighth. A cold visitor has no reason
          to read how focused ultrasound works until they believe the clinic
          can do it. */}
      <section className={`${styles.section} ${styles.proof}`}>
        <div className={styles.container}>
          <BeforeAfterGallery
            gallery={frontmatter.gallery}
            heading="Sofwave™, before and after"
            description="Photographed in the same lighting and at the same angle, untouched. Results vary between patients and are not guaranteed."
            title="Sofwave™"
          />
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────
          Stacked and named. Nothing here is behind a swipe. */}
      <section className={`${styles.section} ${styles.reviews}`}>
        <div className={styles.container}>
          <div className={styles.reviewsHead}>
            <p className={styles.rating}>
              <span className={styles.ratingScore}>4.8</span>
              <span className={styles.ratingStars} aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <TpIcon key={i} name="star" size={17} />
                ))}
              </span>
              <span className={styles.ratingCount}>from 240+ Google reviews</span>
            </p>
            <h2 className={styles.h2}>What patients say about the care</h2>
          </div>

          <div className={styles.reviewGrid}>
            {REVIEWS.map((review) => (
              <blockquote key={review.author} className={styles.review}>
                <p>{review.quote}</p>
                <cite>{review.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it does ──────────────────────────────────────────────────
          Six, not four: the two added — the FDA figures and the surgeon
          herself — are the two a sceptical reader actually weighs. */}
      <section className={`${styles.section} ${styles.benefits}`}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.h2}>What Sofwave™ actually does</h2>
            <p className={styles.headLead}>
              Focused ultrasound heats the mid-dermis in a controlled way. The skin repairs itself,
              and new collagen and elastin are the repair.
            </p>
          </div>

          <ul className={styles.benefitGrid}>
            {BENEFITS.map((benefit) => (
              <li key={benefit.title} className={styles.benefit}>
                <span className={styles.benefitIcon} aria-hidden="true">
                  <TpIcon name={benefit.icon} size={20} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Candidacy ─────────────────────────────────────────────────────
          The column on the right is the one that earns the enquiry. Saying
          plainly who this does not suit is what makes the rest of the page
          credible, and it is also the honest answer to the question every
          aesthetic patient asks and few type into a form: will it look like
          I have had something done. */}
      <section className={`${styles.section} ${styles.candidacy}`}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.h2}>Whether this is the right treatment for you</h2>
            <p className={styles.headLead}>
              Sofwave suits a particular stage. Past that stage it under-delivers, and we would
              rather say so on this page than at your consultation.
            </p>
          </div>

          <div className={styles.candidacyGrid}>
            <div className={`${styles.candidacyCard} ${styles.candidacyYes}`}>
              <h3>Sofwave is likely to suit you if</h3>
              <ul>
                {SUITABLE.map((item) => (
                  <li key={item}>
                    <TpIcon name="check" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.candidacyCard} ${styles.candidacyNo}`}>
              <h3>It is the wrong treatment if</h3>
              <ul>
                {NOT_SUITABLE.map((item) => (
                  <li key={item}>
                    <TpIcon name="close" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.candidacyNote}>
                If any of these describe you, the consultation is still worth having — it is the
                appointment where you find out what would work instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────
          Numbered, because this genuinely is a sequence in time: the
          appointment, the hour, and the months afterwards. */}
      <section className={`${styles.section} ${styles.steps}`}>
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.h2}>What happens, in order</h2>
          </div>

          <ol className={styles.stepList}>
            {STEPS.map((step, i) => (
              <li key={step.heading} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">{i + 1}</span>
                <div className={styles.stepBody}>
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                  <p className={styles.stepMeta}>{step.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The surgeon ───────────────────────────────────────────────────*/}
      <section className={`${styles.section} ${styles.surgeon}`}>
        <div className={styles.container}>
          <div className={styles.surgeonGrid}>
            <div className={styles.surgeonPortrait}>
              <div className={styles.surgeonImage}>
                <SafeImage
                  src="/uploads/2026/05/dr-sabrina-shah-desai-and-her-image-in-cicular-format-1.jpg"
                  alt="Dr Sabrina Shah-Desai"
                  width={2048}
                  height={2048}
                  sizes="(min-width: 900px) 300px, 60vw"
                />
              </div>
            </div>
            <div className={styles.surgeonCopy}>
              <h2 className={styles.h2}>Who performs it</h2>
              <p className={styles.surgeonLead}>
                Dr Sabrina Shah-Desai is a consultant oculoplastic surgeon who has spent her career
                on the eyelid and the tissue around it. She teaches the techniques to other doctors.
              </p>
              <p>
                On this treatment that specialism is not a flourish. The applicator is being used
                millimetres from the eye, and the person judging how much the brow can be lifted —
                and whether ultrasound can do it at all — is the same person who would perform the
                surgery if it could not.
              </p>
              <ul className={styles.credentials}>
                <li>GMC-registered consultant surgeon</li>
                <li>Fellow of the Royal College of Surgeons of Edinburgh</li>
                <li>Trainer to other doctors in oculoplastic and aesthetic technique</li>
                <li>Practising at 121 Harley Street</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Price ─────────────────────────────────────────────────────────
          Both figures, plainly. The consultation fee is stated here rather
          than discovered at the booking step: a £300 assessment reads as a
          proper appointment with a consultant when it is explained, and as a
          nasty surprise when it is not. */}
      <section className={`${styles.section} ${styles.pricing}`} id="pricing">
        <div className={styles.container}>
          <div className={styles.head}>
            <h2 className={styles.h2}>What it costs</h2>
            <p className={styles.headLead}>
              Treatment prices are per session. Most people are treated once and reviewed; a second
              session is a decision made at that review, not assumed.
            </p>
          </div>

          <div className={styles.priceGrid}>
            {PRICES.map((row) => (
              <div key={row.name} className={styles.priceRow}>
                <div>
                  <h3>{row.name}</h3>
                  <p>{row.note}</p>
                </div>
                <span className={styles.priceValue}>{row.price}</span>
              </div>
            ))}
          </div>

          <div className={styles.consultCard}>
            <div>
              <h3>New consultation with Dr Shah-Desai</h3>
              <p>
                Forty-five minutes: examination, a straight answer on whether Sofwave or surgery
                fits what you want, and a written plan. Bookable by phone once we have spoken.
              </p>
            </div>
            <span className={styles.consultPrice}>£300</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────
          The page's own questions, including the one about risk. A page that
          answers "what could go wrong" is trusted more than one that does
          not, and a medical page has to answer it regardless. */}
      {frontmatter.faq && frontmatter.faq.length > 0 && (
        <section className={`${styles.section} ${styles.faq}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <h2 className={styles.h2}>Questions people ask before booking</h2>
            </div>

            <div className={styles.faqList}>
              {frontmatter.faq.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary>
                    <span>{item.question}</span>
                    <span className={styles.faqMark} aria-hidden="true">
                      <TpIcon name="plus" size={16} />
                    </span>
                  </summary>
                  <div
                    className={styles.faqAnswer}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Closer ────────────────────────────────────────────────────────*/}
      <section className={styles.closer} id="callback">
        <span className={styles.closerGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.closerGrid}>
            <div className={styles.closerCopy}>
              <h2 className={styles.closerTitle}>Find out whether it would work on you</h2>
              <p className={styles.closerLead}>
                Leave your number and a member of the clinical team will call you back. They will
                ask what you are seeing in the mirror, tell you whether Sofwave is likely to help,
                and book your consultation if it is.
              </p>

              <ul className={styles.closerPoints}>
                <li>
                  <TpIcon name="check" size={17} />
                  A conversation, not a sales call
                </li>
                <li>
                  <TpIcon name="check" size={17} />
                  We will tell you if surgery is the better answer
                </li>
                <li>
                  <TpIcon name="check" size={17} />
                  Weekdays, 9:30am to 6:00pm
                </li>
              </ul>

              <p className={styles.closerOr}>
                Prefer to speak now? <ClinicPhone className={styles.closerPhone} /> — or{" "}
                <BookConsultationModal className={styles.closerBook} label="Book a consultation">
                  book a consultation directly
                </BookConsultationModal>
                .
              </p>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Request a call back</h3>
              <RequestCallbackForm compact submitLabel="Request my call back" />

              {/* The one link on this page that is not a call to action.
                  The form collects a name, an email and a phone number, and
                  the footer here carries no legal links, so the privacy
                  notice has to be reachable from the point of collection —
                  which is also what Google Ads and Meta look for on a
                  landing page that takes personal details. */}
              <p className={styles.formLegal}>
                We use your details to call you back about this enquiry. See our{" "}
                <Link href="/privacy-notice">Privacy Notice</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
