import { motion } from "framer-motion";

export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2
    }
  }
};

export const item = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  },
};

export default function Spring(props) {
  return <motion.div
    variants={container}
    initial='hidden'
    animate='visible'
    {...props}
  />;
}

export function SpringChildren(props) {
  return <motion.div variants={item} {...props} />
}