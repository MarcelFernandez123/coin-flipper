// ==================== GAME STATE ====================
let state = {
    // Classic mode
    headsCount: 0,
    tailsCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastResult: null,
    history: [],
    achievements: {},
    coinTheme: 'kawaii',
    darkMode: false,
    soundEnabled: true,
    musicEnabled: true,
    // Story mode
    story: {
        heroName: '',
        chapter: 0,
        scene: 0,
        health: 100,
        maxHealth: 100,
        reputation: 50,
        gold: 20,
        items: [],
        battlesWon: 0,
        deaths: 0,
        endingsFound: [],
        flags: {},
        // Character avatar
        avatar: {
            gender: 'male',
            skinTone: 0,
            hairStyle: 0,
            hairColor: 0,
            eyeColor: 0,
            outfit: 0
        }
    }
};

// ==================== CHARACTER AVATAR OPTIONS ====================
const AVATAR_OPTIONS = {
    genders: ['male', 'female'],
    skinTones: ['#FFDFC4', '#F0D5BE', '#D1A684', '#A67C52', '#8D5524', '#5C3317'],
    hairStyles: {
        male: ['short', 'spiky', 'long', 'ponytail', 'mohawk', 'bald'],
        female: ['long', 'ponytail', 'short', 'twintails', 'braid', 'bun']
    },
    hairColors: ['#2C1810', '#8B4513', '#DAA520', '#DC143C', '#4169E1', '#9932CC', '#FF69B4', '#FFFFFF'],
    eyeColors: ['#8B4513', '#228B22', '#4169E1', '#9932CC', '#DC143C', '#FFD700'],
    outfits: {
        male: ['knight', 'mage', 'ranger', 'rogue', 'noble', 'peasant'],
        female: ['knight', 'mage', 'ranger', 'rogue', 'noble', 'peasant']
    },
    outfitColors: {
        knight: '#708090',
        mage: '#4B0082',
        ranger: '#228B22',
        rogue: '#2F2F2F',
        noble: '#FFD700',
        peasant: '#8B4513'
    }
};

// ==================== SCENE IMAGE DATA ====================
const SCENE_IMAGES = {
    // Locations
    castle: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=200&fit=crop',
    forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=200&fit=crop',
    mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=200&fit=crop',
    cave: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&h=200&fit=crop',
    tower: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=200&fit=crop',
    lake: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=200&fit=crop',
    swamp: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?w=400&h=200&fit=crop',
    village: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=200&fit=crop',
    shrine: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=200&fit=crop',
    throne: 'https://images.unsplash.com/photo-1577083552792-a0d461cb1dd6?w=400&h=200&fit=crop',
    battle: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=400&h=200&fit=crop',
    magic: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=200&fit=crop&sat=-100&con=1.2',
    night: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&h=200&fit=crop',
    victory: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=400&h=200&fit=crop'
};

