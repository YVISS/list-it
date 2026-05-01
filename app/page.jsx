import { Permanent_Marker, Outfit } from "next/font/google";

const marker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Home() {
  return (
    <>
      <div>Landing Page</div>
    </>
  );
}
