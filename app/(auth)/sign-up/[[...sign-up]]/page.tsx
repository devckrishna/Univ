import { SignUp } from "@clerk/nextjs";
 
const styles = {
  display:'flex',
  justifyContent:'center',
  alignItems:"center",
  marginTop:'35px',
  height:'100%',
  width:'100%'
}
export default function Page() {
  return (
    <div style={styles}>
      <SignUp />
    </div>
  )
}