import InventoryForm from "./_component/InventoryForm/InventoryForm";
import InventoryList from "./_component/InventoryList/InventoryList";
import Sidebar from "./_component/ui/Sidebar";

export default function Page() {
  return (
    <div>
      <div className="grid-cols-[auto_1fr] grid">
        <Sidebar />
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
      </div>
    </div>
  );
}
