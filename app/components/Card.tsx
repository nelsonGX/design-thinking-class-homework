interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function Card({ title, children, className = '', action }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded p-6 ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
