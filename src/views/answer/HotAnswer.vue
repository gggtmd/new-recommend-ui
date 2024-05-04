<script setup>
import {ref} from "vue";
import { intelligenceSendQuestionServer } from '@/api/intelligence.js'
import {Position,Loading} from '@element-plus/icons-vue'

const input = ref("")
const isLoading = ref(false)
const answer = ref("")
const title = ref("")
const imageURL = ref("")
const videoURL = ref("")

//获取答案
async function getAnswer() {
  isLoading.value = true
  let temInput = input.value
  input.value = ""
  let res = await intelligenceSendQuestionServer(temInput)
  isLoading.value = false
  title.value = temInput
  answer.value = res.data
}

const selectList = ref(['和羹之美，在于合异', '塞翁失马，焉知非福', '咬定青山不放松', '天行健，君子以自强不息'])
const sourceList = ref([
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%5B%E5%B9%B3%E2%80%9C%E8%AF%AD%E2%80%9D%E8%BF%91%E4%BA%BA%5D%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E%20%E5%9C%A8%E4%BA%8E%E5%90%88%E5%BC%82.mp4',
  },
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%A1%9E%E7%BF%81.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E7%BB%8F%E5%85%B8%E6%88%90%E8%AF%AD%E6%95%85%E4%BA%8B%EF%BC%9A%E5%A1%9E%E7%BF%81%E5%A4%B1%E9%A9%AC%E7%84%89%E7%9F%A5%E9%9D%9E%E7%A6%8F%EF%BC%8C%E8%BF%99%E4%B8%AA%E6%95%85%E4%BA%8B%E8%AF%B4%EF%BC%8C%E4%B8%8D%E8%83%BD%E5%BE%97%E6%84%8F%E5%A4%AA%E6%97%A9%2C%E4%BA%B2%E5%AD%90%2C%E6%97%A9%E6%95%99%2C%E5%A5%BD%E7%9C%8B%E8%A7%86%E9%A2%91.mp4'
  },
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1%E4%B8%8D%E6%94%BE%E6%9D%BE%EF%BC%88%E9%83%91%E7%87%AE%E8%AF%8D%20%20%20%E5%88%98%E8%BF%9B%E6%88%90%E6%9B%B2%20%E9%99%88%E8%8B%8F%E5%A8%81%E6%BC%94%E5%94%B1%EF%BC%89.mp4'
  },
  {
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U795444.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MTI4MDM7YWxnbz1obWFjLXNoYTI1NjtzaWc9OXROMEZLRzdtSGtMcTIvMTllZ08yN3Z1NEdCUmVTcEs1enAwalY4VFZSRT0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/8cdcf24b-c303-4dc2-859c-f81aac73a568',
  },
])
const sourceIndex = ref(0)
const selectAnswer = (item, index) => {
  input.value = item
  sourceIndex.value = index
  getAnswer()
}

