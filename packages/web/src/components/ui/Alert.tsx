import React from 'react';

interface AlertProps {
  message: string;
  type: string;
}

function Alert({ message, type }: AlertProps) {
  const alertStyles = type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-800';

  return (
    <div className={`p-2 mb-2 text-center rounded border ${alertStyles}`}>
      {message}
    </div>
  );
}

export default Alert;
