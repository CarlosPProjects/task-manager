import { createClient } from "./utils/supabase/server";

const Home = async () => {
  const supabase = createClient();
  const { data: profile } = await supabase.from("Profiles").select();

  console.log(profile);

  return <pre>{JSON.stringify(profile, null, 2)}</pre>;
};

export default Home;
