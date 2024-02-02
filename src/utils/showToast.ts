import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

export const showToast = (message: string, type: ToastType = 'default') => {
  const toastType = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
    default: toast,
  };

  return (toastType[type] || toastType.default)(message);
};
