"use client";

import { supabase } from "@/supabase";
import { useState } from "react";
import UrlList from "./UrlList";
import "../styles/Form.scss";

interface Item {
  orgLink: string;
  newUrl: string;
}

const Form = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  const CutIt = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    const generateShortCode = (length = 6) => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };

    const newURL = {
      originallink: userInput.toString(),
      shortcode: generateShortCode(),
    };

    const isValidUrl = (userInput: string) => {
      const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
      return pattern.test(userInput);
    };

    if (!isValidUrl(newURL.originallink)) {
      setIsPending(false);
      return;
    }

    let { data } = await supabase
      .from("url")
      .select("id")
      .eq("shortcode", newURL.shortcode);
    while (data && data.length > 0) {
      newURL.shortcode = generateShortCode();
      ({ data } = await supabase
        .from("url")
        .select("id")
        .eq("shortcode", newURL.shortcode));
    }

    await supabase.from("url").insert([newURL]);

    setItems([
      { orgLink: newURL.originallink, newUrl: newURL.shortcode },
      ...items,
    ]);
    setUserInput("");
    setIsPending(false);
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={userInput}
          placeholder="Enter URL to Shorten"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" onClick={CutIt}>
          {isPending ? <span className="btnLoader"></span> : "«قیچی‌»ـش کن!"}
        </button>
      </form>
      <UrlList urlList={items} />
    </>
  );
};

export default Form;
