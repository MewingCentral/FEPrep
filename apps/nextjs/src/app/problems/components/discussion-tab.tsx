"use client";
import { Card, CardContent} from "@feprep/ui/card";
import { Label } from "@feprep/ui/label"
import { Textarea } from "@feprep/ui/textarea"
import { AvatarIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";

export function DiscussionTab() {
    return (
        <Card className="h-full flex-col">
            {/* user add commend */}
            <div className ="space y-2 p-4">
                <Textarea  placeholder="add a comment..."/>
            </div>
            <div className=" space y-2 mr-4 flex items-right justify-end">
                <Button className="center">Submit</Button>
            </div>
            
            {/* public comments */}
            <CardContent className="space-y-2 p-4">
                <CommentCard name="pedro" content="hewwo I am not a rat I am a cat :3 haha :3 "/>
                <CommentCard name="TKAM12059" content="The War of 1812 was fought by the United States and its allies against the United Kingdom and its allies in North America. It began when the United States declared war on Britain on 18 June 1812. Although peace terms were agreed upon in the December 1814 Treaty of Ghent, the war did not officially end until the peace treaty was ratified by the United States Congress on 17 February 1815."/>
            </CardContent>
        </Card>
    );
}

function CommentCard({ name, content }: 
    {
        name: string;
        content: string;
    }) {
    return (
        <Card className="p-2">
            
            <Label className="text-base font-bold p-3 mt-1 flex flex-row hover:text-muted-foreground transition-all duration-200 cursor-pointer">
                <AvatarIcon className = "mr-3" width="25" height="25"/>
                {name}
            </Label>
            <div className="p-3">{content}</div>
        </Card>
    );
}