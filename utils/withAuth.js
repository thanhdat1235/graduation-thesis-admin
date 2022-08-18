import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
