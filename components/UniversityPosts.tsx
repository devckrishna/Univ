'use client'
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ComponentProps } from "react";
import { useRouter } from "next/navigation";

  type PostSchema = {
    id:string;
    title:string;
    images:string[];
    description:string;
    created_at:Date,
    university_name:string
  }

  type Props = {
    posts:PostSchema[]
  }

export default function UniversityPosts({posts}:Props){
    console.log("component",posts);
    const router = useRouter();
    return (
        <ScrollArea className="h-screen bg-white">
          <div className="flex flex-col gap-2 p-4 pt-0">
            {posts.map((p:PostSchema) => (
              <button
                key={p.id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 mt-2 text-left text-sm transition-all hover:bg-accent",
                  //   mail.selected === item.id && "bg-muted"
                )}
                onClick={()=>router.push(`/dashboard/post/${p.id}`)}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{p.title}</div>
                      {/* {!item.read && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                      )} */}
                    </div>
                    <div
                      className={cn(
                        "ml-auto text-xs",
                        // mail.selected === item.id
                        //   ? "text-foreground"
                          "text-muted-foreground"
                      )}
                    >
                      {/* {formatDistanceToNow(new Date(item.date), {
                        addSuffix: true,
                      })} */}
                    </div>
                  </div>
                  {/* <div className="text-xs font-medium">{item.subject}</div> */}
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {p.description.substring(0, 300)}
                </div>
                {/* {item.labels.length ? (
                  <div className="flex items-center gap-2">
                    {item.labels.map((label) => (
                      <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                ) : null} */}
              </button>
            ))}
          </div>
        </ScrollArea>
      )
}


function getBadgeVariantFromLabel(
    label: string
  ): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
      return "default"
    }
  
    if (["personal"].includes(label.toLowerCase())) {
      return "outline"
    }
  
    return "secondary"
  }
