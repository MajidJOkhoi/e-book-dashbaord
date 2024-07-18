import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="-flex -justify-center -items-center -h-screen">
      <Card className="-w-full -max-w-sm">
        <CardHeader>
          <CardTitle className="-text-lg -text-center">Register</CardTitle>
         
        </CardHeader>
        <CardContent className="-grid -gap-4">
          <div className="-grid -gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="-grid -gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="-grid -gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          
        </CardContent>
        <CardFooter className="-flex -justify-center">
          <Button className="-w-sm">Sign Up</Button>
        </CardFooter>

        <div className="-mb-4 -text-center -text-sm">
          
          Already have an account ? 
          <Link to={"/auth/login"} className="underline -font-bold -ml-1">
            Sign In
          </Link>
        </div>

      </Card>
    </section>
  );
};

export default RegisterPage;
