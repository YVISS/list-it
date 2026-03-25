"use client";
import { useState, useEffect } from "react";
import "./inventoryform.css";

export default function InventoryForm() {
  const [committees, setCommittees] = useState([]);
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      const committeeResponse = await fetch(`${BASE_URL}/api/InventoryForm`);
      const committee = await committeeResponse.json();
      console.log(committee);

      const storageResponse = await fetch(`${BASE_URL}/api/storages`);
      const storage = await storageResponse.json();
      console.log(storage);

      setCommittees(committee);
      setStorage(storage);
      setLoading(false);
    }
    fetchData();
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <form action="">
        <div className="form-item">
          <div className="item-label">
          <label htmlFor="item-name">Item Name</label></div>
          <div className="item-input">
          <input type="text" className="item-name" placeholder="Example: Crayons"/></div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="committee-name">Committees</label>
          </div>
          <div className="item-input">
            <select name="committee-name" id="committee-name">
              <option>Select Committee</option>
              {committees.map((coms) => (
                <option key={coms.id} value={coms.name}>
                  {coms.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-description">Item Description</label>
          </div>
          <div className="item-input">
            <textarea
              id="item-description"
              height={500}
              width={2000}
              className="w-full border border-black rounded"
              placeholder="Example: Fragile or For Music Ministry..."
            ></textarea>
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-quantity">Item Quantity</label>
          </div>
          <div className="item-input">
            <input type="number" name="item-quantity" id="item-quantity" onChange={e => setQuantity(Number(e.target.value))} value={quantity} />
            
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-storage-number">Box Number</label>
          </div>
          <div className="item-input">
            <select name="storage-number" id="item-storage-number">
              <option>Select Storage Number</option>
              {storage.map((s) => (
                <option key={s.id} value={s.storage_number}>
                  {s.storage_number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="submit">
          <button className="btn btn-primary" type="submit">
            Submit Item
          </button>
        </div>
      </form>
    </section>
  );
}
