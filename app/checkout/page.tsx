"use client";

import { useCurrentUser } from "@/hook/hook";
import { useCartStore } from "@/app/store/cartStore";
import { CreateOrderAction } from "@/actions/OrderAction"; 
import { useForm } from "react-hook-form";
import { useState } from "react";

type CheckoutFormData = {
  name: string;
  address: string;
  phone: string;
};

export default function CheckoutPage() {
  const { email,fullName} = useCurrentUser();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>();

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      if (!email) {
        alert("Please login to place an order");
        return;
      }

      setLoading(true)
      await CreateOrderAction(email,fullName || "",items);
      
      alert("Order placed successfully!");
      clearCart();
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 max-w-md space-y-4"
    >
      <h1 className="text-xl font-bold">Checkout</h1>

      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="border p-2 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Address"
          className="border p-2 w-full"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <input
          type="number"
          {...register("phone", { 
            required: "Phone is required",
            minLength: { value: 10, message: "Phone must be at least 10 digits" }
          })}
          placeholder="Phone"
          className="border p-2 w-full"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <button 
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 disabled:bg-gray-400"
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}