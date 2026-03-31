type StatusChipProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "danger";
};

export function StatusChip({ label, tone = "default" }: StatusChipProps) {
  return <span className={`status-chip tone-${tone}`}>{label}</span>;
}
