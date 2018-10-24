var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
	var hArray = ["A young girl looks in her bedroom mirror to apply her lipstick. Nothing is reflected back at her, just darkness.", "You have exclusive use of a private jet and unlimited means. Where do you go? What if you can't come back?", 
			   "You open her freezer and find the dog - its eyes open and its teeth exposed. Why has she frozen her dog?", "The Death Houses, where the sick and destitute of Singapore spent their last days, had been pulled down years ago.",
			"His camera could steal people's souls. On his walls, the portraits wailed and begged for freedom.", "I try to lift my wrists, but the straps are too tight. I watch them take her away: my baby, born for their purpose.",
			"As our eyes met for the first time I imagined how it would feel to peel away his skin with my fingers.", "You spend the night with a beautiful woman. The next morning, you awake in a graveyard beside her disfigured body.",
			"Since your sister died you've heard her voice in your head, then other people begin to mistake you for her.", "He spotted the first mark on Sunday; a tiny purple bruise on his knee. By Tuesday his whole leg had turned black.",
			"You're lying on a cold metal table in a morgue. And you're awake.", "Yesterday she stopped screaming - all that was left was the silence.", "You come home to find an old-fashioned phone sitting in the middle of your table. No wires lead to it. It rings.", 
			"Friends take a shortcut through a dark wood each telling a scary story as, unbeknownst to them, something follows.", "The apocalypse has come and gone, and society is rebuilding. How will the main character handle civilisation?",
			"Stretching out, the bony hand clasped and ripped at the air, desperate to wrench them into its abyss.", "There's a reason no man has journeyed out to the old Henderson estate for the last ten years.",
			"Like clockwork, the scrabbling in the attic stopped and the screaming started.", "At first, she thought that nothing had happened at all. Then she looked down and saw the blood, and screamed.",
			"She lives in the old asylum now, mumbling incoherently. No one had believed her story - how wrong they all were.", "She woke again with that desperate feeling of panic. It had happened again: the bloody blade lay beside her.",
			"A sadistic serial murderer is on the hunt, but what happens when fate has him choose a victim who feels no pain?", "'14th Century' read the sign by the pub. Odd. The building looked old, but definitely hadn't been here yesterday.",
			"The face stared out at me; wide-eyed and hollow-cheeked and instantly unforgettable.", "The crying at night doesn't stop. Living alone, on an abandoned rig in the North Sea, I am afraid.",
			"The lights of every house in the town were on that night, except for one...", "The cat woke me so, half-asleep, I fed him. Then I remembered. Yesterday we cremated him.", "When a mother raises her child to fend for himself, he then becomes a closeted cannibal in his teens and adulthood.",
			"The archaeologists were amazed to find a perfectly preserved human in that ice cave - but why did it have my face?", "An abandoned storage locker has been emanating a sickly sweet smell for weeks. What's inside?",
			"Your villain has to go to therapy to discuss their issues. Write about what transpires during the session.", "You find yourself lost in the woods. You see arrows on the floor leading you further into the trees.",
			"They thought the employees in costume at the theme park were only pretending - they could not have been more wrong.", "You awake alone and get ready for work. You go to unlock the door and notice a strange pair of shoes by the doormat.", 
			"Late one night you hear a knock at the door. You open it to see Death himself waiting. He offers you a bargain�", "What if you fabricated a past only to start suffering the emotional and physical trauma associated with that life?",
			"Still life paintings at a holiday villa depict familiar scenes from your past. But you've never been here before.", "You never open the door when they're knocking. Never.", "Half-starved, Zoe almost didn't notice her fries weren't fries at all... but something far more sinister.",
			"An incurable virus has been stolen from a top security research lab and been placed in a town's drinking water.", "She pressed her palm to the glass. Her breath caught as her reflection gripped her hand & bared its teeth in a grin.",
			"Its evil red eyes burned into mine. I froze with cold terror as I realised the face staring back at me was my own.", "The savage way the new lodger gorged himself at our welcome dinner told me that we, like our home, were his now.",
			"As we walked through the wood the trees leaned inwards, and my hands became sticky not with sap� but with blood.", "Your bare feet pounds the forest floor as you realise you are not the hunted, you are the hunter.",
			"You find a duffel bag beside the road and stop to investigate. What's in it? What happens next?", "Imagine living in the dark deep past, when only a few million people exist on the entire planet. And monsters."];
       
