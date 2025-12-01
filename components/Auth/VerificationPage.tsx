"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingScreen from "@components/Common/LoadingScreen";
import NotFound from "@components/Common/PageNotFound";
import axios from "axios";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const verifytoken = searchParams.get("token");

  useEffect(() => {
    if (!verifytoken) {
      return;
    }

    let isMounted = true;

    const verifyemail = async () => {
      try {
        const res = await axios.post("/api/users/verify-email", {
          verifytoken,
        });

        if (!isMounted) {
          return;
        }

        if (res.status === 200) {
          setStatus("success");
        }

        setTimeout(() => router.push("/"), 3000);
        setLoading(false);
      } catch {
        if (!isMounted) {
          return;
        }
        setStatus("error");
        setLoading(false);
      }
    };

    verifyemail();

    return () => {
      isMounted = false;
    };
  }, [router, verifytoken]);

  if (!verifytoken) {
    return <NotFound />;
  }

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-EggShell px-4">
      <div className="text-center">
        {status === "loading" && (
          <p className="text-lg">Verifying your email...</p>
        )}

        {status === "success" && (
          <div>
            <h1 className="text-2xl font-bold text-KebabGreen mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Redirecting to homepage...
            </p>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              {" "}
              Verification Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              The verification link is invalid or expired.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
