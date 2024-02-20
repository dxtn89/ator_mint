import { useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "@iconify/react";

import { useAccount } from "wagmi";
import { supabase } from "@/lib/db";

const EmailProvider = () => {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [formState, setFormState] = useState<
    "default" | "processing" | "error" | "success"
  >("default");

  const registerUserForPickup = async (emailAddress: string) => {
    // Data to be stored in the DB
    const nftId = 1;
    const walletAddress = address;

    if (!emailAddress) {
      setFormState("error");
      setError("Please enter an email address");
      return;
    }
    if (!address) {
      setFormState("error");
      setError("Please make sure your wallet is connected");
      return;
    }

    // TODO: Before insert check if the user is approved on the redeem contract

    // Sign in user
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
    });

    if (signInError) {
      setFormState("error");
      setError("Error registering for pick up");
      return;
    }

    const { data: userData, error } = await supabase
      .from("Users")
      .insert({
        nft_id: nftId,
        email_address: emailAddress,
        wallet_address: walletAddress,
      })
      .select();

    if (error) {
      setFormState("error");
      setError("Error registering for pick up");
      return;
    }

    // Sign out user
    await supabase.auth.signOut();

    return userData[0].uuid;
  };

  // Send email via SendIT API
  const handleSendEmail = async (formData: FormData) => {
    const sendEndpoint =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_SENDIT_DEV
        : import.meta.env.VITE_SENDIT_PROD;

    // TODO: Try catch
    const response = await fetch(sendEndpoint, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.message) {
      setSuccess(data.message);
    }
  };

  const handlePickupRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("processing");

    // Get the email address
    const formData = new FormData(e.target as HTMLFormElement);
    const emailAddress = formData.get("email-address") as string;

    // Store in DB and return UUID
    const uuid = await registerUserForPickup(emailAddress);

    // Send email via SendIT API
    formData.append("id", uuid);
    await handleSendEmail(formData);

    setFormState("success");
  };

  return (
    <form onSubmit={handlePickupRegistration} className="max-w-xs">
      <label htmlFor="email" className="sr-only">
        Supply email address for pick up
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              icon="bi:person"
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="email"
            name="email-address"
            id="email-address"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-200 ring-1 ring-inset ring-gray-500 bg-zinc-600/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="john.smith@awesome.com"
          />
        </div>
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-400 hover:bg-teal-600/30"
        >
          {formState === "default" && <span>Send</span>}
          {formState === "processing" && (
            <>
              <span>Sending</span>
              <span className="loading loading-spinner loading-sm"></span>
            </>
          )}
          {formState === "error" && <span>Try again</span>}
          {formState === "success" && (
            <>
              <span>Done</span>
              <Icon icon="bi:check2" className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {formState === "success" && (
        <p className="text-teal-500 text-xs mt-1">{success}</p>
      )}
    </form>
  );
};

export default EmailProvider;
