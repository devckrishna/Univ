import { Avatar, Card, Carousel,Typography  } from 'antd';
const { Title,Text } = Typography;
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const styling : React.CSSProperties = {
    display:'flex',
    flexDirection:'row',
    marginBottom:'15px'
}


type PostSchema = {
  id:string;
  title:string;
  images:string[];
  description:string;
  created_at:Date,
  university_name:string,
  university_id:string
}

type Props = {
  post:PostSchema,
  universityimage:string
}

function PostCard({post,universityimage}:Props) {
    
    const onChange = (currentSlide: number) => {
        // console.log(currentSlide);
    };

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">{post.title}</h1>
            <div style={styling}>
                <div><Avatar size={64} src={universityimage} /></div>
                <div style={{marginLeft:'8px', marginTop:'4px'}}>
                    <Title level={4} style={{padding:'0px',marginBottom:'0px', marginTop:'4px' , marginLeft:'6px'}}>{post.university_name}</Title>
                    <Text disabled>Posted {new Date(post.created_at).toDateString().slice(4)}</Text>
                </div>
            </div>
            <Carousel afterChange={onChange} autoplay={true}>
                        <div>
                          <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                          <h3 style={contentStyle}>4</h3>
                        </div>
            </Carousel>
            <p className="leading-7 [&:not(:first-child)]:my-6">
                Minim cillum consequat officia anim incididunt sint nostrud aute qui laboris adipisicing. Aliqua cupidatat commodo qui enim quis mollit esse. Eu cillum mollit exercitation tempor deserunt adipisicing fugiat aliquip laboris exercitation excepteur dolore anim pariatur. Enim do ea commodo veniam voluptate ea do nisi. Aute elit commodo consequat sit veniam irure eiusmod irure laborum.
                <br></br>
                <br></br>
                Exercitation sunt aliquip laborum dolore aute dolore fugiat ex deserunt. Tempor duis elit ad sit est exercitation cupidatat. Ea magna nisi occaecat occaecat enim ullamco excepteur et laborum voluptate quis ullamco nostrud. Dolore irure commodo fugiat est excepteur excepteur. Dolor culpa eiusmod exercitation incididunt ex et ex sunt nisi culpa excepteur dolor.
                <br></br>
                <br></br>
                Quis mollit Lorem cupidatat do aliqua do nulla sunt est exercitation magna enim. Occaecat voluptate mollit consequat reprehenderit duis duis cupidatat et deserunt eu tempor et. Est nisi cupidatat cillum fugiat aute laborum.
            </p>
        </>
    )
}

export default PostCard;