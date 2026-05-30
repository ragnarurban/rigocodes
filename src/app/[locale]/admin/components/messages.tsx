import { Trash2 } from "lucide-react";

import { messages } from "@/constants";

type Props = {};

const Messages = (props: Props) => {
  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={`message-${m.id}`}
          className="rounded-md border border-border p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">
                {m.name}{" "}
                <span className="text-muted-foreground font-normal">
                  · {m.email}
                </span>
              </div>
              <div className="mono text-xs text-muted-foreground">
                {new Date(m.date).toLocaleString()}
              </div>
            </div>
            <button
              // onClick={() => deleteMessage(m.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
