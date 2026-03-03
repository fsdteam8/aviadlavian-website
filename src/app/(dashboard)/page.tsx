import OverView from "@/features/overview/OverView";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 p-4 transition-colors sm:p-6 lg:p-8 dark:bg-slate-950">
      <OverView />
    </main>
  );
}
