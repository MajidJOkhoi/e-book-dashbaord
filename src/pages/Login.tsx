import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTokenStore from "@/store";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success("Login successful!");
      navigate("/dashboard/home");
      setToken(response.data.accessToken);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate email and password
    if (!email || !password) {
      toast.warning(" email and password required");
      return;
    }

    // Trigger the mutation
    mutation.mutate({ email, password });
  };

  return (
    <section className="-flex -justify-center -items-center -h-screen">
      <Card className="-w-full -max-w-sm">
        <CardHeader>
          <CardTitle className="-text-lg -font-bold -text-center">
            Login
          </CardTitle>

          <CardDescription>
            Enter your email and password to sign in. <br />
            {mutation.isError && (
              <span className="-text-sm -font-bold -text-red-500 ">
                {" "}
                {mutation.error.message}
              </span>
            )}
          </CardDescription>
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
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
        </CardContent>

        <CardFooter className="-flex -justify-center -gap-2">
          <Button
            className="-w-sm"
            onClick={handleLoginSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <LoaderCircle className={"-animate-spin"} />}

            <span className="-ml-2"> Sign In </span>
          </Button>
        </CardFooter>

        <div className="-mb-4 -text-center -text-sm">
          Don't have an account?
          <Link to="/auth/register" className="-underline -font-bold -ml-1">
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default LoginPage;
