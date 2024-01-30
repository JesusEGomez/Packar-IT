import { Button } from "@/components/ui/button";
import { ITravelDB } from "../interfaces/TravelDB.interface";
import { IoMdArrowRoundBack } from "react-icons/io";

interface TravelEditModalProps {
  closeEditModal: () => void;
  travel: ITravelDB;
}
const TravelEditModal = ({ closeEditModal, travel }: TravelEditModalProps) => {
  console.log(travel);
  return (
    <div className="flex flex-col gap-y-5 p-4 border justify-center items-center bg-slate-100 rounded">
      <Button onClick={closeEditModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <p>
        Aqui podras gestionar el estado de tu viaje. Cada cambio que hagas se le
        avisara a las personas que enviaron paquetes en este viaje
      </p>
    </div>
  );
};

export default TravelEditModal;
