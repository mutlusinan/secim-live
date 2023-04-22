import { Inter } from "next/font/google";
import { FaqSimple } from "@/components/FAQ";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const secimdenOnce = require("../assets/data/SecimdenOnce.json");
  return <FaqSimple data={secimdenOnce} />;
}
