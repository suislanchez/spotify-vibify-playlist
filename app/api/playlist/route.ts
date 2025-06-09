import { NextResponse } from "next/server"
import { generateAIPlaylist } from "@/app/actions"

export async function POST(request: Request) {
  try {
    const { vibe } = await request.json()

    if (!vibe) {
      return NextResponse.json({ error: "Vibe parameter is required" }, { status: 400 })
    }

    const playlist = await generateAIPlaylist(vibe)

    return NextResponse.json({ playlist })
  } catch (error) {
    console.error("Error in playlist API route:", error)
    return NextResponse.json({ error: "Failed to generate playlist" }, { status: 500 })
  }
}
