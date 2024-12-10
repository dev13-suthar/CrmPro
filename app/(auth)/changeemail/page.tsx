"use client";

import { updateToNewEmail } from "@/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Suspense } from "react";

const ChangeEmail = () => {
  const params = useSearchParams();
  const token = params.get("token");

  if (!token) {
    return "No token found, sorry";
  }

  return (
    <div className="py-20">
      <div className="max-w-screen-sm w-full flex flex-col items-center justify-center mx-auto gap-2">
        <p className="text-2xl">Click on Verify to Update Your Email</p>
        <Button
          onClick={() => {
            toast.promise(updateToNewEmail({ token: token }), {
              loading: "Wait while We Update your Email",
              success: (data) => {
                return `${data.message}`;
              },
              error: () => {
                return `Error While Updating!`;
              },
            });
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

const ChangeEmailWithSuspense = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <ChangeEmail />
  </Suspense>
);

export default ChangeEmailWithSuspense;
