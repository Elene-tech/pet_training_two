/* PET Training — Test 2 data (original texts) */
window.PET_TEST = {
  id: 't2', title: 'Preliminary Test 2', names: ['Татьяна', 'Тимофей'],
  reading: {
    p1: {
      rubric: 'For each question, choose the correct answer.',
      items: [
        { n: 1, kind: 'notice', title: 'Greenfield Library', lines: ['From Monday, you can return books to the box by the front door at any time – even when we are closed.', 'Books kept for more than three weeks still cost 20p a day.'],
          opts: [['A', 'The library is now open for longer hours.'], ['B', 'Books can be returned when the library is shut.'], ['C', 'Borrowers no longer have to pay late charges.']], ans: 'B',
          why: 'Книги можно сдать в ящик у двери в любое время, «even when we are closed». Штраф за просрочку сохраняется (C неверно), часы работы не менялись (A неверно).' },
        { n: 2, kind: 'sms', from: 'Leo', lines: ['Hi Rosa,', 'Football practice on Thursday is cancelled because the coach is ill. We’re going to meet at the park on Saturday morning instead. Bring your boots!'],
          q: 'Leo is writing to', opts: [['A', 'tell Rosa about a change of plan.'], ['B', 'ask Rosa to find a new coach.'], ['C', 'check that Rosa can play on Thursday.']], ans: 'A',
          why: 'Тренировку отменили и перенесли на субботу — это изменение плана. Rosa ничего искать не просят, а в четверг тренировки уже не будет.' },
        { n: 3, kind: 'notice', title: 'Café Luna', lines: ['Students get 15% off any hot drink with a valid student card.', 'Monday – Thursday, before 4 p.m.'],
          opts: [['A', 'The discount is only available at the weekend.'], ['B', 'Students pay less for tea or coffee at certain times.'], ['C', 'All drinks are cheaper for everyone before 4 p.m.']], ans: 'B',
          why: 'Скидка только для студентов, на горячие напитки, в определённые дни и часы. Выходные не упомянуты, скидка не для всех.' },
        { n: 4, kind: 'email', from: 'Ms Hughes', to: 'Photography Club', subject: 'Exhibition', lines: ['Our photography exhibition has moved from the school hall to Room 12 because the hall is being painted.', 'The time is the same – 5 p.m. on Friday. Please tell your families.'],
          opts: [['A', 'The exhibition will start earlier than planned.'], ['B', 'The exhibition will take place in a different room.'], ['C', 'Families are not allowed to come.']], ans: 'B',
          why: '«Has moved from the school hall to Room 12» = другое помещение. Время то же; семьи, наоборот, приглашают.' },
        { n: 5, kind: 'sms', from: 'Ella', lines: ['Hi Mum,', 'I’m at Grandpa’s. He’s made a big lunch, so I won’t need anything to eat when I get home. Could you pick me up at 6 instead of 5? Thanks!'],
          q: 'Ella is texting to', opts: [['A', 'ask her mother to collect her later.'], ['B', 'say she wants to stay at her grandfather’s all night.'], ['C', 'complain about the food at Grandpa’s.']], ans: 'A',
          why: '«Could you pick me up at 6 instead of 5?» — просьба забрать позже. Про ночёвку и жалобы в тексте ничего нет.' }
      ]
    },
    p2: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Day trips',
      intro: 'The people below all want to go on a day trip. On the right there are descriptions of eight places to visit. Decide which place would be the most suitable for each person.',
      listTitle: 'Places to visit',
      people: [
        { n: 6, name: 'Hanna', text: 'Hanna loves history and wants to see something really old. She would like a guided tour so that she can ask questions.', ans: 'A', why: 'Castle Hill Tours: старинный замок и гид, который отвечает на вопросы. В Old Town Walk (H) нет гидов — только аудиоприложение.' },
        { n: 7, name: 'Marek', text: 'Marek enjoys science and would like to try experiments himself, not just look at things.', ans: 'B', why: 'Discovery Lab: «hands-on», опыты делают сами. В Maritime Museum (F) модели стоят за стеклом.' },
        { n: 8, name: 'Irina', text: 'Irina’s little brother loves animals. She wants a place where he can see animals up close and feed some of them.', ans: 'C', why: 'Little Farm Park: дети кормят коз и кроликов. В City Zoo (G) кормить животных нельзя.' },
        { n: 9, name: 'Tomás', text: 'Tomás is keen on art. He would like to see paintings by local artists and then try painting himself.', ans: 'D', why: 'Gallery & Studio: картины местных художников + мастер-класс, где можно рисовать самому.' },
        { n: 10, name: 'Zuzana', text: 'Zuzana likes being outside and wants an exciting activity, but she has never tried anything like climbing before.', ans: 'E', why: 'Sky Adventure Park: верёвочные трассы для новичков с инструкторами.' }
      ],
      texts: [
        { L: 'A', title: 'Castle Hill Tours', text: 'Visit our 900-year-old castle with an expert guide. The tours last one hour, and the guides are happy to answer all your questions about life in the Middle Ages.' },
        { L: 'B', title: 'Discovery Lab', text: 'A science centre where visitors do the experiments themselves! Build a small rocket, make slime or test how electricity works. Staff are always there to help.' },
        { L: 'C', title: 'Little Farm Park', text: 'Children can stroke the rabbits, feed the goats and watch the baby chicks. Bags of animal food are sold at the entrance. Open every day from April to October.' },
        { L: 'D', title: 'Gallery & Studio', text: 'Enjoy a collection of paintings by artists from our region, then join a workshop in the studio, where you can paint your own picture. All materials are provided.' },
        { L: 'E', title: 'Sky Adventure Park', text: 'Climb, swing and fly along high rope courses among the trees. There are routes for complete beginners, and every visitor gets training and safety equipment from an instructor.' },
        { L: 'F', title: 'Maritime Museum', text: 'Discover the history of ships and sailors through beautiful models and old maps. Everything is behind glass, but there are short films in every room.' },
        { L: 'G', title: 'City Zoo', text: 'See lions, monkeys and elephants from all over the world. Visitors watch the animals from a distance, and feeding them is not allowed.' },
        { L: 'H', title: 'Old Town Walk', text: 'Download our free app and follow the audio route through the narrow streets of the old town at your own pace. There are no guides, but the information is excellent.' }
      ]
    },
    p3: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Tom Fielding’s bike shop',
      intro: 'Reporter Kate Ross writes about Tom Fielding, who left a job in a bank to open a bicycle repair shop.',
      paras: [
        'Until he was thirty, Tom Fielding worked in an office in London, helping a bank to deal with customers’ complaints. He was good at his job and earned plenty of money, but he went home tired every evening. What he really enjoyed was cycling to work every morning and fixing his old bike at weekends. ‘My flat was always full of wheels and chains,’ he laughs. ‘My neighbours thought I was mad.’',
        'One Saturday, a neighbour asked him to mend her daughter’s bike. Soon other people were knocking on his door. Tom realised that nobody in the area could repair bikes quickly and cheaply, and for the first time in years he felt excited about work. He decided to leave the bank, but it wasn’t an easy decision. ‘My parents were worried,’ he says. ‘They thought I was giving up a safe job for something that might not work.’',
        'Three years later, Tom’s shop, Spoke & Coffee, has become a popular meeting place. Customers can have their bikes repaired while they drink coffee, and on Sunday afternoons Tom teaches beginners how to look after their bikes. The shop is small and he works long hours, but he says he has never regretted his choice. ‘I earn less than before, but I wake up looking forward to the day.’',
        'Tom has just employed his first assistant, a seventeen-year-old called Ruby. ‘I want to give young people the chance I never had,’ he says. ‘Learning to repair things is a skill that will always be useful.’'
      ],
      qs: [
        { n: 11, q: 'What did Tom like doing while he had his office job?', opts: [['A', 'Helping unhappy customers'], ['B', 'Chatting to his neighbours'], ['C', 'Working on bicycles in his free time'], ['D', 'Earning a lot of money']], ans: 'C', why: '«What he really enjoyed was cycling… and fixing his old bike at weekends.» Деньги у него были, но радости они не приносили.' },
        { n: 12, q: 'Why did Tom decide to leave the bank?', opts: [['A', 'He lost his job.'], ['B', 'A neighbour offered him a better job.'], ['C', 'He found that people needed a bike repair service.'], ['D', 'His parents gave him the money to start a business.']], ans: 'C', why: '«Nobody in the area could repair bikes quickly and cheaply» — он увидел потребность и заинтересовался.' },
        { n: 13, q: 'How did Tom’s parents feel about his decision?', opts: [['A', 'They were proud of him.'], ['B', 'They were worried about his future.'], ['C', 'They wanted to help him.'], ['D', 'They were surprised he had waited so long.']], ans: 'B', why: '«My parents were worried… giving up a safe job.»' },
        { n: 14, q: 'What does Tom say about his life now?', opts: [['A', 'He earns more money than he did at the bank.'], ['B', 'He is happier even though he earns less.'], ['C', 'He wishes he had opened the shop earlier.'], ['D', 'He finds the work too tiring.']], ans: 'B', why: '«I earn less than before, but I wake up looking forward to the day.»' },
        { n: 15, q: 'What would Tom say on his website?', boxes: true, opts: [['A', 'Come and learn how to look after your bike – no experience needed.'], ['B', 'I’ve always known that I wanted to run my own business.'], ['C', 'Our shop sells the cheapest bicycles in the city.'], ['D', 'I’m planning to open ten more shops next year.']], ans: 'A', why: 'По воскресеньям Том учит новичков ухаживать за велосипедом (третий абзац).' }
      ]
    },
    p4: {
      rubric: 'Five sentences have been removed from the text below. For each question, choose the correct answer. There are three extra sentences which you do not need to use.',
      title: 'Learning to surf at sixty-two',
      paras: [
        ['When Helen Barker retired from her job as a bus driver at the age of sixty-two, she expected to spend her days gardening and reading. ', 16, ' But one rainy afternoon, she saw a group of teenagers on the beach carrying brightly coloured boards, and she stopped to watch them.'],
        ['The teenagers were members of a local surf club. ‘They were falling into the water every few seconds, and laughing,’ Helen remembers. ', 17, ' She walked up to the club’s coach and asked if she was too old to learn.'],
        ['‘To my surprise, he said nobody was too old, as long as they could swim,’ she says. ', 18, ' At first, she spent more time under the water than on the board, and her family thought she was crazy.'],
        ['However, after three months, Helen stood up on a wave for the first time. ', 19, ' ‘It was the happiest moment of my year,’ she says.'],
        ['Today, Helen goes surfing four times a week, and she has started a free class for people over fifty. ', 20, ' ‘I wish I’d started earlier,’ she says, ‘but better late than never.’']
      ],
      sentences: [
        ['A', 'She had never done any kind of sport in her life.'],
        ['B', 'It looked like the most fun she had seen in years.'],
        ['C', 'Helen has never learned to swim.'],
        ['D', 'She bought a second-hand board the very next day.'],
        ['E', 'The club was closing at the end of the summer.'],
        ['F', 'Her whole family was on the beach, cheering and taking photos.'],
        ['G', 'Her husband prefers to stay at home and read.'],
        ['H', 'She says the oldest student so far is seventy-eight.']
      ],
      keys: { 16: 'A', 17: 'B', 18: 'D', 19: 'F', 20: 'H' },
      why: {
        16: '«expected… gardening and reading» → «never done any sport» (A) → «But one rainy afternoon…» — контраст с неожиданным интересом.',
        17: '«They were falling… and laughing» → «It looked like the most fun…» (B) → «She walked up to the coach».',
        18: 'Тренер сказал, что возраст не помеха → «bought a board the very next day» (D) → «At first, she spent more time under the water…».',
        19: '«Helen stood up on a wave for the first time» → семья на пляже радуется (F) → «the happiest moment».',
        20: 'Бесплатный курс для людей старше 50 → самому старшему ученику 78 лет (H). C противоречит словам тренера «as long as they could swim».'
      }
    },
    p5: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Living on the water',
      paras: [
        ['Every morning, Chloe wakes up to the sound of ducks outside her window. She lives on a narrow boat on a canal in Birmingham, and she ', 21, ' it two years ago with money she had saved, after getting tired of paying high rent for a small flat.'],
        ['Life on a boat is not always easy. In winter it can be very cold, so she has to ', 22, ' the stove burning all day. She also has to be ', 23, ' with water, because the boat has only a small tank. Moving the boat takes ', 24, ' time too, as narrow boats travel at the speed of a person walking.'],
        ['However, Chloe says the best thing is the sense of freedom. When she wants a change of view, she simply moves to a ', 25, ' place. ‘You soon get used ', 26, ' the slow pace of life,’ she says, ‘and then you never want to go back.’']
      ],
      qs: [
        { n: 21, opts: [['A', 'sold'], ['B', 'won'], ['C', 'lent'], ['D', 'bought']], ans: 'D', why: 'Контекст: «with money she had saved» и «paying rent… for a flat» — она купила лодку (<i>bought</i>).' },
        { n: 22, opts: [['A', 'hold'], ['B', 'keep'], ['C', 'stay'], ['D', 'make']], ans: 'B', why: '<i>keep something burning</i> — «поддерживать горение». Остальные глаголы так не строятся.' },
        { n: 23, opts: [['A', 'gentle'], ['B', 'kind'], ['C', 'careful'], ['D', 'polite']], ans: 'C', why: '<i>be careful with</i> — «бережно обращаться с чем-то».' },
        { n: 24, opts: [['A', 'many'], ['B', 'much'], ['C', 'long'], ['D', 'lot']], ans: 'B', why: '<i>time</i> — неисчисляемое, поэтому <i>much time</i>. <i>Many</i> — для исчисляемых, <i>a lot</i> требует <i>of</i>.' },
        { n: 25, opts: [['A', 'different'], ['B', 'another'], ['C', 'other'], ['D', 'else']], ans: 'A', why: 'После артикля <i>a</i> подходит только прилагательное: <i>a different place</i>. <i>A another</i> — ошибка.' },
        { n: 26, opts: [['A', 'on'], ['B', 'at'], ['C', 'to'], ['D', 'with']], ans: 'C', why: '<i>get used to</i> + существительное — «привыкнуть к чему-то».' }
      ]
    },
    p6: {
      rubric: 'For each question, write the correct answer. Write one word for each gap.',
      title: 'A postcard from Portugal',
      paras: [
        ['Hi Jakub,'],
        ['Greetings from Portugal! We arrived ', 27, ' Saturday and the weather has been wonderful so far. Our hotel is only two minutes’ walk from ', 28, ' beach, and I swim every morning before breakfast.'],
        ['Yesterday we went on a boat trip along the coast. The guide ', 29, ' us about the animals that live in the area, and we even saw some dolphins! I took lots of photos, ', 30, ' I’ll show you when I get home.'],
        ['I’m looking forward ', 31, ' seeing you again. Maybe we can meet ', 32, ' the weekend and I’ll give you your present.'],
        ['Best wishes,'], ['Oliver']
      ],
      qs: [
        { n: 27, accept: ['on'], why: 'Дни недели: <i>on Saturday</i>.' },
        { n: 28, accept: ['the'], why: 'Конкретный пляж у отеля — определённый артикль: <i>the beach</i>.' },
        { n: 29, accept: ['told', 'taught'], why: 'Прошедшее время: <i>The guide told us about…</i> (рассказал нам).' },
        { n: 30, accept: ['which'], why: 'Неопределительное придаточное, после запятой: <i>photos, which I’ll show you</i>. Здесь <i>that</i> не подходит.' },
        { n: 31, accept: ['to'], why: '<i>look forward to</i> + -ing — «с нетерпением ждать».' },
        { n: 32, accept: ['at'], why: 'Устойчивое: <i>at the weekend</i> (британский английский).' }
      ]
    }
  },

  writing: {
    w1: {
      rubric: 'You must answer this question. Write your answer in about 100 words.',
      intro: 'Read this email from your English-speaking friend Jamie and the notes you have made.',
      email: {
        from: 'Jamie', subject: 'My visit next week',
        paras: [
          { t: 'Hi,' },
          { t: 'I’m coming to visit you next week! Do you think we should go to the new shopping centre on Saturday?', note: 'No, but …' },
          { t: 'What’s the weather usually like in your town at this time of year?', note: 'Tell Jamie …' },
          { t: 'My dad says a hotel is too expensive. Where can I stay?', note: 'Suggest …' },
          { t: 'Could you meet me at the station at two o’clock on Friday?', note: 'Sorry …' },
          { t: 'Let me know.' }, { t: 'Jamie' }
        ]
      },
      task: 'Write your email to Jamie.',
      checklist: ['Я ответил(а) на ВСЕ 4 заметки: No, but… / Tell Jamie… / Suggest… / Sorry…', 'Есть приветствие (Hi Jamie,) и прощание (See you soon, / Best wishes,)', 'Объём ≈ 100 слов (90–120)', 'Связки: but, because, so, and, also, instead', 'Проверил(а) времена, артикли и окончание -s у глаголов'],
      model: 'Hi Jamie,\nGreat news that you’re coming! I’m afraid the new shopping centre is too crowded on Saturdays, but we could visit the town museum instead and go shopping on Sunday.\nThe weather here is usually mild and rainy at this time of year, so please bring a warm jacket and an umbrella.\nAbout the hotel, I suggest you stay with us – my parents have a spare room and they’d be happy to see you.\nI’m really sorry, but I can’t meet you at two on Friday because I have football practice. Could we meet at four instead?\nSee you soon,\nMarta'
    },
    w2: {
      rubric: 'Choose one of these questions. Write your answer in about 100 words.',
      q2: {
        head: 'Articles wanted!', title: 'The best way to learn English', lines: ['Do you learn best at school, online, with friends or in another way?', 'What would you advise other students to do?'], foot: 'Write us an article telling us what you think. The best one will win a prize!',
        checklist: ['Есть цепляющее начало (вопрос или яркая фраза)', 'Я ответил(а) на ОБА вопроса из объявления', 'Есть моё мнение и пример (for example…)', 'Связки: however, also, because, in my opinion', 'Заканчивается советом читателю', 'Объём ≈ 100 слов (90–120)'],
        model: 'Many people ask me how I learnt English. In my opinion, there isn’t one best way, but the most useful method is to enjoy the language. At school I had lessons twice a week, and they were helpful because my teacher corrected my mistakes. However, I learnt much more from watching series with English subtitles and chatting online with friends from other countries.\nAlso, reading short stories is a good way to learn new words. My advice is to mix lessons with fun activities. If you do something in English every day, even for twenty minutes, you’ll soon see the progress!'
      },
      q3: {
        text: 'Your English teacher has asked you to write a story. Your story must begin with this sentence.', first: 'Ben looked at the clock and realised that he was going to be late.',
        checklist: ['Первое предложение написано ТОЧНО как в задании', 'Есть начало — событие — развязка', 'Использованы Past Simple, Past Continuous и Past Perfect', 'Слова-последовательности: suddenly, then, after that, in the end', 'Описаны чувства героя (He felt… / He was worried)', 'Объём ≈ 100 слов (90–120)'],
        model: 'Ben looked at the clock and realised that he was going to be late. His exam started in twenty minutes, and the bus still hadn’t arrived. He decided to run.\nSuddenly, it started to rain and his bag became very heavy. At the corner, an old man stopped his car and asked, ‘Do you need a lift?’ Ben was surprised, but he said yes. They arrived five minutes early. ‘Good luck!’ said the man. Ben thanked him and hurried into the hall. Later he found out that the man was his new maths teacher!'
      }
    }
  },

  speaking: {
    p1: [
      { q: 'Tell me about the place where you live – is it a house or a flat, and what is it like inside?', more: 'What would your perfect home look like?' },
      { q: 'Who do you spend most of your time with at home, and what do you do together?', more: 'Do you ever disagree about what to do?' },
      { q: 'How often do you use your phone during the day, and what do you use it for?', more: 'Do you think people your age depend on their phones too much?' },
      { q: 'Tell me about a shop or a market that you like going to.', more: 'Do you prefer shopping online or in shops? Why?' },
      { q: 'What do you do to stay healthy and fit?', more: 'What is the hardest thing about keeping healthy habits?' },
      { q: 'Describe a day at school or work that you remember well.', more: 'Why do you remember it?' },
      { q: 'What kind of films or series do you enjoy, and why?', more: 'Do you prefer watching at the cinema or at home?' },
      { q: 'How do you usually get to places in your town or city?', more: 'How could transport in your town be improved?' },
      { q: 'Tell me about a celebration or holiday that is important in your family.', more: 'How has the way you celebrate it changed over the years?' },
      { q: 'What is the most interesting thing you have done in the last month?', more: 'Would you do it again?' },
      { q: 'Which part of English is hardest for you – speaking, listening, reading or writing?', more: 'What do you do to improve it?' },
      { q: 'If you could change one thing about your daily life, what would it be?', more: 'How would that make a difference?' }
    ],
    rounds: [
      {
        theme: 'Jobs: care and construction',
        A: { img: 'assets/img/speaking/vet.jpg', alt: 'A vet examining a small dog with a stethoscope', prompts: ['What is the man doing?', 'Where might he be?', 'What qualities does he need for this job?'], ask: 'Timofey, would you like to work with animals? Why / why not?',
          model: 'In this photo I can see a vet examining a small dog. He’s wearing blue medical clothes and gloves, and he’s listening to the dog’s heart with a stethoscope. The dog looks a bit nervous, but it’s staying still, so I think it trusts him. They’re in a clinic, and there are some papers on the table, so he may be writing notes about the dog’s health. I think a vet has to be patient and kind to work with animals. It might be a difficult job sometimes, but it must feel good to help animals get better, and he looks happy at work.' },
        B: { img: 'assets/img/speaking/construction.jpg', alt: 'A group of builders in hard hats having a meeting on a building site', prompts: ['Where are the people?', 'What are they doing?', 'Why might meetings like this be important?'], ask: 'Tatiana, would you like to work on a building site? Why / why not?',
          model: 'This picture shows four people on a building site. They’re all wearing hard hats, and the man who’s standing is wearing a bright orange safety vest. He seems to be explaining something, perhaps a plan, because he’s holding a piece of paper. The other three are sitting and listening carefully, and two of them are taking notes. I think they’re a team of builders or engineers, and they’re having a meeting before they start work. The walls behind them aren’t finished, so the building is still under construction. It looks like a job that needs a lot of cooperation and safety rules.' },
        p4: [
          { q: 'Which is more important in a job: a high salary or enjoying the work? Why?', ideas: ['money', 'motivation', 'stress', 'free time'] },
          { q: 'What qualities does a person need to work with animals?', ideas: ['patience', 'kindness', 'knowledge', 'staying calm'] },
          { q: 'Would you prefer to work in a team or on your own? Why?', ideas: ['ideas', 'responsibility', 'communication', 'speed'] },
          { q: 'Some jobs, like building work, are dangerous. Should these workers be paid more? Why?', ideas: ['risk', 'training', 'safety rules', 'fairness'] },
          { q: 'Is it better to follow a family tradition or to choose your own job?', ideas: ['pressure', 'experience', 'freedom', 'happiness'] },
          { q: 'Would you like to work in the same place all your life? Why / why not?', ideas: ['security', 'boredom', 'change', 'promotion'] }
        ]
      },
      {
        theme: 'Jobs: school and farm',
        A: { img: 'assets/img/speaking/classroom.jpg', alt: 'A teacher in a primary school classroom with pupils raising their hands', prompts: ['Where is this?', 'What is happening in the lesson?', 'How do you think the pupils feel?'], ask: 'Timofey, do you think teaching is a difficult job? Why?',
          model: 'In this photo there’s a teacher in a primary school classroom. She’s standing at the front, smiling, and many children are putting their hands up, so I think she has asked a question and they all want to answer. The children are wearing white shirts, which could be their school uniform. On the walls there are colourful posters and the word “science”, so perhaps it’s a science lesson. The atmosphere seems friendly, and the pupils look interested. I think the teacher must be very good at her job, because the children are so active. It must be tiring to teach every day, but also rewarding.' },
        B: { img: 'assets/img/speaking/farm.jpg', alt: 'Workers picking cabbages in a large field', prompts: ['What kind of work are the people doing?', 'What is the weather like?', 'Why might someone choose this job?'], ask: 'Tatiana, would you like to work outdoors? Why / why not?',
          model: 'This picture shows people working in a big field of cabbages. In the middle, a man is kneeling next to a plant and looking at the camera. He’s wearing a straw hat, rubber boots and blue gloves. Behind him there are two more workers who are picking vegetables, and the box next to him is already full. It seems to be a warm and sunny day, because they’re all wearing hats. I think it’s hard physical work, because they have to bend over for hours. On the other hand, they’re outdoors in the fresh air, and the man seems quite proud of his harvest.' },
        p4: [
          { q: 'What makes a good teacher? Think about a teacher you remember.', ideas: ['patience', 'explaining', 'humour', 'fairness'] },
          { q: 'Why do you think fewer young people want to work on farms these days?', ideas: ['hard work', 'low pay', 'cities', 'technology'] },
          { q: 'How can schools prepare students for real jobs?', ideas: ['work experience', 'skills', 'projects', 'careers advice'] },
          { q: 'Would you prefer to work in a city or in the countryside? Why?', ideas: ['opportunities', 'quiet', 'cost of living', 'nature'] },
          { q: 'Which jobs might disappear in the future because of technology? Why?', ideas: ['robots', 'artificial intelligence', 'factories', 'new jobs'] },
          { q: 'What kind of part-time job or work experience would be useful for teenagers?', ideas: ['responsibility', 'money', 'skills', 'time for study'] }
        ]
      }
    ]
  }
};
