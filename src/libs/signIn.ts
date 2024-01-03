import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default signInGoogle = async () => {
  const navigate = useRouter();
  console.log("holi");
  const res = await signIn("google", {});

  navigate.push("/loged");
};
