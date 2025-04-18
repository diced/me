export function blurZoom({
  duration,
  easingIn,
  easingOut,
}: {
  duration?: number | string,
  easingIn: string,
  easingOut: string,
}) {
  const blurShrink = {
    old: {
      name: 'blur-shrink-out',
      duration: duration ?? '300ms',
      easing: easingIn,
    },
    new: {
      name: 'blur-shrink-in',
      duration: duration ?? '300ms',
      easing: easingOut,
    },
  };

  return {
    forwards: blurShrink,
    backwards: blurShrink,
  };
}