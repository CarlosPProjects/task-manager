import { createClient } from "./utils/supabase/server";

const Home = async () => {
  const supabase = createClient();
  const { data: notes } = await supabase.from("Notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
};

export default Home;
