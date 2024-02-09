"use client";
import { useState, useEffect } from "react";

function Profile() {
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch(`/api/auth/getProfileById/?id=&{}`);
        const data = await response.json();
        console.log("Profile data:", data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div className="text-center text-3xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:p-18">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
        Mi perfil
      </h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-gray-800 text-xl text-center font-bold mb-6">
            Datos Personales
          </h2>
          <section className="mb-8">
            {profileData && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <p className="text-gray-700 text-lg mb-4">
                    <span className="font-bold">Nombre:</span>{" "}
                    {profileData.fullName}
                  </p>
                  <p className="text-gray-700 text-lg mb-4">
                    <span className="font-bold">Email:</span>{" "}
                    {profileData.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-lg mb-4">
                    <span className="font-bold">Teléfono:</span>{" "}
                    {profileData.phoneNumber}
                  </p>
                  <p className="text-gray-700 text-lg mb-4">
                    <span className="font-bold">Ciudad:</span>{" "}
                    {profileData.city}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
