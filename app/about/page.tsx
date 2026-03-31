import { BottomNav } from "@/components/BottomNav";
import { LuckyHeader } from "@/components/LuckyHeader";
import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="content-wrap">
        <LuckyHeader subtitle="Clear rules for this mini game" />
        <RuleList />
      </section>
      <BottomNav />
    </main>
  );
}
