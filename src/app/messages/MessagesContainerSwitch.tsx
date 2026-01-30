"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = { initialContainer: string };

export default function MessagesContainerSwitch({ initialContainer }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const container = searchParams.get("container") ?? initialContainer;

  const setContainer = (value: "inbox" | "outbox") => {
    const params = new URLSearchParams(searchParams);
    params.set("container", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const isOutbox = container === "outbox";

  return (
    <div className="inline-flex w-full rounded-xl bg-default-100 p-1">
      <button
        type="button"
        className={`flex-1 rounded-lg px-3 py-2 text-sm transition ${
          !isOutbox ? "bg-background shadow-sm text-foreground" : "text-default-500"
        }`}
        onClick={() => setContainer("inbox")}
      >
        Inbox
      </button>

      <button
        type="button"
        className={`flex-1 rounded-lg px-3 py-2 text-sm transition ${
          isOutbox ? "bg-background shadow-sm text-foreground" : "text-default-500"
        }`}
        onClick={() => setContainer("outbox")}
      >
        Outbox
      </button>
    </div>
  );
}
