export function blur({
  duration,
  easing,
  transitionName: name,
}: {
  duration?: number | string;
  transitionName?: string;
  easing: string;
}) {
  const trans = {
    old: {
      name: name ?? 'view-out',
      duration: duration ?? '300ms',
      easing,
    },
    new: {
      name: name ?? 'view-in',
      duration: duration ?? '300ms',
      easing,
    },
  };

  return {
    forwards: trans,
    backwards: trans,
  };
}
