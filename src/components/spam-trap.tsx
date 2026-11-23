"use client";
import { useEffect, useState } from "react";

import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "@/lib/spam";

/**
 * Hidden anti-spam fields for public forms: a honeypot input that humans
 * never see, and the time the form was mounted (set only once JS runs).
 * The server checks both with `isLikelyBot` from `@/lib/spam`.
 */
const SpamTrap = () => {
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <input type="hidden" name={STARTED_AT_FIELD} value={startedAt} readOnly />
    </>
  );
};

export default SpamTrap;
