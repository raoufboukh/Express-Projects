"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaRegCreditCard, FaPaypal, FaApple } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { updateAccountType } from "@/lib/data-fetching";
import LoadingSpinner from "../Spinner";
import { Router } from "next/router";

export default function PaymentMethod() {
  const [method, setMethod] = useState("card");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    card: "",
    month: "",
    year: "",
    cvc: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["payment"],
    mutationFn: updateAccountType,
    onSuccess: () => {
      setDone(true);

      window.location.href = "/dashboard";
    },
  });

  return (
    <form
      className="space-y-6 sm:w-110 mx-auto text-white"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !form.name ||
          !form.city ||
          !form.card ||
          !form.month ||
          !form.year ||
          !form.cvc
        ) {
          enqueueSnackbar("Please fill in all fields");
          return;
        }
        mutate();
      }}
    >
      {isPending && (
        <div className="absolute bg-black size-full top-0 left-0">
          <LoadingSpinner />
        </div>
      )}
      {done && (
        <div className="absolute bg-black size-full top-0 left-0">
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-green-500">
              Payment Successful!
            </h2>
            <p className="text-lg text-white">Thank you for your payment.</p>
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <p className="text-sm text-muted-foreground">
          Add a new payment method to your account.
        </p>
      </div>

      <ToggleGroup
        type="single"
        value={method}
        onValueChange={(val) => val && setMethod(val)}
        className="grid grid-cols-3 gap-2"
      >
        <ToggleGroupItem value="card" aria-label="Card">
          <FaRegCreditCard className="mr-2 h-4 w-4 " />
          Card
        </ToggleGroupItem>
        <ToggleGroupItem value="paypal" aria-label="PayPal">
          <FaPaypal className="mr-2 h-4 w-4 " />
          PayPal
        </ToggleGroupItem>
        <ToggleGroupItem value="apple" aria-label="Apple">
          <FaApple className="mr-2 h-4 w-4 " />
          Apple
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="grid grid-cols-1 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="First Last"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Your city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="card">Card number</Label>
          <Input
            id="card"
            placeholder="1234 5678 9012 3456"
            value={form.card}
            onChange={(e) => setForm({ ...form, card: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              placeholder="MM"
              maxLength={2}
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              placeholder="YYYY"
              maxLength={4}
              min={4}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="CVC"
              maxLength={3}
              min={3}
              value={form.cvc}
              onChange={(e) => setForm({ ...form, cvc: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Continue
      </Button>
    </form>
  );
}