// ==================== STORY DATA ====================
const STORY = {
    chapters: [
        // Chapter 0: Introduction
        {
            name: "The Call to Adventure",
            scenes: [
                {
                    id: "intro",
                    image: "🏰",
                    sceneType: "castle",
                    soundType: "dramatic",
                    text: "The Kingdom of Luminara is in peril! The evil Sorcerer Malachar has kidnapped Queen Celestia and locked her in the Dark Tower. You are {heroName}, a humble villager who must answer the call to adventure.",
                    headsChoice: "Accept the quest bravely",
                    tailsChoice: "Seek more information first",
                    headsResult: { nextScene: "brave_start", reputation: 10, text: "Your courage inspires the villagers! They cheer as you set off immediately." },
                    tailsResult: { nextScene: "cautious_start", gold: 15, text: "The village elder rewards your wisdom with gold and valuable information." }
                },
                {
                    id: "brave_start",
                    image: "🗡️",
                    sceneType: "village",
                    soundType: "item",
                    text: "At the village armory, the blacksmith offers you a choice of weapons.",
                    headsChoice: "Take the Sword of Light",
                    tailsChoice: "Take the Shield of Dawn",
                    headsResult: { nextScene: "forest_entrance", item: "Sword of Light", text: "The sword glows with ancient magic!" },
                    tailsResult: { nextScene: "forest_entrance", item: "Shield of Dawn", text: "The shield will protect you from dark magic!" }
                },
                {
                    id: "cautious_start",
                    image: "📜",
                    sceneType: "village",
                    soundType: "dramatic",
                    text: "The elder tells you of two paths: the Enchanted Forest or the Mountain Pass.",
                    headsChoice: "Take the Forest path",
                    tailsChoice: "Take the Mountain path",
                    headsResult: { nextScene: "forest_entrance", text: "You head toward the mysterious Enchanted Forest." },
                    tailsResult: { nextScene: "mountain_entrance", text: "You begin the treacherous climb up the mountains." }
                },
                {
                    id: "forest_entrance",
                    image: "🌲",
                    sceneType: "forest",
                    soundType: "dramatic",
                    text: "The Enchanted Forest looms before you. Strange lights flicker between the ancient trees. You hear a cry for help nearby!",
                    headsChoice: "Rush to help immediately",
                    tailsChoice: "Approach cautiously",
                    headsResult: { nextChapter: 1, nextScene: "fairy_rescue", reputation: 15, text: "Your heroism leads you to discover a fairy in danger!" },
                    tailsResult: { nextChapter: 1, nextScene: "fairy_trap", text: "Your caution reveals it might be a trap..." }
                },
                {
                    id: "mountain_entrance",
                    image: "⛰️",
                    sceneType: "mountain",
                    soundType: "dramatic",
                    text: "The mountain path is steep and dangerous. You spot a cave that could provide shelter, but also hear rumors of a dragon.",
                    headsChoice: "Explore the cave",
                    tailsChoice: "Continue on the path",
                    headsResult: { nextChapter: 1, nextScene: "dragon_cave", text: "You venture into the mysterious cave..." },
                    tailsResult: { nextChapter: 1, nextScene: "mountain_pass", gold: 10, text: "You find gold coins scattered on the safe path!" }
                }
            ]
        },
        // Chapter 1: The Journey
        {
            name: "Trials and Allies",
            scenes: [
                {
                    id: "fairy_rescue",
                    image: "🧚",
                    sceneType: "forest",
                    soundType: "magic",
                    text: "A tiny fairy named Luna is trapped in a spider's web! The giant spider approaches...",
                    headsChoice: "Fight the spider!",
                    tailsChoice: "Distract it and free Luna",
                    headsResult: { nextScene: "spider_battle", text: "You draw your weapon and charge!", soundEffect: "battle" },
                    tailsResult: { nextScene: "fairy_freed", reputation: 10, item: "Fairy Dust", text: "Luna is freed and grants you magical fairy dust!", soundEffect: "magic" }
                },
                {
                    id: "fairy_trap",
                    image: "🕸️",
                    sceneType: "forest",
                    soundType: "battle",
                    text: "It's an ambush! Goblins spring from the shadows, but your caution gave you time to react.",
                    headsChoice: "Stand and fight",
                    tailsChoice: "Try to negotiate",
                    headsResult: { nextScene: "goblin_battle", text: "You prepare for combat!", soundEffect: "battle" },
                    tailsResult: { nextScene: "goblin_deal", gold: -10, text: "The goblins agree to let you pass... for a price." }
                },
                {
                    id: "spider_battle",
                    image: "🕷️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The giant spider attacks! Its venomous fangs gleam in the dim light.",
                    headsChoice: "Aim for its eyes",
                    tailsChoice: "Go for its legs",
                    headsResult: { nextScene: "fairy_freed", battlesWon: 1, reputation: 20, text: "Critical hit! The spider is defeated!", soundEffect: "victory" },
                    tailsResult: { nextScene: "fairy_freed", battlesWon: 1, health: -20, text: "You win but take some damage from its venom.", soundEffect: "damage" }
                },
                {
                    id: "fairy_freed",
                    image: "✨",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "Luna the fairy is grateful! 'I will help you on your quest,' she says. 'But first, you must choose your path forward.'",
                    headsChoice: "Go to the Mystic Lake",
                    tailsChoice: "Visit the Witch's Hut",
                    headsResult: { nextChapter: 2, nextScene: "mystic_lake", text: "Luna guides you to the magical lake.", soundEffect: "chapter" },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "Perhaps the witch has useful knowledge...", soundEffect: "chapter" }
                },
                {
                    id: "goblin_battle",
                    image: "👺",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Five goblins surround you! This will be tough...",
                    headsChoice: "Use a battle cry to intimidate",
                    tailsChoice: "Fight defensively",
                    headsResult: { nextScene: "goblin_victory", battlesWon: 1, reputation: 15, text: "Your fierce cry scatters three goblins! You defeat the rest.", soundEffect: "victory" },
                    tailsResult: { nextScene: "goblin_victory", battlesWon: 1, health: -15, text: "You win but sustain injuries.", soundEffect: "damage" }
                },
                {
                    id: "goblin_deal",
                    image: "💰",
                    sceneType: "forest",
                    soundType: "item",
                    text: "The goblin chief laughs. 'Smart human! We tell you secret - witch in forest knows way to Dark Tower.'",
                    headsChoice: "Thank them and leave",
                    tailsChoice: "Ask for more information",
                    headsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You head to find the witch.", soundEffect: "chapter" },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", gold: -5, item: "Goblin Map", text: "For more gold, they give you a map!", soundEffect: "item" }
                },
                {
                    id: "goblin_victory",
                    image: "⚔️",
                    sceneType: "battle",
                    soundType: "victory",
                    text: "The goblins flee! Among their belongings you find a crude map.",
                    headsChoice: "Follow the map",
                    tailsChoice: "Ignore it and continue",
                    headsResult: { nextChapter: 2, nextScene: "hidden_shrine", item: "Goblin Map", text: "The map reveals a hidden location!", soundEffect: "item" },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You continue on the main path.", soundEffect: "chapter" }
                },
                {
                    id: "dragon_cave",
                    image: "🐉",
                    sceneType: "cave",
                    soundType: "dragon",
                    text: "Deep in the cave, you find a young dragon! It's injured and looks at you with fear.",
                    headsChoice: "Help heal the dragon",
                    tailsChoice: "Leave it alone",
                    headsResult: { nextScene: "dragon_friend", reputation: 25, item: "Dragon Scale", text: "The dragon becomes your ally!", soundEffect: "dragon" },
                    tailsResult: { nextChapter: 2, nextScene: "mountain_pass", text: "You leave the cave quietly." }
                },
                {
                    id: "dragon_friend",
                    image: "🐲",
                    sceneType: "cave",
                    soundType: "dragon",
                    text: "The dragon, named Ember, is grateful! 'I will aid you, brave one. I know where the Dark Tower lies.'",
                    headsChoice: "Fly directly to the tower",
                    tailsChoice: "Gather allies first",
                    headsResult: { nextChapter: 3, nextScene: "tower_direct", text: "Ember takes flight toward the tower!", soundEffect: "dragon" },
                    tailsResult: { nextChapter: 2, nextScene: "mystic_lake", text: "Wisdom dictates you need more help.", soundEffect: "chapter" }
                },
                {
                    id: "mountain_pass",
                    image: "🏔️",
                    sceneType: "mountain",
                    soundType: "dramatic",
                    text: "The mountain pass is treacherous. You encounter a traveling merchant.",
                    headsChoice: "Trade with the merchant",
                    tailsChoice: "Continue past them",
                    headsResult: { nextChapter: 2, nextScene: "merchant_trade", text: "The merchant has interesting wares...", soundEffect: "item" },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You press onward.", soundEffect: "chapter" }
                }
            ]
        },
        // Chapter 2: Gathering Power
        {
            name: "The Power Within",
            scenes: [
                {
                    id: "mystic_lake",
                    image: "🌊",
                    text: "The Mystic Lake shimmers with ethereal light. A spirit rises from the water. 'Prove your worth, hero.'",
                    headsChoice: "Accept the spirit's challenge",
                    tailsChoice: "Offer a gift instead",
                    headsResult: { nextScene: "spirit_challenge", text: "The spirit creates an illusion to test you." },
                    tailsResult: { nextScene: "spirit_gift", gold: -15, text: "Your offering pleases the spirit." }
                },
                {
                    id: "spirit_challenge",
                    image: "👻",
                    text: "The spirit shows you your greatest fear. You must face it!",
                    headsChoice: "Face your fear head-on",
                    tailsChoice: "Use wisdom to overcome",
                    headsResult: { nextScene: "spirit_blessing", reputation: 20, health: -10, text: "Through sheer will, you conquer your fear!" },
                    tailsResult: { nextScene: "spirit_blessing", reputation: 15, text: "Your clever thinking impresses the spirit." }
                },
                {
                    id: "spirit_gift",
                    image: "🎁",
                    text: "The spirit accepts your gift graciously.",
                    headsChoice: "Ask for power",
                    tailsChoice: "Ask for knowledge",
                    headsResult: { nextScene: "spirit_blessing", item: "Spirit Amulet", text: "You receive a powerful amulet!" },
                    tailsResult: { nextScene: "spirit_blessing", flag: "tower_secret", text: "The spirit reveals a secret entrance to the tower!" }
                },
                {
                    id: "spirit_blessing",
                    image: "💫",
                    text: "The spirit blesses you. 'The Queen's fate rests in your hands. The Dark Tower awaits.'",
                    headsChoice: "Head to the tower immediately",
                    tailsChoice: "Seek the witch's help first",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", text: "You set off toward the Dark Tower!" },
                    tailsResult: { nextScene: "witch_hut", text: "More preparation couldn't hurt." }
                },
                {
                    id: "witch_hut",
                    image: "🏚️",
                    text: "The witch's hut sits crookedly in a misty clearing. She cackles as you approach. 'I know why you're here...'",
                    headsChoice: "Ask for her help directly",
                    tailsChoice: "Offer to trade services",
                    headsResult: { nextScene: "witch_help", gold: -20, text: "'Help costs gold, dearie!'" },
                    tailsResult: { nextScene: "witch_quest", text: "'Do something for me first...'" }
                },
                {
                    id: "witch_help",
                    image: "🧪",
                    text: "The witch gives you a potion. 'This will protect you from Malachar's dark magic... for a time.'",
                    headsChoice: "Drink it now",
                    tailsChoice: "Save it for later",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", health: 30, flag: "magic_resist", text: "You feel power surge through you!" },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", item: "Magic Potion", text: "You store the potion safely." }
                },
                {
                    id: "witch_quest",
                    image: "🍄",
                    text: "'Fetch me a Moonpetal flower from the Shadowfen. Then we'll talk.'",
                    headsChoice: "Accept the quest",
                    tailsChoice: "Refuse and leave",
                    headsResult: { nextScene: "shadowfen", text: "You venture into the dangerous swamp." },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", reputation: -10, text: "The witch curses as you leave." }
                },
                {
                    id: "shadowfen",
                    image: "🌿",
                    text: "The Shadowfen is dark and treacherous. You spot the Moonpetal... but something lurks nearby.",
                    headsChoice: "Grab it quickly",
                    tailsChoice: "Observe the danger first",
                    headsResult: { nextScene: "swamp_monster", text: "A swamp monster attacks!" },
                    tailsResult: { nextScene: "swamp_avoided", item: "Moonpetal Flower", text: "You avoid the creature and get the flower!" }
                },
                {
                    id: "swamp_monster",
                    image: "👹",
                    text: "A terrible swamp creature rises from the muck!",
                    headsChoice: "Fight the beast",
                    tailsChoice: "Try to escape",
                    headsResult: { nextScene: "swamp_victory", battlesWon: 1, health: -25, item: "Moonpetal Flower", text: "You defeat it but are wounded." },
                    tailsResult: { nextScene: "swamp_avoided", health: -10, text: "You escape with minor injuries but no flower." }
                },
                {
                    id: "swamp_victory",
                    image: "🏆",
                    text: "The monster falls! You claim the Moonpetal and return to the witch.",
                    headsChoice: "Demand extra payment",
                    tailsChoice: "Accept her original offer",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", item: "Magic Potion", gold: 25, reputation: -5, text: "She reluctantly agrees." },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", item: "Magic Potion", reputation: 10, text: "She respects your honor and gives you extra supplies." }
                },
                {
                    id: "swamp_avoided",
                    image: "😌",
                    text: "You make it back to the witch. She's pleased with your work.",
                    headsChoice: "Continue on to the tower",
                    tailsChoice: "Rest and recover first",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", item: "Magic Potion", text: "She gives you the potion. Onward!" },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", health: 30, item: "Magic Potion", text: "Rest restores your strength. You're ready." }
                },
                {
                    id: "hidden_shrine",
                    image: "🛕",
                    text: "The goblin map leads to an ancient shrine! A divine presence fills the air.",
                    headsChoice: "Pray at the shrine",
                    tailsChoice: "Search for treasure",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", reputation: 25, item: "Holy Symbol", text: "You are blessed with divine protection!" },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", gold: 50, reputation: -15, text: "You find gold but feel guilty." }
                },
                {
                    id: "merchant_trade",
                    image: "🛒",
                    text: "The merchant shows their wares: healing potions, a map, and a mysterious key.",
                    headsChoice: "Buy the mysterious key (30 gold)",
                    tailsChoice: "Buy healing potions (15 gold)",
                    headsResult: { nextChapter: 3, nextScene: "tower_approach", gold: -30, item: "Mysterious Key", text: "The key pulses with magic..." },
                    tailsResult: { nextChapter: 3, nextScene: "tower_approach", gold: -15, health: 40, text: "The potions restore your health!" }
                }
            ]
        },
        // Chapter 3: The Dark Tower
        {
            name: "The Dark Tower",
            scenes: [
                {
                    id: "tower_approach",
                    image: "🗼",
                    text: "The Dark Tower looms against a blood-red sky. Lightning crackles around its peak. This is it.",
                    headsChoice: "Storm the front gate",
                    tailsChoice: "Look for another entrance",
                    headsResult: { nextScene: "front_gate", text: "You boldly approach the main entrance!" },
                    tailsResult: { nextScene: "secret_entrance", text: "You search for a hidden way in." }
                },
                {
                    id: "tower_direct",
                    image: "🦅",
                    text: "Ember the dragon flies you directly to the tower's upper levels!",
                    headsChoice: "Land on the balcony",
                    tailsChoice: "Circle to scout first",
                    headsResult: { nextScene: "balcony_landing", text: "You land near the Queen's prison!" },
                    tailsResult: { nextScene: "tower_scout", text: "You spot Malachar's weaknesses from above." }
                },
                {
                    id: "front_gate",
                    image: "🚪",
                    text: "Dark knights guard the gate! They raise their weapons.",
                    headsChoice: "Fight through them",
                    tailsChoice: "Try to sneak past",
                    headsResult: { nextScene: "knight_battle", text: "Steel clashes against steel!" },
                    tailsResult: { nextScene: "sneak_success", text: "You use the shadows to slip by." }
                },
                {
                    id: "secret_entrance",
                    image: "🕳️",
                    text: "You find a hidden passage! It's dark and may be trapped.",
                    headsChoice: "Proceed carefully",
                    tailsChoice: "Light a torch",
                    headsResult: { nextScene: "trap_avoided", text: "Your caution pays off - you spot and avoid traps!" },
                    tailsResult: { nextScene: "trap_sprung", health: -15, text: "The light reveals you to magical guardians!" }
                },
                {
                    id: "knight_battle",
                    image: "⚔️",
                    text: "The dark knights are formidable foes!",
                    headsChoice: "Use all your strength",
                    tailsChoice: "Fight smart, not hard",
                    headsResult: { nextScene: "tower_interior", battlesWon: 1, health: -20, text: "Victory! But you're wounded." },
                    tailsResult: { nextScene: "tower_interior", battlesWon: 1, text: "Your strategy wins the day!" }
                },
                {
                    id: "sneak_success",
                    image: "🤫",
                    text: "You slip past the guards and enter the tower unseen.",
                    headsChoice: "Continue stealthily",
                    tailsChoice: "Prepare for combat",
                    headsResult: { nextScene: "tower_interior", reputation: 5, text: "Your stealth serves you well." },
                    tailsResult: { nextScene: "tower_interior", text: "Weapons ready, you proceed." }
                },
                {
                    id: "trap_avoided",
                    image: "✅",
                    text: "You navigate the traps and emerge inside the tower.",
                    headsChoice: "Head up toward the Queen",
                    tailsChoice: "Search for useful items",
                    headsResult: { nextScene: "tower_interior", text: "Time is of the essence!" },
                    tailsResult: { nextScene: "tower_interior", item: "Dark Crystal", gold: 20, text: "You find valuable items!" }
                },
                {
                    id: "trap_sprung",
                    image: "⚠️",
                    text: "Magical guardians attack! Stone golems animate around you.",
                    headsChoice: "Destroy them",
                    tailsChoice: "Run past them",
                    headsResult: { nextScene: "tower_interior", battlesWon: 1, health: -15, text: "The golems crumble!" },
                    tailsResult: { nextScene: "tower_interior", health: -10, text: "You escape but take hits." }
                },
                {
                    id: "balcony_landing",
                    image: "🏰",
                    text: "You land on the balcony near the tower's peak. The Queen's chamber is nearby!",
                    headsChoice: "Rush to save her",
                    tailsChoice: "Be cautious of traps",
                    headsResult: { nextScene: "queen_chamber", text: "You burst toward the chamber!" },
                    tailsResult: { nextScene: "queen_chamber", reputation: 5, text: "Your caution is rewarded." }
                },
                {
                    id: "tower_scout",
                    image: "👁️",
                    text: "From above, you see Malachar in his throne room, and the Queen in a nearby tower!",
                    headsChoice: "Attack Malachar directly",
                    tailsChoice: "Rescue the Queen first",
                    headsResult: { nextScene: "malachar_battle", flag: "direct_attack", text: "You dive toward the sorcerer!" },
                    tailsResult: { nextScene: "queen_chamber", text: "The Queen is the priority." }
                },
                {
                    id: "tower_interior",
                    image: "🏚️",
                    text: "Inside the dark tower, stairs spiral upward. You hear chanting from above.",
                    headsChoice: "Rush upward",
                    tailsChoice: "Proceed carefully",
                    headsResult: { nextScene: "malachar_encounter", text: "You race up the stairs!" },
                    tailsResult: { nextScene: "queen_chamber", text: "You find a side passage to the Queen!" }
                },
                {
                    id: "queen_chamber",
                    image: "👸",
                    text: "Queen Celestia is imprisoned in a magical cage! She looks weak but alive. 'Hero... Malachar drains my life force for power...'",
                    headsChoice: "Break the cage immediately",
                    tailsChoice: "Ask how to free her safely",
                    headsResult: { nextScene: "cage_break", text: "You strike at the magical bars!" },
                    tailsResult: { nextScene: "cage_puzzle", text: "'The lock... it requires a pure heart to open.'" }
                },
                {
                    id: "cage_break",
                    image: "💥",
                    text: "The cage shatters! But an alarm sounds - Malachar knows you're here!",
                    headsChoice: "Face Malachar now",
                    tailsChoice: "Escape with the Queen",
                    headsResult: { nextChapter: 4, nextScene: "malachar_battle", text: "You prepare for the final battle!" },
                    tailsResult: { nextChapter: 4, nextScene: "escape_attempt", text: "You grab the Queen and run!" }
                },
                {
                    id: "cage_puzzle",
                    image: "💝",
                    text: "You place your hand on the lock. It glows and... opens! Your pure intentions freed her.",
                    headsChoice: "Leave quietly with the Queen",
                    tailsChoice: "Confront Malachar",
                    headsResult: { nextChapter: 4, nextScene: "quiet_escape", reputation: 10, text: "You sneak away with the Queen." },
                    tailsResult: { nextChapter: 4, nextScene: "malachar_battle", reputation: 15, text: "Time to end this evil!" }
                },
                {
                    id: "malachar_encounter",
                    image: "🧙‍♂️",
                    text: "Malachar stands before his dark altar. 'Fool! You dare challenge me?' He begins casting a spell!",
                    headsChoice: "Interrupt his spell",
                    tailsChoice: "Defend yourself",
                    headsResult: { nextChapter: 4, nextScene: "malachar_battle", reputation: 10, text: "You strike before he finishes!" },
                    tailsResult: { nextChapter: 4, nextScene: "malachar_battle", health: -20, text: "His spell hits you but you survive!" }
                }
            ]
        },
        // Chapter 4: The Final Confrontation
        {
            name: "Destiny Revealed",
            scenes: [
                {
                    id: "malachar_battle",
                    image: "⚡",
                    text: "Malachar's eyes glow with dark power. 'You cannot defeat me! I have drained the Queen's essence!' This is the final battle!",
                    headsChoice: "Attack with all your might",
                    tailsChoice: "Use your items/allies",
                    headsResult: { nextScene: "battle_physical", text: "You charge at the dark sorcerer!" },
                    tailsResult: { nextScene: "battle_strategy", text: "You call upon everything you've gathered!" }
                },
                {
                    id: "battle_physical",
                    image: "⚔️",
                    text: "Your weapon clashes against his magical shields! He's powerful but you're determined!",
                    headsChoice: "Press the attack",
                    tailsChoice: "Look for weakness",
                    headsResult: { nextScene: "ending_hero_sacrifice", health: -50, text: "You break through but at great cost!" },
                    tailsResult: { nextScene: "ending_wise_victory", text: "You spot his weakness - the dark crystal!" }
                },
                {
                    id: "battle_strategy",
                    image: "🌟",
                    text: "Your allies and items create a combined assault! Magic, friendship, and courage unite!",
                    headsChoice: "Lead the final charge",
                    tailsChoice: "Let your allies distract him",
                    headsResult: { nextScene: "ending_legendary_hero", text: "You lead everyone to victory!" },
                    tailsResult: { nextScene: "ending_team_victory", text: "Together, you overwhelm the sorcerer!" }
                },
                {
                    id: "escape_attempt",
                    image: "🏃",
                    text: "You flee with Queen Celestia! Malachar's voice echoes: 'You cannot escape!'",
                    headsChoice: "Find a window to jump from",
                    tailsChoice: "Fight through the guards",
                    headsResult: { nextScene: "ending_narrow_escape", text: "A leap of faith!" },
                    tailsResult: { nextScene: "ending_fighting_escape", battlesWon: 1, text: "You battle your way out!" }
                },
                {
                    id: "quiet_escape",
                    image: "🌙",
                    text: "You sneak through the shadows with the Queen. Freedom is so close...",
                    headsChoice: "Make a run for it",
                    tailsChoice: "Continue sneaking",
                    headsResult: { nextScene: "ending_narrow_escape", text: "You sprint toward freedom!" },
                    tailsResult: { nextScene: "ending_silent_hero", text: "You escape without anyone noticing." }
                },
                // ENDINGS
                {
                    id: "ending_hero_sacrifice",
                    image: "😢",
                    isEnding: true,
                    endingId: "sacrifice",
                    text: "You defeat Malachar, but his final spell mortally wounds you. The Queen holds you as you fade. 'Your sacrifice will never be forgotten, {heroName}. You saved us all.'"
                },
                {
                    id: "ending_wise_victory",
                    image: "🧠",
                    isEnding: true,
                    endingId: "wise",
                    text: "By destroying his power source, Malachar crumbles to dust! The Queen embraces you. 'Your wisdom saved the kingdom. You shall be my Royal Advisor!'"
                },
                {
                    id: "ending_legendary_hero",
                    image: "👑",
                    isEnding: true,
                    endingId: "king",
                    text: "With your allies' help, you defeat Malachar in an epic battle! The Queen is so grateful, she offers you her hand in marriage. You become King {heroName}, ruler of Luminara!"
                },
                {
                    id: "ending_team_victory",
                    image: "🤝",
                    isEnding: true,
                    endingId: "team",
                    text: "Your friends and allies defeat Malachar together! The kingdom celebrates its heroes. You form the Order of the Coin, legendary protectors of the realm!"
                },
                {
                    id: "ending_narrow_escape",
                    image: "🌅",
                    isEnding: true,
                    endingId: "escape",
                    text: "You escape with the Queen just as the tower collapses! Malachar is buried in the rubble. 'You saved me,' the Queen says. 'Luminara is forever grateful.'"
                },
                {
                    id: "ending_fighting_escape",
                    image: "⚔️",
                    isEnding: true,
                    endingId: "warrior",
                    text: "You fight through an army to save the Queen! Your legend spreads across the land. You become the Kingdom's greatest warrior, General {heroName}!"
                },
                {
                    id: "ending_silent_hero",
                    image: "🦸",
                    isEnding: true,
                    endingId: "shadow",
                    text: "You save the Queen without anyone knowing. Malachar eventually falls from his own failed rituals. You become a legend - the Shadow Hero of Luminara, spoken of in whispers."
                }
            ]
        }
    ],
    endings: {
        sacrifice: { name: "The Ultimate Sacrifice", icon: "😢", description: "Gave your life to save the kingdom" },
        wise: { name: "The Wise Advisor", icon: "🧠", description: "Used wisdom to defeat evil" },
        king: { name: "The New King", icon: "👑", description: "Married the Queen and ruled the kingdom" },
        team: { name: "The Fellowship", icon: "🤝", description: "Victory through friendship" },
        escape: { name: "The Great Escape", icon: "🌅", description: "Rescued the Queen against all odds" },
        warrior: { name: "The Legendary Warrior", icon: "⚔️", description: "Became the kingdom's greatest fighter" },
        shadow: { name: "The Shadow Hero", icon: "🦸", description: "Saved the day without anyone knowing" }
    }
};

