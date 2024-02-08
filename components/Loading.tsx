import Image from "next/image";
import loadingImg from '../public/loading.gif';

function Loading(){
    return (
        <div className="h-screen w-screen flex items-center justify-center ">
          <Image className="h-10 w-auto" src={loadingImg} alt="loading" />
        </div>
    )
}

export default Loading;