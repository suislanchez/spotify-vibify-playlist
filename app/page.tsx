"use client"

import type React from "react"

import { useState } from "react"
import { Music, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { generateAIPlaylist } from "@/app/actions"
import type { Song } from "@/lib/types"

export default function Home() {
  const [vibe, setVibe] = useState("")
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [examples, setExamples] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vibe.trim()) return

    setLoading(true)
    setError("")

    try {
      const generatedPlaylist = await generateAIPlaylist(vibe)
      setPlaylist(generatedPlaylist)
    } catch (err) {
      console.error("Error generating playlist:", err)
      setError("Failed to generate playlist. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const exampleVibes = [
    "TAYLOR SWIFT FAN",
    "AFROBEATS BUT AFTER 2020 AND NO BURNA BOY",
    "EXPERIMENTAL HIP HOP",
    "IM LONELY",
    "NOSTALGIC OF 2000s ERA",
    "RETRO GRUNGE AND 80s DISCO",
    "RAP BUT NO EXPLICIT TITLES",
  ]

  const handleExampleClick = async (example: string) => {
    setVibe(example)
    setExamples(false)
    setError("")

    setLoading(true)

    try {
      const generatedPlaylist = await generateAIPlaylist(example)
      setPlaylist(generatedPlaylist)
    } catch (err) {
      console.error("Error generating playlist:", err)
      setError("Failed to generate playlist. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-black text-white">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 mt-8">
          <Music className="h-8 w-8 text-[#1DB954]" />
          <h1 className="text-2xl font-bold">AI Vibe Playlist</h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 mb-8">
          <div className="relative">
            <Input
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="Enter your vibe or mood..."
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
              onClick={() => setExamples(!examples)}
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </div>

          {examples && (
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-2">
                <div className="flex flex-wrap gap-2">
                  {exampleVibes.map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      className="bg-zinc-800 text-zinc-200 border-zinc-700 text-xs"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold"
            disabled={loading || !vibe.trim()}
          >
            {loading ? "Generating AI Playlist..." : "Generate AI Playlist"}
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="w-full mb-6 p-3 bg-red-900/50 border border-red-700 rounded-md text-white">{error}</div>
        )}

        {/* Playlist Results */}
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
            <p className="mt-4 text-zinc-400">AI is creating your vibe playlist...</p>
          </div>
        ) : playlist.length > 0 ? (
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Your "{vibe}" Playlist</h2>
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  <div className="w-8 text-center text-zinc-500 font-medium">{index + 1}</div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-zinc-400">{song.artist}</p>
                  </div>
                  <div className="text-xs text-zinc-500">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
