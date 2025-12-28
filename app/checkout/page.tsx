"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert("All fields required");
      return;
    }

    alert("Order placed (static)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 max-w-md space-y-4"
    >
      <h1 className="text-xl font-bold">Checkout</h1>

      <input
        placeholder="Name"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Address"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
      type="number"
        placeholder="Phone"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <button className="bg-black text-white px-4 py-2">
        Place Order
      </button>
    </form>
  );
}