var fArray = ["A child's imaginary friend needs to convince the child he's real so he doesn't disappear.", "Choking on ash, I watched helplessly as the great tree Yggdrasil burned.",
			"A woman starts a job in a psychiatric unit and is transported into the clients' hallucinations. Can she get back?", "In a world where magic is gained through one's interactions with others, how does your antagonist acquire power?",
			"They ran through the countryside, spreading out in all directions. We watched in horror as the battle was lost.", "Technology-less, humans find themselves evolved with shrunk tongues and brains due to their lack of use.", 
			"The acrid smell of burnt wood hung in the air, making her eyes water as she stumbled along the deserted sidewalk.", "Your hair, features and skin are gradually disappearing. What do you see when you look in the mirror?", 
			"You are cursed every Wednesday to endure a tragedy, but on Thursday no one remembers. Convince a friend to help.", "You realise that a shop you walk past every day is only visible to you and no one else. What awaits you inside?",
			"In a remote town in the North of England, a veil between worlds opens once a year on Halloween.", "A mysterious merchant in a station sells all kinds of tickets to anywhere, fictional or not - where do you go?",
			"You awake in a still battlefield, under a pile of bodies, blind in one eye. You recall fighting; nothing else.", "You run after someone who left a strange book on the bus and they go into a house. Through the window you see...",
			"A King stands in front of his Court and commands that his own daughter be executed. What events lead to this point?", "You find a handwritten manifesto for your life in your old diary. You can't remember when it was written.",
			"Her jeans grew damp from the wet grass as she watched the fireworks light up the night sky.", "Cathedral walls writhed and heaved as the gargoyles were roused from a millennia of static malevolence.",
			"You are given a skill at birth, but all the good ones are gone. Now you've got to save people with card shuffling.", "My mother only had two basic rules. Don't ever fall in love, and never summon a demon. I couldn't honour either.",
			"I stood by the graveside. We were burying Uncle Eric. Again.", "It was a rainy day in the Garden of Cosmic Speculation.", "Death is retiring and needs to find a replacement for the job.", "An exhibit in a famous museum becomes bored with its cramped and unstimulating lifestyle.",
			"Pizza as a religion.", "Every emotion a human feels becomes written on their body. One day a woman is found with empty skin.", "The day the sharks took to the air began like any other day.", "A girl slips into a pond, resurfacing in a parallel world where good is bad. There, she makes a surprising friend.",
			"In the basement the marble floor was cold under her feet. She wondered why mother kept the basement door locked.", "Imagine you are a wild animal. Describe your first interaction with a human.",
			"When a dreamer dies, what happens to the dream?", "You wake up, only to find that the dragons have returned and have claimed you their leader in the upcoming war.", "Bored at college you start tapping inaudibly under your seat. You find a note stuck to the bottom of it.",
			"A story of forbidden love set in a world where gender doesn't exist, but other dividing factors and prejudices do.", "I can't do this anymore, there's nothing here for me.", "After living your whole life as an atheist, you die and arrive at The Pearly Gates confronted by St. Peter.",
			"Describe being a pollen grain on a flying bee. Flowers are ahead but a plastic bag suddenly intercepts your flight.", "Green smoke swirled inside the only jar among the empty bottles. Its label read: Don't open. Or do. It's up to you.",
			"Write about a character who can no longer recognise faces or objects. Describe their normal journey to work.", "Ned, an evacuee living in Cornwall to escape the Blitz, finds the family he never had in a wild tribe of pixies.", 
			"The stars were shining brightly when the little girl climbed out of bed, and tiptoed to the window.", "The Onkidonk of Erleigh Reach has left Baracu. She carries the Cron of Gal, her Javlik and the stolen Neamosst.",
			"An albino urchin child accidentally murders the King's religious minister. The King's advisor takes him in.", "Being chased through time and space, your only escape is to find portal after, portal wherever they might appear.",
			"She took off her hat, along with her hand.", "You wake up. Everyone has disappeared apart from you and your best friend. What does the world feel like?", "You fall asleep a second after noticing your dream catcher fell and cracked on the floor. A trapped dream escapes.",
			"Write about a world in which humans have evolved to be able to communicate without spoken language.", "Write about a world where eyes are a gateway to other dimensions, and eye colour determines the dimension within.",
			"A young girl writes about a fantasy world and one night is transported there. She has until dawn to find a way out.", "She looked back through the portal and then at the new horizon before her. The two worlds were so different.",
			"Sarah knew that jumping forward from this vast red rock would be her final jump; a step to her new home.", "What if when we die, we start our lives again in an alternate reality?", "An unemployed millennial chooses daring quests and giant slaying over yet another Thursday sat in the job centre.",
			"A soldier has to rethink his strategy after a spelling error proves it wasn't a dragon terrorising the local villa.", "Today your kingdom was prophesized to crumble. Everything changes, but not quite how you thought.",
			"You find a musical instrument, unlike any other. Where has it come from? More importantly, how does it sound?", "On the eve of your coronation you receive a gift: a severed hand clutching a scroll sealed with your enemy's crest.",
			"By all means point your gun at me if it helps you to relax - it's not like you're actually going to use it.", "It was strange walking in through the front gate. Usually he'd be breaking in to a place like this.",
			"Make each person in your family into a deity of a new pantheon - and construct the full mythology around them.", "The tree in your backyard kneels down and begins a conversation.", "Most men die once. But my father isn't like most men.",
			"Everyone is named alphabetically according to social class. Your name is Zelda. You meet Aaron.", "Hidden by the shadow of an oak tree, Mark waits. His quarry comes into view just as a hand grabs him from behind."];
	
