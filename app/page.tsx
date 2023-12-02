import { db } from "@/utils/db";

const Home = async () => {
  const user = await db.user.findMany();
  console.log(user);

  return <div>Hello World</div>;
};

export default Home;
