type LuckyHeaderProps = {
  subtitle: string;
};

export function LuckyHeader({ subtitle }: LuckyHeaderProps) {
  return (
    <header className="lucky-header">
      <div className="brand-mark" aria-hidden>
        BLW
      </div>
      <div>
        <p className="brand-name">BaseLuckyWheel</p>
        <p className="brand-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
