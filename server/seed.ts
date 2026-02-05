import { storage } from "./storage";

async function seedTracks() {
  console.log("Seeding tracks...");
  
  const existingTracks = await storage.getAllTracks();
  if (existingTracks.length > 0) {
    console.log("Tracks already seeded, skipping...");
    return;
  }

  const tracks = [
    {
      name: "Verbal Reflexes",
      description: "Master the art of instant association and eliminate hesitation. Train speed of retrieval with simple one-word prompts.",
      icon: "zap",
      difficulty: "Beginner",
      color: "orange",
      moduleCount: 10,
    },
    {
      name: "Persuasive Pitching",
      description: "Learn to structure compelling arguments on the fly. Connect two random words into a coherent 30-second pitch.",
      icon: "briefcase",
      difficulty: "Intermediate",
      color: "blue",
      moduleCount: 8,
    },
    {
      name: "Narrative Weaving",
      description: "Master storytelling under pressure. Weave 5 random plot points into a compelling narrative instantly.",
      icon: "book",
      difficulty: "Advanced",
      color: "purple",
      moduleCount: 12,
    },
  ];

  for (const track of tracks) {
    await storage.createTrack(track);
    console.log(`Created track: ${track.name}`);
  }

  console.log("Tracks seeded successfully!");
}

seedTracks().catch(console.error);
