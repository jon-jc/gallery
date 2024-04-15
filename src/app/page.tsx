import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  console.log(images);
  return (
    <main>
      <div className="flex flex-wrap space-x-8">
        {images.map((image) => (
          <div key={image.id}>
            <Card className="w-full max-w-sm">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                <Image
                  alt="Photo"
                  className="h-full w-full scale-105 object-cover transition-transform hover:scale-100"
                  height={400}
                  src={image.url}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Photo
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Click to open
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="line-clamp-2 overflow-hidden text-sm">
                  This is the title of the photo which is quite long and should
                  be truncated.
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  This is the caption for the photo.
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
