import { Eye, Heart, Inbox, Share2 } from "lucide-react";

import { posts, messages, suggestions } from "@/constants";

import Stat from "../components/stat";

type Props = {};

const Page = (props: Props) => {
  const totals = {
    total: 84,
    likes: 15,
    views: 60,
    shares: 9,
  };

  const rows = [...posts]
    .map((p) => ({ ...p, ...{ views: 20, likes: 5, shares: 3 } }))
    .sort((a, b) => b.views - a.views);
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Posts" value={posts.length} />
        <Stat label="Views" value={totals.views} icon={Eye} />
        <Stat label="Likes" value={totals.likes} icon={Heart} />
        <Stat label="Shares" value={totals.shares} icon={Share2} />
        <Stat
          label="Messages"
          value={messages.length + suggestions.length}
          icon={Inbox}
        />
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 mono text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Post</th>
              <th className="px-4 py-3 text-right">Views</th>
              <th className="px-4 py-3 text-right">Likes</th>
              <th className="px-4 py-3 text-right">Shares</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium">{r.title}</div>
                  <div className="mono text-xs text-muted-foreground">
                    {r.category}
                  </div>
                </td>
                <td className="px-4 py-3 text-right mono">{r.views}</td>
                <td className="px-4 py-3 text-right mono">{r.likes}</td>
                <td className="px-4 py-3 text-right mono">{r.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
