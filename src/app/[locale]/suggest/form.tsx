"use client";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

import FormField from "@/components/form-field";
import { categories } from "@/constants";
import { createSuggestion } from "@/lib/suggest";

const initialState = {
  error: null,
  success: null,
};

const SuggestionForm = () => {
  const [state, action, isPending] = useActionState(
    createSuggestion,
    initialState,
  );
  const t = useTranslations("Suggest");

  return (
    <>
      {state?.success && (
        <div className="mt-8 flex items-center gap-3 rounded-md border border-amber-text-amber-400/40 bg-amber-text-amber-400/10 p-4 text-amber-400">
          <Check className="h-5 w-5" /> {t("thankYou")}
        </div>
      )}

      <form action={action} className="mt-10 space-y-6">
        {state?.error && (
          <p className="text-sm text-destructive">{state?.error}</p>
        )}

        <FormField label={t("topic")}>
          <input
            name="topic"
            maxLength={120}
            required
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
          />
        </FormField>
        <FormField label={t("category")}>
          <select
            name="category"
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label={t("details")}>
          <textarea
            name="details"
            maxLength={2000}
            required
            rows={6}
            className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-ring"
          />
        </FormField>
        <FormField label="Email">
          <input
            type="email"
            name="email"
            required
            maxLength={255}
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
          />
        </FormField>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
            disabled={isPending}
          >
            {isPending ? t("pendingBtn") : t("sendBtn")}
          </button>
        </div>
      </form>
    </>
  );
};

export default SuggestionForm;
