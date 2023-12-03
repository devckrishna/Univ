import { db } from "@/utils/db";

const Home = async () => {
  const user = await db.user.findMany();
  console.log(user);

  return <main className="h-full w-full"></main>;
};

export default Home;
