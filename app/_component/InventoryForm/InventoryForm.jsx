"use client";
import { useState, useEffect } from "react";
import "./inventoryform.css";

export default function InventoryForm() {
  const [committees, setCommittees] = useState([]);
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // State for each form field — this is what we'll send to the API
  const [formData, setFormData] = useState({
    name: "",
    committee: "",
    description: "",
    quantity: "",
    box_number: "",
  });

  useEffect(() => {
    async function fetchData() {
      const committeeResponse = await fetch(`${BASE_URL}/api/InventoryForm`);
      const committee = await committeeResponse.json();
      console.log(committee);

      const storageResponse = await fetch(`${BASE_URL}/api/storages`);
      const storage = await storageResponse.json();
      console.log(storage);

      setCommittees(Array.isArray(committee) ? committee : []);
      setStorage(Array.isArray(storage) ? storage : []);
      setLoading(false);
    }
    fetchData();
  }, [BASE_URL]);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/api/InventoryList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    //reset form after submission
    setFormData({
      name: "",
      committee: "",
      description: "",
      quantity: "",
      box_number: "",
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-name">Item Name</label>
          </div>
          <div className="item-input">
            <input
              type="text"
              className="item-name"
              placeholder="Example: Crayons"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="committee-name">Committees</label>
          </div>
          <div className="item-input">
            <select
              name="committee-name"
              id="committee-name"
              value={formData.committee}
              onChange={(e) =>
                setFormData({ ...formData, committee: e.target.value })
              }
            >
              <option value="">Select Committee</option>
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-quantity">Item Quantity</label>
          </div>
          <div className="item-input">
            <input
              type="number"
              name="item-quantity"
              id="item-quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="form-item">
          <div className="item-label">
            <label htmlFor="item-storage-number">Box Number</label>
          </div>
          <div className="item-input">
            <select
              name="storage-number"
              id="item-storage-number"
              value={formData.box_number}
              onChange={(e) =>
                setFormData({ ...formData, box_number: e.target.value })
              }
            >
              <option value={""}>Select Storage Number</option>
              {storage.map((s) => (
                <option key={s.id} value={s.storage_number}>
                  {s.storage_number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="submit">
          <button className="btn btn-blue" type="submit">
            Submit Item
          </button>
        </div>
      </form>
    </section>
  );
}
