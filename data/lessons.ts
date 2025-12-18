
import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 31,
    title: "Lesson 31",
    subtitle: "Tag Questions (Present & Past Simple)",
    vocabulary: [
      { id: 'v31-1', word: 'to meet / met', translation: 'encontrar / encontrou' },
      { id: 'v31-2', word: 'to teach / taught', translation: 'ensinar / ensinou' },
      { id: 'v31-3', word: 'to believe', translation: 'acreditar' },
      { id: 'v31-4', word: 'to bother', translation: 'incomodar' },
      { id: 'v31-5', word: 'to get angry', translation: 'ficar com raiva' },
      { id: 'v31-6', word: 'to apply for', translation: 'inscrever-se para / candidatar-se' },
      { id: 'v31-7', word: 'to go on strike', translation: 'entrar em greve' },
      { id: 'v31-8', word: 'by chance', translation: 'por acaso' },
      { id: 'v31-9', word: 'appointment', translation: 'compromisso / consulta' },
      { id: 'v31-10', word: 'anymore', translation: 'não mais' },
      { id: 'v31-11', word: 'beats me', translation: 'não faço ideia' },
    ],
    sentences: [
      { id: 's31-1', english: "She teaches English, doesn’t she? / Yes, she does.", portuguese: "Ela ensina inglês, não ensina? / Sim, ela ensina." },
      { id: 's31-2', english: "You don’t believe that, do you? / No, I don’t.", portuguese: "Você não acredita nisso, acredita? / Não, não acredito." },
      { id: 's31-3', english: "They have an appointment, don’t they? / Beats me.", portuguese: "Eles têm um compromisso, não têm? / Não faço ideia." },
      { id: 's31-4', english: "We met by chance, didn’t we? / Yes, we did.", portuguese: "Nós nos encontramos por acaso, não foi? / Sim, fomos." },
      { id: 's31-5', english: "He went on strike, didn’t he? / I think so.", portuguese: "Ele entrou em greve, não foi? / Acho que sim." },
      { id: 's31-6', english: "I’m going to apply for a job.", portuguese: "Eu vou me candidatar a um emprego." },
      { id: 's31-7', english: "They won’t bother you anymore.", portuguese: "Eles não vão mais te incomodar." },
      { id: 's31-8', english: "Don’t get angry at the decision.", portuguese: "Não fique bravo com a decisão." },
    ],
    dialogues: [
      {
        title: "The Interview Chance",
        parts: [
          { id: 'd31-1', speaker: "Anna", text: "You met the manager by chance, didn't you?", translation: "Você encontrou o gerente por acaso, não foi?" },
          { id: 'd31-2', speaker: "Bob", text: "Yes, I did! We had an appointment scheduled for later, but I saw him at the cafe.", translation: "Sim! Tínhamos um compromisso marcado para mais tarde, mas o vi no café." },
          { id: 'd31-3', speaker: "Anna", text: "He teaches at the university too, doesn't he?", translation: "Ele ensina na universidade também, não ensina?" },
          { id: 'd31-4', speaker: "Bob", text: "I believe so. He told me he's busy because the staff might go on strike.", translation: "Acredito que sim. Ele me disse que está ocupado porque os funcionários podem entrar em greve." },
          { id: 'd31-5', speaker: "Anna", text: "That won't bother your application, will it?", translation: "Isso não vai atrapalhar sua candidatura, vai?" },
          { id: 'd31-6', speaker: "Bob", text: "Beats me. I just hope they don't get angry at my questions!", translation: "Não faço ideia. Só espero que não fiquem bravos com minhas perguntas!" },
          { id: 'd31-7', speaker: "Anna", text: "You really want this job, don't you?", translation: "Você quer muito esse emprego, não quer?" },
          { id: 'd31-8', speaker: "Bob", text: "Yes, I'm excited. I don't want to be unemployed anymore.", translation: "Sim, estou empolgado. Não quero mais ficar desempregado." }
        ]
      }
    ],
    exercises: [
      { id: 'e31-1', portuguesePrompt: "Traduza: Ele trabalha aqui, não trabalha?", correctEnglish: "He works here, doesn't he?", audioHint: "He works here, doesn't he?" },
      { id: 'e31-2', portuguesePrompt: "Traduza: Você não acredita nisso, acredita?", correctEnglish: "You don't believe that, do you?", audioHint: "You don't believe that, do you?" },
      { id: 'e31-3', portuguesePrompt: "Traduza: Eles entraram em greve, não foi?", correctEnglish: "They went on strike, didn't they?", audioHint: "They went on strike, didn't they?" },
      { id: 'e31-4', portuguesePrompt: "Traduza: Ela ensina inglês, não ensina?", correctEnglish: "She teaches English, doesn't she?", audioHint: "She teaches English, doesn't she?" },
      { id: 'e31-5', portuguesePrompt: "Traduza: Nós nos encontramos por acaso, não foi?", correctEnglish: "We met by chance, didn't we?", audioHint: "We met by chance, didn't we?" },
      { id: 'e31-6', portuguesePrompt: "Traduza: Eles têm um compromisso, não têm?", correctEnglish: "They have an appointment, don't they?", audioHint: "They have an appointment, don't they?" },
      { id: 'e31-7', portuguesePrompt: "Traduza: Eu vou me candidatar a um emprego.", correctEnglish: "I'm going to apply for a job", audioHint: "I'm going to apply for a job." },
      { id: 'e31-8', portuguesePrompt: "Traduza: Eles não vão mais te incomodar.", correctEnglish: "They won't bother you anymore", audioHint: "They won't bother you anymore." }
    ]
  },
  {
    id: 32,
    title: "Lesson 32",
    subtitle: "Tag Questions with Verb TO BE",
    vocabulary: [
      { id: 'v32-1', word: 'to lose / lost', translation: 'perder / perdeu' },
      { id: 'v32-2', word: 'to miss / missed', translation: 'perder / faltar / sentiu falta' },
      { id: 'v32-3', word: 'to think / thought', translation: 'pensar / pensou' },
      { id: 'v32-4', word: 'upset', translation: 'chateado' },
      { id: 'v32-5', word: 'wild', translation: 'selvagem / doido' },
      { id: 'v32-6', word: 'interesting', translation: 'interessante' },
      { id: 'v32-7', word: 'funny', translation: 'engraçado' },
      { id: 'v32-8', word: 'glad', translation: 'contente' },
      { id: 'v32-9', word: 'to be in love', translation: 'estar apaixonado' },
    ],
    sentences: [
      { id: 's32-1', english: "Did you lose your passport?", portuguese: "Você perdeu seu passaporte?" },
      { id: 's32-2', english: "I missed the flight.", portuguese: "Eu perdi o voo." },
      { id: 's32-3', english: "You’re not thinking about leaving, are you? / Yes, I am.", portuguese: "Você não está pensando em ir embora, está? / Sim, estou." },
      { id: 's32-4', english: "It’s a little wild, isn’t it?", portuguese: "É um pouco doido, não é?" },
      { id: 's32-5', english: "They’re glad to be here, aren’t they?", portuguese: "Eles estão contentes de estar aqui, não estão?" },
      { id: 's32-6', english: "She wasn’t upset, was she? / I don’t think so.", portuguese: "Ela não estava chateada, estava? / Acho que não." },
      { id: 's32-7', english: "It wasn’t very interesting, was it?", portuguese: "Não foi muito interessante, foi?" },
      { id: 's32-8', english: "He wasn’t so funny, was he?", portuguese: "Ele não era tão engraçado, era?" },
      { id: 's32-9', english: "They were in love, weren’t they?", portuguese: "Eles estavam apaixonados, não estavam?" },
    ],
    dialogues: [
      {
        title: "The Wild Party",
        parts: [
          { id: 'd32-1', speaker: "Traveler", text: "The party last night was a little wild, wasn't it?", translation: "A festa ontem à noite foi um pouco doida, não foi?" },
          { id: 'd32-2', speaker: "Staff", text: "It was! You're glad you didn't miss it, aren't you?", translation: "Foi! Você está contente por não ter perdido, não está?" },
          { id: 'd32-3', speaker: "Traveler", text: "Yes, I am. But John wasn't there. He was upset about something, wasn't he?", translation: "Sim, estou. Mas John não estava lá. Ele estava chateado com algo, não estava?" },
          { id: 'd32-4', speaker: "Staff", text: "I thought so. He's in love with Mary, isn't he?", translation: "Eu pensei que sim. Ele está apaixonado pela Mary, não está?" },
          { id: 'd32-5', speaker: "Traveler", text: "Interesting! That explains why he was so quiet. He isn't usually like that, is he?", translation: "Interessante! Isso explica por que ele estava tão quieto. Ele não costuma ser assim, é?" },
          { id: 'd32-6', speaker: "Staff", text: "No, he's usually very funny. It's a shame!", translation: "Não, ele geralmente é muito engraçado. É uma pena!" },
          { id: 'd32-7', speaker: "Traveler", text: "We were all so happy, weren't we?", translation: "Estávamos todos tão felizes, não estávamos?" },
          { id: 'd32-8', speaker: "Staff", text: "Yes, we were. It was a great night.", translation: "Sim, estávamos. Foi uma ótima noite." }
        ]
      }
    ],
    exercises: [
      { id: 'e32-1', portuguesePrompt: "Traduza: Ela está feliz, não está?", correctEnglish: "She is happy, isn't she?", audioHint: "She is happy, isn't she?" },
      { id: 'e32-2', portuguesePrompt: "Traduza: Eles estavam contentes de estar aqui, não estavam?", correctEnglish: "They were glad to be here, aren't they?", audioHint: "They were glad to be here, aren't they?" },
      { id: 'e32-3', portuguesePrompt: "Traduza: Você não está cansado, está?", correctEnglish: "You aren't tired, are you?", audioHint: "You aren't tired, are you?" },
      { id: 'e32-4', portuguesePrompt: "Traduza: Ela não estava chateada, estava?", correctEnglish: "She wasn't upset, was she?", audioHint: "She wasn't upset, was she?" },
      { id: 'e32-5', portuguesePrompt: "Traduza: Foi engraçado, não foi?", correctEnglish: "It was funny, wasn't it?", audioHint: "It was funny, wasn't it?" },
      { id: 'e32-6', portuguesePrompt: "Traduza: Eles estavam apaixonados, não estavam?", correctEnglish: "They were in love, weren't they?", audioHint: "They were in love, weren't they?" },
      { id: 'e32-7', portuguesePrompt: "Traduza: Ele é esperto, não é?", correctEnglish: "He is smart, isn't he?", audioHint: "He is smart, isn't he?" },
      { id: 'e32-8', portuguesePrompt: "Traduza: É interessante, não é?", correctEnglish: "It's interesting, isn't it?", audioHint: "It's interesting, isn't it?" }
    ]
  },
  {
    id: 33,
    title: "Lesson 33",
    subtitle: "Say / Tell & -Ever Pronouns",
    vocabulary: [
      { id: 'v33-1', word: 'to say / said', translation: 'dizer / disse' },
      { id: 'v33-2', word: 'to tell / told', translation: 'contar / falou' },
      { id: 'v33-3', word: 'wherever', translation: 'onde quer que' },
      { id: 'v33-4', word: 'whenever', translation: 'quando quer que / sempre que' },
      { id: 'v33-5', word: 'whatever', translation: 'o que quer que / tanto faz' },
      { id: 'v33-6', word: 'whoever', translation: 'quem quer que' },
      { id: 'v33-7', word: 'instead of', translation: 'em vez de' },
      { id: 'v33-8', word: 'overseas', translation: 'exterior (além-mar)' },
      { id: 'v33-9', word: 'in time', translation: 'a tempo' },
      { id: 'v33-10', word: 'arrive', translation: 'chegar' },
      { id: 'v33-11', word: 'excited', translation: 'empolgado' },
    ],
    sentences: [
      { id: 's33-1', english: "He said he would help us.", portuguese: "Ele disse que nos ajudaria." },
      { id: 's33-2', english: "She told me she would talk to you.", portuguese: "Ela me disse que falaria com você." },
      { id: 's33-3', english: "They said they were excited about the party.", portuguese: "Eles disseram que estavam empolgados com a festa." },
      { id: 's33-4', english: "We said we would go overseas instead of staying home.", portuguese: "Nós dissemos que iríamos para o exterior em vez de ficar em casa." },
      { id: 's33-5', english: "I told you I would arrive in time.", portuguese: "Eu te disse que chegaria a tempo." },
      { id: 's33-6', english: "Whatever you decide, I will support you.", portuguese: "O que quer que você decida, eu te apoiarei." },
      { id: 's33-7', english: "Call me whenever you need help.", portuguese: "Ligue-me sempre que precisar de ajuda." },
      { id: 's33-8', english: "You can sit wherever you like.", portuguese: "Você pode sentar onde quer que goste." },
      { id: 's33-9', english: "Whoever wins, we will celebrate.", portuguese: "Quem quer que ganhe, nós vamos celebrar." },
    ],
    dialogues: [
      {
        title: "The Overseas Trip",
        parts: [
          { id: 'd33-1', speaker: "Mark", text: "He said he would arrive overseas in time for the meeting.", translation: "Ele disse que chegaria ao exterior a tempo para a reunião." },
          { id: 'd33-2', speaker: "Jane", text: "Did he tell you which city he's in? I'm excited to hear from him.", translation: "Ele te disse em qual cidade ele está? Estou empolgada para ouvir dele." },
          { id: 'd33-3', speaker: "Mark", text: "He didn't say. But he said he would call whenever he could.", translation: "Ele não disse. Mas disse que ligaria sempre que pudesse." },
          { id: 'd33-4', speaker: "Jane", text: "Whatever he decides, we should be ready to go wherever he needs.", translation: "O que quer que ele decida, devemos estar prontos para ir onde quer que ele precise." },
          { id: 'd33-5', speaker: "Mark", text: "Instead of waiting, let's just plan our own route.", translation: "Em vez de esperar, vamos apenas planejar nossa própria rota." },
          { id: 'd33-6', speaker: "Jane", text: "Whoever told you that was a good idea was right!", translation: "Quem quer que tenha te dito que isso era uma boa ideia estava certo!" },
          { id: 'd33-7', speaker: "Mark", text: "Tell me the truth, are you worried?", translation: "Diga-me a verdade, você está preocupada?" },
          { id: 'd33-8', speaker: "Jane", text: "I said I was fine, didn't I?", translation: "Eu disse que estava bem, não disse?" }
        ]
      }
    ],
    exercises: [
      { id: 'e33-1', portuguesePrompt: "Traduza: Ela disse que estava cansada.", correctEnglish: "She said she was tired", audioHint: "She said she was tired." },
      { id: 'e33-2', portuguesePrompt: "Traduza: Ligue-me sempre que precisar de ajuda.", correctEnglish: "Call me whenever you need help", audioHint: "Call me whenever you need help." },
      { id: 'e33-3', portuguesePrompt: "Traduza: Ele me disse a verdade.", correctEnglish: "He told me the truth", audioHint: "He told me the truth." },
      { id: 'e33-4', portuguesePrompt: "Traduza: Você pode sentar onde quiser.", correctEnglish: "You can sit wherever you like", audioHint: "You can sit wherever you like." },
      { id: 'e33-5', portuguesePrompt: "Traduza: O que quer que aconteça, fique calmo.", correctEnglish: "Whatever happens, stay calm", audioHint: "Whatever happens, stay calm." },
      { id: 'e33-6', portuguesePrompt: "Traduza: Eles disseram que estavam empolgados.", correctEnglish: "They said they were excited", audioHint: "They said they were excited." },
      { id: 'e33-7', portuguesePrompt: "Traduza: Eu te falei para estar aqui.", correctEnglish: "I told you to be here", audioHint: "I told you to be here." },
      { id: 'e33-8', portuguesePrompt: "Traduza: Quem quer que ganhe, nós celebramos.", correctEnglish: "Whoever wins, we celebrate", audioHint: "Whoever wins, we celebrate." }
    ]
  },
  {
    id: 34,
    title: "Lesson 34",
    subtitle: "Comparative Adjectives",
    vocabulary: [
      { id: 'v34-1', word: 'tall / taller than', translation: 'alto / mais alto que' },
      { id: 'v34-2', word: 'smart / smarter than', translation: 'esperto / mais esperto que' },
      { id: 'v34-3', word: 'big / bigger than', translation: 'grande / maior que' },
      { id: 'v34-4', word: 'small / smaller than', translation: 'pequeno / menor que' },
      { id: 'v34-5', word: 'fast / faster than', translation: 'rápido / mais rápido que' },
      { id: 'v34-6', word: 'slow / slower than', translation: 'lento / mais lento que' },
      { id: 'v34-7', word: 'expensive / more expensive than', translation: 'caro / mais caro que' },
      { id: 'v34-8', word: 'cheap / cheaper than', translation: 'barato / mais barato que' },
      { id: 'v34-9', word: 'good / better than', translation: 'bom / melhor que' },
      { id: 'v34-10', word: 'bad / worse than', translation: 'ruim / pior que' },
    ],
    sentences: [
      { id: 's34-1', english: "She is taller than me.", portuguese: "Ela é mais alta que eu." },
      { id: 's34-2', english: "He is as smart as me.", portuguese: "Ele é tão esperto quanto eu." },
      { id: 's34-3', english: "This car is faster than that one.", portuguese: "Este carro é mais rápido que aquele." },
      { id: 's34-4', english: "My house is smaller than yours.", portuguese: "Minha casa é menor que a sua." },
      { id: 's34-5', english: "Gold is more expensive than silver.", portuguese: "Ouro é mais caro que prata." },
      { id: 's34-6', english: "Your English is better than mine!", portuguese: "Seu inglês é melhor que o meu!" },
    ],
    dialogues: [
      {
        title: "Buying a New Phone",
        parts: [
          { id: 'd34-1', speaker: "Alice", text: "This new phone is much faster than my old one.", translation: "Este celular novo é muito mais rápido que o meu antigo." },
          { id: 'd34-2', speaker: "Bob", text: "But it looks bigger than mine too! Is it heavier?", translation: "Mas ele parece maior que o meu também! É mais pesado?" },
          { id: 'd34-3', speaker: "Alice", text: "A little bit. It's more expensive, but the camera is better than yours.", translation: "Um pouco. É mais caro, mas a câmera é melhor que a sua." },
          { id: 'd34-4', speaker: "Bob", text: "I believe it. My phone is getting slower every day.", translation: "Eu acredito. Meu celular está ficando mais lento a cada dia." },
          { id: 'd34-5', speaker: "Alice", text: "You should get one like this. It's cheaper than the Pro version!", translation: "Você deveria comprar um como este. É mais barato que a versão Pro!" },
          { id: 'd34-6', speaker: "Bob", text: "Maybe. Is it smarter than me though? Just joking!", translation: "Talvez. Mas ele é mais esperto que eu? Só brincando!" },
          { id: 'd34-7', speaker: "Alice", text: "It's certainly thinner than the old models.", translation: "Certamente é mais fino que os modelos antigos." },
          { id: 'd34-8', speaker: "Bob", text: "And the battery is better than mine too.", translation: "E a bateria é melhor que a minha também." }
        ]
      }
    ],
    exercises: [
      { id: 'e34-1', portuguesePrompt: "Traduza: Ela é mais alta que eu.", correctEnglish: "She is taller than me", audioHint: "She is taller than me." },
      { id: 'e34-2', portuguesePrompt: "Traduza: Este carro é mais rápido que aquele.", correctEnglish: "This car is faster than that one", audioHint: "This car is faster than that one." },
      { id: 'e34-3', portuguesePrompt: "Traduza: Ouro é mais caro que prata.", correctEnglish: "Gold is more expensive than silver", audioHint: "Gold is more expensive than silver." },
      { id: 'e34-4', portuguesePrompt: "Traduza: Seu inglês é melhor que o meu!", correctEnglish: "Your English is better than mine", audioHint: "Your English is better than mine!" },
      { id: 'e34-5', portuguesePrompt: "Traduza: Ele é tão esperto quanto eu.", correctEnglish: "He is as smart as me", audioHint: "He is as smart as me." },
      { id: 'e34-6', portuguesePrompt: "Traduza: Minha casa é menor que a sua.", correctEnglish: "My house is smaller than yours", audioHint: "My house is smaller than yours." },
      { id: 'e34-7', portuguesePrompt: "Traduza: Isto é melhor que aquilo.", correctEnglish: "This is better than that", audioHint: "This is better than that." },
      { id: 'e34-8', portuguesePrompt: "Traduza: É mais barato que a versão Pro!", correctEnglish: "It's cheaper than the Pro version", audioHint: "It's cheaper than the Pro version!" }
    ]
  },
  {
    id: 35,
    title: "Lesson 35",
    subtitle: "Superlative Adjectives",
    vocabulary: [
      { id: 'v35-1', word: 'the tallest', translation: 'o mais alto' },
      { id: 'v35-2', word: 'the smartest', translation: 'o mais esperto' },
      { id: 'v35-3', word: 'the biggest', translation: 'o maior' },
      { id: 'v35-4', word: 'the smallest', translation: 'o menor' },
      { id: 'v35-5', word: 'the fastest', translation: 'o mais rápido' },
      { id: 'v35-6', word: 'the most intelligent', translation: 'o mais inteligente' },
      { id: 'v35-7', word: 'the coldest', translation: 'o mais frio' },
      { id: 'v35-8', word: 'the best', translation: 'o melhor' },
      { id: 'v35-9', word: 'the worst', translation: 'o pior' },
    ],
    sentences: [
      { id: 's35-1', english: "She is the most intelligent girl I know.", portuguese: "Ela é a garota mais inteligente que eu conheço." },
      { id: 's35-2', english: "Alaska is the coldest state in the USA.", portuguese: "O Alasca é o estado mais frio dos EUA." },
      { id: 's35-3', english: "He is the tallest student in the class.", portuguese: "Ele é o aluno mais alto da sala." },
      { id: 's35-4', english: "This is the best movie ever!", portuguese: "Este é o melhor filme de todos!" },
      { id: 's35-5', english: "That was the worst day of my life.", portuguese: "Aquele foi o pior dia da minha vida." },
      { id: 's35-6', english: "The cheetah is the fastest animal.", portuguese: "O guepardo é o animal mais rápido." },
    ],
    dialogues: [
      {
        title: "The Best Student",
        parts: [
          { id: 'd35-1', speaker: "Jim", text: "Who is the smartest person you know?", translation: "Quem é a pessoa mais esperta que você conhece?" },
          { id: 'd35-2', speaker: "Pam", text: "Definitely Mary. She is the most intelligent student in our class.", translation: "Definitivamente a Mary. Ela é a estudante mais inteligente da nossa sala." },
          { id: 'd35-3', speaker: "Jim", text: "I agree. She always gets the best grades!", translation: "Eu concordo. Ela sempre tira as melhores notas!" },
          { id: 'd35-4', speaker: "Pam", text: "But Jim, you are the fastest runner in the school, aren't you?", translation: "Mas Jim, você é o corredor mais rápido da escola, não é?" },
          { id: 'd35-5', speaker: "Jim", text: "I try! Though last winter was the coldest I've ever felt while training.", translation: "Eu tento! Embora o último inverno tenha sido o mais frio que já senti enquanto treinava." },
          { id: 'd35-6', speaker: "Pam", text: "That sounds like the worst training condition possible!", translation: "Isso parece a pior condição de treino possível!" },
          { id: 'd35-7', speaker: "Jim", text: "Who is the tallest in your family?", translation: "Quem é o mais alto na sua família?" },
          { id: 'd35-8', speaker: "Pam", text: "My brother. He is the tallest person I've ever seen!", translation: "Meu irmão. Ele é a pessoa mais alta que eu já vi!" }
        ]
      }
    ],
    exercises: [
      { id: 'e35-1', portuguesePrompt: "Traduza: Ela é a garota mais inteligente que conheço.", correctEnglish: "She is the most intelligent girl I know", audioHint: "She is the most intelligent girl I know." },
      { id: 'e35-2', portuguesePrompt: "Traduza: Alasca é o estado mais frio dos EUA.", correctEnglish: "Alaska is the coldest state in the USA", audioHint: "Alaska is the coldest state in the USA." },
      { id: 'e35-3', portuguesePrompt: "Traduza: Este é o melhor filme de todos!", correctEnglish: "This is the best movie ever", audioHint: "This is the best movie ever!" },
      { id: 'e35-4', portuguesePrompt: "Traduza: O guepardo é o animal mais rápido.", correctEnglish: "The cheetah is the fastest animal", audioHint: "The cheetah is the fastest animal." },
      { id: 'e35-5', portuguesePrompt: "Traduza: Ele é o aluno mais alto da classe.", correctEnglish: "He is the tallest student in the class", audioHint: "He is the tallest student in the class." },
      { id: 'e35-6', portuguesePrompt: "Traduza: Aquele foi o pior dia da minha vida.", correctEnglish: "That was the worst day of my life", audioHint: "That was the worst day of my life." },
      { id: 'e35-7', portuguesePrompt: "Traduza: Esta é a piada mais engraçada de todas!", correctEnglish: "This is the funniest joke ever", audioHint: "This is the funniest joke ever!" },
      { id: 'e35-8', portuguesePrompt: "Traduza: Ela é a estudante mais esperta da nossa classe.", correctEnglish: "She is the smartest student in our class", audioHint: "She is the smartest student in our class." }
    ]
  }
];
