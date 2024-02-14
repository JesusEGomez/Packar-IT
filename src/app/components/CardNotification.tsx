"use client";

import { Span } from "next/dist/trace";
import Link from "next/link";
import {
  MdKeyboardArrowRight,
  MdOutlineNotificationsActive,
  MdOutlineNotificationsNone,
} from "react-icons/md";

interface ICardNotificationProps {
  id: string;
  name: string;
  visto: boolean;
  type: string;
  detail: string;
}

const CardNotification = ({
  id,
  name,
  visto,
  type,
  detail,
}: ICardNotificationProps) => {
  return (
    <div className="w-full h-[90px] rounded-xl  shadow-md hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex">
      <p
        className={`text-5xl  w-1/5 ${visto ? "text-gray-500" : "text-pink"} `}
      >
        {detail === "notViajes" ? (
          <>
            {visto ? (
              <MdOutlineNotificationsNone />
            ) : (
              <MdOutlineNotificationsActive />
            )}
          </>
        ) : (
          <>
            {visto ? (
              <MdOutlineNotificationsNone />
            ) : (
              <MdOutlineNotificationsActive />
            )}
          </>
        )}
      </p>
      <div className="flex sm:flex-row sm:gap-x-4 w-3/5  flex-col">
        {detail === "notViajes" ? (
          <p>
            Tienes una solicitud de envió de <b>{name.toUpperCase()}</b>
          </p>
        ) : (
          <p>
            Tienes una solicitud de envió en espera para{" "}
            <b>{name.toUpperCase()}</b>
          </p>
        )}
      </div>

      <p className="text-3xl hover:text-pink cursor-pointer w-1/12 text-gray-500">
        <Link href={`notifications/${detail}/${id}`}>
          <MdKeyboardArrowRight />
        </Link>
      </p>
    </div>
  );
};

export default CardNotification;
