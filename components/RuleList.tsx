const RULES = [
  "Each spin sends a tiny on-chain fee on Base.",
  "If this round wins, your address receives +5 points on-chain.",
  "Current contract uses a simple on-chain pseudo-random mechanism.",
  "A stronger randomness design can be added in a future upgrade."
];

export function RuleList() {
  return (
    <section className="card rule-list">
      <h2 className="panel-title">How It Works</h2>
      <ul>
        {RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}
