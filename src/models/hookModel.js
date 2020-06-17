import { useState, useCallback } from 'react';

// 通常我们定义状态，以及更新状态的方法为一个model
export default function useLoading() {
  const [loading, setLoading] = useState(false);

  const show = () => {
    setLoading(true);
  };

  const hide = () => {
    setLoading(false);
  };

  return {
    loading,
    show,
    hide,
  };
}
