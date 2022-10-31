import { useRef } from "react";
import BackTop from "@/components/BackTop";

const Home = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const getHeaderRef = (node: any) => {
    headerRef.current = node
  }
  return (
    <>
      <div ref={getHeaderRef}>header</div>
      <BackTop
        duration={2000}
        // target={ () => headerRef.current as HTMLElement}
        visibilityHeight={100}
      />
    </>
  )
};

export default Home;
