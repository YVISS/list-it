"use client";
import { useEffect, useState } from "react";
import SearchBar from "../searchBarInventory/SearchBar";

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // search
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  //modal states

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    committee: "",
    description: "",
    quantity: "",
    box_number: "",
  });

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.committee.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.quantity.toString().includes(search) ||
      item.box_number.toString().includes(search),
  );

  useEffect(() => {
    async function fetchItems() {
      const itemsResponse = await fetch(`${BASE_URL}/api/InventoryList`);
      const items = await itemsResponse.json();
      console.log("API returned:", items);
      setItems(items);
      setLoading(false);
    }
    fetchItems();
  }, [BASE_URL]);

  function openDeleteModal(item) {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  function openEditModal(item) {
    setSelectedItem(item);
    setEditFormData({
      name: item.name,
      committee: item.committee,
      description: item.description,
      quantity: item.quantity,
      box_number: item.box_number,
    });
    setShowEditModal(true);
  }

  //handleDelete
  async function handleDelete() {
    if (!selectedItem) return;
    console.log("Deleting item with id:", selectedItem.id);
    const response = await fetch(`${BASE_URL}/api/InventoryList`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedItem.id }),
    });
    const data = await response.json();
    console.log(data);

    //remove item from the list without refetching
    setItems(items.filter((item) => item.id !== selectedItem.id));
    setShowDeleteModal(false);
  }

  //handleUpdate
  async function handleUpdate(e) {
    if (!selectedItem) return;
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/api/InventoryList`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedItem.id, ...editFormData }),
    });

    const data = await response.json();
    console.log(data);

    //update the item in the list without refetching
    setItems(
      items.map((item) =>
        item.id === selectedItem.id ? { ...item, ...editFormData } : item,
      ),
    );
    setShowEditModal(false);
  }

  if (loading) return <p>Loading...</p>;
  return (
    <section className="flex flex-col gap-4">
      <h1>View All Listed Items</h1>
      <SearchBar search={search} setSearch={setSearch}/>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Committee</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Box Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.committee}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.box_number}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-blue"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => openDeleteModal(item)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Delete modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Delete Item</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>"{selectedItem.name}"</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn btn-red" onClick={handleDelete}>
                Yes, I am Sure
              </button>
              <button
                className="btn btn-blue"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              Edit Item <strong>{editFormData.name}</strong>
            </h2>
            <form onSubmit={handleUpdate}>
              <label>Name</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />
              <label>Committee</label>
              <input
                type="text"
                value={editFormData.committee}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    committee: e.target.value,
                  })
                }
              />
              <label>Description</label>
              <textarea
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              />
              <label>Quantity</label>
              <input
                type="number"
                value={editFormData.quantity}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    quantity: Number(e.target.value),
                  })
                }
              />
              <label>Box Number</label>
              <input
                type="text"
                value={editFormData.box_number}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    box_number: e.target.value,
                  })
                }
              />
              <div className="modal-actions">
                <button className="btn btn-blue" type="submit">
                  Save
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