const hotList = ref([
  {
    title: '和羹之美，在于合异',
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%5B%E5%B9%B3%E2%80%9C%E8%AF%AD%E2%80%9D%E8%BF%91%E4%BA%BA%5D%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E%20%E5%9C%A8%E4%BA%8E%E5%90%88%E5%BC%82.mp4',
    answer: '"和羹之美，在于合异"这一句话出自《三国志·蜀书·刘巴传》中的注引《零陵先贤传》。这句话比喻像调和羹汤一样，把不同的味道融合在一起，才能制成美味佳肴。在哲学和社会思想层面，它强调不同意见、文化和个性的和谐统一对于实现共同目标的重要性。\n\n这个典故与现代英语中的俚语 "Unity in diversity" 或 "Strength in diversity" 相似。这些英语表达都强调在多样性中寻求统一，认识到不同背景和观点的个体可以共同创造出更大的价值。\n\n具体的使用场景如下。\n中文场景：\n在联合国大会上，一位发言人提到：“世界各国虽然文化、制度各异，但和羹之美，在于合异，我们应该尊重彼此差异，共同维护世界和平与发展。”\n英文场景：\nSpeaking at the United Nations General Assembly, a representative said, "While nations around the world may differ in culture and systems, it is the unity in diversity that brings strength. We should respect each other\'s differences and work together to maintain world peace and development."',
    hot: 3450
  },
  {
    title: '塞翁失马，焉知非福',
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%A1%9E%E7%BF%81.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E7%BB%8F%E5%85%B8%E6%88%90%E8%AF%AD%E6%95%85%E4%BA%8B%EF%BC%9A%E5%A1%9E%E7%BF%81%E5%A4%B1%E9%A9%AC%E7%84%89%E7%9F%A5%E9%9D%9E%E7%A6%8F%EF%BC%8C%E8%BF%99%E4%B8%AA%E6%95%85%E4%BA%8B%E8%AF%B4%EF%BC%8C%E4%B8%8D%E8%83%BD%E5%BE%97%E6%84%8F%E5%A4%AA%E6%97%A9%2C%E4%BA%B2%E5%AD%90%2C%E6%97%A9%E6%95%99%2C%E5%A5%BD%E7%9C%8B%E8%A7%86%E9%A2%91.mp4',
    answer: '"塞翁失马，焉知非福"是一个中国古代的成语，来源于《淮南子·人间训》中的一个故事。这个故事讲述了一个边境的老翁，他的马跑丢了，村里的人们都来安慰他。老翁却说，这未必是坏事。不久后，那匹丢失的马带回了一群野马，村人又来祝贺。但老翁说，这也不一定就是好事。后来，他的儿子骑野马摔断了腿，人们再次来慰问，老翁依旧认为这未必是坏事。最终，因为儿子的伤腿免于征战，反而保全了性命。这个成语用来比喻一时看似不幸的事情，可能转变为幸运的结果。\n\n这个典故与现代英语中的俚语 "Every cloud has a silver lining" (每朵乌云都有银色的边缘) 或 "What doesn\'t kill me makes me stronger" (没有击败我的让我变得更强大) 有相似之处。这些表达都传达了在逆境中寻找积极面或成长机会的观点。\n\n具体的使用场景如下。\n中文场景：\n小王这次考试没通过，但他并不灰心，因为他相信“塞翁失马，焉知非福”，也许这次失败会激励他更加努力学习。\n英文场景：\nAfter failing the exam, Xiao Wang remains optimistic because he believes that "every cloud has a silver lining," and perhaps this setback will motivate him to study even harder.',
    hot: 2160
  },
  {
    title: '咬定青山不放松',
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1%E4%B8%8D%E6%94%BE%E6%9D%BE%EF%BC%88%E9%83%91%E7%87%AE%E8%AF%8D%20%20%20%E5%88%98%E8%BF%9B%E6%88%90%E6%9B%B2%20%E9%99%88%E8%8B%8F%E5%A8%81%E6%BC%94%E5%94%B1%EF%BC%89.mp4',
    answer: '"咬定青山不放松"出自清代郑燮的《竹石》一诗。这首词写于1965年，表达了作者坚定不移的决心和顽强拼搏的精神。这句话比喻一个人一旦确定了目标，就会像牙齿咬住青山一样，毫不松口，坚持不懈地追求下去。\n\n这个典故与现代英语中的俚语 "Where there\'s a will, there\'s a way" (有志者事竟成) 相似。这句话强调了决心和意志力在克服困难和达成目标过程中的重要性。\n\n具体的使用场景如下。\n中文场景：\n面对艰难的科研任务，科学家坚定地说：“我们要有咬定青山不放松的劲头，直到攻克这个难题。”\n英文场景：\nFaced with the challenging task of scientific research, the scientist firmly said, "We must have the determination of biting down on the green hills without letting go until we overcome this question."',
    hot: 1527
  },
  {
    title: '天行健，君子以自强不息',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U795444.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MTI4MDM7YWxnbz1obWFjLXNoYTI1NjtzaWc9OXROMEZLRzdtSGtMcTIvMTllZ08yN3Z1NEdCUmVTcEs1enAwalY4VFZSRT0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/8cdcf24b-c303-4dc2-859c-f81aac73a568',
    answer: '"天行健，君子以自强不息"这句话出自《周易·乾卦》。它的意思是天道运行不息，君子应该像天一样，不断努力，自强不息。这句话表达了古人对于自强、奋发向上的精神追求，强调了君子应该具备的品质和行为。在古代，这句话被用来激励人们要不断努力，追求卓越，成为一个有道德、有能力的人。\n\n这句话与现代英语中的一句谚语相似：“The early bird catches the worm.” 这句谚语意味着早起的鸟儿有虫吃，也就是说勤奋的人会获得成功。这句话强调了勤奋、努力的重要性，与"天行健，君子以自强不息"传达的精神相符。\n\n具体的使用场景如下。\n中文场景：\nA: 最近我在学习汉语，感觉好难啊，有时候都想放弃了。\nB: 别灰心，要记住“天行健，君子以自强不息”。只要你努力，一定会成功的。\n英文场景：\nA: I\'ve been studying Chinese recently, and it\'s so difficult that sometimes I feel like giving up.\nB: Don\'t lose heart. Remember, "The early bird catches the worm." As long as you work hard, you will succeed.',
    hot: 1124
  },
  {
    title: '壹引其纲，万目皆张',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U323846.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjQzMzE7YWxnbz1obWFjLXNoYTI1NjtzaWc9aGoxbXhhNC9iOTA0bFZLYzhBcjRSMXQrS0pCL3VQczdVcjIweW52SFJzaz0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/cf52453b-eac5-4e36-8bff-b620a737a0b3',
    answer: '"壹引其纲，万目皆张"出自《吕氏春秋·离俗览·用民》。这句话的意思是，只要牵住事情的关键（即“纲”），所有细节（即“目”）就都会被带动起来。它比喻只要抓住了主要矛盾或关键问题，其他次要的问题就能迎刃而解。\n\n这句话与英语中的成语 "When the cat\'s away, the mice will play" 有些相似。这个英语俗语意味着当监督者不在的时候，其他人就会开始放纵自己。尽管两者的情境不尽相同，但都涉及到一个中心点对周围情况的影响力。\n\n具体的使用场景如下。\n中文场景：\n在团队会议上，领导提出了一个创新方案，他说：“我们要壹引其纲，明确项目的核心目标，这样各个部分的工作才能顺利展开。”\n英文场景：\nDuring the team meeting, the leader proposed an innovative plan and said, “We need to focus on the main issue and clearly define the core objectives of the project; this way, all parts of the work can proceed smoothly.”',
    hot: 854
  },
  {
    title: '人生天地间，长路有险夷',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U766459.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjQ3NzM7YWxnbz1obWFjLXNoYTI1NjtzaWc9QzNtNFNhM0k2bXJPbkhmMFpZYlhidldNelcrdTFaRFR1eW5iSWF2RVVnRT0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/e08e6181-b86a-4de6-a1cc-a31a8fd07184',
    answer: '"人生天地间，长路有险夷"出自元好问的五言古诗《临汾李氏任运堂二首》（其一）。这句诗表达了人生旅途中的不确定性和挑战，意指人在广阔天地之间行走，漫长的人生路上充满了平坦与坎坷。它常用来比喻人生充满变数和挑战，需要勇敢面对。\n\n这句诗与现代英语中的俚语 "Life is a journey with many ups and downs" 相似。这个英语表达同样用来形容人生充满了起伏不定的经历，既有快乐时光也有困难时刻。\n\n具体的使用场景如下。\n中文场景：\n在毕业典礼上，校长鼓励学生们说：“人生天地间，长路有险夷。同学们即将踏上社会的大道，希望大家勇往直前，不畏艰难险阻。”\n英文场景：\nAt the graduation ceremony, the principal encouraged the students by saying, "Life is a journey with many ups and downs. As you all are about to embark on the path of society, I hope everyone will move forward bravely and not be afraid of difficulties and dangers."',
    hot: 633
  },
  {
    title: '九万里风鹏正举',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U643665.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjU2NTI7YWxnbz1obWFjLXNoYTI1NjtzaWc9UFR6OElyaDFkbytXbU9Fd1hEbDNYVXR2ZWFHWEI2MDNrNDkva0FTd2d6dz0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/b4c3747f-b34d-4667-90c9-a11c6f6618ec',
    answer: '"九万里风鹏正举"源自宋代李清照的《渔家傲·天接云涛连晓雾》。在这个寓言里，大鹏（一种神话中的巨鸟）展翅高飞，一飞冲天直达九万里高空，象征着志向远大和超越常人的能力。这句话后来被用来比喻胸怀壮志，追求高远目标的行动。\n\n这个典故与现代英语中的俚语 "The sky\'s the limit" 比较相似。这个英语表达意味着只有天空才是极限，通常用来鼓励人们追求自己的梦想，不受任何限制。\n\n具体的使用场景如下。\n中文场景：\n在一次创业论坛上，一位成功的企业家对年轻人说：“你们年轻就是最大的资本，应该怀揣梦想，九万里风鹏正举，勇往直前，创造属于自己的辉煌。”\n英文场景：\nAt a startup forum, a successful entrepreneur addressed the young audience, saying, "Youth is your greatest asset. You should harbor ambitions and soar like the giant bird riding the nine-thousand-mile wind, forging ahead courageously to create your own splendor."',
    hot: 425
  },
  {
    title: '度之往事，验之来事，参之平素，可则决之',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U132331.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjYxNDE7YWxnbz1obWFjLXNoYTI1NjtzaWc9VTVPSWtVd3M5QjI5N2ZPQkZmM3FXMkJQdGRWejNBZmZmeUIxZWZOWm9Ebz0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/7e5207c7-0eae-461e-b822-8a99dac0f1b0',
    answer: '"度之往事，验之来事，参之平素，可则决之"出自《鬼谷子·决篇》，这是春秋时期的一部史书。这句话的意思是，在做决策之前，要参考过去发生的事情，验证未来可能发生的事情，并结合平常的观察和经验，如果这些条件都符合，就可以做出决定。它强调了决策时应考虑多方面的因素和历史经验的重要性。\n\n这个典故与现代英语中的俚语 "Learn from the past, prepare for the future, live in the present" 相似。这个英语表达也提倡从过去的经验中学习，为将来做准备，并且珍惜当下。\n\n具体的使用场景如下。\n中文场景：\n公司高层在讨论新项目时，董事长建议：“我们应该‘度之往事，验之来事，参之平素，可则决之’，充分调研市场，借鉴以往的成功与失败经验，再结合当前的资源状况，慎重作出决策。”\n英文场景：\nDuring a discussion about a new project, the chairman of the company suggested, "We should \'learn from the past, prepare for the future, live in the present\' by conducting thorough market research, learning from both the successes and failures of previous experiences, and then making a careful decision based on our current resource situation."',
    hot: 345
  },
  {
    title: '凡贵通者，贵其能用之也',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U468512.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjY0Nzg7YWxnbz1obWFjLXNoYTI1NjtzaWc9MVJvZVJtZ29jN0NRS1RUc0hXdmE1ZWIwM0pjQld6NnZ0QVJiVkVRZUQ0WT0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/831d65ba-c430-43e2-80e3-c53b50b87860',
    answer: '"凡贵通者，贵其能用之也"出自东汉思想家王充的《论衡》。这句话的意思是，凡是被认为有价值的知识或技能，其真正宝贵之处在于能够将其应用于实践之中。荀子认为学习的目的不仅仅是为了获得知识，更重要的是能够将所学应用到生活中去解决问题。\n\n这个典故与现代英语中的俚语 "Knowledge is knowing what to say; wisdom is knowing whether to say it or not" 有些相似。这个英语表达强调了知识和智慧的区别，即知识是了解事实和信息，而智慧则是知道如何恰当地运用这些知识。\n\n具体的使用场景如下。\n中文场景：\n教授在课堂上对学生说：“学习语言不仅仅是记住单词和语法，更重要的是能够将所学用于实际交流。凡贵通者，贵其能用之也。”\n英文场景：\nIn class, the professor told the students, "Learning a language is not just about memorizing words and grammar, but more importantly, being able to apply what you\'ve learned in practical communication. Knowledge is valuable only when it is put to use."',
    hot: 153
  },
  {
    title: '苟利于民，不必法古；苟周于事，不必循俗',
    imageURL: 'https://sgw-dx.xf-yun.com/api/v1/sparkdesk/multimodal_image_290773692U748816.jpg?authorization=c2ltcGxlLWp3dCBhaz1zcGFya2Rlc2s4MDAwMDAwMDAwMDE7ZXhwPTMyOTE0MjY3NTc7YWxnbz1obWFjLXNoYTI1NjtzaWc9cnpPZ3V4RW45UUpOVHE3R0ZIZC92TjJBOVlJNkZTdGYzWWsxeHdVYW9Obz0=&x_location=7YfQJjZB7uKO7jlRxIftd6Fvdo==',
    videoURL: 'https://tv.cctv.com/408b51f6-7b5c-4350-8b72-10c0fc2e212f',
    answer: '"苟利于民，不必法古；苟周于事，不必循俗"出自《淮南子·氾论训》。这是西汉时期的政治家、文学家贾谊提出的思想，主张如果某个做法对人民有利，就不必拘泥于古代的成法；如果某种措施能够使事情完善，就不必一味遵循旧有的习俗。这句话体现了变革和实用主义的精神，强调政策和行为应以实际效果为导向，而不是单纯地坚持传统。\n\n这个典故与现代英语中的俚语 "If it ain\'t broke, don\'t fix it" 表达相反的理念，后者意味着如果没有问题，就没有必要去改变或修理它。然而，"苟利于民，不必法古；苟周于事，不必循俗"则鼓励我们在有益于民众和有助于完善事务的情况下勇于改革和创新。\n\n具体的使用场景如下。\n中文场景：\n市长在市政会议上强调：“城市的发展不能拘泥于过去的模式，我们需要根据当前的实际情况，敢于创新。苟利于民，不必法古；苟周于事，不必循俗。”\n英文场景：\nThe mayor emphasized at the municipal meeting, "The development of our city cannot be confined to old models. We need to innovate based on current realities. If something benefits the people, we do not have to adhere to ancient precedents; if something improves affairs, we do not have to follow outdated customs."',
    hot: 142
  },
])
const getHotAnswer = (item) => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    title.value = item.title
    answer.value = item.answer
    imageURL.value = item.imageURL
    videoURL.value = item.videoURL
  }, Math.random() * 1000)
}

