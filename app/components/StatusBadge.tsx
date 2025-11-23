import { ContainerStatus } from '../types';

interface StatusBadgeProps {
  status: ContainerStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    loading: { label: '裝載中', color: 'bg-gray-100 text-gray-700 border border-gray-300' },
    in_transit: { label: '運送中', color: 'bg-gray-100 text-gray-700 border border-gray-300' },
    at_airport: { label: '機場中', color: 'bg-gray-100 text-gray-700 border border-gray-300' },
    delivered: { label: '已送達', color: 'bg-gray-900 text-white border border-gray-900' },
    anomaly: { label: '異常', color: 'bg-gray-100 text-gray-900 border border-gray-400' },
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}