// ==================== DOM ELEMENTS ====================
const coin = document.getElementById('coin');
const storyCoin = document.getElementById('storyCoin');
const flipBtn = document.getElementById('flipBtn');
const storyFlipBtn = document.getElementById('storyFlipBtn');
const confettiContainer = document.getElementById('confetti');
const sparklesContainer = document.getElementById('sparkles');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');

// Story elements
const sceneImage = document.getElementById('sceneImage');
const sceneText = document.getElementById('sceneText');
const headsChoiceEl = document.getElementById('headsChoice');
const tailsChoiceEl = document.getElementById('tailsChoice');
const heroNameEl = document.getElementById('heroName');
const currentChapterEl = document.getElementById('currentChapter');
const healthBar = document.getElementById('healthBar');
const healthValue = document.getElementById('healthValue');
const repBar = document.getElementById('repBar');
const repValue = document.getElementById('repValue');
const goldBar = document.getElementById('goldBar');
const goldValue = document.getElementById('goldValue');
const invItems = document.getElementById('invItems');
const questProgress = document.getElementById('questProgress');
const battlesWonEl = document.getElementById('battlesWon');
const deathsEl = document.getElementById('deaths');
const endingsFoundEl = document.getElementById('endingsFound');
const storyMascot = document.getElementById('storyMascot');
const storyMascotSpeech = document.getElementById('storyMascotSpeech');

