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
        flags: {}
    }
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
                    text: "The Kingdom of Luminara is in peril! The evil Sorcerer Malachar has kidnapped Queen Celestia and locked her in the Dark Tower. You are {heroName}, a humble villager who must answer the call to adventure.",
                    headsChoice: "Accept the quest bravely",
                    tailsChoice: "Seek more information first",
                    headsResult: { nextScene: "brave_start", reputation: 10, text: "Your courage inspires the villagers! They cheer as you set off immediately." },
                    tailsResult: { nextScene: "cautious_start", gold: 15, text: "The village elder rewards your wisdom with gold and valuable information." }
                },
                {
                    id: "brave_start",
                    image: "🗡️",
                    text: "At the village armory, the blacksmith offers you a choice of weapons.",
                    headsChoice: "Take the Sword of Light",
                    tailsChoice: "Take the Shield of Dawn",
                    headsResult: { nextScene: "forest_entrance", item: "Sword of Light", text: "The sword glows with ancient magic!" },
                    tailsResult: { nextScene: "forest_entrance", item: "Shield of Dawn", text: "The shield will protect you from dark magic!" }
                },
                {
                    id: "cautious_start",
                    image: "📜",
                    text: "The elder tells you of two paths: the Enchanted Forest or the Mountain Pass.",
                    headsChoice: "Take the Forest path",
                    tailsChoice: "Take the Mountain path",
                    headsResult: { nextScene: "forest_entrance", text: "You head toward the mysterious Enchanted Forest." },
                    tailsResult: { nextScene: "mountain_entrance", text: "You begin the treacherous climb up the mountains." }
                },
                {
                    id: "forest_entrance",
                    image: "🌲",
                    text: "The Enchanted Forest looms before you. Strange lights flicker between the ancient trees. You hear a cry for help nearby!",
                    headsChoice: "Rush to help immediately",
                    tailsChoice: "Approach cautiously",
                    headsResult: { nextChapter: 1, nextScene: "fairy_rescue", reputation: 15, text: "Your heroism leads you to discover a fairy in danger!" },
                    tailsResult: { nextChapter: 1, nextScene: "fairy_trap", text: "Your caution reveals it might be a trap..." }
                },
                {
                    id: "mountain_entrance",
                    image: "⛰️",
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
                    text: "A tiny fairy named Luna is trapped in a spider's web! The giant spider approaches...",
                    headsChoice: "Fight the spider!",
                    tailsChoice: "Distract it and free Luna",
                    headsResult: { nextScene: "spider_battle", text: "You draw your weapon and charge!" },
                    tailsResult: { nextScene: "fairy_freed", reputation: 10, item: "Fairy Dust", text: "Luna is freed and grants you magical fairy dust!" }
                },
                {
                    id: "fairy_trap",
                    image: "🕸️",
                    text: "It's an ambush! Goblins spring from the shadows, but your caution gave you time to react.",
                    headsChoice: "Stand and fight",
                    tailsChoice: "Try to negotiate",
                    headsResult: { nextScene: "goblin_battle", text: "You prepare for combat!" },
                    tailsResult: { nextScene: "goblin_deal", gold: -10, text: "The goblins agree to let you pass... for a price." }
                },
                {
                    id: "spider_battle",
                    image: "🕷️",
                    text: "The giant spider attacks! Its venomous fangs gleam in the dim light.",
                    headsChoice: "Aim for its eyes",
                    tailsChoice: "Go for its legs",
                    headsResult: { nextScene: "fairy_freed", battlesWon: 1, reputation: 20, text: "Critical hit! The spider is defeated!" },
                    tailsResult: { nextScene: "fairy_freed", battlesWon: 1, health: -20, text: "You win but take some damage from its venom." }
                },
                {
                    id: "fairy_freed",
                    image: "✨",
                    text: "Luna the fairy is grateful! 'I will help you on your quest,' she says. 'But first, you must choose your path forward.'",
                    headsChoice: "Go to the Mystic Lake",
                    tailsChoice: "Visit the Witch's Hut",
                    headsResult: { nextChapter: 2, nextScene: "mystic_lake", text: "Luna guides you to the magical lake." },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "Perhaps the witch has useful knowledge..." }
                },
                {
                    id: "goblin_battle",
                    image: "👺",
                    text: "Five goblins surround you! This will be tough...",
                    headsChoice: "Use a battle cry to intimidate",
                    tailsChoice: "Fight defensively",
                    headsResult: { nextScene: "goblin_victory", battlesWon: 1, reputation: 15, text: "Your fierce cry scatters three goblins! You defeat the rest." },
                    tailsResult: { nextScene: "goblin_victory", battlesWon: 1, health: -15, text: "You win but sustain injuries." }
                },
                {
                    id: "goblin_deal",
                    image: "💰",
                    text: "The goblin chief laughs. 'Smart human! We tell you secret - witch in forest knows way to Dark Tower.'",
                    headsChoice: "Thank them and leave",
                    tailsChoice: "Ask for more information",
                    headsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You head to find the witch." },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", gold: -5, item: "Goblin Map", text: "For more gold, they give you a map!" }
                },
                {
                    id: "goblin_victory",
                    image: "⚔️",
                    text: "The goblins flee! Among their belongings you find a crude map.",
                    headsChoice: "Follow the map",
                    tailsChoice: "Ignore it and continue",
                    headsResult: { nextChapter: 2, nextScene: "hidden_shrine", item: "Goblin Map", text: "The map reveals a hidden location!" },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You continue on the main path." }
                },
                {
                    id: "dragon_cave",
                    image: "🐉",
                    text: "Deep in the cave, you find a young dragon! It's injured and looks at you with fear.",
                    headsChoice: "Help heal the dragon",
                    tailsChoice: "Leave it alone",
                    headsResult: { nextScene: "dragon_friend", reputation: 25, item: "Dragon Scale", text: "The dragon becomes your ally!" },
                    tailsResult: { nextChapter: 2, nextScene: "mountain_pass", text: "You leave the cave quietly." }
                },
                {
                    id: "dragon_friend",
                    image: "🐲",
                    text: "The dragon, named Ember, is grateful! 'I will aid you, brave one. I know where the Dark Tower lies.'",
                    headsChoice: "Fly directly to the tower",
                    tailsChoice: "Gather allies first",
                    headsResult: { nextChapter: 3, nextScene: "tower_direct", text: "Ember takes flight toward the tower!" },
                    tailsResult: { nextChapter: 2, nextScene: "mystic_lake", text: "Wisdom dictates you need more help." }
                },
                {
                    id: "mountain_pass",
                    image: "🏔️",
                    text: "The mountain pass is treacherous. You encounter a traveling merchant.",
                    headsChoice: "Trade with the merchant",
                    tailsChoice: "Continue past them",
                    headsResult: { nextChapter: 2, nextScene: "merchant_trade", text: "The merchant has interesting wares..." },
                    tailsResult: { nextChapter: 2, nextScene: "witch_hut", text: "You press onward." }
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

// ==================== SOUND EFFECTS ====================
function createSound(frequency, duration, type = 'sine') {
    return () => {
        if (!state.soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
const playVictorySound = () => {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

// ==================== INITIALIZATION ====================
function init() {
    loadState();
    createSparkles();
    applyTheme();
    setupEventListeners();

    // Check if story needs to start
    if (!state.story.heroName) {
        namePopup.classList.add('show');
    } else {
        updateStoryDisplay();
    }

    // Initialize classic mode too
    updateClassicDisplay();
    updateAchievementsDisplay();
    updateHistoryDisplay();
}

function setupEventListeners() {
    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.addEventListener('click', () => switchMode(tab.dataset.mode));
    });

    // Theme and sound toggles
    themeToggle.addEventListener('click', toggleDarkMode);
    soundToggle.addEventListener('click', toggleSound);

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
    saveState();
    showStoryMascotMessage(`Welcome, ${name}! Your adventure begins!`);
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
    playResultSound();

    // Apply stat changes
    if (result.health) {
        state.story.health = Math.max(0, Math.min(state.story.maxHealth, state.story.health + result.health));
    }
    if (result.reputation) {
        state.story.reputation = Math.max(0, Math.min(100, state.story.reputation + result.reputation));
    }
    if (result.gold) {
        state.story.gold = Math.max(0, state.story.gold + result.gold);
    }
    if (result.battlesWon) {
        state.story.battlesWon += result.battlesWon;
    }
    if (result.item && !state.story.items.includes(result.item)) {
        state.story.items.push(result.item);
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
        showStoryMascotMessage("You have fallen... but fate gives you another chance!");
    }

    // Move to next scene
    setTimeout(() => {
        if (result.nextChapter !== undefined) {
            state.story.chapter = result.nextChapter;
        }
        state.story.currentSceneId = result.nextScene;

        const nextScene = getCurrentScene();
        if (nextScene && nextScene.isEnding) {
            triggerEnding(nextScene);
        } else {
            updateStoryDisplay();
        }

        saveState();
    }, 1500);
}

function triggerEnding(scene) {
    const ending = STORY.endings[scene.endingId];

    // Mark ending as found
    if (!state.story.endingsFound.includes(scene.endingId)) {
        state.story.endingsFound.push(scene.endingId);
        playVictorySound();
    }

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
