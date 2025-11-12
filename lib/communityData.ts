export type CommunityPost = {
  id: string;
  author: string;
  role: string;
  avatarColor: string;
  timestamp: string;
  category: "personal" | "global";
  title: string;
  content: string;
  tags: string[];
  replies: {
    id: string;
    author: string;
    role: string;
    content: string;
    timestamp: string;
  }[];
};

export const communityPosts: CommunityPost[] = [
  {
    id: "p1",
    author: "Asha D.",
    role: "Sustainability Lead · Aurora Motors",
    avatarColor: "bg-emerald-500",
    timestamp: "2 hours ago",
    category: "personal",
    title: "Looking for quick wins in transport emissions",
    content:
      "We just loaded our Q4 fleet data into EcoMeter. The dashboard shows transport is 38% of our footprint. Has anyone run a successful driver coaching or route optimization pilot recently? Trying to gather slides for next week's steering committee.",
    tags: ["transport", "quick wins"],
    replies: [
      {
        id: "r1",
        author: "Leo M.",
        role: "Carbon Analyst · HelioTech Energy",
        content:
          "We paired telematics coaching with idle shut-off reminders. Reduced fuel burn by ~11% in six weeks. Happy to share the playbook.",
        timestamp: "1 hour ago",
      },
      {
        id: "r2",
        author: "Priya K.",
        role: "Ops Manager · Nova Logistics",
        content:
          "Try segmenting routes by dwell time. EcoMeter's grouped totals made it easy to find the worst offenders before the pilot.",
        timestamp: "45 minutes ago",
      },
    ],
  },
  {
    id: "p2",
    author: "EcoMeter HQ",
    role: "Community Update",
    avatarColor: "bg-sky-500",
    timestamp: "Today",
    category: "global",
    title: "Global challenge: 15% energy reduction sprint",
    content:
      "This quarter we’re spotlighting electricity savings. Submit your best facility efficiency idea before March 15 to unlock a feature on the leaderboard and a coaching session with our mentor network.",
    tags: ["challenge", "electricity"],
    replies: [
      {
        id: "r3",
        author: "Sonia R.",
        role: "Head of ESG · BrightWare",
        content:
          "We are piloting occupancy-based lighting schedules. Expecting 8% drop in facility load. Will share results.",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: "p3",
    author: "Marco T.",
    role: "VP Ops · BrightWare",
    avatarColor: "bg-purple-500",
    timestamp: "Yesterday",
    category: "personal",
    title: "Communicating EcoScore to finance execs",
    content:
      "Our CFO wants a simple narrative tying EcoScore improvements to cost savings. Any scripts or slide templates from your teams?",
    tags: ["finance", "ecoscore"],
    replies: [
      {
        id: "r4",
        author: "EcoMeter HQ",
        role: "Community Update",
        content:
          "Check the usage guide – we added a slide template. Also suggest quantifying avoided carbon taxes plus energy bill reductions.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "p4",
    author: "EcoMeter HQ",
    role: "Community Announcement",
    avatarColor: "bg-pink-500",
    timestamp: "Earlier this week",
    category: "global",
    title: "Global office hours",
    content:
      "Join open office hours every Thursday to troubleshoot data uploads, discuss forecasting ideas, or request new features. Drop questions here and we'll cover them live.",
    tags: ["office hours", "support"],
    replies: [
      {
        id: "r5",
        author: "Jules V.",
        role: "Climate Analyst · TerraFoods",
        content:
          "Can you cover strategies for modelling supplier emissions next? We’d like a blueprint.",
        timestamp: "Earlier this week",
      },
    ],
  },
];