const formHot = (hot) => {
  if(hot >= 1000) {
    return (hot / 1000).toFixed(1) + "k"
  }
  return hot
}
</script>

<template>
  <div class="wrapper">
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="!answer&&!isLoading">
        <div class="init-answer">
          <div class="init-title">为留华学生打造的“热门文化问答”功能:</div>
          <div class="init-content">
            <p>在留学中国的旅程中，对中华文化的探索和理解是一条充满挑战与乐趣的道路。为了帮助来自世界各地的留华学生更好地了解中国，我们精心准备了“热门文化问答”功能，这不仅是一个问题解答平台，更是一个文化交流和学习的窗口。</p>
            <p>这项功能精心筛选并记录了留华学生群体中经常询问的中华文化问题，涵盖了历史、哲学、艺术、语言、习俗等多个领域。通过智能数据分析，我们将这些问题整理成热门问答列表，便于留学生们快速访问和探索这些广受关注的文化主题</p>
            <p>用户可以轻松点击感兴趣的热门问题，系统会立即提供详尽的解答及相关文化背景信息。这种互动式的学习方式旨在促进留学生之间以及留学生与中国文化的深度对话，助力他们在日常生活和学术研讨中更自信地交流和分享。</p>
            <p>“热门文化问答”功能不仅节约了留学生寻找信息的时间，还提供了一个已由先行者探索过的知识地图，让新生们能迅速融入中华文化的学习环境。它是一个实用的知识库，更是一座沟通中外文化的桥梁，为留华学生开启一段丰富多彩的文化探索之旅。</p>
          </div>
          <div class="init-button">
            <div class="search-select-item" v-for="(item, index) in selectList" :key="item" @click="selectAnswer(item, index)"><el-button>{{item}}</el-button></div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="isLoading">
        <div class="loading-statue"><el-icon><Loading /></el-icon></div>
      </div>
    </Transition>
    <div class="header">
      <div>热门问答</div>
    </div>
    <div class="aside">
      <div class="aside-title">热门问题</div>
      <div class="aside-item-wrapper">
        <div class="aside-item" v-for="(item, index) in hotList" @click="getHotAnswer(item)">
          <div class="aside-item-info">
            <div class="aside-item-title">{{item.title}}</div>
            <div class="aside-item-hot"><img src="@/assets/hot.svg" alt="热力值">{{formHot(item.hot)}}</div>
          </div>
          <div class="aside-item-border" v-show="index < hotList.length - 1"></div>
        </div>
      </div>
    </div>
    <el-scrollbar>
      <Transition name="fade">
        <div class="answer-area show-answer" v-if="!isLoading&&answer">
          <h1 class="title">{{title}}</h1>
          <div class="source-wrapper">
            <img class="source" :src="imageURL || sourceList[sourceIndex].imageURL" alt="">
            <video controls class="source">
              <source :src="videoURL || sourceList[sourceIndex].videoURL" type="video/mp4" />
            </video>
          </div>
          <div class="answer">
            {{answer}}
          </div>
        </div>
      </Transition>
    </el-scrollbar>
    <div class="foo">
      <div class="search-select">
        <div class="search-select-item">猜你想问:</div>
        <div class="search-select-item" v-for="(item, index) in selectList" :key="item" @click="selectAnswer(item, index)"><el-button>{{item}}</el-button></div>
      </div>
      <div class="search-wrapper">
        <el-input v-model="input" placeholder="请输入问题" @keydown.enter="getAnswer"></el-input>
        <button class="operate" @click="getAnswer" :disabled="isLoading">
          <el-icon class="send-icon" v-if="input"><Position /></el-icon>
          <span v-else>搜索</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
  position: relative;
}
.header {
  position: absolute;
  top: 0;
  z-index: 99;
  height: 60px;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  line-height: 60px;
  color: #555;
  letter-spacing: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  transform: translateZ(0);
  border-bottom: var(--el-border);
  text-align: center;
  box-sizing: border-box;
  padding: 0 15px;
}
.aside {
  position: absolute;
  z-index: 1;
  top: 80px;
  left: 20px;
  width: 260px;
}
.aside-title {
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  cursor: default;
  margin-bottom: 10px;
  text-indent: 3px;
}
.aside-item-wrapper {
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.aside-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.aside-item:last-child {
  border-bottom: none;
}
.aside-item-info {
  box-sizing: border-box;
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.aside-item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aside-item-hot {
  display: flex;
  gap: 5px;
}
.aside-item-border {
  border-bottom: var(--el-border);
  margin: 0 10px;
}
.answer-area {
  //box-sizing: border-box;
  //padding: 60px 350px 250px;
  //height: 100%;
}
.show-answer {
  width: calc(100vw - 620px);
  margin: 80px auto 250px;
}
.title{
  font-size: 2rem;
  margin: 20px 0;
}
.source-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.source{
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);;
}
.answer {
  font-size: 1rem;
  line-height: 1.7rem;
  font-family: "Microsoft YaHei UI",serif;
  white-space: break-spaces;
}
.foo {
  position: absolute;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 95px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transform: translateZ(0);
  border-top: 1px solid var(--el-border-color);
  transition: 0.4s;
}
.foo:focus-within {
  height: 160px;
}
.search-select {
  width: 100%;
  height: 65px;
  position: absolute;
  bottom: 95px;
  box-sizing: border-box;
  padding: 25px 330px 0;
  opacity: 0;
  transition: transform 0.3s, opacity 0.2s;
  transform: translateY(40px);
  display: flex;
  justify-content: start;
  align-items: center;
}
.foo:focus-within .search-select {
  opacity: 1;
  transform: translateY(0);
}
.search-select-item {
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.search-select-item .el-button {
  border-radius: 8px;
}
.search-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 25px 300px;
  width: 100%;
  height: 95px;
}
.el-input{
  height: 45px;
  box-sizing: border-box;
  padding: 0 0 0 20px;
  display: flex;
  align-items: end;
  transition: 0.3s;
}
.el-input:deep(.el-input__wrapper)  {
  height: 100%;
  border-radius: 99px;
  border-width: 2px;
  background-color: rgba(70, 70, 70, 0.1);
}
.el-input:deep(.el-input__inner)  {
  text-indent: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #222;
}
.operate{
  border: none;
  background-color: #4192ff;
  box-sizing: border-box;
  padding: 4px 12px;
  margin: 0 10px;
  border-radius: 99px;
  color: #fff;
  transition: 0.3s;
  font-size: 1.2rem;
  white-space: nowrap;
  height: 45px;
  letter-spacing: 3px;
  text-indent: 3px;
}
.operate:hover{
  background-color: #77b1ff;
}
.operate:disabled{
  background-color: #5f8ac1;
  color: #c6c6c6;
  cursor: not-allowed;
}
.operate:active{
  background-color: #4192ff;
}
.send-icon {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 3px;
}
.pre-answer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.init-answer {
  width: 800px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 15px 15px 10px 15px;
  background-color: rgba(255, 255, 255, 0.7);
}
.init-title {
  height: 25px;
  line-height: 25px;
  font-size: 25px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
}
.init-content {
  color: #333;
  margin-bottom: 15px;
}
.init-button {
  display: flex;
  height: 40px;
}
.loading-statue {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #555;
  animation: infinite 1.5s loadingStart linear;
  transform-origin: center center;
}
@keyframes loadingStart {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>