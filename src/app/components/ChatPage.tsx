"use client"
import React, { useEffect, useState } from "react";
import io from "socket.io-client"; 
import style from "./chat.module.css";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

const ChatPage = ({ username, roomId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const [socket, setSocket] = useState<any>(null); // Usa any aquí o define un tipo adecuado para tu socket


  useEffect(() => {
    // Inicializa el socket cuando el componente se monta
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // Limpieza cuando el componente se desmonta
    return () => {
      newSocket.disconnect(); // Desconecta el socket cuando el componente se desmonta
    };
  }, []);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "" && socket) {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_msg", (data: IMsgDataTypes) => {
        setChat((pre) => [...pre, data]);
      });
    } else {
      console.error("Socket is undefined. Chat functionality disabled.");
    }
  }, [socket]);


  return (
    <div className={style.chat_div}>
      <div className={style.chat_border}>
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
          </p>
        </div>
        <div>
          {chat.map(({ roomId, user, msg, time }, key) => (
            <div
              key={key}
              className={
                user == username
                  ? style.chatProfileRight
                  : style.chatProfileLeft
              }
            >
              <span
                className={style.chatProfileSpan}
                style={{ textAlign: user == username ? "right" : "left" }}
              >
                {user.charAt(0)}
              </span>
              <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                {msg}
              </h3>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={(e) => sendData(e)}>
            <input
              className={style.chat_input}
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button className={style.chat_button}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
