import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Twitter } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to FollowFi</CardTitle>
          <CardDescription>Connect your X account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("twitter", { redirect: true, redirectTo: "/" });
            }}
          >
            <Button
              className="w-full bg-[#1877f2] hover:bg-[#166fe5]"
              type="submit"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Sign in with X
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
