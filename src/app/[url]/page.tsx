import { redirect } from "next/navigation";
import { supabase } from "@/supabase";

const ShortLinkPage = async ({params}: {params: Promise<{url: string}>}) => {

  const { url } = await params;
    
  const { data, error } = await supabase.from("url").select("originallink").eq("shortcode", url).single();

  if (error || !data) return <h1>404 - لینک یافت نشد!</h1>;

  redirect(data.originallink);
}

export default ShortLinkPage