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
    // Story mode - Kingdom Hearts inspired
    story: {
        heroName: '',
        chapter: 0,
        scene: 0,
        // KH Stats
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        level: 1,
        exp: 0,
        expToLevel: 100,
        munny: 0,
        // Combat stats
        strength: 10,
        magic: 10,
        defense: 10,
        // Equipment
        keyblade: 'Kingdom Key',
        abilities: [],
        items: [],
        // Progress
        heartlessDefeated: 0,
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

// ==================== KEYBLADE DATA ====================
const KEYBLADES = {
    'Kingdom Key': { strength: 3, magic: 1, ability: null, description: 'The key that connects to the heart' },
    'Oathkeeper': { strength: 3, magic: 3, ability: 'MP Haste', description: 'A bond of friendship' },
    'Oblivion': { strength: 6, magic: 2, ability: 'Critical Plus', description: 'Memory of darkness' },
    'Lady Luck': { strength: 2, magic: 4, ability: 'Lucky Strike', description: 'Fortune favors the bold' },
    'Three Wishes': { strength: 4, magic: 4, ability: 'MP Rage', description: 'Mystical power' },
    'Lionheart': { strength: 8, magic: 2, ability: 'Second Chance', description: 'Courage made manifest' },
    'Ultima Weapon': { strength: 12, magic: 8, ability: 'MP Hastega', description: 'The ultimate key' }
};

// ==================== ABILITIES DATA ====================
const ABILITIES = {
    'Combo Plus': { type: 'combat', description: 'Extends ground combos' },
    'Air Combo Plus': { type: 'combat', description: 'Extends air combos' },
    'Critical Plus': { type: 'combat', description: 'Increases critical hit rate' },
    'Lucky Strike': { type: 'support', description: 'Increases item drops' },
    'MP Haste': { type: 'magic', description: 'MP recharges faster' },
    'MP Rage': { type: 'magic', description: 'Restores MP when hit' },
    'Second Chance': { type: 'survival', description: 'Survive fatal blow with 1 HP' },
    'Leaf Bracer': { type: 'magic', description: 'Finish casting even when hit' },
    'Scan': { type: 'support', description: 'See enemy HP' },
    'Treasure Magnet': { type: 'support', description: 'Attract prizes from farther away' }
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

// ==================== STORY DATA - KINGDOM HEARTS INSPIRED ====================
const STORY = {
    chapters: [
        // Chapter 0: Awakening
        {
            name: "Dive to the Heart",
            scenes: [
                {
                    id: "intro",
                    image: "💖",
                    sceneType: "magic",
                    soundType: "dramatic",
                    text: "You awaken on a stained glass pillar depicting a sleeping princess. A voice echoes: 'So much to do, so little time... {heroName}, the door has opened. Will you step through?'",
                    headsChoice: "Step forward into the light",
                    tailsChoice: "Wait and observe",
                    headsResult: { nextScene: "keyblade_choice", exp: 10, text: "The light embraces you. Your heart resonates with courage!" },
                    tailsResult: { nextScene: "keyblade_choice", mp: 10, text: "You sense the darkness stirring. Knowledge flows into you." }
                },
                {
                    id: "keyblade_choice",
                    image: "🗝️",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "Three pedestals rise before you, each holding a weapon. The voice speaks: 'Choose well. Your path begins here.'",
                    headsChoice: "Take the Sword (Power)",
                    tailsChoice: "Take the Staff (Magic)",
                    headsResult: { nextScene: "shadow_battle", strength: 5, text: "The power of the warrior. Invincible courage. A sword of terrible destruction.", soundEffect: "item" },
                    tailsResult: { nextScene: "shadow_battle", magic: 5, text: "The power of the mystic. Inner strength. A staff of wonder and ruin.", soundEffect: "magic" }
                },
                {
                    id: "shadow_battle",
                    image: "👤",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The ground shakes! Small shadow creatures emerge - Heartless! Yellow eyes gleaming in the dark. Your weapon materializes - the Kingdom Key!",
                    headsChoice: "Attack with all your might!",
                    tailsChoice: "Dodge and strike carefully",
                    headsResult: { nextScene: "darkside_appear", heartlessDefeated: 3, exp: 20, text: "You slash through the Shadows! But more keep coming!", soundEffect: "battle" },
                    tailsResult: { nextScene: "darkside_appear", heartlessDefeated: 2, exp: 15, text: "You evade their claws and counter-attack!", soundEffect: "battle" }
                },
                {
                    id: "darkside_appear",
                    image: "👹",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "A massive darkness erupts from the ground - DARKSIDE! A giant Heartless towers before you, a heart-shaped hole in its chest. The platform begins to crack!",
                    headsChoice: "Strike its hands!",
                    tailsChoice: "Aim for the head!",
                    headsResult: { nextChapter: 1, nextScene: "destiny_islands", hp: -20, heartlessDefeated: 1, exp: 50, text: "You damage it but the darkness consumes you... You fall... and awaken somewhere new.", soundEffect: "damage" },
                    tailsResult: { nextChapter: 1, nextScene: "destiny_islands", heartlessDefeated: 1, exp: 75, text: "A critical strike! Light explodes from your Keyblade as you're pulled into a new world!", soundEffect: "victory" }
                }
            ]
        },
        // Chapter 1: Destiny Islands
        {
            name: "Destiny Islands",
            scenes: [
                {
                    id: "destiny_islands",
                    image: "🏝️",
                    sceneType: "peaceful",
                    soundType: "magic",
                    text: "You awaken on a beautiful island. Waves lap at the shore. Two friends, Riku and Kairi, wave at you. 'Hey {heroName}! The raft is almost ready. Want to help?'",
                    headsChoice: "Help build the raft",
                    tailsChoice: "Explore the island first",
                    headsResult: { nextScene: "raft_building", exp: 15, text: "You grab some wood and start helping!", soundEffect: "item" },
                    tailsResult: { nextScene: "secret_place", mp: 10, text: "Something draws you to explore...", soundEffect: "magic" }
                },
                {
                    id: "raft_building",
                    image: "🚣",
                    sceneType: "peaceful",
                    soundType: "item",
                    text: "Riku challenges you: 'Race you to get the supplies! Winner gets to name the raft.'",
                    headsChoice: "Accept the race!",
                    tailsChoice: "Work together instead",
                    headsResult: { nextScene: "race_riku", strength: 2, text: "You sprint toward the supplies!", soundEffect: "battle" },
                    tailsResult: { nextScene: "secret_place", exp: 20, text: "Teamwork is important. Riku nods approvingly.", soundEffect: "item" }
                },
                {
                    id: "race_riku",
                    image: "🏃",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "You and Riku race across the island! He's fast, but you're determined!",
                    headsChoice: "Take the shortcut through trees",
                    tailsChoice: "Stick to the main path",
                    headsResult: { nextScene: "secret_place", exp: 30, munny: 50, text: "You win! 'Not bad,' Riku smirks.", soundEffect: "victory" },
                    tailsResult: { nextScene: "secret_place", exp: 20, text: "Riku wins, but it was close!", soundEffect: "item" }
                },
                {
                    id: "secret_place",
                    image: "🕳️",
                    sceneType: "mystery",
                    soundType: "magic",
                    text: "You find the Secret Place - a cave with strange drawings. A mysterious door stands at the back. A cloaked figure appears: 'This world has been connected... tied to the darkness.'",
                    headsChoice: "Ask who they are",
                    tailsChoice: "Demand they leave",
                    headsResult: { nextScene: "ansem_warning", mp: 15, text: "'I am but a mere shell...'", soundEffect: "magic" },
                    tailsResult: { nextScene: "ansem_warning", strength: 3, text: "The figure laughs darkly.", soundEffect: "battle" }
                },
                {
                    id: "ansem_warning",
                    image: "🌑",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "The figure vanishes. That night, a storm like no other descends. The sky tears open! You see Riku standing on the small island, reaching toward darkness!",
                    headsChoice: "Run to save Riku!",
                    tailsChoice: "Find Kairi first!",
                    headsResult: { nextScene: "riku_darkness", text: "You rush toward your friend!", soundEffect: "battle" },
                    tailsResult: { nextScene: "kairi_search", text: "You must make sure Kairi is safe!", soundEffect: "dramatic" }
                },
                {
                    id: "riku_darkness",
                    image: "🖐️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "'The door has opened, {heroName}!' Riku extends his hand. 'We can go to other worlds! Don't be afraid of the darkness!' Shadows swirl around him.",
                    headsChoice: "Take his hand",
                    tailsChoice: "Refuse the darkness",
                    headsResult: { nextScene: "darkness_consumed", hp: -30, text: "Darkness engulfs you both!", soundEffect: "damage" },
                    tailsResult: { nextScene: "keyblade_manifest", exp: 50, text: "Light bursts from your hand!", soundEffect: "magic" }
                },
                {
                    id: "kairi_search",
                    image: "👧",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "You find Kairi in the secret place. She turns, hollow-eyed. 'Sora...' The door behind her blasts open with dark wind!",
                    headsChoice: "Grab her hand!",
                    tailsChoice: "Shield yourself!",
                    headsResult: { nextScene: "kairi_vanish", text: "She reaches for you but... passes through!", soundEffect: "magic" },
                    tailsResult: { nextScene: "keyblade_manifest", defense: 3, text: "Light shields you as chaos erupts!", soundEffect: "magic" }
                },
                {
                    id: "darkness_consumed",
                    image: "⬛",
                    sceneType: "battle",
                    soundType: "damage",
                    text: "Darkness pulls you down! But a light in your heart refuses to fade. You fight back!",
                    headsChoice: "Focus on the light within",
                    tailsChoice: "Rage against the dark",
                    headsResult: { nextScene: "keyblade_manifest", mp: 20, exp: 40, text: "Your heart shines bright!", soundEffect: "magic" },
                    tailsResult: { nextScene: "keyblade_manifest", strength: 5, exp: 40, text: "Your will is unbreakable!", soundEffect: "battle" }
                },
                {
                    id: "kairi_vanish",
                    image: "💨",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "Kairi vanishes into you! Her heart... is now in yours. The dark wind throws you outside!",
                    headsChoice: "Search for Riku",
                    tailsChoice: "Face the darkness head-on",
                    headsResult: { nextScene: "keyblade_manifest", text: "You won't lose both friends!", soundEffect: "battle" },
                    tailsResult: { nextScene: "keyblade_manifest", defense: 3, text: "You stand your ground!", soundEffect: "battle" }
                },
                {
                    id: "keyblade_manifest",
                    image: "🗝️",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "Light explodes from your hand! The Kingdom Key materializes - YOUR Keyblade! A massive Darkside Heartless rises from the ground!",
                    headsChoice: "ATTACK!",
                    tailsChoice: "Dodge and analyze",
                    headsResult: { nextScene: "darkside_battle", strength: 3, text: "You charge with newfound power!", soundEffect: "battle" },
                    tailsResult: { nextScene: "darkside_battle", magic: 3, text: "You study its movements...", soundEffect: "battle" }
                },
                {
                    id: "darkside_battle",
                    image: "👹",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The Darkside attacks! Dark energy pools beneath its hand. Shadows spawn endlessly!",
                    headsChoice: "Strike the hand!",
                    tailsChoice: "Jump for the head!",
                    headsResult: { nextChapter: 2, nextScene: "traverse_arrival", heartlessDefeated: 10, exp: 100, text: "Your Keyblade shines! The island shatters... you fall through worlds!", soundEffect: "victory" },
                    tailsResult: { nextChapter: 2, nextScene: "traverse_arrival", heartlessDefeated: 10, exp: 120, keyblade: "Kingdom Key+", text: "CRITICAL HIT! The Darkside screams as light consumes it!", soundEffect: "victory" }
                }
            ]
        },
        // Chapter 2: Traverse Town
        {
            name: "Traverse Town",
            scenes: [
                {
                    id: "traverse_arrival",
                    image: "🌃",
                    sceneType: "mystery",
                    soundType: "magic",
                    text: "You wake in an alleyway. This is Traverse Town - a refuge for those whose worlds were lost to darkness. Neon signs flicker. A dog named Pluto barks at you!",
                    headsChoice: "Follow Pluto",
                    tailsChoice: "Explore the district",
                    headsResult: { nextScene: "meet_leon", exp: 20, text: "Pluto leads you somewhere important!", soundEffect: "item" },
                    tailsResult: { nextScene: "heartless_alley", munny: 30, text: "You find some munny but hear skittering...", soundEffect: "item" }
                },
                {
                    id: "heartless_alley",
                    image: "👤",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Shadows emerge from the walls - Heartless! They've found you!",
                    headsChoice: "Fight them all!",
                    tailsChoice: "Try to escape!",
                    headsResult: { nextScene: "meet_leon", heartlessDefeated: 5, exp: 40, text: "You slash through them with your Keyblade!", soundEffect: "battle" },
                    tailsResult: { nextScene: "meet_leon", hp: -15, text: "You run but take some hits!", soundEffect: "damage" }
                },
                {
                    id: "meet_leon",
                    image: "🦁",
                    sceneType: "peaceful",
                    soundType: "dramatic",
                    text: "A man with a gunblade blocks your path. 'So you're the Keyblade's chosen one. I'm Leon. Come with me - the Heartless are attracted to you.' Behind him, a ninja girl waves!",
                    headsChoice: "Go with Leon",
                    tailsChoice: "Demand answers first",
                    headsResult: { nextScene: "leon_training", exp: 30, text: "'Smart choice. Yuffie, let's go.'", soundEffect: "item" },
                    tailsResult: { nextScene: "leon_battle", text: "'You want answers? Earn them!' He raises his blade!", soundEffect: "battle" }
                },
                {
                    id: "leon_battle",
                    image: "⚔️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Leon attacks! His gunblade techniques are fierce!",
                    headsChoice: "Match his aggression!",
                    tailsChoice: "Defend and counter!",
                    headsResult: { nextScene: "leon_training", hp: -25, strength: 5, exp: 60, text: "You lose but impress him! 'Good spirit.'", soundEffect: "damage" },
                    tailsResult: { nextScene: "leon_training", defense: 5, exp: 50, text: "You hold your ground! 'Not bad, kid.'", soundEffect: "victory" }
                },
                {
                    id: "leon_training",
                    image: "📚",
                    sceneType: "peaceful",
                    soundType: "magic",
                    text: "In the hotel, Leon explains: 'Ansem studied the Heartless. When they consume a heart, they multiply. The Keyblade can seal worlds from darkness - that's why they hunt you.'",
                    headsChoice: "Ask about Riku and Kairi",
                    tailsChoice: "Ask how to fight Heartless",
                    headsResult: { nextScene: "friends_info", mp: 20, text: "'Your friends... the darkness took them somewhere.'", soundEffect: "magic" },
                    tailsResult: { nextScene: "combat_training", strength: 3, ability: "Combo Plus", text: "'I'll show you some techniques.'", soundEffect: "item" }
                },
                {
                    id: "friends_info",
                    image: "💔",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "'Riku may have given in to darkness. Kairi... her heart might be connected to yours. To find them, you'll need to travel to other worlds.' A loud crash outside!",
                    headsChoice: "Rush outside!",
                    tailsChoice: "Prepare carefully first",
                    headsResult: { nextScene: "guard_armor", text: "You burst through the door!", soundEffect: "battle" },
                    tailsResult: { nextScene: "guard_armor", item: "Potion", hp: 30, text: "You grab supplies and head out!", soundEffect: "item" }
                },
                {
                    id: "combat_training",
                    image: "🗡️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Leon shows you advanced combat. 'Remember - strike, dodge, strike. The Keyblade responds to your heart's strength.'",
                    headsChoice: "Practice offense",
                    tailsChoice: "Practice defense",
                    headsResult: { nextScene: "guard_armor", strength: 5, ability: "Air Combo Plus", text: "Your attacks become fluid!", soundEffect: "victory" },
                    tailsResult: { nextScene: "guard_armor", defense: 5, ability: "Second Chance", text: "You learn to survive anything!", soundEffect: "victory" }
                },
                {
                    id: "guard_armor",
                    image: "🤖",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "A massive Heartless assembles in the square - GUARD ARMOR! Its limbs detach and attack independently! Donald Duck and Goofy arrive! 'We're looking for the key!'",
                    headsChoice: "Team up with them!",
                    tailsChoice: "Show them you can handle it!",
                    headsResult: { nextScene: "guard_armor_fight", exp: 30, text: "'Let's go! Together!'", soundEffect: "magic" },
                    tailsResult: { nextScene: "guard_armor_fight", strength: 3, text: "'Watch and learn!'", soundEffect: "battle" }
                },
                {
                    id: "guard_armor_fight",
                    image: "💥",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The Guard Armor's torso spins wildly! Donald casts Fire, Goofy shields you!",
                    headsChoice: "Attack the limbs!",
                    tailsChoice: "Go for the body!",
                    headsResult: { nextScene: "guard_armor_victory", heartlessDefeated: 1, exp: 80, text: "One by one, the limbs fall!", soundEffect: "battle" },
                    tailsResult: { nextScene: "guard_armor_victory", heartlessDefeated: 1, exp: 100, hp: -20, text: "Risky but effective! Critical damage!", soundEffect: "damage" }
                },
                {
                    id: "guard_armor_victory",
                    image: "✨",
                    sceneType: "victory",
                    soundType: "victory",
                    text: "The Guard Armor explodes into light! A huge heart floats upward. Donald: 'The king sent us to find you!' Goofy: 'He said the key to our survival is the Keyblade!'",
                    headsChoice: "Join their quest",
                    tailsChoice: "Ask about King Mickey",
                    headsResult: { nextScene: "gummi_ship", exp: 50, text: "'Together we can stop the darkness!'", soundEffect: "chapter" },
                    tailsResult: { nextScene: "gummi_ship", mp: 30, text: "'The King went to find the Keyblade too...'", soundEffect: "magic" }
                },
                {
                    id: "gummi_ship",
                    image: "🚀",
                    sceneType: "peaceful",
                    soundType: "chapter",
                    text: "The Gummi Ship awaits! Chip and Dale have it ready. Leon: 'Find the Keyholes. Lock them to protect the worlds.' Multiple worlds appear on the map!",
                    headsChoice: "Go to Wonderland",
                    tailsChoice: "Go to Olympus Coliseum",
                    headsResult: { nextChapter: 3, nextScene: "wonderland_arrival", text: "You blast off toward a curious world!", soundEffect: "chapter" },
                    tailsResult: { nextChapter: 3, nextScene: "coliseum_arrival", text: "A world of heroes awaits!", soundEffect: "chapter" }
                }
            ]
        },
        // Chapter 3: World Hopping & Hollow Bastion
        {
            name: "Hollow Bastion",
            scenes: [
                {
                    id: "wonderland_arrival",
                    image: "🐰",
                    sceneType: "mystery",
                    soundType: "magic",
                    text: "You fall down a rabbit hole into Wonderland! The Cheshire Cat grins: 'The shadows grow hungry here. The Queen of Hearts knows nothing of her world's danger...'",
                    headsChoice: "Find the Queen",
                    tailsChoice: "Search for the Keyhole",
                    headsResult: { nextScene: "queen_hearts", exp: 40, text: "Off with their heads!", soundEffect: "dramatic" },
                    tailsResult: { nextScene: "trickmaster", munny: 100, text: "The Keyhole is in the Bizarre Room!", soundEffect: "magic" }
                },
                {
                    id: "coliseum_arrival",
                    image: "🏛️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Olympus Coliseum! Phil the satyr scoffs: 'You wanna be a hero? You ain't ready!' But Cloud and Hercules are competing...",
                    headsChoice: "Enter the tournament",
                    tailsChoice: "Train with Phil first",
                    headsResult: { nextScene: "cerberus", strength: 5, text: "Prove yourself in the arena!", soundEffect: "battle" },
                    tailsResult: { nextScene: "cerberus", ability: "Dodge Roll", exp: 50, text: "Two words: YOU QUALIFIED!", soundEffect: "victory" }
                },
                {
                    id: "queen_hearts",
                    image: "👑",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "The Queen accuses Alice of stealing her heart! 'Find evidence or it's OFF WITH HER HEAD!'",
                    headsChoice: "Defend Alice",
                    tailsChoice: "Find the real culprit",
                    headsResult: { nextScene: "trickmaster", hp: -20, text: "The Queen is furious! Cards attack!", soundEffect: "battle" },
                    tailsResult: { nextScene: "trickmaster", exp: 60, item: "White Trinity", text: "You expose the Heartless!", soundEffect: "magic" }
                },
                {
                    id: "trickmaster",
                    image: "🃏",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The Trickmaster appears! This juggling Heartless boss towers above you, batons ablaze!",
                    headsChoice: "Attack the legs!",
                    tailsChoice: "Wait for it to bend down!",
                    headsResult: { nextScene: "keyhole_sealed", heartlessDefeated: 1, exp: 150, hp: -30, text: "You hack at its legs! It stumbles!", soundEffect: "battle" },
                    tailsResult: { nextScene: "keyhole_sealed", heartlessDefeated: 1, exp: 180, text: "Perfect timing! Critical hit to the head!", soundEffect: "victory" }
                },
                {
                    id: "cerberus",
                    image: "🐕",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "CERBERUS breaks free! The three-headed guardian of the Underworld attacks! Hades watches with amusement...",
                    headsChoice: "Focus on one head!",
                    tailsChoice: "Dodge and counter!",
                    headsResult: { nextScene: "keyhole_sealed", heartlessDefeated: 1, exp: 200, hp: -40, text: "Brutal but effective! You win!", soundEffect: "victory" },
                    tailsResult: { nextScene: "keyhole_sealed", heartlessDefeated: 1, exp: 180, ability: "Sonic Blade", text: "Hercules: 'Junior hero!'", soundEffect: "victory" }
                },
                {
                    id: "keyhole_sealed",
                    image: "🔐",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "Your Keyblade glows! A beam of light seals the world's Keyhole! This world is safe from darkness... for now. You've grown stronger!",
                    headsChoice: "Continue to more worlds",
                    tailsChoice: "Return to Traverse Town",
                    headsResult: { nextScene: "riku_encounter", exp: 100, text: "The journey continues!", soundEffect: "chapter" },
                    tailsResult: { nextScene: "riku_encounter", hp: 50, mp: 30, text: "You rest and resupply.", soundEffect: "item" }
                },
                {
                    id: "riku_encounter",
                    image: "🌑",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "Riku appears! But something's wrong... darkness swirls around him. 'You found new friends, {heroName}? You've replaced us!' He holds Kairi's lifeless body.",
                    headsChoice: "It's not like that!",
                    tailsChoice: "What happened to Kairi?!",
                    headsResult: { nextScene: "riku_confrontation", text: "'I don't need you anymore.'", soundEffect: "dramatic" },
                    tailsResult: { nextScene: "riku_confrontation", mp: 20, text: "'Her heart is sleeping. Maleficent knows how to wake her.'", soundEffect: "magic" }
                },
                {
                    id: "riku_confrontation",
                    image: "⚔️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Riku summons Soul Eater! 'If you're not with me, you're against me!' He attacks! Donald and Goofy hesitate - the king ordered them to follow the Keyblade...",
                    headsChoice: "Fight your friend",
                    tailsChoice: "Try to reach him",
                    headsResult: { nextScene: "hollow_bastion_gates", hp: -30, exp: 100, text: "You clash! The battle is fierce!", soundEffect: "battle" },
                    tailsResult: { nextScene: "keyblade_stolen", text: "'Your heart is too weak.'", soundEffect: "damage" }
                },
                {
                    id: "keyblade_stolen",
                    image: "💔",
                    sceneType: "battle",
                    soundType: "damage",
                    text: "Riku takes your Keyblade! 'The Keyblade chooses its master. And it chose ME.' Donald and Goofy... leave with him. You're alone.",
                    headsChoice: "Fight anyway!",
                    tailsChoice: "Find another way",
                    headsResult: { nextScene: "hollow_bastion_gates", strength: 10, text: "You grab a wooden sword. You won't give up!", soundEffect: "battle" },
                    tailsResult: { nextScene: "hollow_bastion_gates", magic: 10, text: "Heart is what matters, not weapons.", soundEffect: "magic" }
                },
                {
                    id: "hollow_bastion_gates",
                    image: "🏰",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "Hollow Bastion - Maleficent's stronghold! Dark waterfalls cascade upward. Beast arrives! 'Belle is inside. I won't stop until I save her!'",
                    headsChoice: "Team up with Beast",
                    tailsChoice: "Scout ahead alone",
                    headsResult: { nextScene: "bastion_climb", exp: 80, text: "Beast's strength clears the path!", soundEffect: "battle" },
                    tailsResult: { nextScene: "bastion_climb", defense: 5, text: "You learn the layout.", soundEffect: "item" }
                },
                {
                    id: "bastion_climb",
                    image: "⬆️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "Heartless swarm the rising platforms! Defenders, Wizards, Wyverns! Riku appears above with Donald and Goofy. 'Still fighting with that toy?'",
                    headsChoice: "Challenge Riku again!",
                    tailsChoice: "Believe in your heart",
                    headsResult: { nextScene: "keyblade_returns", text: "You won't back down!", soundEffect: "battle" },
                    tailsResult: { nextScene: "keyblade_returns", mp: 40, text: "My heart is my power!", soundEffect: "magic" }
                },
                {
                    id: "keyblade_returns",
                    image: "🗝️",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "'My friends are my power!' The Keyblade vanishes from Riku's hand and returns to YOU! Donald and Goofy rejoin! 'Sorry, {heroName}!' Riku flees in rage.",
                    headsChoice: "Chase Riku!",
                    tailsChoice: "Find the princesses!",
                    headsResult: { nextChapter: 4, nextScene: "ansem_riku", exp: 100, text: "You won't let darkness take him!", soundEffect: "chapter" },
                    tailsResult: { nextChapter: 4, nextScene: "princess_chamber", exp: 80, keyblade: "Oathkeeper", text: "The Princesses of Heart must be saved!", soundEffect: "chapter" }
                }
            ]
        },
        // Chapter 4: End of the World
        {
            name: "End of the World",
            scenes: [
                {
                    id: "ansem_riku",
                    image: "👤",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "You find Riku... but it's not him anymore. 'Riku is no longer here. I am Ansem, Seeker of Darkness! Your friend gave his heart to me!' His eyes glow orange.",
                    headsChoice: "Fight Ansem!",
                    tailsChoice: "Try to reach Riku inside!",
                    headsResult: { nextScene: "ansem_battle_1", exp: 100, text: "Your Keyblade clashes against his dark blade!", soundEffect: "battle" },
                    tailsResult: { nextScene: "ansem_battle_1", mp: 50, text: "'Riku! Fight him! I know you're in there!'", soundEffect: "magic" }
                },
                {
                    id: "princess_chamber",
                    image: "👸",
                    sceneType: "mystery",
                    soundType: "magic",
                    text: "The seven Princesses of Heart lie dormant! Snow White, Cinderella, Aurora, Belle, Jasmine, Alice... and Kairi! The Keyhole to darkness is almost open!",
                    headsChoice: "Try to wake Kairi",
                    tailsChoice: "Seal the Keyhole!",
                    headsResult: { nextScene: "kairi_heart", text: "She doesn't wake... her heart isn't here.", soundEffect: "dramatic" },
                    tailsResult: { nextScene: "incomplete_keyhole", text: "The Keyblade won't work! Something's missing!", soundEffect: "damage" }
                },
                {
                    id: "kairi_heart",
                    image: "💖",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "You realize the truth - Kairi's heart has been inside YOU all along! To free it... you'd have to release your own heart. A dark Keyblade appears that can unlock hearts.",
                    headsChoice: "Stab yourself with the dark Keyblade",
                    tailsChoice: "Find another way",
                    headsResult: { nextScene: "heart_release", text: "You turn the blade on yourself...", soundEffect: "damage" },
                    tailsResult: { nextScene: "ansem_battle_1", exp: 150, text: "There must be another way!", soundEffect: "battle" }
                },
                {
                    id: "incomplete_keyhole",
                    image: "🕳️",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "Ansem-Riku appears! 'The Keyhole cannot be sealed while Kairi's heart sleeps within you!' He holds a dark Keyblade. 'Only this can release her!'",
                    headsChoice: "Take the dark Keyblade",
                    tailsChoice: "Fight Ansem-Riku first!",
                    headsResult: { nextScene: "heart_release", text: "You take the blade and turn it on yourself.", soundEffect: "damage" },
                    tailsResult: { nextScene: "ansem_battle_1", strength: 10, exp: 120, text: "You won't let him use you!", soundEffect: "battle" }
                },
                {
                    id: "heart_release",
                    image: "✨",
                    sceneType: "magic",
                    soundType: "magic",
                    text: "Light explodes from your chest! Kairi's heart returns to her! But... you begin to fade. Your heart drifts away. You become a Heartless...",
                    headsChoice: "Hold onto your memories",
                    tailsChoice: "Let go...",
                    headsResult: { nextScene: "shadow_sora", mp: 100, text: "Even as a shadow, you remember...", soundEffect: "magic" },
                    tailsResult: { nextScene: "shadow_sora", text: "Everything fades to darkness...", soundEffect: "damage" }
                },
                {
                    id: "shadow_sora",
                    image: "👤",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "You're a Shadow! Kairi sees you among the Heartless. 'Sora? Is that... you?' She reaches out and embraces the darkness. 'I won't let you go!'",
                    headsChoice: "Remember who you are",
                    tailsChoice: "Fight the darkness within",
                    headsResult: { nextScene: "restoration", exp: 200, text: "Light bursts forth! YOU RETURN!", soundEffect: "victory" },
                    tailsResult: { nextScene: "restoration", strength: 15, text: "Your will overcomes the shadow!", soundEffect: "victory" }
                },
                {
                    id: "restoration",
                    image: "🌟",
                    sceneType: "victory",
                    soundType: "victory",
                    text: "You're human again! Kairi saved you with her light! But Ansem has fled to the End of the World - where all fallen worlds gather. It's time for the final battle!",
                    headsChoice: "Chase Ansem immediately!",
                    tailsChoice: "Seal Hollow Bastion first",
                    headsResult: { nextScene: "end_of_world", text: "No time to waste!", soundEffect: "chapter" },
                    tailsResult: { nextScene: "end_of_world", keyblade: "Oblivion", hp: 50, text: "You seal the Keyhole and receive Oblivion!", soundEffect: "magic" }
                },
                {
                    id: "ansem_battle_1",
                    image: "⚔️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "You battle Ansem-Riku! Dark energy and light clash! 'Darkness conquers all worlds!' But deep inside, Riku is fighting too!",
                    headsChoice: "Overpower him!",
                    tailsChoice: "Call out to Riku!",
                    headsResult: { nextScene: "end_of_world", heartlessDefeated: 1, exp: 200, hp: -50, text: "You win! Riku regains control briefly: 'Go! I'll hold him!'", soundEffect: "victory" },
                    tailsResult: { nextScene: "end_of_world", heartlessDefeated: 1, exp: 250, text: "Riku fights back! 'I won't give in!' He holds the door!", soundEffect: "victory" }
                },
                {
                    id: "end_of_world",
                    image: "🌑",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "The End of the World - a void of destroyed worlds! Debris floats in endless darkness. At the center: KINGDOM HEARTS itself! Ansem waits before the door.",
                    headsChoice: "CHARGE!",
                    tailsChoice: "Approach cautiously",
                    headsResult: { nextScene: "ansem_final", strength: 10, text: "No more running!", soundEffect: "battle" },
                    tailsResult: { nextScene: "ansem_final", defense: 10, text: "You sense immense power...", soundEffect: "dramatic" }
                },
                {
                    id: "ansem_final",
                    image: "👁️",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "'Behold the endless abyss! Kingdom Hearts! Fill me with the power of DARKNESS!' Ansem merges with a massive Heartless battleship - World of Chaos!",
                    headsChoice: "Attack the face!",
                    tailsChoice: "Target the core!",
                    headsResult: { nextScene: "final_battle", exp: 150, text: "You fly toward the nightmare!", soundEffect: "battle" },
                    tailsResult: { nextScene: "final_battle", exp: 200, text: "The heart is the source!", soundEffect: "battle" }
                },
                {
                    id: "final_battle",
                    image: "💥",
                    sceneType: "battle",
                    soundType: "battle",
                    text: "The battle rages across dimensions! Donald's magic blazes! Goofy shields you! Ansem screams: 'SUBMIT TO DARKNESS!'",
                    headsChoice: "NEVER! KINGDOM HEARTS IS LIGHT!",
                    tailsChoice: "MY FRIENDS ARE MY POWER!",
                    headsResult: { nextScene: "kh_light", text: "The door to Kingdom Hearts opens... and LIGHT pours out!", soundEffect: "magic" },
                    tailsResult: { nextScene: "kh_light", ability: "Trinity Limit", text: "Together, you unleash everything!", soundEffect: "victory" }
                },
                {
                    id: "kh_light",
                    image: "✨",
                    sceneType: "magic",
                    soundType: "victory",
                    text: "'Light?! But... Kingdom Hearts is darkness!' 'You're wrong, Ansem. Kingdom Hearts... IS LIGHT!' The radiance destroys him! But the door must be sealed from both sides!",
                    headsChoice: "Seal the door!",
                    tailsChoice: "Look inside first",
                    headsResult: { nextScene: "door_closing", exp: 300, text: "Riku and King Mickey appear on the other side!", soundEffect: "chapter" },
                    tailsResult: { nextScene: "door_closing", mp: 100, text: "You see infinite worlds within...", soundEffect: "magic" }
                },
                {
                    id: "door_closing",
                    image: "🚪",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    text: "Riku and King Mickey help push from the dark side! 'Take care of her.' Riku smiles. Mickey: 'There will always be a door to the light!' The door seals!",
                    headsChoice: "Promise to find them",
                    tailsChoice: "Say goodbye",
                    headsResult: { nextScene: "ending_destined_hero", text: "'I'll come back for you both!'", soundEffect: "victory" },
                    tailsResult: { nextScene: "ending_peaceful_end", text: "The worlds begin restoring...", soundEffect: "victory" }
                },
                // ENDINGS
                {
                    id: "ending_destined_hero",
                    image: "🗝️",
                    sceneType: "victory",
                    soundType: "victory",
                    isEnding: true,
                    endingId: "destined",
                    text: "The worlds return! You stand with Kairi on restored Destiny Islands. She hands you her lucky charm. 'Wherever you go, I'm always with you.' A new path appears... your journey is just beginning, {heroName}."
                },
                {
                    id: "ending_peaceful_end",
                    image: "🌅",
                    sceneType: "victory",
                    soundType: "victory",
                    isEnding: true,
                    endingId: "peaceful",
                    text: "The worlds restore one by one. Destiny Islands returns! You, Kairi, and eventually Riku reunite. The three of you watch the sunset. 'Nothing's changed, huh?' 'Nope. Nothing will.' Peace... for now."
                },
                {
                    id: "ending_keyblade_master",
                    image: "👑",
                    sceneType: "victory",
                    soundType: "victory",
                    isEnding: true,
                    endingId: "master",
                    text: "Your mastery of light earns you the title of Keyblade Master! Yen Sid himself acknowledges your power. But new threats loom - Organization XIII, Xehanort's return... Your legend, {heroName}, will echo across the worlds!"
                },
                {
                    id: "ending_friends_power",
                    image: "🤝",
                    sceneType: "victory",
                    soundType: "victory",
                    isEnding: true,
                    endingId: "friends",
                    text: "You proved that friendship transcends darkness. Donald, Goofy, Kairi, Riku, Leon, and everyone you met stand with you. 'My friends are my power!' becomes legendary. Together, you'll face whatever comes next!"
                },
                {
                    id: "ending_darkness_within",
                    image: "🌑",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    isEnding: true,
                    endingId: "darkness",
                    text: "Though you won, something changed in you. You felt the darkness's appeal. Like Riku, you now walk the path between light and dark. Some fear you. Others respect you. You are {heroName}, the Twilight Wielder."
                },
                {
                    id: "ending_heart_sacrifice",
                    image: "💔",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    isEnding: true,
                    endingId: "sacrifice",
                    text: "You saved everyone... but your heart was lost in Kingdom Hearts. Kairi never stops searching. Years later, she finds a way to reach you. 'I knew I'd find you, {heroName}.' Your story wasn't over - it was just sleeping."
                },
                {
                    id: "ending_nobody_path",
                    image: "👤",
                    sceneType: "mystery",
                    soundType: "dramatic",
                    isEnding: true,
                    endingId: "nobody",
                    text: "When you became a Heartless, a Nobody was born - Roxas, your other half. Though you returned, Roxas lives on in the Organization. Two halves of one heart... one day you'll have to choose. The story continues in Castle Oblivion..."
                }
            ]
        }
    ],
    endings: {
        destined: { name: "The Destined Hero", icon: "🗝️", description: "Promised to find your friends across all worlds" },
        peaceful: { name: "Peaceful Sunrise", icon: "🌅", description: "Reunited with friends on Destiny Islands" },
        master: { name: "Keyblade Master", icon: "👑", description: "Achieved mastery of the Keyblade" },
        friends: { name: "Power of Friendship", icon: "🤝", description: "Proved friends are your greatest power" },
        darkness: { name: "Twilight Wielder", icon: "🌑", description: "Embraced both light and darkness" },
        sacrifice: { name: "Sleeping Heart", icon: "💔", description: "Lost your heart to save everyone" },
        nobody: { name: "The Other Half", icon: "👤", description: "Your Nobody continues your story" }
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
const questProgress = document.getElementById('questProgress');
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

    // HP (Kingdom Hearts style)
    const hpPercent = (state.story.hp / state.story.maxHp) * 100;
    healthBar.style.width = hpPercent + '%';
    healthValue.textContent = `${state.story.hp}/${state.story.maxHp}`;

    // MP (Kingdom Hearts style)
    const mpPercent = (state.story.mp / state.story.maxMp) * 100;
    repBar.style.width = mpPercent + '%';
    repValue.textContent = `${state.story.mp}/${state.story.maxMp}`;

    // EXP Bar
    const expBar = document.getElementById('expBar');
    const expValue = document.getElementById('expValue');
    if (expBar && expValue) {
        const expPercent = (state.story.exp / state.story.expToLevel) * 100;
        expBar.style.width = expPercent + '%';
        expValue.textContent = `Lv.${state.story.level}`;
    }

    // Keyblade
    const keybladeDisplay = document.getElementById('keybladeDisplay');
    if (keybladeDisplay) {
        keybladeDisplay.textContent = state.story.keyblade;
    }

    // Abilities
    const abilitiesDisplay = document.getElementById('abilitiesDisplay');
    if (abilitiesDisplay) {
        abilitiesDisplay.textContent = state.story.abilities.length > 0 ? state.story.abilities.join(', ') : 'None';
    }

    // Munny
    const munnyDisplay = document.getElementById('munnyDisplay');
    if (munnyDisplay) {
        munnyDisplay.textContent = state.story.munny;
    }

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

    // Stats - Kingdom Hearts style
    const heartlessDefeatedEl = document.getElementById('heartlessDefeated');
    if (heartlessDefeatedEl) {
        heartlessDefeatedEl.textContent = state.story.heartlessDefeated;
    }
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

    // Apply stat changes - Kingdom Hearts style
    if (result.hp) {
        state.story.hp = Math.max(0, Math.min(state.story.maxHp, state.story.hp + result.hp));
        if (result.hp < 0) playDamageSound();
        if (result.hp > 0) playItemSound(); // Healing
    }
    if (result.mp) {
        state.story.mp = Math.max(0, Math.min(state.story.maxMp, state.story.mp + result.mp));
    }
    if (result.exp) {
        state.story.exp += result.exp;
        // Level up check
        while (state.story.exp >= state.story.expToLevel) {
            state.story.exp -= state.story.expToLevel;
            state.story.level++;
            state.story.expToLevel = Math.floor(state.story.expToLevel * 1.5);
            // Increase stats on level up
            state.story.maxHp += 5;
            state.story.hp = state.story.maxHp;
            state.story.maxMp += 3;
            state.story.mp = state.story.maxMp;
            state.story.strength += 1;
            state.story.magic += 1;
            state.story.defense += 1;
            playVictorySound();
            showStoryMascotMessage(`LEVEL UP! Now Level ${state.story.level}!`);
        }
    }
    if (result.munny) {
        state.story.munny = Math.max(0, state.story.munny + result.munny);
        if (result.munny > 0) playItemSound();
    }
    if (result.strength) {
        state.story.strength += result.strength;
    }
    if (result.magic) {
        state.story.magic += result.magic;
    }
    if (result.defense) {
        state.story.defense += result.defense;
    }
    if (result.keyblade) {
        state.story.keyblade = result.keyblade;
        playItemSound();
        showStoryMascotMessage(`New Keyblade: ${result.keyblade}!`);
    }
    if (result.ability && !state.story.abilities.includes(result.ability)) {
        state.story.abilities.push(result.ability);
        playMagicSound();
        showStoryMascotMessage(`Learned: ${result.ability}!`);
    }
    if (result.heartlessDefeated) {
        state.story.heartlessDefeated += result.heartlessDefeated;
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

    // Check for death (HP reaches 0)
    if (state.story.hp <= 0) {
        state.story.deaths++;
        state.story.hp = state.story.maxHp;
        state.story.mp = state.story.maxMp;
        playDeathSound();
        showStoryMascotMessage("Your heart fades... but light gives you another chance!");
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
        <p>🗝️ Keyblade: ${state.story.keyblade}</p>
        <p>⭐ Level: ${state.story.level}</p>
        <p>👤 Heartless Defeated: ${state.story.heartlessDefeated}</p>
        <p>💀 Times Fallen: ${state.story.deaths}</p>
        <p>💰 Munny: ${state.story.munny}</p>
        <p>💫 Abilities: ${state.story.abilities.length}</p>
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
