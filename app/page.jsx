import { Permanent_Marker, Outfit } from "next/font/google";
import InventoryForm from "./_component/InventoryForm/InventoryForm";
import InventoryList from "./_component/InventoryList/InventoryList";

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
    <div>
      <section>
        <div className="bg">
          <h1 className={`${outfit.className} font-bold heading w-full`}>
            List-it
          </h1>
          <p className="sub-heading w-full">
            Insert Items to put into inventory.
          </p>
        </div>
      </section>
      <InventoryForm />
      <InventoryList />
    </div>
  );
}