var mArray = ["I expected the knock at the door would come eventually, but I didn't expect it to happen at midnight.", "You get a call in the middle of the night: it's a lawyer. You've inherited an estate, but there's a catch.",
		"Jim seldom found time for reflection but now, alone at sea; he's inundated with re-emerging memories from his past.", "She lived alone, so she was alarmed to see flowers and a sweating glass of champagne on the table when she arrived.",
		"A band goes on a tour in 1982. In every new town oddities occur that seem to be connected to the band somehow.", "Five people meet over dinner. All their deaths are scheduled for two weeks' time. Some want to die, some do not.",
		"An innocent tweet about your breakfast spirals out of control, when a strange police squad arrests you for treason.", "The door to the yoga studio was wide open when it should have been closed. She had locked it herself last night.",
		"Imagine your protagonist finds a loved one acting completely out of character, for no explicable reason. Why is it?", "As the elevator door is about to close, you lock eyes with someone on the other side - someone from the past.",
		"Lily lives a normal life until she adopts a cat, unaware that it ran away from previous owner - the devil himself.", "We all have deep, dark secrets. Something we saw, did, or heard. Write about that thing you've never told anyone.",
		"The proprietor of the trattoria was puzzled by the man visiting his restaurant. He arrived every Tuesday at 12.30.", "You stand accused of killing the Queen. The only person who can vouch for you is her ghost. No one can see her.",
		"You're preparing for bed, you glance outside & there's a car you don't recognise. Then your doorbell rings...", "A character needs help, but there's a catch: they need to keep their goal a total secret from the helper.",
		"If only, she thought, they had spelled my name right in my obituary, then this might have been a brighter day.", "She wakes, uneasy. There's a soft, regular sound coming from downstairs. The baby is gone, her home altered...",
		"Whilst walking your dog in the snow, you notice the tracks it leaves behind are human footprints.", "You come to work one day to find all emails & social media accounts logged in to another person. Who are they?",
		"Post Snowden leaks, you are a victim of illegal surveillance by the police. Just how intrusive is the tech used?", "A local take-away doesn't have a menu or serve food, but weird customers come and go. You get a job to investigate.",
		"She didn't know what made her follow them, they looked just like any other couple...", "A mirror in a widow's new house allows her to see into the life of a married woman, murdered there fifty years ago.",
		"If the people of the town had not been so eager to avoid eye contact they might've had an idea of what was coming.", "Thinking back, I suppose that the skull I'd placed in the kitchen window to deter unwanted visitors may not have helped.",
		"Pressing play on the answerphone for the second time, he shivered. He hadn't been known by that name for years.", "In a train station, you see someone interesting and steal their bag and ticket. Where will your new items take you?",
		"Nobody at the funeral knew what had killed him but everyone thought they did.", "The murder scene was ugly. It didn't help that it was in a bouncy house...", "You suspect your partner is an online troll. How do you find out for sure, and what do you do?",
		"If she'd known then what she knew now, she wouldn't have killed him.", "The week before your home is due to be repossessed, your new boss calls you with an intriguing offer.", "You are alone. Where are you? You are curious, fearless. What will you do? You can explore. What will you find?",
		"What kind of person brings a toddler to a funeral? And who the hell leaves one there?", "A man she faintly recognised was glaring at her as though he wished her dead. Who was he and why was he so angry?", "Only one box was left in the attic. I had no idea what it was - or even if I had packed it up and put it there.",
		"It had been stupid of me to even suggest it, but she committed a sin when she agreed. Everything had changed.", "You wake up after a successful date, in a room decorated almost identically to your own.",
		"People either fall for me or try to kill me. Little did I know that today, it would be both.", "A beautiful letter to 'the current occupant' arrives. Inside is a red, silk handkerchief and an address on a card.",
		"It all began the day I found myself on my knees cleaning out a dead man's fridge.", "You are mistaken for a member of a cult, when you accidentally imitate their secret greeting.",
		"Everybody thinks Mrs Adams is the kindest infant teacher ever. So how could anyone do something like this to her?", "Is that him sipping a beer? It looks like him. He blew a woman,s brains out. I know because I was with him.",
		"Mel functioned on autopilot. Her emotional detachment from Ron and the children kept her sane, until she snapped.", "A detective finally hunts down a notorious killer, only to realise upon her arrest that agrees with her motive.",
		"The knife had missed her by an inch. This had to be the last time. Gently she took it from him, holding her breath.", "In a bookshop, she sees a book with her name on the spine. Her picture is on the book jacket. She did not write it.",
		"Alone, a woman waits. Today, after twenty five years, she will finally meet her daughter.", "Every year on the same day a new letter comes: 'He's alive, and he's waiting for you.'",
		"He was following me. Who is he? Why is he doing this? Why do I feel like I am in more danger now he's gone?", "She saw him across the room, another woman on his arm. The first man she ever loved. The first man she'd ever kill.",
		"Lana's mother had been dead for eleven years when she saw her on a packed train.", "It's never good news when the phone rings in the middle of the night.", "The pizza chef was dead, he lay smothered in mozzarella and tomatoes. Was it murder? Or had he topped himself?",
		"She stood there waiting for the door to open, her heart thumping and eyes burning. She knew it was the only way.", "While checking the post you find that a letter has been sent to you from your deceased partner, what does it say?",
		"You awaken encircled by eleven skeletons, your hand stamped with the number 12. What does this mean? Are you next?", "A detective is assigned to investigate the very murder he committed.",
		"The wind blew hard, and as the waves crept further up the beach the evidence was slowly disappearing from the sand.", "You stumble across your headstone at your local cemetery. Someone has written your epitaph. What does it say?",
		"Then, very faintly, from the house next door, came the sound of breaking glass.", "You sail back to land after a storm. No one remember who you are - not your wife, friends nor children.", "A murder at a secluded crime writing retreat leads to some unusual methods of detecting the killer.",
		"She had her party all planned out; a night of luxury, games, and twisted schemes.", "The car sped away. They'd left me for dead by the roadside, which was stupid of them when I was alive and furious.",
		"He tried hiding his ex's shoes from his new wife. He didn't know how the shoes came back from the grave to his bed.", "Recount the story of a family name, as told by the ghosts who wore it.",
		"You awake with a jellyfish tattoo on your palm. Turning on the news, everyone has one. You set out to find out why.", "You've been trying for a baby for two years. Your husband disappears, returning with a newborn after two weeks.",
		"The moonlight was bright and woke her. Looking out her window, she saw the taxidermist working.", "The protagonist investigates a murder, only to find out he was the one who committed it.",
		"You're a valet driver parking a car. Inside you find a crumpled note with your own address on it. What do you do?"];
	
