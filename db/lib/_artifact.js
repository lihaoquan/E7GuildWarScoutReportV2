const Artifact = require('../models/Artifact')

// Initialize units
let initArtifacts = () => {
    return new Promise((resolve, reject) => {
        Artifact.insertMany(
            [{ artifact_name: "A Little Queen's Huge Crown" }, { artifact_name: "A Song for Everybody" }, { artifact_name: "A Symbol of Unity" }, { artifact_name: "Abyssal Crown" }, { artifact_name: "Adamant Shield" }, { artifact_name: "Air-to-Surface Missile: MISHA" }, { artifact_name: "Alabastron" }, { artifact_name: "Alencinox's Wrath" }, { artifact_name: "Alexa's Basket" }, { artifact_name: "Alsacian Spear" }, { artifact_name: "Ambrote" }, { artifact_name: "Ancient Dragon's Legacy" }, { artifact_name: "Ancient Sheath" }, { artifact_name: "Andre's Crossbow" }, { artifact_name: "Anti-Magic Mask" }, { artifact_name: "Aqua Rose" }, { artifact_name: "Ascending Axe" }, { artifact_name: "Atma's Portal" }, { artifact_name: "Aurius" }, { artifact_name: "Azure Comet" }, { artifact_name: "Barthez's Orbuculum" }, { artifact_name: "Bastion of Hope" }, { artifact_name: "Bastion of Perlutia" }, { artifact_name: "Biting Wind Star" }, { artifact_name: "Black Hand of the Goddess" }, { artifact_name: "Blazing Full Moon Trophy" }, { artifact_name: "Blessings of Camaraderie" }, { artifact_name: "Bloodbead Dagger" }, { artifact_name: "Bloodstone" }, { artifact_name: "Bloody Rose" }, { artifact_name: "Border Coin" }, { artifact_name: "Brilliant Confidence" }, { artifact_name: "Butterfly Mandolin" }, { artifact_name: "Card of Small Miracles" }, { artifact_name: "Celestine" }, { artifact_name: "Champion's Trophy" }, { artifact_name: "Chatty" }, { artifact_name: "Circus Fantasia" }, { artifact_name: "Cradle of Life" }, { artifact_name: "Creation and Destruction" }, { artifact_name: "Crimson Moon of Nightmares" }, { artifact_name: "Crimson Seed" }, { artifact_name: "Crown of Glory" }, { artifact_name: "Cruel Mischief" }, { artifact_name: "Cursed Compass" }, { artifact_name: "Daydream Joker" }, { artifact_name: "Days of Destiny" }, { artifact_name: "Deadly Sword" }, { artifact_name: "Demon's Pistol" }, { artifact_name: "Devil's Brand" }, { artifact_name: "Dignus Orb" }, { artifact_name: "Doctor's Bag" }, { artifact_name: "Double-Edged Decrescent" }, { artifact_name: "Draco Plate" }, { artifact_name: "Dream Scroll" }, { artifact_name: "Durandal" }, { artifact_name: "Dust Devil" }, { artifact_name: "Dux Noctis" }, { artifact_name: "Egg of Delusion" }, { artifact_name: "El's Fist" }, { artifact_name: "Elbris Ritual Sword" }, { artifact_name: "Elf's Bow" }, { artifact_name: "Elyha's Knife" }, { artifact_name: "Enhanced Gauntlet" }, { artifact_name: "Envoy's Pipe" }, { artifact_name: "Eternus" }, { artifact_name: "Etica's Scepter" }, { artifact_name: "Exorcist's Tonfa" }, { artifact_name: "Fairy Tale for a Nightmare" }, { artifact_name: "Fairy's Grimoire" }, { artifact_name: "Firm Shield" }, { artifact_name: "Flawless Garments" }, { artifact_name: "Flower Shower" }, { artifact_name: "Forest Totem" }, { artifact_name: "Glo-Wings 21" }, { artifact_name: "Goblet of Oath" }, { artifact_name: "Goblin's Lamp" }, { artifact_name: "Golden Cocoa Cookie" }, { artifact_name: "Grail of Blood" }, { artifact_name: "Guardian Ice Crystals" }, { artifact_name: "Guide to a Decision" }, { artifact_name: "Guiding Light" }, { artifact_name: "Hell Cutter" }, { artifact_name: "Hilag Lance" }, { artifact_name: "Holy Sacrifice" }, { artifact_name: "Idol's Cheer" }, { artifact_name: "Iela Violin" }, { artifact_name: "Indestructible Gaiters" }, { artifact_name: "Infinity Basket" }, { artifact_name: "Iron Fan" }, { artifact_name: "Jack-O's Symbol" }, { artifact_name: "Junkyard Dog" }, { artifact_name: "Justice for All" }, { artifact_name: "Kal'adra" }, { artifact_name: "Knowledge Seed" }, { artifact_name: "Labyrinth Cube" }, { artifact_name: "Last Teatime" }, { artifact_name: "Love Potion" }, { artifact_name: "Magaraha's Tome" }, { artifact_name: "Magic for Friends" }, { artifact_name: "Manica of Control" }, { artifact_name: "Merciless Glutton" }, { artifact_name: "Midnight Bloom" }, { artifact_name: "Mighty Yaksha" }, { artifact_name: "Moonlight Dreamblade" }, { artifact_name: "Moonlight's Vestige" }, { artifact_name: "Ms. Confille" }, { artifact_name: "Necro and Undine" }, { artifact_name: "New Year Cookies" }, { artifact_name: "Noble Oath" }, { artifact_name: "Nostalgic Music Box" }, { artifact_name: "Oath Key" }, { artifact_name: "Official Levulin Beach Volleyball" }, { artifact_name: "One Year of Gratitude" }, { artifact_name: "Otherworldly Machinery" }, { artifact_name: "Portrait of the Saviors" }, { artifact_name: "Proof of Valor" }, { artifact_name: "Prophetic Candlestick" }, { artifact_name: "Pure White Trust" }, { artifact_name: "Radiant Forever" }, { artifact_name: "Rainbow Scale" }, { artifact_name: "Ranon's Memorandum" }, { artifact_name: "Reingar's Special Drink" }, { artifact_name: "Resolute Soldier Series" }, { artifact_name: "Rhianna &amp; Luciella" }, { artifact_name: "Rise of a Monarch" }, { artifact_name: "Rod of Amaryllis" }, { artifact_name: "Rosa Hargana" }, { artifact_name: "Samsara Prayer Beads" }, { artifact_name: "Santa Muerte" }, { artifact_name: "Sashe Ithanes" }, { artifact_name: "Scroll of Shadows" }, { artifact_name: "Secret Art – Storm Sword" }, { artifact_name: "Sepulcrum" }, { artifact_name: "Severed Horn Wand" }, { artifact_name: "Shepherd of the Hollow" }, { artifact_name: "Shepherds of Chaos" }, { artifact_name: "Shimadra Staff" }, { artifact_name: "Sigurd Scythe" }, { artifact_name: "Silver Rain" }, { artifact_name: "Sira-Ren" }, { artifact_name: "Snow Crystal" }, { artifact_name: "Song of Stars" }, { artifact_name: "Spear of a New Dawn" }, { artifact_name: "Spirit's Breath" }, { artifact_name: "Spooky Solayu Stories" }, { artifact_name: "Staff of Wisdom" }, { artifact_name: "Star of the Deep Sea" }, { artifact_name: "Steadfast Gatekeeper" }, { artifact_name: "Stella Harpa" }, { artifact_name: "Strak Gauntlet" }, { artifact_name: "Super Duper Water Gun Shooter" }, { artifact_name: "Sword of Ezera" }, { artifact_name: "Sword of Judgment" }, { artifact_name: "Sword of Summer Twilight" }, { artifact_name: "Sword of the Morning" }, { artifact_name: "Sword of the Sun" }, { artifact_name: "Sword of Winter Shadow" }, { artifact_name: "Tagehel's Ancient Book" }, { artifact_name: "Tear of the Desert" }, { artifact_name: "The Guardian Star's Blessing" }, { artifact_name: "Time Matter" }, { artifact_name: "Timeless Anchor" }, { artifact_name: "To a New World" }, { artifact_name: "Torn Sleeve" }, { artifact_name: "Touch of Rekos" }, { artifact_name: "Twilight Calamity" }, { artifact_name: "Uberius's Tooth" }, { artifact_name: "Unfading Memories" }, { artifact_name: "Unseen Observer" }, { artifact_name: "Upgraded Dragon Knuckles" }, { artifact_name: "Venus Orb" }, { artifact_name: "Victorious Flag" }, { artifact_name: "Violet Talisman" }, { artifact_name: "Wall of Order" }, { artifact_name: "War Horn" }, { artifact_name: "Water's Origin" }, { artifact_name: "Wind Rider" }, { artifact_name: "Wings of Light and Shadow" }, { artifact_name: "Wondrous Potion Vial" }, { artifact_name: "XIII. Death" }, { artifact_name: "XIV. Temperance" }, { artifact_name: "XVI. The Tower" }, { artifact_name: "XVIII. The Moon" }]
        ).then((docs) => {
            resolve(docs)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Get all artifacts
let getAllArtifacts = () => {
    return new Promise((resolve, reject) => {
        Artifact.find({}).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Get artifact details by id
let getArtifactsById = (ids) => {
    return new Promise((resolve, reject) => {
        Artifact.find({
            _id: {
                $in: ids
            }
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    initArtifacts,
    getAllArtifacts,
    getArtifactsById
}