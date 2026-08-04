import type { PatientStory } from "@/components/home/PatientStories";

/**
 * Patient reviews, shared by every page that shows the stories rail.
 *
 * `treatment`, `source` and `url` are deliberately absent: the site records
 * no platform or procedure against these quotes. Fill them in and the meta
 * line and the "Read on ..." link appear on their own.
 */
export const PATIENT_STORIES: PatientStory[] = [
  {
    quote:
      "Simply the best dermatologist for skin care and eye surgery. She is a safe and skilled doctor who is highly experienced and will meet your needs, her approach is a soft and natural aesthetic. She listens and communicates clearly, professionally and in a kind and personable manner. I have been looked after by Dr Sabrina for many years have always been extremely happy with her advice, procedures and results. Highly recommend, she is a talented Dr you can trust.",
    author: "Desi Stevens",
  },
  {
    quote:
      "Dr Sabrina is the magic eye fairy. Only 10 days after my lower lid bleph and midface lift and nearly all bruising and swelling has gone. After a lot of research, I knew after my initial consultation with Dr Sabrina she was the one I trusted. Such a warm & kind woman. I am so pleased I put my Trust in Dr Shah. Immensely happy with the results and will be back to get my upper eyes done in the future. Thank you to the whole team.",
    author: "Kealey Hessey",
  },
  {
    quote:
      "I had been recommended Dr Sabrina by a medical colleague & am extremely glad I made the journey from Southampton to the Perfect Eye Clinic in London to discuss blepharoplasty. The team were all so friendly & very professional and most importantly, Dr Sabrina informed me that I had a bilateral eye ptosis. This explained a number of issues I was experiencing. I will definitely be booking to have a correction of bilateral eye ptosis and upper blepharoplasty. Can't recommend enough.",
    author: "Jo Kirby",
  },
  {
    quote:
      "I am so very happy with my experiences at Perfect Eyes. Dr Sabrina is an absolute Star. Extremely talented, very personable I just couldn't be happier with my results and her overall professionalism. But a big part of my review is how lovely the support staff are too. Namely Safiya and Lisa who greet you with such warmness and respect. I highly recommend this clinic as I have done so with many friends.",
    author: "Shirley Ford",
  },
];