// Popups
const namePopup = document.getElementById('namePopup');
const heroNameInput = document.getElementById('heroNameInput');
const nameSubmitBtn = document.getElementById('nameSubmitBtn');
const endingPopup = document.getElementById('endingPopup');
const endingIcon = document.getElementById('endingIcon');
const endingTitle = document.getElementById('endingTitle');
const endingText = document.getElementById('endingText');
const endingStats = document.getElementById('endingStats');
const playAgainBtn = document.getElementById('playAgainBtn');
const viewAllEndingsBtn = document.getElementById('viewAllEndingsBtn');
const endingsCollectionPopup = document.getElementById('endingsCollectionPopup');
const endingsGrid = document.getElementById('endingsGrid');
const closeEndingsBtn = document.getElementById('closeEndingsBtn');

// ==================== BACKGROUND MUSIC SYSTEM ====================
let audioContext = null;
let musicPlaying = false;
let currentMusicNodes = [];
let musicEnabled = true;
let currentMusicType = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

// Music generator - creates procedural game music
function startMusic(type = 'adventure') {
    if (!musicEnabled || currentMusicType === type) return;

    stopMusic();
    currentMusicType = type;
    musicPlaying = true;

    const ctx = getAudioContext();

    // Different music styles for different scenes
    const musicStyles = {
        adventure: {
            tempo: 120,
            key: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88], // C major
            bassPattern: [0, 0, 4, 4, 5, 5, 4, 4],
            melodyPattern: [0, 2, 4, 2, 5, 4, 2, 0],
            mood: 'bright'
        },
        battle: {
            tempo: 160,
            key: [220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00], // A minor
            bassPattern: [0, 0, 2, 2, 3, 3, 2, 0],
            melodyPattern: [4, 3, 2, 0, 2, 3, 4, 5],
            mood: 'intense'
        },
        mystery: {
            tempo: 80,
            key: [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23], // G minor
            bassPattern: [0, 2, 0, 3, 0, 2, 0, 4],
            melodyPattern: [2, 4, 3, 2, 4, 5, 4, 2],
            mood: 'dark'
        },
        victory: {
            tempo: 140,
            key: [329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 622.25], // E major
            bassPattern: [0, 0, 3, 3, 4, 4, 3, 0],
            melodyPattern: [0, 2, 4, 5, 4, 2, 4, 0],
            mood: 'triumphant'
        },
        peaceful: {
            tempo: 70,
            key: [293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 554.37], // D major
            bassPattern: [0, 4, 2, 4, 0, 4, 3, 4],
            melodyPattern: [4, 5, 4, 2, 4, 2, 0, 2],
            mood: 'calm'
        }
    };

    const style = musicStyles[type] || musicStyles.adventure;
    const beatDuration = 60 / style.tempo;

    // Create master gain for music volume
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Bass line
    function playBass() {
        if (!musicPlaying) return;

        style.bassPattern.forEach((note, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);

            osc.type = 'sine';
            osc.frequency.value = style.key[note] / 2; // One octave lower

            filter.type = 'lowpass';
            filter.frequency.value = 200;

            const startTime = ctx.currentTime + (i * beatDuration);
            gain.gain.setValueAtTime(0.3, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + beatDuration * 0.8);

            osc.start(startTime);
            osc.stop(startTime + beatDuration);

            currentMusicNodes.push({ osc, gain });
        });

        // Loop
        if (musicPlaying) {
            setTimeout(playBass, style.bassPattern.length * beatDuration * 1000);
        }
    }

    // Melody/Pad
    function playMelody() {
        if (!musicPlaying) return;

        style.melodyPattern.forEach((note, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(masterGain);

            osc.type = style.mood === 'intense' ? 'sawtooth' : 'triangle';
            osc.frequency.value = style.key[note];

            const startTime = ctx.currentTime + (i * beatDuration * 0.5);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + beatDuration * 0.4);

            osc.start(startTime);
            osc.stop(startTime + beatDuration * 0.5);

            currentMusicNodes.push({ osc, gain });
        });

        // Loop melody
        if (musicPlaying) {
            setTimeout(playMelody, style.melodyPattern.length * beatDuration * 0.5 * 1000);
        }
    }

    // Ambient pad for atmosphere
    function playPad() {
        if (!musicPlaying) return;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.value = style.key[0];
        osc2.frequency.value = style.key[4];

        filter.type = 'lowpass';
        filter.frequency.value = style.mood === 'dark' ? 400 : 800;

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + 6);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 8);

        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 8);
        osc2.stop(ctx.currentTime + 8);

        currentMusicNodes.push({ osc: osc1, gain }, { osc: osc2, gain });

        // Loop pad
        if (musicPlaying) {
            setTimeout(playPad, 7500);
        }
    }

    // Start all layers
    playBass();
    setTimeout(playMelody, beatDuration * 2 * 1000);
    playPad();
}

