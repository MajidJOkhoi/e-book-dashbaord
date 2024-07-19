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
import { LoaderCircle } from "lucide-react";
import { register } from "@/http/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      navigate("/auth/login");
      console.log("data", data);
    },
    onError: () => {
      toast.error("Enter a valid email and password");
    },
  });

  const handleRegisterSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      toast.error(" username, email, and password required");
      return;
    }

    mutation.mutate({ name, email, password });
  };

  return (
    <section className="-flex -justify-center -items-center -h-screen">
      <Card className="-w-full -max-w-sm">
        <CardHeader>
          <CardTitle className="-text-lg -font-bold -text-center">
            Sign Up
          </CardTitle>
          <CardDescription>
            Enter your username, email, and password to sign up. <br />
            {mutation.isError && (
              <span className="-text-sm -font-bold -text-red-500">
                {mutation.error.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="-grid -gap-4">
          <div className="-grid -gap-2">
            <Label htmlFor="name">Username</Label>
            <Input
              ref={nameRef}
              id="name"
              type="text"
              placeholder="Enter username"
              required
            />
          </div>
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
            onClick={handleRegisterSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <LoaderCircle className="-animate-spin" />}
            <span className="-ml-2">Create an Account</span>
          </Button>
        </CardFooter>
        <div className="-mb-4 -text-center -text-sm">
          Have an account?
          <Link to="/auth/login" className="-underline -font-bold -ml-1">
            Sign In
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default RegisterPage;
