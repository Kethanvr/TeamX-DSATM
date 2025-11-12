import { communityPosts, sustainabilityChallenges } from "@/lib/communityData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { id: "personal", label: "Personal Discussions", description: "Tactical asks from individual teams." },
  { id: "global", label: "Global Announcements", description: "EcoMeter-wide challenges and updates." },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-12">
      <header className="space-y-3">
        <Badge variant="secondary" aria-label="Community badge">
          Community Hub
        </Badge>
        <h1 className="text-4xl font-bold text-slate-900">Collaborate on sustainability wins</h1>
        <p className="text-slate-600">
          Swap playbooks, join EcoMeter challenges, and unblock teams faster. Personal threads keep
          coaching tight while global channels broadcast program-wide updates.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.id} className="border-dashed border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {category.label}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-900">
                  Sustainability Challenges
                </CardTitle>
                <CardDescription>
                  Practice using sustainable products and game-plan reductions with peer feedback.
                </CardDescription>
              </div>
              <Badge variant="outline">Current Sprint</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {sustainabilityChallenges.map((challenge) => (
              <div key={challenge.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <h3 className="text-lg font-semibold text-emerald-900">{challenge.title}</h3>
                <p className="text-sm text-emerald-800">{challenge.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-emerald-700">
                  <span className="rounded-full bg-white/80 px-3 py-1">{challenge.timeline}</span>
                  <span className="rounded-full bg-white/80 px-3 py-1">{challenge.goal}</span>
                </div>
                <p className="mt-3 text-xs text-emerald-700">
                  Featured products: {challenge.featuredProducts.join(", ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {communityPosts.map((post) => (
          <Card key={post.id} className="bg-white shadow-sm">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${post.avatarColor}`}
                  aria-hidden="true"
                >
                  {post.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-slate-900">{post.author}</p>
                    <Badge variant={post.category === "personal" ? "outline" : "secondary"}>
                      {post.category === "personal" ? "Personal" : "Global"}
                    </Badge>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{post.role}</p>
                  <p className="text-xs text-slate-400">{post.timestamp}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="text-sm text-slate-600">{post.content}</p>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Discussion
                </p>
                <div className="space-y-4">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">{reply.author}</p>
                        <span className="text-xs text-slate-400">{reply.timestamp}</span>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{reply.role}</p>
                      <p className="mt-2 text-sm text-slate-600">{reply.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

