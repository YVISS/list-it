import { getCommittees, insertCommittee } from "@/utils/helpers/actions";
import InventoryForm from "./_component/InventoryForm";
export default async function Home() {
  return (
    <div>
      <section>
        <div className="bg">
          <h1 className="heading w-full">Listit</h1>
          <p className="sub-heading w-full">
            Insert Items to put into inventory.
          </p>
        </div>
      </section>
      <InventoryForm />
    </div>
  );
}
