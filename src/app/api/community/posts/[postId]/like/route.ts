import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type CommunityPost = {
  id: string;
  likes: number;
  isLiked: boolean;
};

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;

  const dataset = await db.appDataset.findUnique({
    where: { key: "community-posts" },
    select: { payload: true },
  });

  if (!dataset || !Array.isArray(dataset.payload)) {
    return NextResponse.json({ success: false, message: "Community posts dataset missing" }, { status: 404 });
  }

  const posts = dataset.payload as unknown as CommunityPost[];
  const post = posts.find((item) => item.id === postId);
  if (!post) {
    return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
  }

  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;

  await db.appDataset.update({
    where: { key: "community-posts" },
    data: { payload: posts },
  });

  return NextResponse.json({ success: true, newLikeCount: post.likes }, { status: 200 });
}
