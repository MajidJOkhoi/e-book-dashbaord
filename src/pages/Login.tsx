import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const LoginPage = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const HandleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log(email, password);
  }


  return (
    <section className="-flex -justify-center -items-center -h-screen">
      <Card className="-w-full -max-w-sm">
        <CardHeader>
          <CardTitle className="-text-lg -font-bold -text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="-grid -gap-4">
          <div className="-grid -gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="-grid -gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef}  id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="-flex -justify-center">
          <Button className="-w-sm" onClick={HandleLoginSubmit}>Sign in</Button>
        </CardFooter>

        <div className="-mb-4 -text-center -text-sm">
          Don&apos;t have an account ? 
          <Link to={"/auth/register"} className="underline -font-bold -ml-1">
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default LoginPage;
