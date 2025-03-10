/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const CopyURL = (shortcode: any) => {

  const [copied, setCopied] = useState(false)

    const HandleCopy = (shortcode: any) => {
      const finalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${shortcode.shortcode}`
      navigator.clipboard.writeText(finalUrl)
      setCopied(true)
      setTimeout(() => { setCopied(false) }, 3000)
    }

  return (
    <span onClick={() => HandleCopy(shortcode)} className="copy">
      {copied ? <FaCheck className="check" /> : <IoCopyOutline />}
    </span>
  )
}

export default CopyURL