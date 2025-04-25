import Image from "next/image";
import styles from "./LoadingScreen.module.css";
import logo from "@public/assets/KC_Logo_Logomark_green.svg";

const LoadingScreen = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Image src={logo} alt="Loading..." className={styles.logo} />
    </div>
  );
};

export default LoadingScreen;