var rArray = ["She took the same seat she always does. This time, there was someone with her.", "I knew it was over the day he shouted for mushrooms.", "Two days after the proposal, she found a card at her doorstep, written in messy handwriting: 'DON'T MARRY HIM.'",
		"Eva was her only source of joy, but in a rare, vulnerable moment, she hoped to trade motherhood for another man.", "In order to merge their businesses, two wealthy people are forced into an unwanted arranged marriage.",
		"A bachelor billionaire wants to find a worthwhile heir to his billions and business, so he pretends he is broke.", "Write a story from the point of view of a 100 year old mirror.",
		"The street lamp seemed brighter with her standing underneath. She looked at me and there was just the two of us.", "We'd matched on Tinder. And now he was here. He was handsome; I was happy. Then I saw the slogan on his t-shirt.",
		"The babysitter was late, her shoes hurt and she wasn't a bit hungry after finishing the girls leftovers.", "They've never met outside of a dream, but they are in love. One is the Moon and one the Sun.",
		"She climbed to the top of the mountain, and then she knew she would be free.", "She began to run, faster and faster, as quickly as her short legs could carry her. There was no turning back now.",
		"Carefully she lifted the quill and opened the small vial of ink. This was the most difficult letter to write...", "Two gay puffins want to adopt an egg. Will the RSPB help them in their quest for responsible parenthood?",
		"A blind woman falls in love with the scent of a train passenger. How does she find him?", "A woman nervously awaits her turn for an interview but discovers the interviewer is an ex-lover. What happens next?",
		"Your estranged sister unexpectedly dies and would like you to become guardian to her son.", "'I love you',� she said, but it came out like a scream. Mucus glistened from her nose and mouth. 'You're crazy.'", 
		"The lead can't use the word love or an equivalent. What terms/actions do they use instead to express this feeling?", "A man is arrested for a murder he didn't commit. His girlfriend becomes a lawyer to clear his name.", 
		"A lady finds notes in books she borrows from library. She searches for the sender.", "He was the last person she had expected to see standing there. It had been twelve long years. What would she do?",
		"'Give me one good reason why I should wear a dress.' Laura stuck her chin out defiantly. 'You're the bride Laura.'", "Two people connect on a singles app. A virtual romance begins, despite living locally they haven't met...",
		"Chaos ensues when a handsome widower moves into a retirement block full of widows.", "You should have called them 5 years ago but didn,t. You dial the number now, and they pick up...", 
		"She stifled a giggle as it grew clear that what the vicar was reading aloud was definitely not his intended sermon.", "As I hung desperately onto the barrier, watching your train depart, I realised that I'd made a huge mistake.",
		"He was standing outside the building again. His cap low, his head down. He could feel her staring. He always could.", "A couple react to a tragic event - it doesn't involve them but it alters their relationship in a significant way.",
		"Drawn to a blind girl, I find myself entangled in her ideas, which are as seductive as they are unsettling.", "Write about the storm that started the day he disappeared from her life.",
		"Write a dystopian romance about a man who has his memory extracted and tried to find his way back to the truth.", "Edith was beginning to wish she had not worn her buttoned-up camel-haired coat. She was perspiring badly.",
		"Think of the person you hate most. Why did their partner fall in love with them?", "A couple fall in love in a place one is otherwise unhappy. Write about their search for somewhere that suits both.",
		"'Is your name Lisa?' asked the waitress. 'Yes,' she lied.", "My hand hesitated before clicking 'submit'. No going back on it now. Online dating: how difficult could it be?", "She'd waited three years, she could wait another hour.",
		"My fingers traced the glass bottle in front of me and eventually reached the bundle of papers stuffed inside.", "Your character falls for the person who scares them the most.",
		"He was the one person I hated more than anything. And now I was stuck on an elevator with him."];
	var sfArray = ["She had her first seizure when she was four days old. She flew her first spaceship at seventeen.", "Your 5 year old son died 20 years ago. At his annual dinner: a knock at the door! The woman says she is his wife.",
		"The window in the garden wall has been boarded up forever, but tonight a dull, violet light pulses in the cracks...", "Another day dawned at the facility. Gaunt faces haunted windows - visceral, hungry and waiting for the end.",
		"A ghost town, frozen in time since 1957, plays Elvis Presley records non-stop. Nobody wants to talk about it.", "The spaceships landed slowly on the grass a little way across from you. Why are they here? And why in front of you?",
		"Three legged aliens were not uncommon but these were wearing stiletto heels. Who was selling sets of three shoes?", "It was the 30th of February when Jane stopped the clocks; she still needed more time.",
		"You have one chance to speak to an alien population. Write the speech.", "You are a robot who wants to be human, you mimic human emotions in an attempt to transform. How do you mimic?", 
		"You're the world's first sentient robot. Decide whether to use your super-intelligence to help or enslave humanity.", "A scientist unexpectedly discovers that gravity is not a force of nature but vanishes before the big reveal...", 
		"She woke up one morning to find everything had changed. Her family, her house; even her face in the mirror.", "What if the sun doesn't rise tomorrow?", "All of your body's functions (breathing, digestion etc.) require constant conscious effort.", 
		"A deep space crew find an alien object. They violently argue over who owns it. They realise it is observing them.", "There was nothing left of home. So I walked, and I found myself far from where our house once stood.", 
		"The absoluteness of the silence confirmed her fears. The computers were down.", "A psychologist, traversing through the mind of their patient in a CBT session, uncovers some unsettling truths.", "Earth is facing destruction, and only one man can save it. The only problem is, he's been dead for 100 years...",
		"The sun is going down and taking Earth with it. What will happen to those left behind on the doomed planet?", "The fantasy of eternal youth had been reduced to a medical procedure. At least for those deemed worthy of its gift.", 
		"You've unexpectedly entered a dimension in which your actions have no consequences. You've just committed a murder.", "You discover that your partner is an AI-enabled humanoid whose characteristics have been selected by your parents.", 
		"In the future we can 3D print body parts using stem cells.The body parts don't HAVE to replace conventional ones.", "A man has two choices. Neither is good. He must choose one. He has three minutes.", 
		"Humans and an alien race make first contact. Write about it from the distant perspective of another alien race.", "You find a note from yourself telling you to meet someone you've never heard of at 28 o'clock. It's dated yesterday",
		"There will be a huge earthquake tomorrow, but nobody will listen... today is April Fool's Day.", "Implanted Nanobots track your movements and monitor your conversations. How would you keep and maintain a secret?", 
		"After being invaded 50 years ago, a group of scientists set out to create a child that's half human and half alien.", "Post nuclear-apocalypse, women rebuild the world, enslaving men. Remora discovers a plan to render males extinct.", 
		"The night sky was ablaze with light but this went unnoticed by the couple kissing in the back of the car.", "An intergalactic manhunt for a mass murderer: you. Only thing is, you're innocent, and didn't think aliens existed.",
		"A scientist discovers that a distant star cluster is actually a system of satellites. Who put them there and why?", "The Earth becomes so polluted that the atmosphere starts to block the sun out. How will they survive?", 
		"Shona had never seen it so dark. Normally there'd be at least a few stars shining in the galaxy but not tonight.", "AI overlords took charge 20 years ago, on the day you were born. You discover an anti-AI leaflet your parents kept.",
		"Four playwrights are abducted by aliens and must use their talents to entertain their captives and stay alive.", "Every day, the strength of Earth's gravity increases by 1%. Sam keeps a diary as the world ends around her.",
		"The daughter of a brilliant quantum physicist gets sucked into her mother's latest top secret experiment.", "The development of artificial intelligence has left the world void of faces. What were they? Where did they go?",
		"2030: the world's oil has dried up. The UK dregs up not only steam and horse power but the old social order.", "He had never woken up in the middle of an impact crater before.", 
		"How does one know if a robot has actually learnt to love, and how does one go about proving it?", "At the fairground, a child begs to go on a carousel... when the ride stops, they find themselves in World War Two.", 
		"How will London's transport system look in 50 years time?", "In the future, it is possible to communicate instantly with everyone on Earth. Why does this cause problems?", "To see if they are mentally fit to colonize Mars, a commercial space mogul runs psychological tests on millennials."];
	var pArray = fArray.concat(hArray, mArray, rArray, sfArray);
