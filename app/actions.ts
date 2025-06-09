"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Song } from "@/lib/types"

export async function generateAIPlaylist(vibe: string): Promise<Song[]> {
  try {
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error("OpenAI API key is not configured")
    }

    const prompt = `
      Generate a playlist of 10 songs based on this vibe or description: "${vibe}".
      
      For each song, provide:
      1. Song title
      2. Artist name
      3. Duration (in MM:SS format)
      
      Make sure the songs truly match the vibe or description. If there are specific requirements like "no explicit titles" or "after 2020", please respect those.
      
      Format your response as a JSON array of objects with the following structure:
      [
        {
          "title": "Song Title",
          "artist": "Artist Name",
          "duration": "3:45"
        },
        ...
      ]
      
      Only return the JSON array, no additional text.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    })

    // Parse the response as JSON
    try {
      const playlist = JSON.parse(text) as Song[]
      return playlist
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      console.log("Raw response:", text)

      // Fallback to regex extraction if JSON parsing fails
      return extractSongsFromText(text)
    }
  } catch (error) {
    console.error("Error in generateAIPlaylist:", error)
    throw new Error("Failed to generate playlist")
  }
}

// Fallback function to extract songs from text if JSON parsing fails
function extractSongsFromText(text: string): Song[] {
  const songs: Song[] = []

  // Try to find JSON array in the text
  const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s)
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]) as Song[]
    } catch (e) {
      console.error("Failed to parse extracted JSON:", e)
    }
  }

  // If no JSON found or parsing failed, try to extract songs line by line
  const lines = text.split("\n")
  let currentSong: Partial<Song> = {}

  for (const line of lines) {
    const titleMatch = line.match(/title["\s:]+([^"]+)["]/i) || line.match(/title["\s:]+(.+)$/i)
    const artistMatch = line.match(/artist["\s:]+([^"]+)["]/i) || line.match(/artist["\s:]+(.+)$/i)
    const durationMatch =
      line.match(/duration["\s:]+([^"]+)["]/i) || line.match(/duration["\s:]+(.+)$/i) || line.match(/(\d+:\d+)/)

    if (titleMatch) currentSong.title = titleMatch[1].trim()
    if (artistMatch) currentSong.artist = artistMatch[1].trim()
    if (durationMatch) currentSong.duration = durationMatch[1].trim()

    if (currentSong.title && currentSong.artist && currentSong.duration) {
      songs.push(currentSong as Song)
      currentSong = {}

      if (songs.length >= 10) break
    }
  }

  // If we still couldn't extract songs, return a default error playlist
  if (songs.length === 0) {
    return [{ title: "API Error", artist: "Please try again", duration: "0:00" }]
  }

  return songs
}
