import Image from "next/image";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Image
          src="/followfi-logo.svg"
          alt="FollowFi logo"
          width={120}
          height={40}
          priority
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Welcome, {session.user?.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <form
                action={async () => {
                  "use server";
                  await signOut({redirect: true, redirectTo: "/auth"}); 
                }}
              >
                <button className="w-full flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Recent posts from your network will appear here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>#TechNews</li>
              <li>#InvestmentTips</li>
              <li>#StartupLife</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Connect with professionals in your industry.</p>
            <Button className="mt-4">Find Connections</Button>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>&copy; 2025 FollowFi Social. All rights reserved.</p>
      </footer>
    </div>
  );
}
