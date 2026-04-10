import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type CommunityGroup = {
  id: string;
  isJoined: boolean;
  membersCount: number;
};

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;

  const dataset = await db.appDataset.findUnique({
    where: { key: "community-groups" },
    select: { payload: true },
  });

  if (!dataset || !Array.isArray(dataset.payload)) {
    return NextResponse.json({ success: false, message: "Community groups dataset missing" }, { status: 404 });
  }

  const groups = dataset.payload as unknown as CommunityGroup[];
  const group = groups.find((item) => item.id === groupId);
  if (!group) {
    return NextResponse.json({ success: false, message: "Group not found" }, { status: 404 });
  }

  group.isJoined = !group.isJoined;
  group.membersCount += group.isJoined ? 1 : -1;

  await db.appDataset.update({
    where: { key: "community-groups" },
    data: { payload: groups },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
