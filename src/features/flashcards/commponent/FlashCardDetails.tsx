"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useInjuryFlashcardId,
  useCreateFlashcardReview,
} from "../hooks/useFlashCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FlashCardDetailsProps = {
  subspecialty?: string;
  chapter?: string;
  lastid?: string;
  flashcardId?: string;
};

const FlashCardDetails = ({
  subspecialty = "Knee",
  chapter = "Chondromalacia Patella",
  lastid,
  flashcardId,
}: FlashCardDetailsProps) => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState<string | null>(null);
  const [customInterval, setCustomInterval] = useState("");

  const { data: flashdata } = useInjuryFlashcardId(lastid || "");
  const createReviewMutation = useCreateFlashcardReview();

  const handleSubmitReview = () => {
    if (!lastid || !confidenceRating || !customInterval) return;

    const resultMap: Record<string, string> = {
      correct: "correct",
      incorrect: "wrong",
      unknown: "unknown",
    };

    createReviewMutation.mutate({
      flashcardId: lastid,
      result: resultMap[confidenceRating] || "wrong",
      customInterval: customInterval,
    });
  };

  const question = flashdata?.data?.question || "Loading...";
  const answer = flashdata?.data?.answer || "Loading...";

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Flashcards
          </h1>
          <Link
            href={`/flashcards/${flashcardId || ""}`}
            className="w-fit rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Back to List
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-400">
          <Link
            href="/flashcards"
            className="hover:underline uppercase tracking-tight"
          >
            Flashcards
          </Link>
          <span className="text-slate-400 font-normal px-0.5">›</span>
          <span className="uppercase tracking-tight">{subspecialty}</span>
          <span className="text-slate-400 font-normal px-0.5">›</span>
          <Link
            href={`/flashcards/${flashcardId}?subspecialty=${subspecialty}&chapter=${chapter}`}
            className="truncate hover:underline uppercase tracking-tight max-w-[150px] sm:max-w-none"
          >
            {chapter}
          </Link>
          <span className="text-slate-400 font-normal px-0.5">›</span>
          <span className="shrink-0 text-slate-500 dark:text-slate-500 uppercase tracking-tight">
            Study
          </span>
        </div>

        {/* Main Content */}
        <div className="mt-8  max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Current Flashcard
          </h2>

          {/* Question and Answer Card */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-orange-200 shadow-sm dark:border-orange-900/30">
            {/* Question Section */}
            <div className="bg-orange-50/50 p-6 sm:p-10 dark:bg-orange-950/10">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100/50 text-3xl dark:bg-orange-900/20">
                  🫀
                </div>
              </div>
              <p className="text-center text-base sm:text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {question}
              </p>
            </div>

            {/* Answer Section */}
            <div className="bg-white p-6 sm:p-8 dark:bg-slate-900 border-t border-orange-100 dark:border-orange-900/20">
              {!isAnswerRevealed ? (
                <button
                  type="button"
                  onClick={() => setIsAnswerRevealed(true)}
                  className="mx-auto block w-full sm:w-64 rounded-xl bg-orange-700 py-3 text-center font-bold text-white shadow-lg shadow-orange-700/20 transition hover:bg-orange-800 active:scale-95"
                >
                  Reveal Answer
                </button>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#007b5e]">
                    Answer
                  </span>
                  <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {answer}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interaction Area */}
          {isAnswerRevealed && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                How well did you know this?
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfidenceRating("correct")}
                  className={`flex-1 min-w-[100px] rounded-xl border-2 py-3 px-4 text-sm font-bold transition-all ${
                    confidenceRating === "correct"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  }`}
                >
                  Correct
                </button>
                <button
                  type="button"
                  onClick={() => setConfidenceRating("incorrect")}
                  className={`flex-1 min-w-[100px] rounded-xl border-2 py-3 px-4 text-sm font-bold transition-all ${
                    confidenceRating === "incorrect"
                      ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-red-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  }`}
                >
                  Wrong
                </button>
                <button
                  type="button"
                  onClick={() => setConfidenceRating("unknown")}
                  className={`flex-1 min-w-[100px] rounded-xl border-2 py-3 px-4 text-sm font-bold transition-all ${
                    confidenceRating === "unknown"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  }`}
                >
                  Unknown
                </button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="grow text-center sm:text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Repetitions
                  </p>
                  <p className="text-xs text-slate-500">
                    How many times have you seen this before?
                  </p>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                  <Input
                    type="text"
                    placeholder="e.g., 2m, 1h, 3d"
                    value={customInterval}
                    onChange={(e) => setCustomInterval(e.target.value)}
                    className="bg-white dark:bg-slate-900"
                  />
                  <Button
                    onClick={handleSubmitReview}
                    disabled={
                      !confidenceRating ||
                      !customInterval ||
                      createReviewMutation.isPending
                    }
                    className="bg-orange-700 hover:bg-orange-800 text-white font-bold"
                  >
                    {createReviewMutation.isPending
                      ? "Saving..."
                      : "Submit Review"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashCardDetails;
