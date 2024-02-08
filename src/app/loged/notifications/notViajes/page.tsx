import CardNotification from "@/app/components/CardNotification";
import { INotification } from "@/app/interfaces/notifications.interface";
import { toDate } from "date-fns";

const NotEnvios = () => {
  const Prueba: INotification = {
    type: "solicitudServicio",
    usuario: "65b2cee6d11c0c635e89bd97",
    desde: {
      calle: "17 Santiago Humberstone",
      pais: " Chile",
      ciudad: "Antofagasta",
    },
    hasta: {
      calle: "2799 Santiago Humberstone",
      pais: " Chile",
      ciudad: "Calama",
    },
    cuando: toDate("2024-02-08T03:00:00.000Z"),
    producto: {
      _id: "1",
      type: "Special",
      name: "rrrr",
      size: "12x12x12",
      weigth: "12",
      photoProduct:
        "https://res.cloudinary.com/dezg8rinp/image/upload/v1707314359/ProjectsImages/nvscetexyq8xjteccbfd.png",
      articulosEspeciales: "rrrr",
    },
    recibe: {
      nombreApellidos: "c",
      telefono: "123",
      email: "cleivaj93@gmail.com",
    },
    driver: {
      _id: "65c2b9821356b6a13d283c5b",
      usuario: {
        _id: "65c22715e1fdf7fb91000d05",
        email: "cleivaj93@gmail.com",

        fullname: "cesar leiva jimenez",
        smsCode: "",
      },
      desde: { pais: " Chile", ciudad: "Antofagasta", calle: "1202 Antilhue" },
      hasta: { pais: " Chile", ciudad: "Calama", calle: "2313 Arturo Prat" },
      cuando: "07/02/2024",
      horaSalida: "15:15",
      horaLlegada: "16:16",
      eresFlexible: false,
      estado: "Pendiente",
      precio: [[], [], [], []],
      envios: [],
      special: true,
      como: "auto",
    },
  };
  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center">
      <CardNotification
        id="1"
        name="jose"
        type={Prueba.type!}
        visto={Prueba.visto!}
        detail="notViajes"
      />
    </div>
  );
};

export default NotEnvios;
