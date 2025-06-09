import type { Song } from "./types"

// Database of songs for different vibes
const songDatabase = {
  taylor: [
    { title: "All Too Well (10 Minute Version)", artist: "Taylor Swift", duration: "10:13" },
    { title: "Anti-Hero", artist: "Taylor Swift", duration: "3:20" },
    { title: "Cruel Summer", artist: "Taylor Swift", duration: "2:58" },
    { title: "Cardigan", artist: "Taylor Swift", duration: "3:59" },
    { title: "Blank Space", artist: "Taylor Swift", duration: "3:51" },
    { title: "Lover", artist: "Taylor Swift", duration: "3:41" },
    { title: "August", artist: "Taylor Swift", duration: "4:21" },
    { title: "Enchanted", artist: "Taylor Swift", duration: "5:52" },
    { title: "Style", artist: "Taylor Swift", duration: "3:51" },
    { title: "Lavender Haze", artist: "Taylor Swift", duration: "3:22" },
  ],
  afrobeats: [
    { title: "Last Last", artist: "Fireboy DML", duration: "2:54" },
    { title: "Essence", artist: "Wizkid ft. Tems", duration: "4:09" },
    { title: "Calm Down", artist: "Rema", duration: "3:40" },
    { title: "Rush", artist: "Ayra Starr", duration: "3:05" },
    { title: "Peru", artist: "Fireboy DML", duration: "3:24" },
    { title: "Sungba (Remix)", artist: "Asake ft. Wizkid", duration: "3:38" },
    { title: "Terminator", artist: "Asake", duration: "2:39" },
    { title: "Finesse", artist: "Pheelz ft. BNXN", duration: "3:18" },
    { title: "Amapiano", artist: "Asake", duration: "2:46" },
    { title: "Buga", artist: "Kizz Daniel", duration: "3:04" },
  ],
  experimental: [
    { title: "Death Grips Is Online", artist: "Death Grips", duration: "3:41" },
    { title: "4th Dimension", artist: "KIDS SEE GHOSTS", duration: "2:33" },
    { title: "Ain't It Funny", artist: "Danny Brown", duration: "2:57" },
    { title: "Atrocity Exhibition", artist: "Danny Brown", duration: "3:14" },
    { title: "Clipping", artist: "clipping.", duration: "3:04" },
    { title: "Veteran", artist: "JPEGMAFIA", duration: "2:48" },
    { title: "Brick Body Complex", artist: "Open Mike Eagle", duration: "3:38" },
    { title: "Sirens", artist: "Denzel Curry ft. J.I.D", duration: "3:49" },
    { title: "Reborn", artist: "KIDS SEE GHOSTS", duration: "5:24" },
    { title: "Dilemma", artist: "Death Grips", duration: "2:54" },
  ],
  lonely: [
    { title: "Lonely", artist: "Justin Bieber", duration: "2:29" },
    { title: "Liability", artist: "Lorde", duration: "2:52" },
    { title: "Somebody Else", artist: "The 1975", duration: "5:47" },
    { title: "Hurt", artist: "Johnny Cash", duration: "3:38" },
    { title: "Creep", artist: "Radiohead", duration: "3:56" },
    { title: "Mr. Brightside", artist: "The Killers", duration: "3:42" },
    { title: "Skinny Love", artist: "Bon Iver", duration: "3:58" },
    { title: "Marvin's Room", artist: "Drake", duration: "5:47" },
    { title: "Heartbreak Anniversary", artist: "Giveon", duration: "3:17" },
    { title: "Glimpse of Us", artist: "Joji", duration: "3:53" },
  ],
  nostalgic2000s: [
    { title: "Mr. Brightside", artist: "The Killers", duration: "3:42" },
    { title: "Toxic", artist: "Britney Spears", duration: "3:18" },
    { title: "Hey Ya!", artist: "OutKast", duration: "3:55" },
    { title: "Seven Nation Army", artist: "The White Stripes", duration: "3:51" },
    { title: "Crazy In Love", artist: "Beyoncé ft. Jay-Z", duration: "3:56" },
    { title: "Boulevard of Broken Dreams", artist: "Green Day", duration: "4:20" },
    { title: "Since U Been Gone", artist: "Kelly Clarkson", duration: "3:08" },
    { title: "Gold Digger", artist: "Kanye West ft. Jamie Foxx", duration: "3:28" },
    { title: "Umbrella", artist: "Rihanna ft. Jay-Z", duration: "4:35" },
    { title: "Hips Don't Lie", artist: "Shakira ft. Wyclef Jean", duration: "3:38" },
  ],
  retro: [
    { title: "Come As You Are", artist: "Nirvana", duration: "3:39" },
    { title: "Stayin' Alive", artist: "Bee Gees", duration: "4:45" },
    { title: "Heart of Glass", artist: "Blondie", duration: "4:35" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01" },
    { title: "I Wanna Dance with Somebody", artist: "Whitney Houston", duration: "4:51" },
    { title: "Lithium", artist: "Nirvana", duration: "4:16" },
    { title: "Le Freak", artist: "Chic", duration: "5:23" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { title: "Heart-Shaped Box", artist: "Nirvana", duration: "4:41" },
    { title: "Good Times", artist: "Chic", duration: "3:45" },
  ],
  cleanRap: [
    { title: "Lose Yourself", artist: "Eminem", duration: "5:26" },
    { title: "Touch The Sky", artist: "Kanye West", duration: "3:57" },
    { title: "Stronger", artist: "Kanye West", duration: "5:11" },
    { title: "Good Life", artist: "Kanye West ft. T-Pain", duration: "3:27" },
    { title: "Can't Tell Me Nothing", artist: "Kanye West", duration: "4:32" },
    { title: "Flashing Lights", artist: "Kanye West", duration: "3:57" },
    { title: "All Falls Down", artist: "Kanye West", duration: "3:43" },
    { title: "Hey Ya!", artist: "OutKast", duration: "3:55" },
    { title: "Ms. Jackson", artist: "OutKast", duration: "4:30" },
    { title: "The Way You Move", artist: "OutKast", duration: "3:54" },
  ],
}

export function generatePlaylist(vibe: string): Song[] {
  const lowerVibe = vibe.toLowerCase()

  // Match the vibe to a category
  if (lowerVibe.includes("taylor") || lowerVibe.includes("swift")) {
    return songDatabase.taylor
  } else if (lowerVibe.includes("afrobeats") || lowerVibe.includes("afro")) {
    return songDatabase.afrobeats
  } else if (lowerVibe.includes("experimental") || lowerVibe.includes("hip hop")) {
    return songDatabase.experimental
  } else if (lowerVibe.includes("lonely") || lowerVibe.includes("sad")) {
    return songDatabase.lonely
  } else if (lowerVibe.includes("nostalgic") || lowerVibe.includes("2000")) {
    return songDatabase.nostalgic2000s
  } else if (lowerVibe.includes("retro") || lowerVibe.includes("80") || lowerVibe.includes("grunge")) {
    return songDatabase.retro
  } else if (lowerVibe.includes("rap") && lowerVibe.includes("no explicit")) {
    return songDatabase.cleanRap
  }

  // Default to a random mix if no specific match
  const allSongs = [
    ...songDatabase.taylor,
    ...songDatabase.afrobeats,
    ...songDatabase.experimental,
    ...songDatabase.lonely,
    ...songDatabase.nostalgic2000s,
    ...songDatabase.retro,
    ...songDatabase.cleanRap,
  ]

  // Shuffle and return 10 random songs
  return shuffleArray(allSongs).slice(0, 10)
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
