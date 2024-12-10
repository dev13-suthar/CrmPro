/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'
import PlanCard from '../PlanCard'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';



// import { useSetRecoilState } from 'recoil'
// import { usrrr } from '@/states/PeopleAtoms'

const UpgradToPlusModal = () => {
    const session = useSession();
    const router = useRouter();
    // const setadminUser = useSetRecoilState(usrrr);
    const userId = session.data?.user.id
    const handlePayment = async()=>{
      const res = await axios.post("/api/payments/createorder",{amount:670,userId:userId ?? 2});
      const data = await res.data;
      const options = {
        key: "rzp_test_M2br89xzA9MbfX",
        amount: data.ord.amount, // Amount in paise
        currency: "INR",
        name: "CrmPro",
        description: "Plus Membership",
        order_id: data.ord.id, // Generate order_id on server
        handler: async(res:any) => {
           const response = await axios.post("/api/payments/verify",{orderId:data.ord.id,razorpayPaymentId:res.razorpay_payment_id,razorpaySignature:res.razorpay_signature});
           const dataa = await response.data;
           sessionStorage.setItem("paymentData", JSON.stringify(dataa));
           if(dataa.isOk === true){
              alert(dataa.message);
              router.push("/success");
           }else{
            alert(dataa.message)
           }
           router.refresh();
        },
        notes:{
          userId:String(userId),
        },
        prefill: {
          //Users Details from DB
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const payment = new (window as any).Razorpay(options);
      payment.on('payment.failed', function (response:any){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
      payment.open();
    }
    if(session.status==="loading"){
        return "Loadingg..."
    }
  return (
  <>
    <Script type='text/javascript' src='https://checkout.razorpay.com/v1/checkout.js'/>
    <Dialog>
         <DialogTrigger asChild>
             <Button>Upgrad to Plus</Button>
         </DialogTrigger>
         <DialogContent className='max-w-[430px] md:max-w-[800px]  overflow-auto'>
            <DialogHeader>
                <DialogTitle className='text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                    SuperCharge Your Customer Relationship
                </DialogTitle>
                <DialogDescription className='text-center font-semibold bg-gradient-to-l from-violet-400 to-primary bg-clip-text text-transparent'>
                    Unlock powerful features to skyrocket your customer relationships and boost productivity
                </DialogDescription>
            </DialogHeader>
            <div className='grid md:grid-cols-2 gap-5 py-4 place-content-center justify-center items-center'>
               <div className='flex items-center justify-center w-full'>
                <PlanCard
                    title='Free Plan'
                    pricePerMonth={0}
                    supportedFeatures={["100 Contacts","Email Integration","Integrated Calender","Limited Vault Space"]}
                    nonsupportedFeatures={["Unlimited BrodCast","Unlimited Vault Space","Priority Support"]}
                    />
               </div>
                <div className='flex items-center justify-center w-full'>
                    <PlanCard
                    title='Plus Plan 🚀'
                    pricePerMonth={9}
                    supportedFeatures={["Unlimited Contact","Email & Calender Intergration","Calender Integration","500mb Vault Space","5 Bordcasts Per Week","Priority Support"]}
                    actionButton = {
                        <>
                        <Button onClick={handlePayment}>Buy Now</Button>
                        </>
                    }
                    />
                </div>
            </div>
         </DialogContent>
    </Dialog>
    </>
  )
}

export default UpgradToPlusModal


//TEST WEBHOKK  = "HsqT2@TxTSK4smq"


///////////////////// OTHER WAY TO OPEN PAYMENT DIALOG ////////////////////////

// const {Razorpay} = useRazorpay();
    // const handlePayment = async()=>{

        // const res = await axios.post("/api/payments/createorder",{amount:670,userId:userId ?? 2});
        // const data = await res.data;
    //     console.log(data);
    //     const options: RazorpayOrderOptions = {
    //         key: "rzp_test_M2br89xzA9MbfX",
    //         amount: data.ord.amount, // Amount in paise
    //         currency: "INR",
    //         name: "Test Company",
    //         description: "Test Transaction",
    //         order_id: data.ord.id, // Generate order_id on server
    //         handler: (response) => {
    //           console.log(response);
    //           router.push("/objects/people")
    //           // alert("Payment Successful!");
    //         },
    //         notes:String(userId),
    //         prefill: {
    //           name: "John Doe",
    //           email: "john.doe@example.com",
    //           contact: "9999999999",
    //         },
    //         theme: {
    //           color: "#F37254",
    //         },
    //       };

    //       const razor = new Razorpay(options);
    //       razor.on("payment.failed",function(res:any){
    //       console.log(res.error.reason);
    //     })
    //     razor.open();
    // }
