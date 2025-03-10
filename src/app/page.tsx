/* eslint-disable @next/next/no-img-element */
import "../styles/Home.scss"

import { FaEye } from "react-icons/fa6";
import { supabase } from "@/supabase";
import { revalidateTag } from "next/cache";
import Button from "@/components/Button";
import CopyURL from "@/components/CopyURL";
import logo from '../../public/logo.png'

interface Item {
  id: number
  originallink: string
  shortcode: string
  views: number
}

const Home = async () => {

  const CutIt = async (formData: FormData) => {
    'use server'

    const generateShortCode = (length = 8) => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    }

    const newURL = {
      originallink: formData.get("url"),
      shortcode: generateShortCode()
    }

    if (!newURL.originallink) return;

    let { data } = await supabase.from("url").select("id").eq("shortcode", newURL.shortcode);
    while (data && data.length > 0) {
      newURL.shortcode = generateShortCode();
      ({ data } = await supabase.from("url").select("id").eq("shortcode", newURL.shortcode));
    }

    await supabase.from("url").insert([newURL]);

    revalidateTag('url')
  }

  const { data: urlItems } = await supabase.from("url").select("*").order('id', { ascending: false })

  return (
    <div className="wrapper">
      <div className="title">
        <img src={logo.src} alt="Logo" />
        <h1>لینکو: کوتاه‌کننده لینک</h1>
        <p>به راحتی لینک‌های اجق‌وجق خود را قیچی کنین و به اشتراک بذارین!</p>
      </div>
      <form action={CutIt}>
        <input type="text" name="url" placeholder="Enter URL to Shorten" />
        <Button classname="submit">«قیچی‌»ـش کن!</Button>
      </form>
      {urlItems?.length ?
        <div className="url-list">
          <h2>لینک‌های اخیر:</h2>
          {urlItems.map((item: Item) =>
          <div className="url-item" key={item.id}>
            <div className="links">
              <span title={item.originallink} className="orglink">{item.originallink.slice(0, 32) + '...'}</span>
              <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.shortcode}`} className="shortlink">
                {process.env.NEXT_PUBLIC_SITE_URL}/{item.shortcode}
              </a>
            </div>
            <span className="tools">
              <CopyURL shortcode={item.shortcode} />
              <span className="view">
                <FaEye />
                {item.views == 0 || 1 ? `${item.views} View` : ""}
                {item.views > 1 ? `${item.views} Views` : ""}
              </span>
            </span>
          </div>)}
        </div>
        : ""}
    </div>
  )
}

export default Home