"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function SuccessPage() {
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");
    if (data) {
      setPaymentData(JSON.parse(data));
      sessionStorage.removeItem("paymentData"); // Clean up after loading
    }
  }, []);

  if (!paymentData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20">
      <h1 className="text-4xl font-semibold tracking-wider text-green-500">Payment Successful ✅</h1>
     <div className="mt-4"> {JSON.stringify(paymentData.message, null, 2)}</div>
     <Link href={"/objects/people"}><Button className="mt-4">Go to Dashboard</Button></Link>
    </div>
  );
}
