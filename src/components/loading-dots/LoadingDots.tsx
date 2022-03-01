// https://github.com/geist-org/geist-ui/blob/master/components/loading/loading.tsx
import styles from "./LoadingDots.module.scss";

function LoadingDots() {
  return (
    <span className={styles.loading}>
      <span />
      <span />
      <span />
    </span>
  );
}

export default LoadingDots;
