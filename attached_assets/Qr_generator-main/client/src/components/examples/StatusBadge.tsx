import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-3">
      <StatusBadge status="Pending" />
      <StatusBadge status="Approved" />
      <StatusBadge status="In Process" />
      <StatusBadge status="Completed" />
    </div>
  );
}
