// import { getUserwithId } from "@/actions/user.actions";
// import { authOptions } from "@/lib/authOptions"
// import { getServerSession } from "next-auth"

import { getUserwithId } from '@/actions/user.actions';
import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const PlusMembershipBanner = () => {
  const { data: session, status } = useSession(); // Destructure session and status
  const [plan, setPlan] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      if (session?.user?.id) { // Ensure session and user ID exist before calling API
        try {
          const data = await getUserwithId({ id: session.user.id });
          if (data?.status && data?.additional) {
            setPlan(data.additional.userplan?.planStatus); // Default to 0 if undefined
          } else {
            console.error('Unauthorized');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    getData();
  }, [session?.user?.id]);

  if (status === 'loading') {
    return <Skeleton className="w-full h-9 p-1 rounded-md" />;
  }

  return (
    <div className="w-full flex items-center justify-center bg-primary/20 text-primary rounded-md p-2">
      {plan !== undefined ? `Plan Status: ${plan}` : 'No Plan Available'}
    </div>
  );
};

export default PlusMembershipBanner;



// const PlusMembershipBanner = async() => {
//     const session = await getServerSession(authOptions);
//     if(!session){
//       return "loading"
//     }
//     const userr = await getUserwithId({id:session.user.id});
//     if(!userr.status || !userr.additional){
//         return "ERrro FOund"
//     }
//     return(
      // <div className="w-full flex items-center justify-center bg-primary/20 text-primary rounded-md p-2">
      //    {userr.additional.userplan?.planStatus}
      // </div>
//     )
// }

// export default PlusMembershipBanner
