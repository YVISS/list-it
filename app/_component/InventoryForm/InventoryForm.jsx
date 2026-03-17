"use client";
import { useState, useEffect } from "react";
import "./inventoryform.css";

export default function InventoryForm() {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    async function fetchCommittees() {
      const response = await fetch(`${BASE_URL}/api/InventoryForm`);
      const committee = await response.json();
      console.log(committee);

      setCommittees(committee);
      setLoading(false);
    }
    fetchCommittees();
  }, [BASE_URL]);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <form action="">
        <div className="form-item">
          <label htmlFor="item-name">Item Name</label>
          <input type="text" className="item-name" />
        </div>
        <div className="form-item custom-select">
          <label htmlFor="committee-name">Committees</label>
          <select name="committee-name">
            <option> -- Select Committee --</option>
            {committees.map((coms) => (
              <option key={coms.id} value={coms.name}>
                {coms.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <textarea
            height={500}
            width={1000}
            className="w-full border border-black rounded"
          ></textarea>
        </div>
        <button className="btn-primary" type="submit">
          Submit Item
        </button>
      </form>
    </section>
  );
}
