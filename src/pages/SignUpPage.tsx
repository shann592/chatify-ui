import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { SignUpFormSchema, type SignUpFormData } from "../lib/types";
import { useSignupMutation } from "../api/chatify.api";
import { LoaderIcon } from "lucide-react";
type Props = {};

const SignUpPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpFormSchema) });
  const [signup, { isLoading, error, isSuccess }] = useSignupMutation();
  const onsubmit = async (data: SignUpFormData) => {
    await signup(data);
  };

  return (
    <div>
      <Card className="w-[400px] bg-[#ffffff]">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Sign Up</h2>
          <h3 className="text-center text-gray-500 text-sm">
            Enter your details to create your account
          </h3>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2.5"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div>
              <Input
                placeholder="Full Name"
                type="text"
                className="outline-none focus:ring-0 focus:border-transparent"
                {...register("fullName")}
                name="fullName"
              />
              {errors.fullName && (
                <span className="input-errors">{errors.fullName.message}</span>
              )}
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                className="outline-none focus:ring-0 focus:border-transparent"
                {...register("email")}
                name="email"
              />
              {errors.email && (
                <span className="input-errors">{errors.email.message}</span>
              )}
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                className="outline-none focus:ring-0 focus:border-transparent"
                {...register("password")}
                name="password"
              />
              {errors.password && (
                <span className="input-errors">{errors.password.message}</span>
              )}
            </div>
            <Button className="bg-[#6366f2] cursor-pointer">
              Create Account{" "}
              {isLoading && <LoaderIcon className="text-white animate-spin" />}
            </Button>
            <h3 className="text-xs text-gray-500 text-center">
              Already have an account?
              <Link to="/login" className="text-[#6366f2] ml-0.5">
                Login
              </Link>
            </h3>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
