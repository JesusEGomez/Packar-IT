import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IDateModalProps {
  dateModalHandler: (date: Date) => void;
  date: Date;
  dateModalClose: () => void;
}

function DateModal({
  dateModalHandler,
  date,
  dateModalClose,
}: IDateModalProps) {
  const close = () => {
    dateModalClose();
  };
  return (
    <div className="flex flex-col p-4">
      <Button onClick={() => close()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>

      <Calendar
        mode="single"
        selected={date}
        onSelect={(e) => dateModalHandler(e!)}
        className="rounded-md border"
        disabled={(date: Date) => date < new Date()}
      />
    </div>
  );
}

export default DateModal;
