"use client";

import React from "react";
import Link from "next/link";
import { useAllFlashcards, useFlashcardProgress } from "../hooks/useFlashCard";

type InjuryData = {
  _id: string;
  question: string;
  answer: string;
  topicId: string;
  difficulty: string;
  isActive: boolean;
  userAnswer: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

type SubFlashCardProps = {
  flashcardId?: string;
  flashcardTitle?: string;
  subspecialtyTitle?: string;
  chapterTitle?: string;
};

const SubFlashCard = ({
  flashcardId,
  subspecialtyTitle = "Knee",
  chapterTitle = "Chondromalacia Patella",
}: SubFlashCardProps) => {
  const { data: injuriesData, isLoading } = useAllFlashcards(flashcardId || "");
  const { data: progressData } = useFlashcardProgress(flashcardId || "");

  const injuries: InjuryData[] = injuriesData?.data || [];

  // Use backend summary data
  const summary = progressData?.data?.summary;
  const total = summary?.totalFlashcards || injuries.length;
  const correctCount = summary?.correct || 0;
  const wrongCount = summary?.wrong || 0;

  const correctPercent = total > 0 ? (correctCount / total) * 100 : 0;
  const wrongPercent = total > 0 ? (wrongCount / total) * 100 : 0;
  const totalCompletedPercent =
    total > 0 ? ((correctCount + wrongCount) / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Flashcards
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-400">
          <Link
            href="/flashcards"
            className="hover:underline uppercase tracking-tight"
          >
            Flashcards
          </Link>
          <span className="text-slate-400 font-normal px-0.5">›</span>
          <span className="uppercase tracking-tight">{subspecialtyTitle}</span>
          {chapterTitle && (
            <>
              <span className="text-slate-400 font-normal px-0.5">›</span>
              <span className="uppercase tracking-tight text-slate-500 dark:text-slate-500">
                {chapterTitle}
              </span>
            </>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-800/60">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {subspecialtyTitle} Flashcards
          </h2>

          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            Your Progress
          </p>

          <div className="mt-2 h-3 w-full flex overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${correctPercent}%` }}
              title={`Correct: ${correctCount}`}
            />
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${wrongPercent}%` }}
              title={`Wrong: ${wrongCount}`}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-orange-700 dark:text-orange-400">
                {Math.round(totalCompletedPercent)}% completed
              </span>{" "}
              of {total} questions
            </p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {correctCount} Correct
              </span>
              <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {wrongCount} Wrong
              </span>
            </div>
          </div>

          <Link
            href={`/flashcards/${flashcardId}/${injuries.find((i) => !i.userAnswer)?._id || injuries[0]?._id || ""}`}
            className="mt-4 inline-block rounded-full bg-orange-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-800"
          >
            Resume Flashback
          </Link>
        </div>

        <div className="mt-6">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Choose an injury to study
          </h2>

          {isLoading ? (
            <div className="mt-4 text-center text-slate-600 dark:text-slate-400">
              Loading injuries...
            </div>
          ) : injuries.length === 0 ? (
            <div className="mt-4 text-center text-slate-600 dark:text-slate-400">
              No injuries found
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {injuries.map((injury, index) => (
                <li
                  key={injury._id}
                  className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className=" w-full flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-800 dark:text-slate-200">
                          <span className="font-medium">Q{index + 1}:</span>{" "}
                          {injury.question}
                        </p>
                        <Link
                          href={{
                            pathname: `/flashcards/${flashcardId}/${injury._id}`,
                          }}
                          className="mt-1 inline-block text-sm font-semibold text-orange-700 transition hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          Reveal answer
                        </Link>
                      </div>
                      <div>
                        <p>{injury.userAnswer || "Not answered yet"}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubFlashCard;
