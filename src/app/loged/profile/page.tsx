"use client";
import { useState, useEffect, useMemo } from "react";
import loading from "../../../app/loading";
import useUserState from "../../../app/store/sotre";
import { useSession } from "next-auth/react";
import { AiOutlineEdit } from "react-icons/ai";

function Profile() {
  const [profileData, setProfileData] = useState<any | null>(null);
  const { fetchUser, user } = useUserState((state) => state);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phoneNumberEditMode, setPhoneNumberEditMode] =
    useState<boolean>(false);
  const [cityEditMode, setCityEditMode] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const memorizedUserId = useMemo(() => user?._id, [user?._id]);

  useEffect(() => {
    fetchUser(session?.user?.email!);
  }, []);

  useEffect(() => {
    async function fetchProfileData() {
      if (!user?._id) {
        console.error("El ID del usuario no está definido.");
        return;
      }
      try {
        const response = await fetch(
          `/api/auth/getProfileById/?id=${user._id}`
        );
        const data = await response.json();
        //console.log("Profile data:", data);
        const { phoneNumber = "", city = "" } = data;
        setProfileData(data);
        setPhoneNumber(phoneNumber);
        setCity(city);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, [memorizedUserId]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value;
    if (/^[0-9+]*$/.test(inputPhoneNumber)) {
      setPhoneNumber(inputPhoneNumber);
      setPhoneNumberError("");
    } else if (!inputPhoneNumber.trim()) {
      setPhoneNumberError("El teléfono no puede estar vacío.");
    } else {
      setPhoneNumberError("El teléfono solo puede contener números");
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputCity = e.target.value;
    setCity(inputCity);
    setCityError(inputCity.trim() ? "" : "La ciudad no puede estar vacía.");
  };

  const handleUpdateProfile = async () => {
    if (!phoneNumber || !city) {
      setPhoneNumberError(
        !phoneNumber ? "El teléfono no puede estar vacío." : ""
      );
      setCityError(!city ? "La ciudad no puede estar vacía." : "");
      return;
    }

    try {
      const response = await fetch(`/api/auth/getProfileById/?id=${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          phoneNumber,
          city,
        }),
      });

      if (response.ok) {
        //console.log("Perfil actualizado con éxito");
        localStorage.setItem(
          "profile",
          JSON.stringify({
            ...profileData,
            phoneNumber,
            city,
          })
        );
        setProfileData({
          ...profileData,
          phoneNumber,
          city,
        });
        setSuccessMessage("Perfil actualizado con éxito");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  if (!session || !profileData) {
    return loading();
  }

  return (
    <>
      <div className="rounded-lg shadow overflow-hidden bg-pink-50 md:pl-48 md:pr-48">
        <div className="px-4 py-5 sm:px-6 text-white">
          <h1 className="text-4xl leading-6 font-bold text-gray-900 text-center">
            Mi perfil
          </h1>
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
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 relative">
                {cityEditMode ? (
                  <>
                    <input
                      type="text"
                      value={city}
                      onChange={handleCityChange}
                      onBlur={() => setCityEditMode(false)}
                      className={`w-full border rounded-md px-2 py-1 ${
                        cityError ? "border-red-500" : ""
                      }`}
                      autoFocus
                    />
                  </>
                ) : (
                  <>
                    {cityError && <p className="text-red-500">{cityError}</p>}
                    <span>{city}</span>
                    <button
                      onClick={() => setCityEditMode(true)}
                      className="absolute top-0 right-0 p-1"
                    >
                      <AiOutlineEdit />
                      <span className="sr-only">Editar Ciudad</span>
                    </button>
                  </>
                )}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">Teléfono</dt>
              <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 relative">
                {phoneNumberEditMode ? (
                  <>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      onBlur={() => setPhoneNumberEditMode(false)}
                      className={`w-full border rounded-md px-2 py-1 ${
                        phoneNumberError ? "border-red-500" : ""
                      }`}
                      autoFocus
                    />
                  </>
                ) : (
                  <>
                    {phoneNumberError && (
                      <p className="text-red-500">{phoneNumberError}</p>
                    )}
                    <button
                      onClick={() => setPhoneNumberEditMode(true)}
                      className="absolute top-0 right-0 p-1"
                    >
                      <AiOutlineEdit />
                      <span className="sr-only">Editar Teléfono</span>
                    </button>
                    <span>{phoneNumber}</span>
                  </>
                )}
              </dd>
            </div>
          </div>
        </dl>

        {/* Botón para guardar los cambios */}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-pink text-white rounded hover:bg-pink-500"
        >
          Guardar cambios
        </button>
      </div>
      {successMessage && (
        <div className="text-green-500 m-2 text-center">{successMessage}</div>
      )}
    </>
  );
}

export default Profile;
