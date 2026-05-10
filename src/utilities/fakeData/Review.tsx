import { Review } from "../interfaces/review.interface";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Alex Mercer",
    handle: "@alexmercer",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    title: "Best keyboard I've ever typed on",
    review:
      "The tactile feedback on the ND75 is absolutely incredible. After years of membrane boards, this feels like an upgrade from a bicycle to a sports car. Every keystroke is satisfying and precise.",
    product: "ND75 — Tactile switches",
    verified: true,
    date: "March 2025",
  },
  {
    id: 2,
    name: "Priya Sharma",
    handle: "@priyakeys",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    title: "Gestalt keycaps are a work of art",
    review:
      "I ordered the Gestalt Keycap set in the Midnight colorway and I genuinely cannot stop staring at my desk. The legends are laser-etched perfectly. Zero shine after 3 months of daily use.",
    product: "Gestalt Keycap Set",
    verified: true,
    date: "February 2025",
  },
  {
    id: 3,
    name: "Jordan Lee",
    handle: "@jl_types",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 4,
    title: "Work Loader is built like a tank",
    review:
      "Solid aluminium case, gasket mount, incredible sound profile. A small dock meant the carry case could use improvement, but the board itself is a 10/10. Ships fast and packaging is premium.",
    product: "Work Loader — Linear switches",
    verified: true,
    date: "April 2025",
  },
  {
    id: 4,
    name: "Sam Okoro",
    handle: "@samkbd",
    avatar: "https://i.pravatar.cc/150?img=60",
    rating: 5,
    title: "Customer support is unmatched",
    review:
      "Had a small issue with a loose stabiliser — reached out and got a response within an hour. They shipped a replacement part the same day. The keyboard itself is phenomenal too. Highly recommended.",
    product: "ND75 — Clicky switches",
    verified: true,
    date: "January 2025",
  },
  {
    id: 5,
    name: "Mia Chen",
    handle: "@mia.types",
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    title: "My WFH setup is finally complete",
    review:
      "Paired the Work Loader with the Gestalt keycaps and I haven't looked back. The sound of linear switches on an aluminium case is pure ASMR. Colleagues on calls keep asking what I'm typing on.",
    product: "Work Loader + Gestalt Bundle",
    verified: true,
    date: "March 2025",
  },
  {
    id: 6,
    name: "Daniel Ruiz",
    handle: "@danruiz_dev",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 5,
    title: "Converted three friends already",
    review:
      "I bought one for myself, then my flatmates tried it and immediately ordered their own. The customisation options are unreal — I love that I can tune the board exactly to my preference.",
    product: "ND75 — Silent switches",
    verified: false,
    date: "April 2025",
  },
];


export const STATS = [
  { value: "4.9", label: "Average rating" },
  { value: "2,400+", label: "Happy customers" },
  { value: "98%", label: "Would recommend" },
];
