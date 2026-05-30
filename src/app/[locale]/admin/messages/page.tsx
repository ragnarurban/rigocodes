import { Empty } from "@/components/ui/empty";
import { deleteMessage, getMessages } from "@/lib/message";

import DeleteBtn from "../components/delete-button";

type Props = {};

const Page = async (props: Props) => {
  const messages = await getMessages();
  if (messages.length < 1) return <Empty />;
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
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
            <DeleteBtn id={m.id} callback={deleteMessage} />
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
