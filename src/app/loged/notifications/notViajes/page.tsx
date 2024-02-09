import CardNotification from "@/app/components/CardNotification";
import { INotification } from "@/app/interfaces/notifications.interface";
import { toDate } from "date-fns";

const NotEnvios = () => {
  const [notifications, setNotification] = useState<INotification[] | null>();
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