function stopMusic() {
    musicPlaying = false;
    currentMusicType = null;

    // Stop all current music nodes
    currentMusicNodes.forEach(node => {
        try {
            if (node.gain) {
                node.gain.gain.setValueAtTime(0, getAudioContext().currentTime);
            }
            if (node.osc && node.osc.stop) {
                node.osc.stop(getAudioContext().currentTime + 0.1);
            }
        } catch (e) {}
    });
    currentMusicNodes = [];
}

function toggleMusic() {
    state.musicEnabled = !state.musicEnabled;
    musicEnabled = state.musicEnabled;
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.querySelector('.music-icon').textContent = musicEnabled ? '🎵' : '🔇';
        musicToggle.classList.toggle('muted', !musicEnabled);
    }

    if (musicEnabled) {
        // Start appropriate music based on current scene
        const scene = getCurrentScene();
        if (scene) {
            playSceneMusic(scene);
        } else {
            startMusic('adventure');
        }
    } else {
        stopMusic();
    }

    saveState();
}

function playSceneMusic(scene) {
    if (!musicEnabled) return;

    // Determine music type based on scene
    let musicType = 'adventure';

    if (scene.soundType === 'battle' || scene.sceneType === 'battle') {
        musicType = 'battle';
    } else if (scene.soundType === 'magic' || scene.sceneType === 'magic') {
        musicType = 'mystery';
    } else if (scene.sceneType === 'cave' || scene.sceneType === 'swamp' || scene.sceneType === 'tower') {
        musicType = 'mystery';
    } else if (scene.sceneType === 'village' || scene.sceneType === 'lake') {
        musicType = 'peaceful';
    } else if (scene.isEnding) {
        musicType = 'victory';
    }

    startMusic(musicType);
}

// ==================== SOUND EFFECTS ====================

function createSound(frequency, duration, type = 'sine') {
    return () => {
        if (!state.soundEnabled) return;
        try {
            const audioCtx = getAudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    };
}

const playFlipSound = createSound(800, 0.1, 'square');
const playResultSound = createSound(523, 0.2, 'sine');

// Victory fanfare
const playVictorySound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        [523, 659, 784, 1047].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.15 + 0.4);
            osc.start(audioCtx.currentTime + i * 0.15);
            osc.stop(audioCtx.currentTime + i * 0.15 + 0.4);
        });
    } catch (e) {}
};

// Battle sword clash sound
const playBattleSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        // Metal clash
        for (let i = 0; i < 3; i++) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const filter = audioCtx.createBiquadFilter();
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sawtooth';
            osc.frequency.value = 800 + Math.random() * 400;
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.1 + 0.15);
            osc.start(audioCtx.currentTime + i * 0.1);
            osc.stop(audioCtx.currentTime + i * 0.1 + 0.15);
        }
    } catch (e) {}
};

// Magic spell sound
const playMagicSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.6);
        // Sparkle overlay
        setTimeout(() => {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.type = 'sine';
            osc2.frequency.value = 1200;
            gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            osc2.start(audioCtx.currentTime);
            osc2.stop(audioCtx.currentTime + 0.2);
        }, 100);
    } catch (e) {}
};

// Damage/hurt sound
const playDamageSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
};

// Item pickup/gold sound
const playItemSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        [880, 1100, 1320].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.15);
            osc.start(audioCtx.currentTime + i * 0.08);
            osc.stop(audioCtx.currentTime + i * 0.08 + 0.15);
        });
    } catch (e) {}
};

// Dramatic reveal/story progression sound
const playDramaticSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.setValueAtTime(277, audioCtx.currentTime + 0.2);
        osc.frequency.setValueAtTime(330, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
};

// Death/failure sound
const playDeathSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        [200, 180, 150, 100].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.2 + 0.3);
            osc.start(audioCtx.currentTime + i * 0.2);
            osc.stop(audioCtx.currentTime + i * 0.2 + 0.3);
        });
    } catch (e) {}
};

// Chapter transition sound
const playChapterSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        // Epic chord
        [261, 329, 392, 523].forEach((freq) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 1.2);
        });
    } catch (e) {}
};

// Dragon roar sound
const playDragonSound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.8);
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
};

// Ending fanfare
const playEndingFanfare = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = getAudioContext();
        const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.1 + 0.3);
            osc.start(audioCtx.currentTime + i * 0.1);
            osc.stop(audioCtx.currentTime + i * 0.1 + 0.3);
        });
        // Final chord
        setTimeout(() => {
            [523, 659, 784, 1047].forEach((freq) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 1);
            });
        }, 800);
    } catch (e) {}
};

// ==================== INITIALIZATION ====================
function init() {
    loadState();
    createSparkles();
    applyTheme();
    applyMusicState();
    setupEventListeners();
    initCharacterCreator();

    // Check if story needs to start
    if (!state.story.heroName) {
        namePopup.classList.add('show');
    } else {
        updateStoryDisplay();
        updateMiniAvatar();
    }

    // Initialize classic mode too
    updateClassicDisplay();
    updateAchievementsDisplay();
    updateHistoryDisplay();
}

function applyMusicState() {
    musicEnabled = state.musicEnabled !== false; // Default to true
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.querySelector('.music-icon').textContent = musicEnabled ? '🎵' : '🔇';
        musicToggle.classList.toggle('muted', !musicEnabled);
    }
}

function setupEventListeners() {
    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.addEventListener('click', () => switchMode(tab.dataset.mode));
    });

    // Theme, sound, and music toggles
    themeToggle.addEventListener('click', toggleDarkMode);
    soundToggle.addEventListener('click', toggleSound);
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);

    // Start music on first interaction (browsers require user interaction)
    document.addEventListener('click', function startMusicOnInteraction() {
        if (musicEnabled && !musicPlaying) {
            const scene = getCurrentScene();
            if (scene) {
                playSceneMusic(scene);
            } else {
                startMusic('adventure');
            }
        }
        document.removeEventListener('click', startMusicOnInteraction);
    }, { once: true });

    // Story mode
    storyFlipBtn.addEventListener('click', storyFlip);
    document.getElementById('restartStory').addEventListener('click', restartStory);
    document.getElementById('viewEndings').addEventListener('click', showEndingsCollection);
    nameSubmitBtn.addEventListener('click', submitHeroName);
    heroNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitHeroName();
    });
    playAgainBtn.addEventListener('click', () => {
        endingPopup.classList.remove('show');
        restartStory();
    });
    viewAllEndingsBtn.addEventListener('click', () => {
        endingPopup.classList.remove('show');
        showEndingsCollection();
    });
    closeEndingsBtn.addEventListener('click', () => {
        endingsCollectionPopup.classList.remove('show');
    });

    // Classic mode
    flipBtn.addEventListener('click', classicFlip);
    document.getElementById('resetBtn').addEventListener('click', resetClassicStats);
    document.getElementById('clearHistory').addEventListener('click', clearHistory);
    document.getElementById('shareBtn').addEventListener('click', shareResults);
    document.getElementById('copyBtn').addEventListener('click', copyStats);

    document.querySelectorAll('.coin-theme-btn').forEach(btn => {
        btn.addEventListener('click', () => setCoinTheme(btn.dataset.theme));
    });

    document.querySelectorAll('.quick-flip-btn').forEach(btn => {
        btn.addEventListener('click', () => quickFlip(parseInt(btn.dataset.flips)));
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            const storyMode = document.getElementById('storyMode');
            if (storyMode.style.display !== 'none' && !storyFlipBtn.disabled) {
                storyFlip();
            } else if (!flipBtn.disabled) {
                classicFlip();
            }
        }
    });
}

// ==================== MODE SWITCHING ====================
function switchMode(mode) {
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    document.getElementById('storyMode').style.display = mode === 'story' ? 'block' : 'none';
    document.getElementById('classicMode').style.display = mode === 'classic' ? 'block' : 'none';
}

// ==================== STORY MODE ====================
function submitHeroName() {
    const name = heroNameInput.value.trim() || 'Hero';
    state.story.heroName = name;
    state.story.chapter = 0;
    state.story.scene = 0;
    namePopup.classList.remove('show');
    updateStoryDisplay();
    updateMiniAvatar();
    saveState();
    playDramaticSound();
    showStoryMascotMessage(`Welcome, ${name}! Your adventure begins!`);
}

