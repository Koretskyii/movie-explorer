'use client'
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export default function AccountPage() { 
    const { isAuthenticated, setLoginModalOpen } = useAuthStore();

    useEffect(() => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    }
  }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated ? 
                (
                    <div>
                        <h2>Account Details</h2>
                    </div>
                ) :
                (
                    <div>
                        <h2>Please log in to view your account details.</h2>
                    </div>
                )
            }
        </>
    );
}