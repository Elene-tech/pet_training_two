/* PET Training — Test 1 data (original texts) */
window.PET_TEST = {
  id: 't1', title: 'Preliminary Test 1', names: ['Татьяна', 'Тимофей'],
  reading: {
    p1: {
      rubric: 'For each question, choose the correct answer.',
      items: [
        { n: 1, kind: 'notice', title: 'Riverside Sports Centre', lines: ['The swimming pool is closed on Saturday morning for cleaning.', 'It will reopen at 1 p.m.', 'The gym and café are open as usual.'],
          opts: [['A', 'The gym will not be open on Saturday.'], ['B', 'The pool can be used on Saturday afternoon.'], ['C', 'The café will close early on Saturday.']], ans: 'B',
          why: 'Бассейн закрыт только утром, с 13:00 он снова работает. Тренажёрный зал и кафе работают как обычно.' },
        { n: 2, kind: 'sms', from: 'Ana', lines: ['Hi Dan,', 'Sorry – I forgot to bring your laptop charger today. I’ll give it back to you before the first lesson tomorrow. Could you borrow one from the library until then?'],
          q: 'Ana is writing to', opts: [['A', 'say sorry for not bringing something.'], ['B', 'ask Dan to lend her a charger.'], ['C', 'suggest where Dan can buy a charger.']], ans: 'A',
          why: 'Главная цель сообщения — извиниться («Sorry – I forgot…»). Библиотека упомянута только как временное решение.' },
        { n: 3, kind: 'notice', title: 'Lost Property', lines: ['Please ask at reception.', 'Anything that is not collected within 30 days will be given to charity.'],
          opts: [['A', 'Visitors must leave lost items at reception.'], ['B', 'Items nobody collects are given away after a month.'], ['C', 'Charity workers collect lost items every 30 days.']], ans: 'B',
          why: '«Not collected within 30 days» = «nobody collects after a month»; «given to charity» = «given away».' },
        { n: 4, kind: 'email', from: 'Mrs Carter', to: 'Year 10 students', subject: 'Museum trip', lines: ['Thank you to everyone who has returned their permission form. Five forms are still missing, so please give yours to me by Wednesday.', 'Students without a form can’t come to the museum on Friday.'],
          opts: [['A', 'Some students may not be allowed to go on the trip.'], ['B', 'The museum visit has been moved to Wednesday.'], ['C', 'Students must pay for the trip by Friday.']], ans: 'A',
          why: 'Нет формы — нельзя ехать («can’t come»). Среда — это срок сдачи формы, а не день поездки; про оплату ничего нет.' },
        { n: 5, kind: 'sms', from: 'Jess', lines: ['Hey Tom!', 'Great news – I’ve got two tickets for the concert on the 14th! My dad says he’ll drive us, but we have to be home by 11. Want to come?'],
          q: 'Jess is texting to', opts: [['A', 'change a plan they have made.'], ['B', 'invite Tom to an event.'], ['C', 'ask Tom for a lift.']], ans: 'B',
          why: '«Want to come?» — это приглашение. Отец Джесс сам предлагает подвезти, так что просьбы о поездке нет.' }
      ]
    },
    p2: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Clubs at the community centre',
      intro: 'The people below all want to join a club in their free time. On the right there are descriptions of eight clubs. Decide which club would be the most suitable for each person.',
      listTitle: 'Clubs',
      people: [
        { n: 6, name: 'Marta', text: 'Marta loves animals and wants to do something useful in her free time. She would like to learn how to look after pets while helping real animals.', ans: 'A', why: 'Paws & Friends: волонтёрство в приюте + обучение уходу за животными. Animal Facts Club (G) — только лекции, контакта с животными нет.' },
        { n: 7, name: 'Oleg', text: 'Oleg is interested in technology and would like to make his own computer game. He is a beginner, so he wants to work with other people and have a teacher to help him.', ans: 'B', why: 'Game Makers: маленькие группы, преподаватель, опыт не нужен. Code Lab (H) — для тех, кто уже умеет программировать, и работа в одиночку.' },
        { n: 8, name: 'Sofia', text: 'Sofia enjoys performing and would love to learn to sing. She can’t read music and is only free at weekends.', ans: 'C', why: 'Weekend Voices: воскресенье, не нужно читать ноты, новичкам можно, есть выступление.' },
        { n: 9, name: 'Pavel', text: 'Pavel likes being outdoors and wants to get fitter. He doesn’t enjoy team sports or competitions, but he would like to meet people with similar interests.', ans: 'D', why: 'Green Trails: прогулки и велопоездки, «not a race», знакомства. Football Stars (F) — командный спорт и соревнования.' },
        { n: 10, name: 'Nina', text: 'Nina wants to get better at photography. She has her own camera and would like other people to see her pictures.', ans: 'E', why: 'Lens Club: своя камера, практические советы и выставка фото в библиотеке.' }
      ],
      texts: [
        { L: 'A', title: 'Paws & Friends', text: 'Volunteers help at the town animal shelter every Saturday. You’ll feed and walk the dogs and learn how to look after cats and rabbits. A trained member of staff will show you what to do. Ages 13 and over.' },
        { L: 'B', title: 'Game Makers', text: 'Have you always wanted to create your own computer game? In small groups of six, you’ll design and build a simple game, step by step. Our teacher will help you, and no experience is needed. Thursday evenings.' },
        { L: 'C', title: 'Weekend Voices', text: 'Come and sing with us on Sunday mornings! We learn songs by listening and repeating, so you don’t need to read music. Beginners are welcome, and we perform at the town festival in June.' },
        { L: 'D', title: 'Green Trails', text: 'Join our friendly group for walks and bike rides in the hills every other Sunday. It’s not a race – we go at a comfortable speed and stop for a picnic. A great way to get fit and meet new people.' },
        { L: 'E', title: 'Lens Club', text: 'Bring your camera and learn how to take better pictures! We meet twice a month for practical advice, and every spring there is an exhibition of members’ photos at the town library.' },
        { L: 'F', title: 'Football Stars', text: 'Our team trains on Tuesdays and Fridays and plays matches against other schools at weekends. New players must be able to run fast and enjoy competing.' },
        { L: 'G', title: 'Animal Facts Club', text: 'Watch films and listen to talks about wild animals from all over the world. Meetings take place in a classroom. There is no contact with real animals, but you’ll learn a lot.' },
        { L: 'H', title: 'Code Lab', text: 'For students who already know how to program. Members work alone on advanced projects and meet once a month to compare results. Please bring your own laptop.' }
      ]
    },
    p3: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Inventor Maya Ellis',
      intro: 'Reporter Chris Hale writes about Maya Ellis, a young engineer who is working on a way to stop plastic from reaching the sea.',
      paras: [
        'When Maya Ellis was nine, she spent every summer weekend at her grandfather’s small house by the sea. He was a retired fisherman who liked to walk along the beach early in the morning, and Maya often went with him. He always carried a bag and picked up pieces of plastic that the waves had left behind. At first, Maya thought this was strange, because her parents never did anything like that in the city, but soon she began to join in. By the end of the summer, they were competing to see who could fill their bag first. Her school friends laughed when she told them about it, and for a while she nearly gave up. ‘My grandfather said that what matters is how the beach looks tomorrow morning, not what other people think,’ she says.',
        'At fifteen, Maya saw a video about how much plastic travels down rivers, and she realised that collecting it on beaches was too late. She began to draw a floating barrier that could catch rubbish before it reached the sea. Her science teacher encouraged her to enter a national competition. She didn’t win, but a local engineering company noticed her idea and offered to help her build a test version.',
        'Now nineteen, Maya studies engineering at university and works part-time for the company. Her barriers are being tested on two rivers. ‘It’s slower than I expected,’ she admits. ‘Every river is different, so what works in one place often doesn’t work in the next.’ Still, she isn’t discouraged, and she says some of her best ideas come while she is walking beside the water.',
        'Maya also visits schools to talk to younger students. ‘I don’t tell them to change the world,’ she says. ‘I just ask them to notice one thing that bothers them and try to fix a small part of it.’'
      ],
      qs: [
        { n: 11, q: 'What first made Maya start collecting rubbish?', opts: [['A', 'Her parents asked her to help.'], ['B', 'She wanted to win a prize.'], ['C', 'She copied what her grandfather did.'], ['D', 'A teacher told her about the problem.']], ans: 'C', why: 'Дедушка всегда собирал пластик на пляже, Майя сначала удивлялась, но «began to join in». Родители такого не делали.' },
        { n: 12, q: 'Why did Maya nearly stop?', opts: [['A', 'She found the work boring.'], ['B', 'Her friends made fun of her.'], ['C', 'Her grandfather became ill.'], ['D', 'She had to go back to the city.']], ans: 'B', why: '«Her school friends laughed when she told them… she nearly gave up» = друзья смеялись над ней.' },
        { n: 13, q: 'What happened after Maya entered the competition?', opts: [['A', 'She won money to build her barrier.'], ['B', 'Her teacher built a test version for her.'], ['C', 'A company offered to help her.'], ['D', 'A newspaper wrote about her idea.']], ans: 'C', why: '«She didn’t win, but a local engineering company… offered to help her build a test version.»' },
        { n: 14, q: 'What does Maya say about her work now?', opts: [['A', 'Everything is going faster than she hoped.'], ['B', 'It is harder than she expected because each river is different.'], ['C', 'Her barrier works well in all rivers.'], ['D', 'She is thinking of giving it up.']], ans: 'B', why: '«It’s slower than I expected… Every river is different.» Она не обескуражена, так что D неверно.' },
        { n: 15, q: 'What would Maya say on her blog?', boxes: true, opts: [['A', 'I’m sure my invention will clean every river in the world within five years.'], ['B', 'You don’t need to be an expert – just pick one small problem near you and try to fix it.'], ['C', 'The best part of my job is travelling round the world to meet other inventors.'], ['D', 'I wish I’d listened to my friends and chosen a more ordinary hobby.']], ans: 'B', why: 'В конце она советует школьникам заметить одну проблему и исправить её маленькую часть.' }
      ]
    },
    p4: {
      rubric: 'Five sentences have been removed from the text below. For each question, choose the correct answer. There are three extra sentences which you do not need to use.',
      title: 'Recipes from the village',
      paras: [
        ['Sixteen-year-old Lucía Moreno never planned to be a cook. Last winter, she was helping her grandmother tidy the kitchen when she noticed an old box on the top shelf. ', 16, ' Inside, Lucía found dozens of handwritten recipes, some of them nearly a hundred years old.'],
        ['Her grandmother explained that many of the dishes were no longer made in the village. ', 17, ' Lucía decided she wanted to change that. She started visiting older neighbours and asking them to teach her the dishes they remembered from their childhood.'],
        ['At first, people were surprised. ', 18, ' But after a few weeks, word spread and neighbours began to invite her in. Some even phoned her when they were cooking something special.'],
        ['By spring, Lucía had collected over eighty recipes. A teacher at her school suggested she should turn them into a book. ', 19, ' They sold it at the village market, and all the money went to repair the school roof.'],
        [20, ' ‘I still don’t think of myself as a cook,’ she laughs. ‘I’m more like someone who is keeping a secret safe.’']
      ],
      sentences: [
        ['A', 'Nobody had ever asked them about their cooking before.'],
        ['B', 'She reached up and carefully took it down.'],
        ['C', 'She worried that when the oldest cooks were gone, the recipes would disappear with them.'],
        ['D', 'Together with two friends, she typed up the best ones and printed 200 copies.'],
        ['E', 'Now Lucía is already planning a second book, this time about the neighbouring villages.'],
        ['F', 'Her grandmother had already given the old box to a museum.'],
        ['G', 'Lucía’s mother usually cooks in a very modern kitchen.'],
        ['H', 'The village doctor says people should eat less sugar.']
      ],
      keys: { 16: 'B', 17: 'C', 18: 'A', 19: 'D', 20: 'E' },
      why: {
        16: '«an old box» → «took it down» → «Inside…»: предложение B связывает коробку на полке и то, что внутри.',
        17: '«many of the dishes were no longer made» → страх, что рецепты исчезнут (C) → «change that».',
        18: '«people were surprised» → «Nobody had ever asked them…» (A) → «But after a few weeks…».',
        19: '«turn them into a book» → «printed 200 copies» (D) → «They sold it…».',
        20: 'После истории с крышей — планы на будущее (E), затем её слова «I still don’t think of myself as a cook».'
      }
    },
    p5: {
      rubric: 'For each question, choose the correct answer.',
      title: 'Bees in the city',
      paras: [
        ['More and more people are ', 21, ' bees on the roofs of city buildings. Beekeepers say a city can be a surprisingly good home for them, because gardens and parks are full ', 22, ' different flowers all year round. ', 23, ', in the countryside farms often grow only one kind of crop.'],
        ['A large hotel in London now has six hives on its roof, and its kitchen uses the honey in desserts. The hotel even ', 24, ' visitors try on a beekeeper’s suit. Each hive gives about 20 kilos of honey a year, which is ', 25, ' more than many people expect.'],
        ['Some neighbours worry about being stung. ', 26, ' fact, experts say that city bees are usually very calm.']
      ],
      qs: [
        { n: 21, opts: [['A', 'having'], ['B', 'keeping'], ['C', 'holding'], ['D', 'taking']], ans: 'B', why: 'Устойчивое сочетание: <i>keep bees</i> — «держать пчёл».' },
        { n: 22, opts: [['A', 'with'], ['B', 'of'], ['C', 'by'], ['D', 'from']], ans: 'B', why: '<i>full of</i> + существительное — «полный чего-то».' },
        { n: 23, opts: [['A', 'Because'], ['B', 'Unless'], ['C', 'However'], ['D', 'Instead']], ans: 'C', why: 'Контраст: в городе цветы разные, <i>however</i> в сельской местности — один вид культуры.' },
        { n: 24, opts: [['A', 'allows'], ['B', 'lets'], ['C', 'permits'], ['D', 'agrees']], ans: 'B', why: 'После пропуска идёт <i>visitors try on</i> — инфинитив без to. Так строится только <i>let somebody do</i>.' },
        { n: 25, opts: [['A', 'very'], ['B', 'so'], ['C', 'too'], ['D', 'far']], ans: 'D', why: 'Усиление сравнительной степени: <i>far more</i> (намного больше). <i>Very more</i> и <i>so more</i> не говорят.' },
        { n: 26, opts: [['A', 'On'], ['B', 'At'], ['C', 'In'], ['D', 'By']], ans: 'C', why: 'Фиксированное выражение: <i>In fact</i> — «на самом деле».' }
      ]
    },
    p6: {
      rubric: 'For each question, write the correct answer. Write one word for each gap.',
      title: 'A message from Pablo’s friend',
      paras: [
        ['Hi Pablo,'],
        ['Thanks for your email! I’m sorry I haven’t written ', 27, ' so long, but I’ve been really busy. Our school is putting on a concert next Friday and I’m playing the guitar ', 28, ' front of the whole school! I’m very nervous, ', 29, ' I practise for an hour every evening.'],
        ['Anyway, how ', 30, ' your trip to Scotland? I’d love to hear all about it. Did you manage to see the castle ', 31, ' you told me about? I’m hoping to go there as soon ', 32, ' I finish my exams.'],
        ['Write soon,'], ['Karol']
      ],
      qs: [
        { n: 27, accept: ['for'], why: '<i>haven’t written for so long</i> — Present Perfect + <i>for</i> (период времени).' },
        { n: 28, accept: ['in'], why: 'Устойчивое: <i>in front of</i> — «перед (кем-то)».' },
        { n: 29, accept: ['so'], why: '<i>so</i> показывает результат: нервничаю, поэтому практикуюсь.' },
        { n: 30, accept: ['was'], why: 'Вопрос о прошлом: <i>how was your trip?</i>' },
        { n: 31, accept: ['that', 'which'], why: 'Определительное придаточное: <i>the castle (that / which) you told me about</i>.' },
        { n: 32, accept: ['as'], why: 'Конструкция <i>as soon as</i> — «как только».' }
      ]
    }
  },

  writing: {
    w1: {
      rubric: 'You must answer this question. Write your answer in about 100 words.',
      intro: 'Read this email from your English-speaking friend Chris and the notes you have made.',
      email: {
        from: 'Chris', subject: 'My birthday party',
        paras: [
          { t: 'Hi,' },
          { t: 'It’s my birthday next Saturday and I’m having a party! I’d like to have it at the sports centre. Do you think that’s a good idea?', note: 'No, but …' },
          { t: 'I want to start at 6 o’clock in the evening. Is that OK for you?', note: 'Sorry …' },
          { t: 'What could we do at the party? Have you got any ideas?', note: 'Suggest …' },
          { t: 'My sister is making the cake. What kind do you like best?', note: 'Tell Chris …' },
          { t: 'Let me know soon.' }, { t: 'Chris' }
        ]
      },
      task: 'Write your email to Chris.',
      checklist: ['Я ответил(а) на ВСЕ 4 заметки: No, but… / Sorry… / Suggest… / Tell Chris…', 'Есть приветствие (Hi Chris,) и прощание (Best wishes, / See you on Saturday,)', 'Объём ≈ 100 слов (90–120)', 'Связки: but, because, so, and, also, instead', 'Проверил(а) времена, артикли и окончание -s у глаголов'],
      model: 'Hi Chris,\nThanks for your email – I’m really happy you’re having a party! I’m not sure the sports centre is a good idea, but your garden would be perfect because it’s big and we could play music there.\nI’m very sorry, but I can’t come at six o’clock because I’ve got a piano lesson until half past six. Could I arrive at seven instead?\nHow about playing some games, like table tennis or a quiz? Everybody would enjoy that.\nFinally, I love chocolate cake best, so please tell your sister!\nSee you on Saturday,\nAnna'
    },
    w2: {
      rubric: 'Choose one of these questions. Write your answer in about 100 words.',
      q2: {
        head: 'Articles wanted!', title: 'A perfect weekend', lines: ['How do you like to spend a free weekend?', 'What makes a weekend perfect for you?'], foot: 'Write us an article answering these questions. The best one will win a prize!',
        checklist: ['Есть цепляющее начало (вопрос или яркая фраза)', 'Я ответил(а) на ОБА вопроса из объявления', 'Есть моё мнение и пример (for example…)', 'Связки: however, also, because, in my opinion', 'Заканчивается советом или приглашением читателю', 'Объём ≈ 100 слов (90–120)'],
        model: 'A perfect weekend – for me, it starts on Friday night, when I stay up late and watch a film with my family. On Saturday, I love getting up early and cycling to the lake with my friends. We usually have a picnic and swim if the weather is warm. In the evening, I like cooking something tasty at home. Sunday is for relaxing: I read, tidy my room and get ready for school.\nIn my opinion, a good weekend needs a mixture of activity and rest. What about you? If you haven’t tried cycling to the lake yet, I really recommend it – you’ll feel fantastic on Monday morning!'
      },
      q3: {
        text: 'Your English teacher has asked you to write a story. Your story must begin with this sentence.', first: 'When Ana opened the door, she couldn’t believe what she saw.',
        checklist: ['Первое предложение написано ТОЧНО как в задании', 'Есть начало — событие — развязка', 'Использованы Past Simple, Past Continuous и Past Perfect', 'Слова-последовательности: suddenly, then, after that, in the end', 'Описаны чувства героя (She felt… / She was surprised)', 'Объём ≈ 100 слов (90–120)'],
        model: 'When Ana opened the door, she couldn’t believe what she saw. The whole room was full of colourful balloons, and all her friends were standing in the middle, shouting ‘Surprise!’ She had completely forgotten that it was her birthday because she had been studying for exams all week.\nHer brother had secretly cooked her favourite pasta, and her best friend had made a huge chocolate cake. Ana laughed and cried at the same time. ‘How did you keep this secret?’ she asked. Nobody answered – they just hugged her. It was the best evening of that year, and she never forgot it.'
      }
    }
  },

  speaking: {
    p1: [
      { q: 'Where do you live, and what do you like most about the area?', more: 'Is there anything you would change about it?' },
      { q: 'Tell me about a typical weekday for you, from the morning to the evening.', more: 'Which part of the day do you enjoy most?' },
      { q: 'What do you usually do to relax after a busy day?', more: 'Do you prefer relaxing alone or with other people?' },
      { q: 'How has the way you spend your free time changed in the last few years?', more: 'Why do you think that has happened?' },
      { q: 'What kind of music do you listen to, and when do you listen to it?', more: 'Can music change your mood? Give an example.' },
      { q: 'Tell me about a place you have visited that you would like to see again.', more: 'What would you do differently next time?' },
      { q: 'Which subject at school or university do you find most useful, and why?', more: 'Is there a subject you wish you had studied more?' },
      { q: 'What kind of food do you enjoy cooking or eating at home?', more: 'Do you think young people eat healthily these days?' },
      { q: 'Do you prefer to spend time with a few close friends or with a large group?', more: 'What makes someone a good friend?' },
      { q: 'Tell me about something new you have learnt recently.', more: 'Did you learn it alone, from a person or online?' },
      { q: 'What is your favourite time of the year, and what do you do then?', more: 'How does the weather affect your plans?' },
      { q: 'What would you like to be doing in five years’ time?', more: 'What do you need to do now to make that happen?' }
    ],
    rounds: [
      {
        theme: 'Holidays outdoors',
        A: { img: 'assets/img/speaking/camping.jpg', alt: 'A family having a picnic next to a blue tent', prompts: ['Where are the people?', 'What are they doing?', 'Why might this family have chosen a holiday like this?'], ask: 'Timofey, would you enjoy a holiday like this? Why / why not?',
          model: 'In this photo I can see a family on a camping trip. They’re sitting on a blanket on the grass, next to a big blue tent. I think they’re having lunch, because there’s a lot of food, some fruit and a basket in front of them. The man is lying down and talking to the others, so they look relaxed and happy. It seems to be summer, because everybody is wearing light clothes and the sky is quite bright. They might have chosen this holiday because it’s cheaper than a hotel and the children can play outside. Personally, I’d enjoy it for a weekend, but after a few days I’d miss my comfortable bed.' },
        B: { img: 'assets/img/speaking/rafting.jpg', alt: 'A group rafting on a fast river', prompts: ['What are the people doing?', 'What are they wearing, and why?', 'How do you think they feel?'], ask: 'Tatiana, would you like to try this activity? Why / why not?',
          model: 'This picture shows a group of people rafting on a fast river. They’re sitting in a red boat and each of them is holding a paddle. They’re wearing helmets and life jackets, so I think the activity is quite dangerous, and they probably have an instructor. In the background there are lots of trees, so they must be somewhere in the mountains or in a forest. They look excited, and maybe a little nervous, because the water is very rough. I think they might be on a school trip or a team-building weekend. It must be a great way to get to know people, because you have to work together.' },
        p4: [
          { q: 'Do you prefer holidays in nature or in a big city? Why?', ideas: ['relaxing', 'sightseeing', 'cost', 'crowds'], more: 'Which would be better for a family with small children?' },
          { q: 'What are the advantages and disadvantages of camping compared with staying in a hotel?', ideas: ['comfort', 'price', 'freedom', 'weather'] },
          { q: 'Some people say adventure sports like rafting are too dangerous. What do you think?', ideas: ['safety rules', 'instructors', 'risk', 'adrenaline'] },
          { q: 'What can young people learn from spending time outdoors in a group?', ideas: ['teamwork', 'trust', 'problem solving', 'independence'] },
          { q: 'Would you like to try rafting? Why / why not?', ideas: ['fear', 'water', 'with friends', 'new experience'] },
          { q: 'Is it important to take a break from your phone when you are on holiday? Why?', ideas: ['relax', 'photos', 'emergencies', 'conversation'] }
        ]
      },
      {
        theme: 'People and healthy habits',
        A: { img: 'assets/img/speaking/seniors-exercise.jpg', alt: 'Older people exercising on mats in a park', prompts: ['Where are the people?', 'What exercise are they doing?', 'Why might they enjoy it?'], ask: 'Timofey, do you think exercising in a park is a good idea? Why?',
          model: 'In this photo there are five older people exercising outdoors in a park. They’re sitting on mats on the grass and stretching their legs. It looks like a sunny day, and the trees give them some shade. I think it’s a morning class with a trainer, because one woman in a blue top is sitting a bit apart from the others. Everybody’s smiling, so they seem to be enjoying themselves. They might meet here every week, not only to stay fit but also to chat with friends. I think it’s a lovely idea, because exercising in the fresh air is better for you than staying at home.' },
        B: { img: 'assets/img/speaking/teens-selfie.jpg', alt: 'Three teenage girls taking a selfie on a road', prompts: ['What are the girls doing?', 'What are they wearing?', 'Why might they be taking this photo?'], ask: 'Tatiana, how often do you take photos with your friends? Why?',
          model: 'This photo shows three teenage girls taking a selfie on a road. The girl at the front is holding the phone and the other two are standing very close to her. One of them is making a funny face and showing her tongue, and the girl on the right is making a peace sign. They’re wearing summer clothes and sunglasses, so it must be warm. One girl is carrying a red skateboard, so maybe they’ve been skating together. I think they’re close friends and want to remember this day. They’ll probably post the picture online, which is what many teenagers do.' },
        p4: [
          { q: 'How important is it for older people to stay active? What activities do you think are suitable?', ideas: ['health', 'walking', 'swimming', 'social contact'] },
          { q: 'Do you think teenagers spend too much time taking photos of themselves? Why?', ideas: ['social media', 'memories', 'confidence', 'pressure'] },
          { q: 'What can young and older people learn from each other?', ideas: ['experience', 'technology', 'patience', 'traditions'] },
          { q: 'Is it better to exercise outdoors or in a gym? Why?', ideas: ['fresh air', 'weather', 'equipment', 'motivation'] },
          { q: 'How has social media changed the way friends spend time together?', ideas: ['messaging', 'meeting less', 'sharing', 'comparing'] },
          { q: 'Do you think people today are healthier than their parents’ generation? Why / why not?', ideas: ['food', 'sport', 'technology', 'stress'] }
        ]
      }
    ]
  }
};