// ==================== CHARACTER CREATOR ====================
function initCharacterCreator() {
    // Initialize skin tone options
    const skinOptions = document.getElementById('skinOptions');
    AVATAR_OPTIONS.skinTones.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = `color-btn ${index === state.story.avatar.skinTone ? 'active' : ''}`;
        btn.style.backgroundColor = color;
        btn.dataset.option = 'skinTone';
        btn.dataset.value = index;
        btn.addEventListener('click', () => selectColorOption('skinTone', index));
        skinOptions.appendChild(btn);
    });

    // Initialize hair color options
    const hairColorOptions = document.getElementById('hairColorOptions');
    AVATAR_OPTIONS.hairColors.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = `color-btn ${index === state.story.avatar.hairColor ? 'active' : ''}`;
        btn.style.backgroundColor = color;
        btn.dataset.option = 'hairColor';
        btn.dataset.value = index;
        btn.addEventListener('click', () => selectColorOption('hairColor', index));
        hairColorOptions.appendChild(btn);
    });

    // Initialize eye color options
    const eyeColorOptions = document.getElementById('eyeColorOptions');
    AVATAR_OPTIONS.eyeColors.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = `color-btn ${index === state.story.avatar.eyeColor ? 'active' : ''}`;
        btn.style.backgroundColor = color;
        btn.dataset.option = 'eyeColor';
        btn.dataset.value = index;
        btn.addEventListener('click', () => selectColorOption('eyeColor', index));
        eyeColorOptions.appendChild(btn);
    });

    // Initialize gender buttons
    document.querySelectorAll('[data-option="gender"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-option="gender"]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.story.avatar.gender = btn.dataset.value;
            state.story.avatar.hairStyle = 0;
            updateHairStyleOptions();
            updateOutfitOptions();
            renderAvatar();
        });
    });

    updateHairStyleOptions();
    updateOutfitOptions();
    renderAvatar();
}

function updateHairStyleOptions() {
    const hairStyleOptions = document.getElementById('hairStyleOptions');
    hairStyleOptions.innerHTML = '';
    const gender = state.story.avatar.gender;
    const styles = AVATAR_OPTIONS.hairStyles[gender];

    styles.forEach((style, index) => {
        const btn = document.createElement('button');
        btn.className = `option-btn ${index === state.story.avatar.hairStyle ? 'active' : ''}`;
        btn.textContent = style.charAt(0).toUpperCase() + style.slice(1);
        btn.addEventListener('click', () => {
            document.querySelectorAll('#hairStyleOptions .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.story.avatar.hairStyle = index;
            renderAvatar();
        });
        hairStyleOptions.appendChild(btn);
    });
}

function updateOutfitOptions() {
    const outfitOptions = document.getElementById('outfitOptions');
    outfitOptions.innerHTML = '';
    const gender = state.story.avatar.gender;
    const outfits = AVATAR_OPTIONS.outfits[gender];

    const classIcons = {
        knight: '⚔️',
        mage: '🔮',
        ranger: '🏹',
        rogue: '🗡️',
        noble: '👑',
        peasant: '🌾'
    };

    outfits.forEach((outfit, index) => {
        const btn = document.createElement('button');
        btn.className = `option-btn ${index === state.story.avatar.outfit ? 'active' : ''}`;
        btn.textContent = `${classIcons[outfit]} ${outfit.charAt(0).toUpperCase() + outfit.slice(1)}`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('#outfitOptions .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.story.avatar.outfit = index;
            renderAvatar();
        });
        outfitOptions.appendChild(btn);
    });
}

