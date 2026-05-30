import { deleteSuggestion, getSuggestions } from "@/lib/suggest";

import DeleteBtn from "./delete-button";
import Empty from "./empty";

type Props = {};

const Suggestions = async (props: Props) => {
  const suggestions = await getSuggestions();
  if (suggestions.length === 0) return <Empty label="No suggestions yet." />;
  return (
    <div className="space-y-3">
      {suggestions.map((sugg) => (
        <div key={sugg.id} className="rounded-md border border-border p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{sugg.topic}</div>
              <div className="mono text-xs text-muted-foreground">
                {sugg.category} · {new Date(sugg.createdAt).toLocaleString()}{" "}
                {sugg.email && `· ${sugg.email}`}
              </div>
            </div>
            <DeleteBtn id={sugg.id} callback={deleteSuggestion} />
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm">{sugg.details}</p>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
