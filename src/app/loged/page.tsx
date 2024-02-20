"use client";
import React, { useEffect, useState } from "react";
import logo from "../../img/undraw_Deliveries_2r4y.png";
import Image from "next/image";
import { RiMapPinAddLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import MapComponent from "../components/MapComponent";
import { getFormattedAddress } from "../api/components/components";
import { Calendar } from "@/components/ui/calendar";
import { ProdModal } from "../components/ProdModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectDriver from "../components/SelectDriver";
import QuienEnvia from "../components/QuienEnvia";
import Confirmacion from "../components/Confirmacion";
import FormEnvio from "../components/FormEnvio";
import DateModal from "../components/DateModal";
import { pushNotification } from "../api/auth/addNotification/pushNotification";
import useUserState from "../store/sotre";
import { IProfile } from "../interfaces/profile.interface";

type prod = {
  type: string;
  name: string;
  size: string;
  weight: string;
  photoProduct: string;
  articulosEspeciales: string;
};
export interface FormInputs {
  ciudadOrigen: string;
  paisOrigen: string;
  ciudadDestino: string;
  paisDestino: string;
  como: string;
}
type receptor = {
  nombreApellido: string;
  telefono: number;
  email: string;
};

const Loged = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [prodModal, setProdModal] = React.useState(false);
  const [selectedProductData, setSelectedProductData] = useState<prod | null>(
    null
  );
  const [paisOrigen, setPaisOrigen] = React.useState<string | null>(null);
  const [paisDestino, setPaisDestino] = React.useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [selectdriverOpen, setSelectdriverOpen] = useState<boolean>(false);
  const [driver, setDriver] = useState(null);
  const { data: session, status } = useSession();
  const [ciudadOrigen, setCiudadOrigen] = useState<string | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<string | null>(null);
  const [receptor, setReceptor] = useState<boolean | null>(false);
  const [receptorInfo, setReceptorInfo] = useState<receptor | null>(null);
  const [lastModalOpen, setLastModalOpen] = useState<boolean>(false);
  const [envio, setEnvio] = useState<any | null>(null);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  // const [profile, setProfile] = useState<IProfile | null>();
  const { user, fetchUser, profile } = useUserState((state) => state);

  const fromHandler = () => {
    setFromModalOpen(true);
  };

  const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
    setFromModalOpen(false);
    const fromLocation = await getFormattedAddress(fromSelected);
    //console.log(fromLocation);
    const fromArray = fromLocation.split(",");
    const city = fromArray[1].trim().replaceAll(" ", "-");
    setCiudadOrigen(city);
    setPaisOrigen(fromArray[fromArray.length - 1]);
    setFrom(fromArray[0]);
  };

  const toHandler = () => {
    setToModalOpen(true);
  };

  const closeMapModal = () => {
    setFromModalOpen(false);
    setToModalOpen(false);
  };

  const toModelClose = async (toSelected: google.maps.LatLngLiteral) => {
    setToModalOpen(false);
    const toLocation = await getFormattedAddress(toSelected);
    //console.log(toLocation);
    const toArray = toLocation.split(",");

    const city = toArray[1].trim().replaceAll(" ", "-");
    setCiudadDestino(city);
    setPaisDestino(toArray[toArray.length - 1]);
    setTo(toArray[0]);
  };

  const justCloseSelectDriver = () => {
    setSelectdriverOpen(false);
  };
  const confrmacionHandler = () => {
    //console.log("hola");
  };
  const closeLastModal = () => {
    setLastModalOpen(false);
  };
  const productsHandler = () => {
    setProdModal(true);
  };
  const closeProdModal = (selectedProductData: any) => {
    console.log(selectedProductData);
    setProdModal(false);
    setSelectedProductData(selectedProductData);
  };
  const closeSelectDriver = (data: any) => {
    setSelectdriverOpen(false);
    setDriver(data);
    setLastModalOpen(true);
  };
  const dateModalHandler = (date: Date) => {
    setDate(date);
    setDateModalOpen(!dateModalOpen);
  };
  const dateModalClose = () => {
    setDateModalOpen(!dateModalOpen);
  };
  const navigate = useRouter();
  const searchHandler = () => {
    setSelectdriverOpen(true);
  };
  const receptorOpen = () => {
    setReceptor(true);
  };
  const receptorClose = (data: receptor) => {
    setReceptorInfo(data);
    setReceptor(false);
  };
  const { handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    //console.log(data);
  };

  useEffect(() => {
    !session && navigate.push("/prelogin/register/login");

    fetchUser(session?.user?.email!);

    

    from &&
      to &&
      date &&
      selectedProductData &&
      receptorInfo &&
      setSearch(true);

    setEnvio({
      desde: { calle: from, pais: paisOrigen, ciudad: ciudadOrigen },
      hasta: { calle: to, pais: paisDestino, ciudad: ciudadDestino },
      cuando: date,
      producto: selectedProductData,
      recibe: receptorInfo,
    });
  }, [from, to, date, selectedProductData, receptorInfo]);

  return (
    <div className="flex flex-col items-center max-h-screen bg-pink overflow-y-auto overflow-visible ">
      <div>
        <Image
          className="my-8 rounded-full "
          src={logo}
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      {/* hola */}
      <div className="flex flex-col mx-auto items-center flex-wrap align-content-center overflow-y-auto fixed max-h-lvh top-40 left-5 right-5 bg-white border rounded-xl 2xl:top-52 2xl:w-1/3 2xl:min-h-80">
        <h1 className="font-bold text-xl m-4">¿Que quieres enviar?</h1>
        <div className="flex flex-col text-center items-center gap-y-1 ">
          <form
            className="flex flex-col items-center gap-y-3 p-2.5 h-3/4 sm:z-10 sm:overflow-y-auto sm:flex-wrap sm:align-content-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center overflow-y-auto ">
              <button
                className={`flex items-center p-3 gap-x-4 border-b mx-4 w-72 ${
                  from ? "text-black-500" : "text-slate-400"
                }`}
                onClick={fromHandler}
                title={from || undefined}
              >
                {<RiMapPinAddLine size={30} />}
                {from === null
                  ? "Dirección Origen"
                  : from.length > 20
                  ? `${from.slice(0, 15)}.....`
                  : `${from}`}
              </button>
              <button
                className={`flex items-center p-3 gap-x-4 border-b  mx-4 w-72 2xl:w-96 2xl:p-5 ${
                  to ? "text-black-500" : "text-slate-400"
                }`}
                onClick={toHandler}
                title={to || undefined}
              >
                <RiMapPin2Fill size={30} />
                {to === null
                  ? "Dirección Destino"
                  : to.length > 20
                  ? `${to.slice(0, 15)}.....`
                  : `${to}`}
              </button>
              <button
                onClick={() => dateModalClose()}
                className={`flex items-center p-3 gap-x-4 border-b mx-4 w-72 2xl:w-96 2xl:p-5 ${
                  date ? "text-black-500" : "text-slate-400"
                }`}
              >
                <FaRegCalendarAlt size={30} />
                {date
                  ? `${date.toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}`
                  : "Cuando"}
              </button>
              <button
                onClick={() => productsHandler()}
                className={`flex items-center p-3 gap-x-4 border-b mx-4 w-72 2xl:w-96 2xl:p-5 ${
                  selectedProductData ? "text-black-500" : "text-slate-400"
                }`}
              >
                <BsBoxSeam size={30} />
                {selectedProductData
                  ? `${selectedProductData.name}`
                  : "Producto"}
              </button>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center">
                {receptorInfo ? (
                  <button
                    onClick={() => searchHandler()}
                    className={`bg-pink ${
                      search ? "w-full" : "w-auto"
                    } m-1 disabled:opacity-70 text-white font-bold rounded-xl p-2`}
                    disabled={
                      !search || !profile || !profile?.customerId || profile.phoneNumber.length < 9
                    }
                  >
                    Buscar
                  </button>
                ) : (
                  <button
                    className="bg-pink w-full disabled:opacity-70 m-1 text-white font-bold rounded-xl p-2"
                    onClick={() => receptorOpen()}
                  >
                    Datos del Receptor
                  </button>
                )}
              </div>
            </div>

            {profile?.phoneNumber && profile.phoneNumber.length < 9 && (
              <p>
                Debes tener un Numero de teléfono valido para crear un envió
              </p>
            )}
          </form>
        </div>
      </div>
      <div></div>
      <div className="flex flex-col items-center bg-pink sm:w-auto s:z-10">
        {fromModalOpen && (
          <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <MapComponent
                closeMapModal={closeMapModal}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}
        {toModalOpen && (
          <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <MapComponent
                closeModal={toModelClose}
                closeMapModal={closeMapModal}
              />
            </div>
          </div>
        )}
        {prodModal && (
          <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <ProdModal closeModal={closeProdModal} />
            </div>
          </div>
        )}
        {dateModalOpen && (
          <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <DateModal
                date={date!}
                dateModalClose={dateModalClose}
                dateModalHandler={dateModalHandler}
              />
            </div>
          </div>
        )}
        {receptor && (
          <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <QuienEnvia closeModal={receptorClose} />
            </div>
          </div>
        )}
        {selectdriverOpen && (
          <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <SelectDriver
                close={closeSelectDriver}
                open={selectedProductData}
                ciudadOrigen={ciudadOrigen}
                ciudadDestino={ciudadDestino}
                justClose={justCloseSelectDriver}
              />
            </div>
          </div>
        )}
        {lastModalOpen && (
          <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <Confirmacion
                closeModal={closeLastModal}
                confirmar={confrmacionHandler}
                driver={driver}
                envio={envio}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Loged;
