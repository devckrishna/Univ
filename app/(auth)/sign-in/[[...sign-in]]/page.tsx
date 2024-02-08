import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  const styles = {
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    marginTop:'35px',
    height:'100%',
    width:'100%'
}
  return (
    <div style={styles}>
      <SignIn />
    </div>
  );
}