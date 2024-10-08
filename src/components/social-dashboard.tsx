"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Instagram, Youtube, Twitter, Music } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export type SocialDashboardProps = {
  urls: {
    youtube: string;
    x: string;
    instagram: string;
    tiktok: string;
  };
};
export function SocialDashboard({ urls }: SocialDashboardProps) {
  const { mutate } = api.socialLinks.update.useMutation({
    onSuccess: () => {
      toast.success("Links updated successfully");
    },
  });
  const [socialLinks, setSocialLinks] = useState([
    { name: "youtube", url: urls.youtube || "", icon: Youtube, updated: false },
    { name: "x", url: urls.x || "", icon: Twitter, updated: false },
    {
      name: "instagram",
      url: urls.instagram || "",
      icon: Instagram,
      updated: false,
    },
    { name: "tiktok", url: urls.tiktok || "", icon: Music, updated: false },
  ]);

  const handleLinkChange = (index: number, newUrl: string) => {
    const updatedLinks = [...socialLinks];
    if (updatedLinks[index] && updatedLinks[index].url !== newUrl) {
      updatedLinks[index].url = newUrl;
      updatedLinks[index].updated = true;
      setSocialLinks(updatedLinks);
    }
  };

  const handleSave = () => {
    const updatedLinks = socialLinks.filter((link) => link.updated);
    if (updatedLinks.length === 0) {
      return;
    }
    mutate({
      links: updatedLinks.map((link) => ({
        name: link.name,
        url: link.url,
      })),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Manage Social Media Links
          </CardTitle>
          <CardDescription>
            Update your social media profile links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link, index) => (
              <li key={link.name} className="flex flex-col space-y-2">
                <label
                  htmlFor={`${link.name}-input`}
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <link.icon
                    className="mr-2 h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                  {link.name}
                </label>
                <Input
                  id={`${link.name}-input`}
                  type="url"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  placeholder={`Enter your ${link.name} URL`}
                  className="w-full"
                />
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