function selectColorOption(option, index) {
    state.story.avatar[option] = index;
    const container = document.getElementById(option === 'skinTone' ? 'skinOptions' :
                      option === 'hairColor' ? 'hairColorOptions' : 'eyeColorOptions');
    container.querySelectorAll('.color-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    renderAvatar();
}

function renderAvatar(targetId = 'avatarSvg') {
    const svg = document.getElementById(targetId);
    if (!svg) return;

    const avatar = state.story.avatar;
    const skinColor = AVATAR_OPTIONS.skinTones[avatar.skinTone];
    const hairColor = AVATAR_OPTIONS.hairColors[avatar.hairColor];
    const eyeColor = AVATAR_OPTIONS.eyeColors[avatar.eyeColor];
    const gender = avatar.gender;
    const hairStyle = AVATAR_OPTIONS.hairStyles[gender][avatar.hairStyle];
    const outfit = AVATAR_OPTIONS.outfits[gender][avatar.outfit];
    const outfitColor = AVATAR_OPTIONS.outfitColors[outfit];

    // Build SVG content
    let hairBack = '';
    let hair = '';
    let body = '';

    // Hair back layer (for styles that go behind head)
    if (hairStyle === 'long' || hairStyle === 'ponytail' || hairStyle === 'twintails' || hairStyle === 'braid') {
        if (hairStyle === 'long') {
            hairBack = `<ellipse cx="50" cy="55" rx="32" ry="40" fill="${hairColor}"/>`;
        } else if (hairStyle === 'ponytail') {
            hairBack = `<ellipse cx="50" cy="60" rx="8" ry="30" fill="${hairColor}"/>`;
        } else if (hairStyle === 'twintails') {
            hairBack = `<ellipse cx="25" cy="55" rx="8" ry="30" fill="${hairColor}"/>
                        <ellipse cx="75" cy="55" rx="8" ry="30" fill="${hairColor}"/>`;
        } else if (hairStyle === 'braid') {
            hairBack = `<ellipse cx="50" cy="65" rx="6" ry="35" fill="${hairColor}"/>`;
        }
    }

    // Body/outfit
    body = `<ellipse cx="50" cy="105" rx="25" ry="20" fill="${outfitColor}"/>
            <rect x="35" y="85" width="30" height="25" rx="5" fill="${outfitColor}"/>`;

    // Add outfit details
    if (outfit === 'knight') {
        body += `<rect x="42" y="90" width="16" height="20" fill="#A0A0A0"/>
                 <circle cx="50" cy="95" r="3" fill="#FFD700"/>`;
    } else if (outfit === 'mage') {
        body += `<path d="M 50 90 L 55 100 L 45 100 Z" fill="#FFD700"/>`;
    } else if (outfit === 'noble') {
        body += `<rect x="43" y="90" width="14" height="15" fill="#8B0000"/>
                 <circle cx="50" cy="95" r="2" fill="#FFD700"/>`;
    }

    // Face
    const face = `<ellipse cx="50" cy="45" rx="22" ry="25" fill="${skinColor}"/>`;

    // Eyes
    const eyes = `<ellipse cx="42" cy="45" rx="4" ry="5" fill="white"/>
                  <ellipse cx="58" cy="45" rx="4" ry="5" fill="white"/>
                  <circle cx="43" cy="45" r="3" fill="${eyeColor}"/>
                  <circle cx="59" cy="45" r="3" fill="${eyeColor}"/>
                  <circle cx="44" cy="44" r="1" fill="white"/>
                  <circle cx="60" cy="44" r="1" fill="white"/>`;

    // Mouth
    const mouth = gender === 'female'
        ? `<path d="M 45 55 Q 50 60 55 55" stroke="#D35400" fill="none" stroke-width="2"/>`
        : `<path d="M 45 55 Q 50 58 55 55" stroke="#8B4513" fill="none" stroke-width="2"/>`;

    // Hair front
    if (hairStyle === 'short') {
        hair = `<path d="M 28 35 Q 30 15 50 12 Q 70 15 72 35 Q 65 25 50 22 Q 35 25 28 35" fill="${hairColor}"/>`;
    } else if (hairStyle === 'spiky') {
        hair = `<path d="M 28 38 L 35 10 L 40 30 L 50 5 L 60 30 L 65 10 L 72 38 Q 50 25 28 38" fill="${hairColor}"/>`;
    } else if (hairStyle === 'long' || hairStyle === 'ponytail' || hairStyle === 'twintails' || hairStyle === 'braid') {
        hair = `<path d="M 28 40 Q 30 15 50 12 Q 70 15 72 40 Q 65 30 50 27 Q 35 30 28 40" fill="${hairColor}"/>
                <path d="M 28 40 Q 25 45 25 55" stroke="${hairColor}" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M 72 40 Q 75 45 75 55" stroke="${hairColor}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    } else if (hairStyle === 'mohawk') {
        hair = `<path d="M 45 5 Q 50 0 55 5 L 55 30 Q 50 25 45 30 Z" fill="${hairColor}"/>`;
    } else if (hairStyle === 'bun') {
        hair = `<path d="M 28 38 Q 30 15 50 12 Q 70 15 72 38 Q 65 28 50 25 Q 35 28 28 38" fill="${hairColor}"/>
                <circle cx="50" cy="10" r="10" fill="${hairColor}"/>`;
    } else if (hairStyle === 'bald') {
        hair = '';
    }

    // Ears
    const ears = `<ellipse cx="28" cy="47" rx="5" ry="7" fill="${skinColor}"/>
                  <ellipse cx="72" cy="47" rx="5" ry="7" fill="${skinColor}"/>`;

    svg.innerHTML = `${hairBack}${body}${ears}${face}${eyes}${mouth}${hair}`;
}

function updateMiniAvatar() {
    renderAvatar('miniAvatarSvg');
}

function getCurrentScene() {
    const chapter = STORY.chapters[state.story.chapter];
    if (!chapter) return null;

    const sceneId = state.story.currentSceneId || chapter.scenes[0].id;
    return chapter.scenes.find(s => s.id === sceneId) || chapter.scenes[0];
}

function updateStoryDisplay() {
    const scene = getCurrentScene();
    if (!scene) return;

    // Update character status
    heroNameEl.textContent = state.story.heroName;
    currentChapterEl.textContent = state.story.chapter + 1;

    // Health
    const healthPercent = (state.story.health / state.story.maxHealth) * 100;
    healthBar.style.width = healthPercent + '%';
    healthValue.textContent = `${state.story.health}/${state.story.maxHealth}`;

    // Reputation
    repBar.style.width = state.story.reputation + '%';
    repValue.textContent = state.story.reputation + '/100';

    // Gold
    goldBar.style.width = Math.min(state.story.gold, 100) + '%';
    goldValue.textContent = state.story.gold;

    // Items
    invItems.textContent = state.story.items.length > 0 ? state.story.items.join(', ') : 'None';

    // Scene background
    const storyScene = document.getElementById('storyScene');
    storyScene.className = 'story-scene';
    if (scene.sceneType) {
        storyScene.classList.add('scene-' + scene.sceneType);
    }

    // Update music based on scene
    playSceneMusic(scene);

    // Scene
    sceneImage.textContent = scene.image;
    sceneText.innerHTML = `<p>${scene.text.replace('{heroName}', state.story.heroName)}</p>`;

    // Choices
    if (scene.isEnding) {
        document.getElementById('choiceDisplay').style.display = 'none';
        storyFlipBtn.style.display = 'none';
    } else {
        document.getElementById('choiceDisplay').style.display = 'grid';
        storyFlipBtn.style.display = 'inline-flex';
        headsChoiceEl.textContent = scene.headsChoice;
        tailsChoiceEl.textContent = scene.tailsChoice;
    }

    // Progress
    const totalChapters = STORY.chapters.length;
    const progress = ((state.story.chapter + 1) / totalChapters) * 100;
    questProgress.style.width = progress + '%';

    // Stats
    battlesWonEl.textContent = state.story.battlesWon;
    deathsEl.textContent = state.story.deaths;
    endingsFoundEl.textContent = `${state.story.endingsFound.length}/${Object.keys(STORY.endings).length}`;
}

function storyFlip() {
    if (storyFlipBtn.disabled) return;

    const scene = getCurrentScene();
    if (!scene || scene.isEnding) return;

    storyFlipBtn.disabled = true;
    playFlipSound();

    const isHeads = Math.random() < 0.5;

    storyCoin.className = 'coin story-coin';
    setTimeout(() => {
        storyCoin.classList.add(isHeads ? 'flipping' : 'flipping-tails');

        setTimeout(() => {
            const result = isHeads ? scene.headsResult : scene.tailsResult;
            applyStoryResult(result, isHeads);
            storyFlipBtn.disabled = false;
        }, 1000);
    }, 50);
}

function applyStoryResult(result, isHeads) {
    // Show result text
    createConfetti(isHeads);

    // Play appropriate sound effect based on result
    if (result.soundEffect) {
        switch (result.soundEffect) {
            case 'battle': playBattleSound(); break;
            case 'magic': playMagicSound(); break;
            case 'damage': playDamageSound(); break;
            case 'item': playItemSound(); break;
            case 'victory': playVictorySound(); break;
            case 'chapter': playChapterSound(); break;
            case 'dragon': playDragonSound(); break;
            default: playResultSound();
        }
    } else {
        playResultSound();
    }

    // Apply stat changes
    if (result.health) {
        state.story.health = Math.max(0, Math.min(state.story.maxHealth, state.story.health + result.health));
        if (result.health < 0) playDamageSound();
    }
    if (result.reputation) {
        state.story.reputation = Math.max(0, Math.min(100, state.story.reputation + result.reputation));
    }
    if (result.gold) {
        state.story.gold = Math.max(0, state.story.gold + result.gold);
        if (result.gold > 0) playItemSound();
    }
    if (result.battlesWon) {
        state.story.battlesWon += result.battlesWon;
    }
    if (result.item && !state.story.items.includes(result.item)) {
        state.story.items.push(result.item);
        playItemSound();
    }
    if (result.flag) {
        state.story.flags[result.flag] = true;
    }

    // Show transition text
    showStoryMascotMessage(result.text);

    // Check for death
    if (state.story.health <= 0) {
        state.story.deaths++;
        state.story.health = state.story.maxHealth;
        playDeathSound();
        showStoryMascotMessage("You have fallen... but fate gives you another chance!");
    }

    // Move to next scene
    setTimeout(() => {
        if (result.nextChapter !== undefined) {
            state.story.chapter = result.nextChapter;
            playChapterSound();
        }
        state.story.currentSceneId = result.nextScene;

        const nextScene = getCurrentScene();
        if (nextScene && nextScene.isEnding) {
            triggerEnding(nextScene);
        } else {
            updateStoryDisplay();
            // Play scene entry sound
            if (nextScene && nextScene.soundType) {
                setTimeout(() => {
                    switch (nextScene.soundType) {
                        case 'battle': playBattleSound(); break;
                        case 'magic': playMagicSound(); break;
                        case 'dragon': playDragonSound(); break;
                        case 'dramatic': playDramaticSound(); break;
                    }
                }, 500);
            }
        }

        saveState();
    }, 1500);
}

function triggerEnding(scene) {
    const ending = STORY.endings[scene.endingId];

    // Mark ending as found
    if (!state.story.endingsFound.includes(scene.endingId)) {
        state.story.endingsFound.push(scene.endingId);
    }

    // Play ending fanfare
    playEndingFanfare();

    // Show ending popup
    endingIcon.textContent = ending.icon;
    endingTitle.textContent = ending.name;
    endingText.textContent = scene.text.replace('{heroName}', state.story.heroName);
    endingStats.innerHTML = `
        <p>⚔️ Battles Won: ${state.story.battlesWon}</p>
        <p>💀 Deaths: ${state.story.deaths}</p>
        <p>💰 Gold Collected: ${state.story.gold}</p>
        <p>🎒 Items Found: ${state.story.items.length}</p>
    `;

    endingPopup.classList.add('show');
    createConfetti(true);

    saveState();
}

function showEndingsCollection() {
    endingsGrid.innerHTML = '';

    for (const [id, ending] of Object.entries(STORY.endings)) {
        const card = document.createElement('div');
        card.className = `ending-card ${state.story.endingsFound.includes(id) ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="ending-card-icon">${state.story.endingsFound.includes(id) ? ending.icon : '❓'}</div>
            <div class="ending-card-name">${state.story.endingsFound.includes(id) ? ending.name : '???'}</div>
        `;
        endingsGrid.appendChild(card);
    }

    endingsCollectionPopup.classList.add('show');
}

function restartStory() {
    const endingsFound = state.story.endingsFound;
    const deaths = state.story.deaths;

    state.story = {
        heroName: state.story.heroName,
        chapter: 0,
        scene: 0,
        currentSceneId: null,
        health: 100,
        maxHealth: 100,
        reputation: 50,
        gold: 20,
        items: [],
        battlesWon: 0,
        deaths: deaths,
        endingsFound: endingsFound,
        flags: {}
    };

    updateStoryDisplay();
    saveState();
    showStoryMascotMessage("A new adventure begins!");
}

function showStoryMascotMessage(message) {
    storyMascotSpeech.textContent = message;
    storyMascotSpeech.classList.add('visible');
    setTimeout(() => {
        storyMascotSpeech.classList.remove('visible');
    }, 3000);
}

// ==================== CLASSIC MODE ====================
function classicFlip() {
    if (flipBtn.disabled) return;
    flipBtn.disabled = true;

    const result = document.getElementById('result');
    result.textContent = '';
    result.className = 'result';
    coin.className = 'coin';

    if (state.coinTheme !== 'kawaii') {
        coin.classList.add('theme-' + state.coinTheme);
    }

    playFlipSound();
    const isHeads = Math.random() < 0.5;

    setTimeout(() => {
        coin.classList.add(isHeads ? 'flipping' : 'flipping-tails');

        setTimeout(() => {
            showClassicResult(isHeads);
            flipBtn.disabled = false;
        }, 1000);
    }, 50);
}

function showClassicResult(isHeads) {
    const result = document.getElementById('result');

    if (isHeads) {
        state.headsCount++;
        result.textContent = '★ HEADS! ★';
        result.classList.add('heads-result');
    } else {
        state.tailsCount++;
        result.textContent = '♡ TAILS! ♡';
        result.classList.add('tails-result');
    }

    if (state.lastResult === isHeads) {
        state.currentStreak++;
    } else {
        state.currentStreak = 1;
    }
    state.lastResult = isHeads;

    if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
    }

    state.history.unshift(isHeads ? 'H' : 'T');
    if (state.history.length > 20) state.history.pop();

    updateClassicDisplay();
    updateHistoryDisplay();
    playResultSound();

    if (state.currentStreak >= 3) createConfetti(isHeads);
    checkAchievements();
    updateMascot(isHeads);
    saveState();
}

function quickFlip(count) {
    flipBtn.disabled = true;
    document.querySelectorAll('.quick-flip-btn').forEach(btn => btn.disabled = true);

    const result = document.getElementById('result');
    result.textContent = 'Flipping...';
    result.className = 'result';

    let headsInBatch = 0;
    let tailsInBatch = 0;

    for (let i = 0; i < count; i++) {
        const isHeads = Math.random() < 0.5;
        if (isHeads) {
            state.headsCount++;
            headsInBatch++;
        } else {
            state.tailsCount++;
            tailsInBatch++;
        }

        if (state.lastResult === isHeads) {
            state.currentStreak++;
        } else {
            state.currentStreak = 1;
        }
        state.lastResult = isHeads;

        if (state.currentStreak > state.bestStreak) {
            state.bestStreak = state.currentStreak;
        }
    }

    setTimeout(() => {
        result.textContent = `${headsInBatch} Heads, ${tailsInBatch} Tails`;
        result.classList.add(headsInBatch > tailsInBatch ? 'heads-result' : 'tails-result');

        updateClassicDisplay();
        checkAchievements();
        saveState();
        flipBtn.disabled = false;
        document.querySelectorAll('.quick-flip-btn').forEach(btn => btn.disabled = false);
        createConfetti(headsInBatch > tailsInBatch);
    }, 500);
}

function updateClassicDisplay() {
    const total = state.headsCount + state.tailsCount;

    document.getElementById('headsCount').textContent = state.headsCount;
    document.getElementById('tailsCount').textContent = state.tailsCount;
    document.getElementById('totalFlips').textContent = total;
    document.getElementById('bestStreak').textContent = state.bestStreak;

    const headsPercent = total > 0 ? ((state.headsCount / total) * 100).toFixed(1) : 0;
    const tailsPercent = total > 0 ? ((state.tailsCount / total) * 100).toFixed(1) : 0;

    document.getElementById('headsPercent').textContent = headsPercent + '%';
    document.getElementById('tailsPercent').textContent = tailsPercent + '%';

    document.getElementById('barHeads').style.width = headsPercent + '%';
    document.getElementById('barTails').style.width = tailsPercent + '%';

    const streak = document.getElementById('streak');
    if (state.currentStreak >= 3) {
        streak.textContent = `🔥 ${state.currentStreak} in a row!`;
        streak.classList.add('hot');
    } else if (state.currentStreak > 0) {
        streak.textContent = `${state.currentStreak} in a row`;
        streak.classList.remove('hot');
    } else {
        streak.textContent = '';
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    state.history.forEach(item => {
        const el = document.createElement('div');
        el.className = `history-item ${item === 'H' ? 'heads' : 'tails'}`;
        el.textContent = item;
        historyList.appendChild(el);
    });
}

// ==================== ACHIEVEMENTS ====================
const achievementDefinitions = {
    'first-flip': { name: 'First Flip', icon: '🌟', check: () => state.headsCount + state.tailsCount >= 1 },
    'ten-flips': { name: '10 Flips', icon: '🎯', check: () => state.headsCount + state.tailsCount >= 10 },
    'hundred-flips': { name: '100 Flips', icon: '💯', check: () => state.headsCount + state.tailsCount >= 100 },
    'thousand-flips': { name: '1000 Flips', icon: '👑', check: () => state.headsCount + state.tailsCount >= 1000 },
    'streak-5': { name: '5 Streak', icon: '🍀', check: () => state.bestStreak >= 5 },
    'streak-10': { name: '10 Streak', icon: '🔥', check: () => state.bestStreak >= 10 },
    'perfect-balance': { name: 'Balance', icon: '⚖️', check: () => {
        const total = state.headsCount + state.tailsCount;
        return total >= 100 && state.headsCount === state.tailsCount;
    }},
    'night-owl': { name: 'Night Owl', icon: '🦉', check: () => {
        const hour = new Date().getHours();
        return hour >= 0 && hour < 5;
    }}
};

function checkAchievements() {
    for (const [id, def] of Object.entries(achievementDefinitions)) {
        if (!state.achievements[id] && def.check()) {
            unlockAchievement(id, def);
        }
    }
}

function unlockAchievement(id, def) {
    state.achievements[id] = true;

    const el = document.querySelector(`.achievement[data-id="${id}"]`);
    if (el) {
        el.classList.remove('locked');
        el.classList.add('unlocked');
    }

    const popup = document.getElementById('achievementPopup');
    document.getElementById('popupIcon').textContent = def.icon;
    document.getElementById('popupName').textContent = def.name;
    popup.classList.add('show');
    playVictorySound();

    setTimeout(() => popup.classList.remove('show'), 2500);
    saveState();
}

function updateAchievementsDisplay() {
    for (const id in state.achievements) {
        if (state.achievements[id]) {
            const el = document.querySelector(`.achievement[data-id="${id}"]`);
            if (el) {
                el.classList.remove('locked');
                el.classList.add('unlocked');
            }
        }
    }
}

// ==================== MASCOT ====================
function updateMascot(isHeads) {
    const messages = state.currentStreak >= 5
        ? ["On fire! 🔥", "Incredible! ⭐", "So lucky! 🍀"]
        : isHeads
            ? ["Yay! Heads! ★", "Lucky heads! ✨", "Stars align! ⭐"]
            : ["Tails! Nice! ♡", "Purple magic! 💜", "Moon side! ✧"];

    const mascotSpeech = document.getElementById('mascotSpeech');
    mascotSpeech.textContent = messages[Math.floor(Math.random() * messages.length)];
    mascotSpeech.classList.add('visible');
    setTimeout(() => mascotSpeech.classList.remove('visible'), 2000);
}

// ==================== EFFECTS ====================
function createSparkles() {
    const symbols = ['✦', '✧', '★', '♡', '✿', '⋆', '｡'];
    sparklesContainer.innerHTML = '';

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 6 + 's';
        sparkle.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        sparklesContainer.appendChild(sparkle);
    }
}

function createConfetti(isHeads) {
    const emojis = isHeads
        ? ['💖', '⭐', '✨', '💫', '🌟', '💗']
        : ['💜', '🔮', '✨', '💫', '⭐', '🌙'];

    for (let i = 0; i < 25; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ==================== THEMES ====================
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    applyTheme();
    saveState();
}

function applyTheme() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    soundToggle.classList.toggle('muted', !state.soundEnabled);
    soundToggle.querySelector('.sound-icon').textContent = state.soundEnabled ? '🔊' : '🔇';
    saveState();
}

function setCoinTheme(theme) {
    state.coinTheme = theme;
    document.querySelectorAll('.coin-theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    coin.className = 'coin';
    if (theme !== 'kawaii') coin.classList.add('theme-' + theme);

    const themes = {
        kawaii: { heads: '★', tails: '♡' },
        gold: { heads: '👑', tails: '🦅' },
        galaxy: { heads: '🌟', tails: '🌙' },
        neon: { heads: '⚡', tails: '💎' },
        sakura: { heads: '🌸', tails: '🦋' }
    };

    const faces = themes[theme] || themes.kawaii;
    document.getElementById('headsFace').textContent = faces.heads;
    document.getElementById('tailsFace').textContent = faces.tails;
    saveState();
}

// ==================== SHARE ====================
function shareResults() {
    const total = state.headsCount + state.tailsCount;
    const text = `🪙 Fate Flipper Results!\n\n★ Heads: ${state.headsCount}\n♡ Tails: ${state.tailsCount}\n✧ Total: ${total}\n🔥 Best Streak: ${state.bestStreak}\n\nTry it!`;

    if (navigator.share) {
        navigator.share({ title: 'Fate Flipper', text, url: window.location.href }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text);
        updateMascot(true);
    }
}

function copyStats() {
    const total = state.headsCount + state.tailsCount;
    const text = `🪙 My Coin Flip Stats:\n★ Heads: ${state.headsCount}\n♡ Tails: ${state.tailsCount}\n✧ Total: ${total}\n🔥 Best Streak: ${state.bestStreak}`;
    navigator.clipboard.writeText(text);
}

// ==================== RESET ====================
function resetClassicStats() {
    if (!confirm('Reset all statistics? Achievements will be kept!')) return;

    state.headsCount = 0;
    state.tailsCount = 0;
    state.currentStreak = 0;
    state.bestStreak = 0;
    state.lastResult = null;
    state.history = [];

    document.getElementById('result').textContent = '';
    document.getElementById('result').className = 'result';
    document.getElementById('streak').textContent = '';

    updateClassicDisplay();
    updateHistoryDisplay();
    saveState();
}

function clearHistory() {
    state.history = [];
    updateHistoryDisplay();
    saveState();
}

// ==================== STORAGE ====================
function saveState() {
    try {
        localStorage.setItem('fateFlipperState', JSON.stringify(state));
    } catch (e) {}
}

function loadState() {
    try {
        const saved = localStorage.getItem('fateFlipperState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
            if (parsed.story) {
                state.story = { ...state.story, ...parsed.story };
            }
        }
    } catch (e) {}
}

// ==================== START ====================
document.addEventListener('DOMContentLoaded', init);