var fRand = fArray[Math.floor(Math.random() * fArray.length)];
var hRand = hArray[Math.floor(Math.random() * hArray.length)];
var mRand = mArray[Math.floor(Math.random() * mArray.length)];
var rRand = rArray[Math.floor(Math.random() * rArray.length)];
var sfRand = sfArray[Math.floor(Math.random() * sfArray.length)];
var pRand = pArray[Math.floor(Math.random() * pArray.length)];
        args = args.splice(1);
        switch(cmd) {
		// --------------------------------------------------Commands--------------------------------------
            // !promptFantasy
            case 'Fantasy':
                bot.sendMessage({
                    to: channelID,
			message: fRand
                });
            break;
	    case 'fantasy':
                bot.sendMessage({
                    to: channelID,
			message: fRand
                });
            break;
	// !promptHorror
            case 'Horror' :
		bot.sendMessage({
		    to: channelID,
			message: hRand
		});
	    break;
	    case 'horror' :
		bot.sendMessage({
		    to: channelID,
			message: hRand
		});
	    break;
		case 'Mystery':
                bot.sendMessage({
                    to: channelID,
			message: mRand
                });
            break;
		case 'mystery':
                bot.sendMessage({
                    to: channelID,
			message: mRand
                });
            break;
		case 'Romance':
                bot.sendMessage({
                    to: channelID,
			message: rRand
                });
            break;
		case 'romance':
                bot.sendMessage({
                    to: channelID,
			message: rRand
                });
            break;
		case 'Sci-fi':
                bot.sendMessage({
                    to: channelID,
			message: sfRand
                });
            break;
		case 'sci-fi':
                bot.sendMessage({
                    to: channelID,
			message: sfRand
                });
            break;
		case 'Prompt':
                bot.sendMessage({
                    to: channelID,
			message: pRand
                });
            break;
		case 'prompt':
                bot.sendMessage({
                    to: channelID,
			message: pRand
                });
            break;
		case 'commands':
                bot.sendMessage({
                    to: channelID,
			message: 'These are my commands: \n !Fantasy - gives a fantasy writing prompt \n !Horror - gives a horror writing prompt \n !Mystery - gives a mystery writing prompt \n !Romance - gives a romance writing prompt \n !Sci-fi - gives a sci-fi writing prompt \n !Prompt - gives a random writing prompt (From the genres above) \n !commands - lists my commands'
                });
            break;
         }
     }
});