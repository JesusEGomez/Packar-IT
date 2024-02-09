"use client";
import { useState, useEffect } from "react";
import loading from "../../../app/loading";
import useUserState from "../../../app/store/sotre";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Profile() {
  const [profileData, setProfileData] = useState<any | null>(null);
  const { fetchUser } = useUserState((state) => state);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  console.log(session);

  useEffect(() => {
    fetchUser(session?.user?.email!);
  }, []);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const responseUser = await fetch(
          `/api/auth/myid/?email=${session?.user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userData = await responseUser.json();
        setUserId(userData);
        const response = await fetch(
          `/api/auth/getProfileById/?id=${userData._id}`
        );
        const data = await response.json();
        console.log("Profile data:", data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, []);

  if (!session || !profileData) {
    return loading();
  }

  return (
    <div className="rounded-lg shadow overflow-hidden bg-pink-50">
      <div className="px-4 py-5 sm:px-6 text-white">
        <h1 className="text-4xl leading-6 font-bold text-gray-900 text-center">
          Mi perfil
        </h1>
      </div>
      <div className="flex justify-center items-center m-3">
        <Avatar className="w-40 h-40">
          <AvatarImage src={session?.user?.image!} alt="@shadcn" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </div>
      <dl className="border-t border-gray-200 px-4 py-5 sm:p-0 m-5">
        <div className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-700">Nombre</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session?.user?.name!}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-700">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {session?.user?.email!}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-700">Ciudad</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profileData?.city || "No disponible"}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-700">Teléfono</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {profileData?.phoneNumber || "No disponible"}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

export default Profile;
