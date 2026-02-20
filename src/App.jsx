import { useState, useMemo, useCallback } from "react";
import {
  Home,
  Book,
  Zap,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  CheckCircle,
  RotateCcw,
  X,
} from "lucide-react";

// Embedded vocabulary data
const D = [
["cardinal rule","The most important, fundamental rule","제1원칙, 가장 중요한 규칙","What's the cardinal rule of finance?","Atomic Habits"],
["chucking it down","Raining very heavily","폭우가 쏟아지다","It was absolutely chucking it down yesterday.","Atomic Habits"],
["clingy","Too emotionally dependent","집착하는, 달라붙는","He was too clingy, so I broke up with him.","Atomic Habits"],
["coast by","To succeed without effort","별 노력 없이 해내다","They assumed they would coast by on good looks.","Atomic Habits"],
["delayed gratification","Choosing to wait for a better reward","만족 지연, 즉각적 보상 거부","Delayed gratification is key to long-term success.","Atomic Habits"],
["devoid of","Completely lacking","~이 전혀 없는","This area is devoid of life.","Atomic Habits"],
["frivolous purchase","An unnecessary, wasteful purchase","쓸데없는 구매","I regret that frivolous purchase.","Atomic Habits"],
["greenlit","Given official approval to proceed","승인받은, 허가된","The show was eventually greenlit by the network.","Atomic Habits"],
["inundated with","Overwhelmed with too many things","~로 가득 찬, 쏟아지다","We were inundated with calls after the announcement.","Atomic Habits"],
["overhaul","To completely change or rebuild","전면 수리, 점검","My diet needs a complete overhaul.","Atomic Habits"],
["people pleaser","Someone who tries too hard to make others happy","남 눈치를 보는 사람","I'm too much of a people pleaser.","Atomic Habits"],
["precursor to","Something that comes before and leads to another","전조, 선구자","Phrenology was a precursor to modern psychology.","Atomic Habits"],
["pseudo-intellectual","Pretending to be intellectual","사이비 지식인","He's a pseudo-intellectual who uses big words incorrectly.","Atomic Habits"],
["resonate with","To evoke a strong feeling of understanding","공감하다, 와닿다","It really resonated with me.","Atomic Habits"],
["retail therapy","Shopping to improve your mood","쇼핑으로 기분전환","I need some retail therapy this weekend.","Atomic Habits"],
["splurge on","To spend a large amount of money on something","큰돈을 쓰다, 낭비하다","I splurged on a first-class ticket to Hawaii.","Atomic Habits"],
["textbook example","A perfect example of something","교과서적인 예","Turning off notifications is a textbook example of hiding bad cues.","Atomic Habits"],
["walk all over me","To treat someone with no respect","나를 만만하게 보다","Sometimes people walk all over me.","Atomic Habits"],
["a reprieve","A short period of relief from something difficult or unpleasant.","(고통이나 어려움에서의) 일시적인 해방, 유예","","Big Little Lies"],
["abhorred","Hated something very much, especially because it was morally wrong or","혐오하다","Mrs. Ponder hated costume parties.","Big Little Lies"],
["accosted","Approached and spoke to someone boldly or aggressively.","다가와서 말을 걸다 (특히 공격적으로)","","Big Little Lies"],
["amicable","Friendly and polite, often in situations where there might otherwise be tension.","우호적인, 원만한","","Big Little Lies"],
["articulate","To express something clearly and effectively in words.","분명하게 표현하다, 말로 잘 나타내다","","Big Little Lies"],
["artsy-fartsy","(Informal, slightly negative) Pretending to be artistic or creative in a","예술가인 척하는, 유난스러운","Stu is mocking men who are artistic or sensitive.","Big Little Lies"],
["as a matter of course","Something that is done routinely, without special attention.","당연한 일로, 으레 하는 일로","Mrs. Ponder was invited to the school event just because she lived nearby, as if it","Big Little Lies"],
["assembly","A group meeting of all the students and teachers in a school, usually held","조회, 집회","The children had a regular school assembly where they likely sang or heard","Big Little Lies"],
["at intervals","Happening from time to time, with breaks in between.","간헐적으로, 이따금","The children’s noise didn’t happen constantly, but off and on during the day.","Big Little Lies"],
["awe","A feeling of wonder mixed with respect or admiration.","경외감, 감탄","","Big Little Lies"],
["babble","Noisy, continuous, and often meaningless talking (especially by children).","왁자지껄한 말소리, (아이들의) 지껄임","Refers to the chaotic and cheerful noise made by school children.","Big Little Lies"],
["beads of sweat","Small drops of sweat on the skin, usually from heat, stress, or anxiety.","땀방울","","Big Little Lies"],
["bide one's time","To wait patiently for the right moment","때를 기다리다","Would you take action or bide your time?","Big Little Lies"],
["bossiness","A tendency to be too controlling or act like a boss.","거들먹거림, 명령하려는 성향","","Big Little Lies"],
["bossing the other children around","Telling other children what to do in a commanding or controlling way.","다른 아이들을 이래라저래라 하며 군림하다","","Big Little Lies"],
["briskly","Quickly and with energy.","활발하게, 바삐","Mrs. Ponder moved briskly due to nervousness and urgency.","Big Little Lies"],
["bylaw","A rule made by a local authority or organization.","(지방 정부나 단체의) 규정, 조례","","Big Little Lies"],
["calamity","A sudden and serious disaster or misfortune.","재앙, 큰 불행","","Big Little Lies"],
["calamity (again)","As above — repeated for emphasis in this scene.","재앙, 큰 불행","","Big Little Lies"],
["celestial","Related to the sky or heavens; beautiful and heavenly.","하늘의, 천상의, 신성한","","Big Little Lies"],
["center of attention","The person everyone is noticing or talking about.","주목의 대상, 관심의 중심","","Big Little Lies"],
["chatterbox","Someone who talks a lot","수다쟁이","He is a real chatterbox.","Big Little Lies"],
["chortled","Laughed in a breathy, amused way.","(숨을 섞어) 낄낄 웃다, 킥킥거리다","","Big Little Lies"],
["chuckle","A quiet, suppressed laugh.","킬킬 웃다, 조용히 웃다","","Big Little Lies"],
["client base","The group of regular customers or clients that a business serves.","고객층, 거래처","","Big Little Lies"],
["cliquey","Describes a group of people who form a tight, exclusive circle and are unfriendly","파벌 중심적인, 배타적인, 끼리끼리 노는","","Big Little Lies"],
["close-knit community","A group of people who are closely connected and supportive of one another.","끈끈한 공동체","","Big Little Lies"],
["clumpy mascara","Mascara that looks thick and uneven, often sticking lashes together.","떡진 마스카라","","Big Little Lies"],
["collateral damage","Unintended damage alongside the main target","부수적 피해","The scandal caused collateral damage to his family.","Big Little Lies"],
["come down with","To become ill with something","~에 걸리다 (병)","I've come down with a cold.","Big Little Lies"],
["come to blows","To start fighting physically","주먹다짐하다","The argument almost came to blows.","Big Little Lies"],
["conscious of the fact that","Aware or mindful of something.","~라는 사실을 인식하고 있는","","Big Little Lies"],
["contagious","Quickly spreading from one person to another, usually used for diseases or ideas.","전염성의, 전염되는","","Big Little Lies"],
["couldn’t bear t","Felt so upset or uncomfortable that she didn’t want to see what was","차마 볼 수 없었다","Audrey (a woman dressed up) couldn’t look at the violence happening.","Big Little Lies"],
["couldn’t care less","Didn’t care at all; had no interest.","전혀 신경 쓰지 않다","Mrs. Ponder didn’t care about the traffic or chaos around the school.","Big Little Lies"],
["cubbyholes","Small, enclosed spaces or compartments, often used by children or for storage.","작은 공간, 아늑한 구석","","Big Little Lies"],
["dead-end town","A town with no opportunities","전망 없는 마을","It's a dead-end town with nothing to do.","Big Little Lies"],
["deep in conversation","Very focused or engaged in talking seriously with someone.","진지하게 대화 중인","","Big Little Lies"],
["disconcerting","Making someone feel confused, uncomfortable, or worried.","당황하게 하는, 불안하게 만드는","Mrs. Ponder was disturbed by the language she heard.","Big Little Lies"],
["distasteful","Unpleasant or offensive; causing dislike.","불쾌한, 거북한","","Big Little Lies"],
["downpour","A sudden, heavy rain.","폭우","There had been heavy rain earlier that made Mrs. Ponder turn up the TV volume.","Big Little Lies"],
["dozing","Sleeping lightly or taking a short nap.","졸고 있는","The cat was dozing on the couch, not paying attention.","Big Little Lies"],
["driven off","Left in a vehicle; driven away from a place.","차를 몰고 떠나다","","Big Little Lies"],
["eased","Became less strong or severe.","누그러지다, 약해지다","The rain had eased, meaning it was no longer pouring.","Big Little Lies"],
["effervescent","Lively, enthusiastic, and bubbly in personality.","활기찬, 생기 넘치는","","Big Little Lies"],
["enchanting","Delightfully charming or attractive, almost magical.","매혹적인, 황홀한","","Big Little Lies"],
["enthused","Spoke with excitement or enthusiasm.","열정적으로 말하다","","Big Little Lies"],
["excuse my language","A polite way to apologize for using bad or offensive words.","말이 좀 거칠었네요, 욕해서 미안해요","","Big Little Lies"],
["face flushed","When someone's face turns red, usually from excitement, embarrassment, or","얼굴이 상기되다, 붉어지다","","Big Little Lies"],
["face lit up","Her face brightened with happiness or excitement.","얼굴이 환해지다, 기쁨이 얼굴에 드러나다","","Big Little Lies"],
["feel obligated","Feel like you must do something because it's the right or expected thing to do.","의무감을 느끼다, 해야 한다고 느끼다","","Big Little Lies"],
["feisty","Full of energy, confidence, and determination; sometimes a bit aggressive.","혈기왕성한, 당찬","","Big Little Lies"],
["fetid","Having a foul, rotten, or disgusting smell.","악취 나는","","Big Little Lies"],
["fixed on","Looking at something and not moving your eyes away from it.","~에 시선이 고정된","The parents had their eyes locked on their phones, not paying attention to","Big Little Lies"],
["flinch","To make a quick, nervous movement because of pain, fear, or surprise.","움찔하다","","Big Little Lies"],
["flouting","Openly disobeying or disregarding rules or social expectations.","(규칙, 관습 등을) 무시하다, 업신여기다","","Big Little Lies"],
["flustered","Nervous, confused, or embarrassed, especially from being rushed or","당황한, 허둥대는","","Big Little Lies"],
["for the most part","In general; usually; mostly.","대체로, 일반적으로","","Big Little Lies"],
["freelance","Working for yourself and offering your services to various clients, rather than","프리랜서의","","Big Little Lies"],
["frivolous","Not serious or important; silly or playful in a way that lacks purpose.","경솔한, 하찮은, 시시한","","Big Little Lies"],
["frowning earnestly","Looking serious or concerned, usually with a wrinkled forehead, showing","진지하게 찡그리다","","Big Little Lies"],
["frumpy","Not stylish; wearing clothes that are old-fashioned or unattractive.","촌스럽고 매력 없는, 후줄근한","The speaker doesn’t like the word “mum” because it sounds old-fashioned or","Big Little Lies"],
["fundamentalist","Someone who believes strongly and strictly in a set of ideas, often religious. Used","근본주의자 → 여기선 역할이나 신념을 지나치게 믿는 사람","","Big Little Lies"],
["furtive looks","Secretive or sneaky glances, often showing guilt or embarrassment.","은밀한 시선, 슬쩍 보는 눈빛","","Big Little Lies"],
["fussing","Showing too much concern or attention, especially in a nervous or overprotective","호들갑을 떠는, 지나치게 신경 쓰는","","Big Little Lies"],
["gesticulating","Moving your hands or arms to express something while speaking.","손짓을 하다, 몸짓으로 말하다","","Big Little Lies"],
["glance","A quick look.","흘끗 봄, 힐끗 보기","","Big Little Lies"],
["going on and on about it","Talking repeatedly and excessively about something, often annoyingly.","지겹도록 말하다, 계속 말하다","","Big Little Lies"],
["gravely injured","Very seriously hurt or wounded.","심각하게 다친","","Big Little Lies"],
["grief-stricken","Extremely sad, especially because of someone’s death or a terrible event.","비탄에 잠긴, 깊이 슬퍼하는","","Big Little Lies"],
["grimaced","Made a twisted face showing pain, disgust, or annoyance.","얼굴을 찡그리다 (불쾌감이나 고통 등으로)","","Big Little Lies"],
["grown old","Became old; aged over time.","나이를 먹다, 늙다","The “let them eat cake” idea was outdated.","Big Little Lies"],
["grown-up","Mature; behaving like an adult.","어른스러운, 성숙한","","Big Little Lies"],
["had a good old laugh at her expense","Laughed at someone else in a way that made them feel embarrassed.","~을 놀리며 실컷 웃다, ~을 희생양 삼아 웃다","","Big Little Lies"],
["heady","Strong and stimulating in a way that affects your senses or emotions.","자극적인, 흥분시키는","","Big Little Lies"],
["Helicopter parents","Parents who are overly involved in their children’s lives, constantly hovering","지나치게 간섭하는 부모","Miss Barnes talks about how intense parenting has become.","Big Little Lies"],
["highly defamatory","Very damaging to someone's reputation, often through false or harmful","매우 명예를 훼손하는","","Big Little Lies"],
["holding a grudge","Continuing to feel angry or resentful about something someone did in the past.","원한을 품다, 감정을 오래 간직하다","","Big Little Lies"],
["hollers","Loud shouts or cries, often angry.","고함, 외침","Angry people were yelling outside, which was upsetting.","Big Little Lies"],
["hot and bothered","Upset, agitated, or emotionally worked up, often over something frustrating or","흥분한, 열받은","Melissa jokes that the lice issue made people emotional.","Big Little Lies"],
["impeding an investigation","Blocking or hindering an investigation","수사를 방해하다","He was charged with impeding the investigation.","Big Little Lies"],
["in common","Shared by two or more people; having similarities.","공통으로, 공통점이 있는","","Big Little Lies"],
["in the picture","Involved or present in a situation or someone's life.","(상황에) 관련된, 관계된","","Big Little Lies"],
["in the same boat","In the same situation, usually a difficult one, as someone else.","같은 처지에 있는, 같은 상황에 있는","","Big Little Lies"],
["infuriating","Extremely annoying or frustrating; making someone very angry.","분노를 유발하는, 화나게 하는","","Big Little Lies"],
["insistently","In a demanding or repetitive way that refuses to be ignored.","끈질기게, 집요하게","","Big Little Lies"],
["insufferable","Extremely annoying or unpleasant; impossible to tolerate.","참을 수 없는, 견딜 수 없는","","Big Little Lies"],
["interrogate","To ask someone a lot of questions, often in a forceful or formal way.","심문하다, 캐묻다","","Big Little Lies"],
["I’ll tell you that for free","An informal phrase that means “I’m sure about this” or “you can take my word","그건 확실해요 / 그냥 말해줄게요 (공짜로 말해줄 정도로 분명함을 강조)","Jonathan insists there was nothing sexy about the book club.","Big Little Lies"],
["jammed with","Very full or crowded with something.","~로 가득 찬, 꽉 찬","","Big Little Lies"],
["keep harping on about","Continue to talk or complain about something in an annoying way.","(짜증나게) 계속해서 언급하다, 되풀이하다","","Big Little Lies"],
["keep it elevated","Raise something (like an injured ankle) to reduce swelling.","(부기를 줄이기 위해) 들어 올리다","","Big Little Lies"],
["kept it up","Continued doing something.","계속하다, 유지하다","","Big Little Lies"],
["knickers in a knot","(Informal) Getting overly upset or angry about something unimportant.","별일 아닌 일에 흥분하다","Stu uses it to criticize women for overreacting.","Big Little Lies"],
["knight in shining armor","A person who comes to the rescue in a heroic or idealized way.","(이상적인) 구원자, 영웅","","Big Little Lies"],
["knocked out","Hit someone so hard that they become unconscious.","기절시키다, 때려눕히다","A cricket ball almost hit Marie Antoinette hard enough to knock her out.","Big Little Lies"],
["lamely","Weakly or unconvincingly; without strength or confidence.","힘없이, 변변치 않게, 어색하게","","Big Little Lies"],
["lease","A legal agreement to rent a property for a specific time period.","임대 계약","","Big Little Lies"],
["let things go","To stop holding onto anger or resentment; to forgive and forget.","그냥 넘기다, 잊어버리다","Stu implies women don’t easily let go of anger or past events.","Big Little Lies"],
["logistics","The practical details or planning needed to carry out a task.","실행 계획, 물류, 세부적인 실행 절차","","Big Little Lies"],
["longed","Wanted something very much; yearned for.","간절히 바라다, 갈망하다","","Big Little Lies"],
["Lordy me","An old-fashioned or humorous expression of surprise or disbelief.","이런 맙소사, 아이고 (놀라거나 어이없을 때)","","Big Little Lies"],
["lurch","A sudden, unsteady movement; can also mean a sudden emotional reaction or","(감정적이거나 물리적인) 갑작스러운 흔들림, 충격","","Big Little Lies"],
["maniacally","In a crazy, wild, or uncontrolled way.","미친 듯이, 광적으로","Someone was screaming a swear word in a very extreme way.","Big Little Lies"],
["metamorphosed","Changed completely in form or appearance.","변신하다, 탈바꿈하다","","Big Little Lies"],
["minefield","A situation full of hidden dangers or difficulties.","(비유적으로) 위험이 도사린 상황, 지뢰밭","","Big Little Lies"],
["misshapen","Not having the normal or expected shape; twisted or deformed.","모양이 정상이 아닌, 일그러진","","Big Little Lies"],
["missing limbs","Used metaphorically here; a limb (like an arm or leg) that is absent, typically due","(여기서는 비유적으로) 사라진 팔다리 → 특이하게 보는 대상","","Big Little Lies"],
["mundane life","Ordinary, everyday life that can feel dull or lacking excitement.","평범한 일상, 지루한 일상","","Big Little Lies"],
["mused","Said thoughtfully or reflectively; spoke while deep in thought.","곰곰이 생각하며 말하다, 중얼거리다","","Big Little Lies"],
["must have cost you a small fortune","Likely to have been very expensive.","값이 꽤 나갔겠네요, 꽤 비쌌겠어요","","Big Little Lies"],
["never said it in the first place","This means someone is wrongly credited with saying something they never","애초에 말하지 않았다","It’s a historical correction—Marie Antoinette is often quoted as saying \"let them eat","Big Little Lies"],
["oblivious","Unaware of what is happening around you","무의식적인, 눈치 못 채는","Sometimes I am oblivious to social cues.","Big Little Lies"],
["of honorary status","Being treated with respect or inclusion without having the official role or","명예직의, 명예의 자격으로","Even though Mrs. Ponder had no children at the school, people treated her like she","Big Little Lies"],
["on a whim","Done suddenly without planning or serious thought; impulsively.","충동적으로, 즉흥적으로","","Big Little Lies"],
["on the loose","Escaped and not yet caught; free and potentially dangerous.","도망쳐서 아직 잡히지 않은 (범죄자 등)","","Big Little Lies"],
["one-night stand","A single sexual encounter with someone, usually without emotional attachment.","원나잇 스탠드, 하룻밤 관계","","Big Little Lies"],
["one-off","Something that happens only once; a single occurrence.","일회성의 일, 단 한 번 있었던 일","","Big Little Lies"],
["outraged","Extremely angry or shocked, usually because something seems unfair or wrong.","격분한, 분노한","","Big Little Lies"],
["over the hill","An informal expression meaning \"past your prime\" or \"getting old.\"","한물간, 나이 들어 기력이 떨어진","","Big Little Lies"],
["overly involved","Too much involved, to the point of being controlling or obsessive.","지나치게 관여하는","Refers to parents who are too focused on their kids’ lives.","Big Little Lies"],
["pasty white","Unhealthily pale or dull white in color (often implying lack of sun).","창백한, 혈색 없는","","Big Little Lies"],
["per se","A Latin phrase meaning “by itself” or “in itself”; used to clarify or narrow the","그 자체로는, 본질적으로는","Thea says she doesn’t have a problem with working mothers per se, but with a","Big Little Lies"],
["perched","Resting or positioned high up or at an edge.","(높은 곳에) 걸터앉은, 위치한","","Big Little Lies"],
["peripheral vision","The ability to see things at the side of your field of vision, not just what’s in front.","주변 시야, 측면 시야","","Big Little Lies"],
["plunging necklines","Clothes with a deep, low-cut V-shape at the front.","깊게 파인 네크라인","The women at the costume party wore very low-cut dresses.","Big Little Lies"],
["post-traumatic stress disorder (PTSD)","A mental health condition that can happen after someone goes through a","외상 후 스트레스 장애 (외상후 스트레스 장애 / PTSD)","Samantha says Melissa suffered from PTSD after dealing with her kids","Big Little Lies"],
["prefects","In British schools, older students with authority to help maintain discipline. Used","반장 같은 사람 (여기서는 ‘엄마 계급사회’의 비유적 표현)","","Big Little Lies"],
["prone t","Likely to feel anxious or worried often.","불안을 잘 느끼는, 불안해하기 쉬운","","Big Little Lies"],
["propping her leg up","Lifting and supporting her leg (usually for comfort or recovery).","다리를 올려 놓다, 다리를 받쳐 주다","","Big Little Lies"],
["prude","Someone who is easily shocked or embarrassed by things related to sex,","고지식한 사람, 새침한 사람","Mrs. Ponder wasn’t overly sensitive, but she was still bothered by bad language.","Big Little Lies"],
["pulled up","Stopped a vehicle, usually at the side of the road or at a light.","(차를) 멈추다, 정차하다","","Big Little Lies"],
["punch-ups","Fights involving punching; physical fights.","주먹다짐, 몸싸움","","Big Little Lies"],
["put Jackson in a headlock","Grabbed someone around the head with the arm, usually in a playful or","잭슨의 목을 팔로 감다 (장난이나 싸움에서)","","Big Little Lies"],
["put my heart and soul int","Put all of one's energy, passion, and effort into something.","온 마음과 정성을 다하다","","Big Little Lies"],
["quintessential","The perfect or most typical example of something.","전형적인, 대표적인","","Big Little Lies"],
["quote-unquote","Used to show irony or distance from a phrase being quoted, often to suggest","이른바, 말하자면 (비꼬거나 비판할 때 사용)","","Big Little Lies"],
["readjusted her expectations","Changed what she hoped for or expected to match the reality of the situation.","기대를 다시 조정하다, 기대치를 낮추다","","Big Little Lies"],
["reeling from","Feeling shocked and unsteady","충격에 휘청거리다","I was reeling from the unexpected news.","Big Little Lies"],
["repressed anger","Anger that is suppressed and hidden","억눌린 분노","Years of repressed anger finally surfaced.","Big Little Lies"],
["rouse","To wake someone up or stir them into action (physically or emotionally).","깨우다, 자극하다","","Big Little Lies"],
["ruffians","Rough or violent people, often used in a slightly joking or exaggerated way for","악당, 말썽꾸러기 (여기서는 귀엽게 표현됨)","","Big Little Lies"],
["running amuck","Behaving in a wild, uncontrolled, or chaotic way.","미친 듯이 날뛰다, 통제 불능 상태로 행동하다","","Big Little Lies"],
["sad indictment","A strong criticism or something that shows a problem or failure, often in a","안타까운 증거, 슬픈 비난","","Big Little Lies"],
["safely cushioned","Protected or emotionally shielded from pain, risk, or danger.","안전하게 보호된, 완충된 상태","","Big Little Lies"],
["serves me right for","An expression meaning “I deserved that because of my own behavior.”","내 자업자득이지","","Big Little Lies"],
["shrink away","To physically or emotionally withdraw, especially out of discomfort or fear.","움츠러들다, 위축되다","","Big Little Lies"],
["shuddered","Trembled or shook, usually from fear, disgust, or cold.","몸을 떨다, 오싹하다","","Big Little Lies"],
["sleek","Smooth, shiny, and looking elegant or well-groomed.","매끈한, 윤기나는","Used to describe mothers who are slim and well-presented.","Big Little Lies"],
["smiled ruefully","Smiled in a way that shows regret or sadness.","씁쓸하게 웃다, 후회 섞인 웃음을 짓다","","Big Little Lies"],
["sneered","Smiled or spoke in a way that shows dislike or disrespect.","비웃다, 냉소하다","Marie Antoinette sneered when she heard a comment she found insulting.","Big Little Lies"],
["some bright spark","A sarcastic way to refer to someone who had an idea that the speaker thinks is","(비꼬는 말투로) 기발한 사람, 재치 있는 척하는 사람","Mrs. Ponder is mocking the person who decided to make the trivia night into a","Big Little Lies"],
["spill out","To come out in large numbers, like liquid or people rushing out of a place.","쏟아져 나오다","People suddenly rushed out of the building.","Big Little Lies"],
["spiraled out of control","Got worse and worse, becoming impossible to manage.","감당할 수 없게 악화되다","Bonnie says the situation escalated quickly after feelings got hurt.","Big Little Lies"],
["squeal of tires","A high-pitched sound made when car tires spin or stop suddenly.","타이어 끼익 소리","","Big Little Lies"],
["staring vacantly","Looking ahead with an empty or blank expression, not really focusing on","멍하니 바라보다, 넋을 놓고 쳐다보다","","Big Little Lies"],
["steer clear","To avoid something or someone.","피하다, 멀리하다","","Big Little Lies"],
["stick with","To stay with, choose, or continue supporting something or someone.","~을 고수하다, 계속 함께하다","","Big Little Lies"],
["swooping","Moving quickly and smoothly through the air in a curved path, often downward.","곡선을 그리며 휙 지나가는, 급강하하는","","Big Little Lies"],
["swore like a trooper","Used very strong and rude language.","욕을 입에 달고 살다","Her daughter used to swear a lot, like a soldier.","Big Little Lies"],
["swung around in her chair","Turned quickly while seated, often to look at or talk to someone.","의자에서 휙 돌아보다","","Big Little Lies"],
["take your eyes off","To stop looking at something.","~에서 눈을 떼다","","Big Little Lies"],
["technologically savvy","Skilled or knowledgeable about technology.","기술에 능숙한, IT 에 밝은","","Big Little Lies"],
["tempted fate","Did something risky or spoke too confidently, almost challenging bad luck.","운명을 시험하다, 재수 없게 굴다","","Big Little Lies"],
["tend it like a little pet","(Metaphorical) Taking care of a grudge as if it were something precious or","마치 애완동물처럼 소중히 원한을 간직하다","","Big Little Lies"],
["texting","Sending written messages using a mobile phone.","문자 보내기","","Big Little Lies"],
["That's my motto.","A phrase someone lives by or believes in strongly.","그게 내 좌우명이야","","Big Little Lies"],
["the latter","The second of two things previously mentioned.","후자","","Big Little Lies"],
["The phrase ‘crass commercialism’ is used t","Sleeping deeply and peacefully.","깊이 잠든 상태","When Celeste checked the room, the boys were sound asleep.","Big Little Lies"],
["the school run","The daily routine of taking children to and from school.","아이들을 학교에 데려다주고 데려오는 일","More fathers were participating in the school run, but they did it in a laid-back way.","Big Little Lies"],
["thrived on","Did very well in or enjoyed something (often something stressful or intense).","~을 잘 견디며 즐기다, ~에서 활력을 얻다","","Big Little Lies"],
["tonic","Originally a medicinal drink meant to restore energy; used here metaphorically to","활력을 주는 것, 자양제 (비유적으로 사용됨)","","Big Little Lies"],
["took a deep breath","Breathed in deeply, usually to calm down or prepare oneself.","심호흡을 하다","","Big Little Lies"],
["took a sip","Drank a small amount.","한 모금 마시다","","Big Little Lies"],
["took pride in","Felt proud or had self-respect about something.","~에 자부심을 느끼다","","Big Little Lies"],
["traced back to","Used to describe the origin or cause of something.","~로 거슬러 올라가다, 원인을 찾다","Bonnie says most conflicts can be traced back to hurt feelings.","Big Little Lies"],
["tread s","To act or speak very carefully so as not to offend or upset someone.","조심스럽게 다루다, 말이나 행동을 신중히 하다","","Big Little Lies"],
["trilled","Spoke or sang with a high, musical voice, often with a shaking or warbling","(높고 떨리는 목소리로) 노래하다, 말하다","","Big Little Lies"],
["turn the work over fast","Finish or complete tasks quickly.","일을 빠르게 처리하다","","Big Little Lies"],
["ungainly","Awkward or clumsy, especially in movement or appearance.","보기 흉한, 어색한, 서투른","","Big Little Lies"],
["up-to-date with","Having the most recent information or knowledge about something.","~에 대해 최신 정보를 알고 있는","","Big Little Lies"],
["up-yours","A rude hand gesture showing disrespect or defiance (usually raising the middle","모욕적인 손짓 (가운뎃손가락을 드는 제스처)","","Big Little Lies"],
["verifiable phenomenon","Something that can be proven or confirmed through evidence.","입증 가능한 현상","","Big Little Lies"],
["walked out on me","Left someone suddenly and abandoned the relationship or responsibility.","(갑자기) 나를 떠나다, 버리고 가다","","Big Little Lies"],
["walker","A tool that helps people walk if they have trouble doing it on their own.","보행 보조기","Mrs. Ponder used a walker for support as she moved.","Big Little Lies"],
["watch","Used here more for effect — Mrs. Ponder couldn’t bear to watch the chaotic","보다 (보는 것이 힘들 정도로 괴로움)","Emphasizes how overwhelming the scene was.","Big Little Lies"],
["watering","Pouring water on plants to help them grow.","물을 주다","Mrs. Ponder was outside watering her garden when people passed by.","Big Little Lies"],
["Wealth and Insecurity:","Feeling extremely happy, excited, and joyful.","황홀한, 매우 행복한","She felt euphoric after hearing the good news.","Big Little Lies"],
["weaved through","Moved through something by going around people or obstacles in a winding way.","이리저리 빠져나가다, 구불구불 지나가다","","Big Little Lies"],
["What are you babbling on about, woman?","(Informal) What are you talking about? Used when someone is speaking","무슨 소리 하는 거예요, 아줌마? (농담조, 익살스럽게)","","Big Little Lies"],
["What d","A powerful punch using the right hand, often used metaphorically to mean a sudden or","강한 오른손 훅 / 강한 반응이나 공격 (비유적 표현)","Chloe would have knocked him out with a right hook.","Big Little Lies"],
["whimsical","Playful, quirky, or fanciful, often in a charming or imaginative way.","엉뚱한, 기발한, 유쾌한","","Big Little Lies"],
["wringing their hands","Twisting their hands together, often showing worry or anxiety.","(불안하거나 초조해서) 손을 비틀다","","Big Little Lies"],
["writing in pain (note: likely a typ","Twisting or moving because of great pain.","고통으로 몸부림치다","","Big Little Lies"],
["Zeitgeist","The defining spirit or mood of a particular period in history.","시대정신, 그 시대의 분위기","“She was being show-offy with her fancy new car.”","Big Little Lies"],
["a bad egg (idiom)","A person who behaves badly or causes trouble.","말썽꾸러기, 나쁜 사람","Everyone avoided him at school because he was considered a bad egg.","Educated"],
["a cascade","A large amount of something falling or hanging down, like a waterfall.","폭포처럼 쏟아짐,","…the longest hair I’d ever seen, a cascade the color of field mice that fell to her knees…","Educated"],
["a favorite haunt of mine (noun phrase)","A place someone visits often because they like it.","내가 자주 찾는 장소, 단골 장소","Then one night, when I was wandering alone in the dark wings backstage, I turned a corner and","Educated"],
["a pleaser","A person who always tries to make others happy or gain their approval.","남을 기쁘게 하려는","Mother often described herself as a pleaser…","Educated"],
["abide","To tolerate or accept something.","참다, 견디다, 용납하다","God couldn’t abide faithlessness, Dad said.","Educated"],
["abrasion (noun)","A scrape or wound on the skin caused by rubbing or scraping against something rough.","찰과상, 긁힌 상처","When I touched the abrasion, Shawn released a long sigh and his eyes opened.","Educated"],
["abstractions (noun)","Concepts or ideas that are theoretical and not concrete.","추상적인 개념","I couldn’t grasp such abstractions. I could feel the logic in them…","Educated"],
["agitated","Feeling or showing nervousness, worry, or anger.","불안해하는, 동요한","“I showed Mother the score and she told Dad. He became agitated, then he shouted that it was","Educated"],
["airlifted (verb)","Transported by aircraft, usually in an emergency situation.","항공으로 이송되다","Someone had called 911, and he’d been airlifted to a hospital in Pocatello.","Educated"],
["all I have to go on","The only available evidence or information.","내가 의지할 수 있는 전부","…so all I have to go on are hints from my mother…","Educated"],
["allotted time","The specific amount of time officially given for something.","할당된 시간","“I was slow, needing double or triple the allotted time.”","Educated"],
["ambled over (verb phrase)","Walked slowly and in a relaxed, unhurried way.","느긋하게 걸어가다","Shawn stepped down from his welding and ambled over to the flatbed pickup.","Educated"],
["appetite for unconventionality","A strong desire or preference for things that are unusual or not traditional.","비전통적인 것에","…and an appetite for unconventionality.","Educated"],
["approached warily (verb phrase)","Came closer cautiously, with care.","조심스럽게 다가가다","I approached warily, afraid the horse would buck or rear. / 나는 말이 발길질하거나 일어설까","Educated"],
["aptitude (noun)","A natural ability or talent for learning or understanding something.","소질, 재능","Dad had little formal education in mathematics but it was impossible to doubt his aptitude…","Educated"],
["arid, desiccating heat (adjective phrase)","Extremely dry and scorching heat that removes all moisture.","건조하고 메마른 더위","“It was a rainless summer. The sun blazed across the sky each afternoon, scorching the mountain","Educated"],
["awash in rumors (adjective phrase)","Surrounded or filled with many rumors.","소문이 가득한.","SADIE’S PARENTS WERE DIVORCING and the town was awash in rumors about her father. /","Educated"],
["backcountry (noun)","Remote or sparsely populated areas far from towns or cities.","오지, 산골","…that thick darkness that belongs only in backcountry, where the houses are few and the","Educated"],
["bait them (phrasal verb)","To deliberately annoy or provoke someone.","의도적으로 화나게 하다, 도발하다","He loved to bait them with jokes and tricks. / 그는 농담과 장난으로 그들을 도발하는 것을","Educated"],
["bald tires (noun phrase)","Tires so worn down that they have little or no tread left, making them unsafe.","마모된 타이어","Mother’s car, which I had driven to Debbie’s, had bald tires.","Educated"],
["baling implement (noun phrase)","A tool or piece of equipment used for baling (tying or bundling materials, like hay or twine). /","“리처드는 그것을 그냥 끈이라고 하지 않고, 본인 성격대로 묶는 도구라고 표현했다.”","“The first thing Richard remembers is the twine, which, true to his nature, he refers to as a baling","Educated"],
["balmy (adjective)","Warm, pleasant, and gentle, usually referring to weather.","(날씨가) 온화한, 상쾌한","It was a balmy summer evening, perfect for the motorcycle…","Educated"],
["barrel (noun)","The long, cylindrical part of a gun through which the bullet travels when fired.","총열","That mighty barrel, with its special range that could reach from the mountain to the valley, was a","Educated"],
["beat back (phrasal verb)","To drive something away, fight it off, or stop it from advancing.","물리치다, 억누르다","“Then he takes off his shirt and begins to beat back the flames.”","Educated"],
["become intelligible (phrase)","To become understandable or clear, no longer confusing.","이해할 수 있게 되다","…but the trigonometry had become intelligible, messages written in a language I could","Educated"],
["behind that vacant expression, riding it out","Hiding emotions behind a blank face, enduring a difficult situation silently.","멍한 표정 뒤에","He was just sitting there, behind that vacant expression, riding it out.","Educated"],
["bellow (verb)","To shout or make a loud, deep noise, like an animal.","고함치다, 큰 소리로 외치다","“I’d never heard an animal bellow like that.”","Educated"],
["besides (adverb)","Used to add more information, often to emphasize an additional point.","게다가 / 뿐만 아니라","“We can’t keep using a forklift and an old cheese pallet,” Shawn said. “It looks like shit, and it’s","Educated"],
["bestowed (verb)","To give something as an honor or gift.","수여하다, 부여하다","“It was not inherent; it was bestowed.”","Educated"],
["bewildered (adjective)","Very confused or puzzled.","매우 혼란스러운, 당황한","“Then I watched as planes sank into them, and I stared, bewildered, at the TV …”","Educated"],
["birthright for a mess of pottage (idiom)","To give up something valuable for something trivial or temporary; from the biblical story of","“나는 내 장자권을 하찮은 죽 한 그릇에 팔아넘기려 했던 것이다.”","“I had tried to sell my birthright for a mess of pottage.”","Educated"],
["bodice (noun)","The upper part of a dress covering the chest and waist.","(드레스의) 상체 부분, 보디스","She said, passing me a navy dress with white braided cords arranged across the bodice.","Educated"],
["bona fide agent of the Illuminati","A genuine / real (though sarcastic here) representative of the secret society “Illuminati.” /","“…생각해 보니, 악마의 봉급을 받는 일루미나티의 진짜 요원이라도…”","“…come to think of it, a bona fide agent of the Illuminati, who at least knows he’s on the devil’s","Educated"],
["bowlegged ruffians","Villains or troublemakers with bent legs (often used to create a rugged, Western image). /","…O 다리 불량배들이 서로에게 소리치고 있었다…","…of bowlegged ruffians shouting at each other…","Educated"],
["braced myself (verb phrase)","To prepare yourself physically or mentally for something difficult or unpleasant.","마음을 단단히 먹다, 대비하다","I braced myself for what I wasn’t sure, then he said, “I wanted to tell you that your singing is","Educated"],
["brain-dead woman who’s got herself into a scrape","A very insulting way of describing a foolish woman who has gotten herself into trouble.","스스로","…like to think they’re saving some brain-dead woman who’s got herself into a scrape.","Educated"],
["bravado (noun)","A show of boldness or confidence that is often meant to impress or hide fear.","허세, 허장성세","When he was alone with me, the bravado disappeared. / 그가 나와 단둘이 있을 때는 허세가","Educated"],
["break (verb – in context of horses)","To train a horse so it accepts being ridden.","말을 길들이다, 훈련하다","Grandpa said, “That ’un we’ll break.” / 할아버지는 “저 녀석은 우리가 길들일 거야”라고","Educated"],
["brought to a stop","Forced to stop or made to halt.","멈춰지다","…and was finally brought to a stop only when it collided with a row-crop tractor.","Educated"],
["buck (verb)","When a horse kicks its back legs up suddenly.","말이 뒷발질하다","The wild horse bucked and tried to throw off its rider. / 야생마는 뒷발질하며 기수를 떨쳐내려","Educated"],
["buck under (the restraints he put on her)","To give in or submit to pressure, control, or restrictions.","그가 가한 구속에 굴복하다","“For a year she’d been fighting with Dad, bucking under the restraints he put on her.”","Educated"],
["buckled (verb)","To bend or collapse under pressure or strain.","(압력으로) 구부러지다, 무너지다","“…the unimaginably tall structures swayed, then buckled.”","Educated"],
["burly bodies (adjective + noun)","Large, strong, and heavy in build.","크고 강인하며 육중한 체구","The horses moved their burly bodies delicately, as if guided by the rider’s thoughts. / 말들은","Educated"],
["burst out of here in a blaze","To leave explosively, dramatically, with fiery passion.","불길처럼 폭발적으로 뛰쳐나오다","“...you were the one I thought would burst out of here in a blaze.”","Educated"],
["cackling (verb)","Laughing in a harsh, loud, or unpleasant way.","깔깔 웃다, 날카롭게 웃다","“…he just laughed. He drove all twelve miles like that, cackling as if it were a game.”","Educated"],
["calendula","A type of medicinal plant (marigold) often used in herbal remedies.","금잔화 (약용 식물)","“Do you have calendula?” the midwife said.","Educated"],
["cancer in her bone marrow (noun phrase)","A serious disease where cancer affects the soft tissue inside bones.","뼛속의 골수에 발생하는 암","The doctors diagnosed him with cancer in his bone marrow.","Educated"],
["capricious (adjective)","Unpredictable, subject to sudden changes in mood or behavior.","변덕스러운","…where the physical world often seemed unstable, capricious. But here was a principle…","Educated"],
["carefully concocted","Deliberately and skillfully created, often with the sense of being artificial.","신중하게 꾸며낸,","That air of respectability was carefully concocted by her mother.","Educated"],
["caressed (verb)","Touched or stroked gently, often with affection or care.","애무하다, 부드럽게 쓰다듬다","“Shawn picked it up and caressed it, sometimes spinning it over his index like a gunslinger…”","Educated"],
["carried herself","The way someone presents themselves through posture, movement, and manner.","몸가짐을","…the way she carried herself made you feel foolish for having noticed.","Educated"],
["casserole (noun)","A dish cooked slowly in the oven, often a mix of meat, vegetables, and sauce.","캐서롤, 찜 요리","Tyler answered the door. We settled in the living room while Debbie prepared a casserole.","Educated"],
["caveat","A warning or condition attached to something.","경고, 조건","…this was the first time in her life that she was, without question or caveat, the one in charge.","Educated"],
["cavorting (verb – present participle)","Jumping or dancing around excitedly, often in a playful or inappropriate way.","신나게 뛰놀다, 방정맞게 뛰다","“There’s no telling what kind of cavorting takes place in that theater,” he said.","Educated"],
["CB (noun, abbreviation for “Citizens Band radio”)","A type of radio used by truckers and drivers to talk over short distances.","트럭 운전자들이","We’d turn on the CB and listen to the lonely banter of truckers. / 우리는 CB 를 켜고 트럭","Educated"],
["chakras and pressure points","Chakras are believed centers of spiritual energy in the body; pressure points are spots on the body","“집 안에는 차크라와 지압점의 그림이 나타났다.”","“Diagrams of chakras and pressure points appeared around the house.”","Educated"],
["charismatic gale of a man that he was","A metaphorical phrase describing a man as a powerful, energetic, and magnetic personality. /","…그가 매력적이고 거센 바람 같은 남자였지만, 잠시 동안은 그녀의 힘에 밀려났다.","…charismatic gale of a man that he was—was temporarily swept aside by the force of her.","Educated"],
["chiropractor (noun)","A healthcare professional who treats problems of the bones, muscles, and joints, often by","교통사고 후 그녀는 허리 통증을 완화하기 위해 척추 지압사를 찾았다.","After the car accident, she visited a chiropractor to relieve her back pain.","Educated"],
["chirrup (noun)","A short, high-pitched sound, like that of a bird or insect.","짹짹거림, 짧고 높은 소리","The chirrup of crosswalk signals, the shrieking of sirens, the hissing of air brakes…","Educated"],
["choke the flames while they’re young (idiomatic phrase)","To extinguish a fire when it’s still small and manageable (metaphorically, to stop a problem","“그는 불씨가 작을 때 불을 꺼야 산불을 막고 집을 지킬 수 있다고 생각했다.”","“He thinks if he can choke the flames while they’re young, he can prevent a wildfire, maybe","Educated"],
["chopper (noun, informal)","Slang for a helicopter, often used in emergency or military contexts.","헬리콥터","I struggle to imagine the scene while they waited for the chopper.","Educated"],
["churned (verb, past tense)","To stir or mix something with force, usually to produce a smooth or thick result.","마구 휘젓다, 뒤섞다","My family boiled and skinned peaches, pitted apricots and churned apples into sauce.","Educated"],
["cinched (verb – past tense of cinch)","To tighten firmly, especially a saddle on a horse.","단단히 조이다 (특히 말안장)","An hour later the saddle was cinched. / 한 시간 뒤 안장이 단단히 조여졌다.","Educated"],
["claim for herself","To take or demand something as her own right.","스스로 주장하다, 자기 몫으로 요구하다","“I tried to imagine what future such a woman might claim for herself.”","Educated"],
["clattering (verb)","Making a series of loud, rattling, metallic or hard sounds.","덜거덕거리다","“…as if my teeth weren’t clattering.”","Educated"],
["clenching the wheel, wraithlike","“Clenching the wheel” = gripping the steering wheel tightly due to fear or stress; “wraithlike” =","“사람들은 병원에서 죽어,” 그녀는 속삭이며, 핸들을 꽉 쥐고 유령 같은 모습이었다.","“People die in hospitals,” she whispered, her fingers clenching the wheel, wraithlike.","Educated"],
["clustered (verb, past tense)","Gathered closely together in a group.","모여 있다, 무리를 이루다","Seven or eight people huddled around something on the gravel, clustered by the ditch.","Educated"],
["coalescing into sediment","Coming together and solidifying into layers, like sand forming rock.","합쳐져 퇴적물이 되다","…choices, numberless as grains of sand, had layered and compressed, coalescing into sediment…","Educated"],
["cohosh and skullcap","Two medicinal herbs used in traditional remedies (often for women’s health).","승마풀과 스컬캡","…its glossy finish looking out of place next to the murky jars of cohosh and skullcap.","Educated"],
["color of taffy","A soft candy color, often light pink, yellow, or pastel; used to describe a bright, candy-like shade.","“그녀는 청바지와… 태피 사탕 같은 색깔의 발레화를 신고 있었다.”","“She wore jeans… and ballet shoes the color of taffy.”","Educated"],
["combustible (adjective)","Easily set on fire; figuratively, easily provoked or volatile.","가연성의, 쉽게 불붙는 / (비유적으로) 쉽게 폭발할 듯한","The mood around him was charged, combustible.","Educated"],
["come back into himself","To regain awareness, energy, or normal behavior after a period of detachment.","제정신을","On the third day he seemed to come back into himself…","Educated"],
["come of age in the 1950s","To reach adulthood or maturity in the 1950s.","1950 년대에 성년이 되다","My grandmother, LaRue, had come of age in the 1950s…","Educated"],
["come to think of it","Used when recalling or realizing something upon reflection.","생각해 보니","Dad grinned. “Don’t know which is worse, come to think of it, a bona fide agent of the","Educated"],
["comes breech","In childbirth, when a baby is positioned feet or buttocks first instead of head first.","역아로","“Do you know what it means when a baby comes breech?”","Educated"],
["compliant (adjective)","Willing to obey or agree without resistance.","순종적인, 따르는.","I tried to imagine something else, something that would take me out of myself, but the image that","Educated"],
["concealed on his body (verb phrase)","Hidden on a person’s body, usually referring to a weapon.","몸에 숨겨진","The police found a knife concealed on his body.","Educated"],
["concussed computations (phrase)","Likely a figurative expression—“concussed” meaning shaken, damaged, or muddled; together it","혼란스러운 계산","…“ I sometimes dreamed about sine, cosine and tangent, about","Educated"],
["conduct it","To channel, direct, or transmit energy or a force.","(에너지 등을) 전도하다, 전달하다","“I tried to focus, worried I was a break in the chain that Mother and Richard’s healing power","Educated"],
["confided in me (verb phrase)","To share a secret or private thought with someone you trust.","나에게 비밀을 털어놓았다","“When I did, finally, he confided in me that he was in love with Sadie.”","Educated"],
["contorted (verb, past participle/adjective)","Twisted or bent out of normal shape, often in a way that shows pain or struggle.","뒤틀린, 일그러진","Shawn’s body was contorted, his back twisted.","Educated"],
["contorting herself","Twisting or bending unnaturally; here used metaphorically to mean forcing oneself to adapt or","…자신을 억지로, 원치 않게, 그것에 맞추도록 비틀면서.","…and from contorting herself, compulsively, unwillingly, into whatever it was.","Educated"],
["coquettish voice","A flirtatious or playful tone of speaking.","요염한 목소리, 교태를 부리는 목소리","She put on a high, coquettish voice very unlike her own.","Educated"],
["crisscrossing patterns of fissures and cracks","Intersecting lines of splits and breaks, like shattered glass.","균열과 금이 교차하는 무늬","I saw crisscrossing patterns of fissures and cracks.","Educated"],
["croaky (adjective)","Having a rough, hoarse, or weak voice, usually from illness.","목이 쉰, 쉰 목소리의","Dad noticed I was a bit croaky and said, “Well, what do you expect?”","Educated"],
["crush the windpipe (phrase)","To squeeze or hit someone’s throat so hard it blocks breathing.","기관지를 세게 눌러 숨을 막다.","And where to aim to crush the windpipe. / 그리고 기관지를 눌러 부수는 지점을 어디로","Educated"],
["cussing (verb/gerund)","Using offensive language; swearing.","욕을 하다","When he and Dad came home, hours after sunset, they were nearly always cussing.","Educated"],
["cut down one by one","To be killed or defeated gradually, one after another.","하나씩 차례로 쓰러뜨리다, 죽이다","…Unwilling to suffer a humiliating defeat, cut down one by one as they tried to break through the","Educated"],
["Dad’s fervor","Strong passion, enthusiasm, or intense belief.","아버지의 열정, 열성","I sometimes wonder if Dad’s fervor had more to do with his own mother than with doctrine.","Educated"],
["Dad’s resolve turned to denial","His determination shifted into refusal to accept reality.","아버지의 결심이 부정으로 변하다","“As spring turned to summer, Dad’s resolve turned to denial.”","Educated"],
["damned near taken someone’s head off (idiom)","Came very close to seriously injuring or yelling harshly at someone; an exaggerated way of","누군가의 머리를 거의 날려버릴 뻔하다 (과장된 표현, 심하게 다칠 뻔하다)","…Shawn screaming that Dad had damned near taken someone’s head off.","Educated"],
["dash brains against rock (idiomatic phrase)","To violently kill or destroy (used here to show fear of horses’ power).","뇌를 바위에 부딪혀","I was terrified of horses, thinking they might dash brains against rock. / 나는 말이 사람의","Educated"],
["dead flesh (noun phrase)","Parts of the body’s tissue that are no longer alive or healthy.","죽은 살, 괴사 조직","“Mother dressed the leg in mullein and comfrey salve, her own recipe. She was good with","Educated"],
["decimal (noun)","A number expressed using the base 10 system, especially numbers with a point (e.g., 0.5, 3.14).","소수","…and seeing a decimal on the page made my heart race.","Educated"],
["decrypt its logic (verb phrase)","To uncover or reveal the reasoning hidden within something complex.","논리를 해독하다","…that Dad could command this science, could decipher its language, decrypt its logic…","Educated"],
["defensive perimeter (noun phrase)","A protective boundary set up to guard against danger or attack.","방어 경계선","That mighty barrel, with its special range, was a defensive perimeter for the house.","Educated"],
["define my memory of that night (verb phrase)","To shape or determine how an event is remembered.","그 밤의 기억을 규정하다, 형성하다.","This moment would define my memory of that night, and of the many nights like it, for a decade.","Educated"],
["deflate, to collapse in on himself","To lose energy, confidence, or spirit, appearing emotionally or physically drained.","기가 꺾이다,","But after Christmas Dad seemed to deflate, to collapse in on himself.","Educated"],
["delirious with fever and pain (phrase)","Being in a confused or disturbed state of mind due to extreme illness or pain.","열과 통증으로","“He barely slept, he was so delirious with fever and pain.”","Educated"],
["den of adulterers and fornicators (noun phrase)","A place described as sinful, filled with immoral or corrupt people.","간음자와 음행자들의 소굴","“It’s probably a den of adulterers and fornicators.”","Educated"],
["deranged","Mentally unstable, disturbed, or behaving in a crazy way.","제정신이 아닌, 미친 듯한","…hair deranged and dark circles under her eyes, her lips were parted in a wide smile.","Educated"],
["deserted","Abandoned or left behind.","버려진, 떠난","“In mimicry of a brother who’d deserted me.”","Educated"],
["detachable pages","Pages that can be easily removed from a book.","떼어낼 수 있는 페이지","“...because the only science book I’d ever read had detachable pages for coloring.”","Educated"],
["detonate at any moment (phrase)","To explode or erupt suddenly, either literally (like a bomb) or figuratively (like anger).","언제든지 폭발하다, 곧 터질 듯하다","It felt like he might detonate at any moment.","Educated"],
["devout (adjective)","Very religious, dedicated to one’s faith.","독실한, 신앙심 깊은","Shannon rolled her eyes. “She’s very devout,” she whispered.","Educated"],
["diaphragm","The muscle beneath the lungs that controls breathing.","횡격막","“Then she stretched me out on the floor and stepped on my stomach to strengthen","Educated"],
["didn’t want to accuse (phrase/verb expression)","To avoid blaming someone openly for something wrong.","비난하고 싶지 않다, 잘못을","She didn’t want to accuse her friend without having all the facts.","Educated"],
["dilapidated theater (adjective + noun phrase)","A theater that is in poor condition due to age or neglect.","허물어진 극장, 황폐한 극장","I had rehearsals most nights at the Worm Creek Opera House, a dilapidated theater near the only","Educated"],
["dingy","Dark, shabby, or dirty in appearance.","칙칙한, 더러운","“But this only made the dingy cotton seem dingier.”","Educated"],
["discern myself in the crowd","To recognize or identify oneself among many others.","군중 속에서 나 자신을 알아보다","“Sometimes, when I glanced at the mirror and saw the tangle of our twirling forms, I couldn’t","Educated"],
["dishing up seconds and thirds","Serving more food for those who want additional helpings.","음식을 두 번 세 번 더 퍼주다","“The boys would putter around the kitchen, dishing up seconds and thirds.”","Educated"],
["disperses (verb)","To break up and move away in different directions.","흩어지다, 해산하다","When the teacher entered the room, the group of students quickly dispersed.","Educated"],
["distant rumblings of war (noun phrase)","Early, faraway signs or warnings of conflict.","전쟁의 먼 불길한 조짐","“…there were distant rumblings of war but life on the mountain remained unchanged.”","Educated"],
["divine supplication","A sacred prayer or humble request directed to God.","신성한 간청, 기도","“Muscle testing, she explained to me, was a kind of prayer, a divine supplication.”","Educated"],
["doctored the books (idiom)","To falsify records, especially financial or official ones.","장부나 기록을 조작하다.","He doctored the books whenever we crossed a checkpoint. / 그는 우리가 검문소를 지날 때마다","Educated"],
["doctrine","A belief or set of beliefs taught by a religious, political, or other group.","교리, 신조","…if Dad’s fervor had more to do with his own mother than with doctrine.","Educated"],
["dominion","Control or authority over something.","지배, 통제","…a perception of privacy and isolation, even of dominion.","Educated"],
["dreading","To feel anxious fear or worry about something that will happen.","두려워하다, 몹시 걱정하다","“The days slipped away quickly, as days do when you’re dreading something.”","Educated"],
["Dwarfed by the mountain","To appear very small or insignificant in comparison to something vast or powerful.","산에 의해","They were far away. Dwarfed by the mountain, hushed by the wind.","Educated"],
["dwindled","To shrink, decline, or gradually become smaller or weaker.","줄어들다, 감소하다","“WITHOUT SHAWN AS FOREMAN, Dad’s construction business dwindled.”","Educated"],
["edged closer","Moved gradually and cautiously nearer.","조금씩 다가가다","I edged closer, trying to draw her attention…","Educated"],
["embalmers","People who preserve dead bodies, especially for funerals.","시체 방부 처리하는 사람, 엠발머","The embalmers hadn’t gotten her lips right…","Educated"],
["emergency cesarean","An urgent surgical procedure to deliver a baby (C-section).","응급 제왕절개","An emergency cesarean was performed.","Educated"],
["engine rev as it guzzled diesel (phrase)","The sound of a motor increasing in speed and fuel consumption.","디젤을 마구 삼키듯 엔진이","“…listening to the engine rev as it guzzled diesel.”","Educated"],
["etched into","Engraved or imprinted deeply and permanently, either physically or metaphorically.","새겨진,","Fear was etched into her features, in the bunching of her forehead and the tightening of her lips.","Educated"],
["everyone was up in arms (idiom)","Very angry or upset about something.","격분하다, 들고 일어나다","“A stray dog had bitten a boy and everyone was up in arms.”","Educated"],
["exasperated","Frustrated or annoyed, especially after repeated difficulty or resistance.","몹시 짜증난, 화가 난","“Dad walked away cursing, exasperated, but probably thinking that Shawn would get tired and","Educated"],
["expound a scripture","To explain or interpret a passage from a holy text in detail.","성경 구절을 해설하다","Dad had begun to expound a scripture when Tyler cleared his throat.","Educated"],
["eyes could barely unscramble what they saw (expression)","To be so overwhelmed or disoriented that it is hard to make sense of what is being seen.","너무","After the accident, my eyes could barely unscramble what they saw. / 사고 직후, 나는 너무","Educated"],
["face harden (verb phrase)","When someone’s expression becomes serious or stern.","얼굴이 굳어지다.","I watched his face harden, then relax. / 나는 그의 얼굴이 굳어졌다가 풀리는 것을","Educated"],
["factual backdrop (phrase)","A background or setting based on real events or facts, used to frame or contrast with fictional","사실적 배경, 실제 사건을 바탕으로 한 배경","I was unable to distinguish between the fictional story and the factual backdrop.","Educated"],
["fall back on","To rely on something when other options fail.","다른 선택지가 없을 때 의지하다","If Tyler left too, Dad… would have to fall back on scrapping.","Educated"],
["fanciful champion (adjective + noun)","An imagined or unrealistic hero or protector.","공상적인 영웅","As a child, he dreamed of a fanciful champion who would always protect him.","Educated"],
["feckless belligerence (noun phrase)","Weak but aggressive behavior that lacks real purpose or strength.","무기력하지만 공격적인","His teeth reminded everyone of his feckless belligerence. / 그의 치아는 모두에게 그의","Educated"],
["feeble lamp","Weak, faint, barely giving light.","희미한 등불","“...watching the shadows my feeble lamp cast on the ceiling.”","Educated"],
["felt taken out of myself","To feel detached from one’s body or normal sense of self; an almost out-of-body experience.","나 자신으로부터 분리된 듯한 기분이 들다","“...when my breath caught in my chest and I felt taken out of myself.”","Educated"],
["felt the immensity of the gap (phrase)","To strongly sense the vastness or significance of a difference or division.","간극의 거대함을 느꼈다, 큰 차이를 절감했다","In this chapel, for the first time I felt the immensity of the gap.","Educated"],
["felt tossed about","Feeling unsettled, confused, and unable to stay steady emotionally.","이리저리 흔들리는 기분이 들다","“Something broke in me, a dam or a levee. I felt tossed about, unable to hold myself in place.”","Educated"],
["fervor kindled","Strong passion or intensity was ignited.","열정이 불붙다","Dad, his fervor kindled, would drone for an hour or more…","Educated"],
["fifty-caliber rifle (noun phrase)","A very large and powerful gun with bullets of .50 caliber size.","50 구경 소총","“It’s a fifty-caliber rifle,” he said. “Wanna try it?”","Educated"],
["fists clenched","Hands tightly closed into fists, usually in anger or determination.","주먹을 움켜쥔","…fists clenched, swiping at the air…","Educated"],
["flatbed pickup (noun)","A type of truck with a flat, open bed instead of enclosed sides.","평판 트럭","…ambled over to the flatbed pickup.","Educated"],
["flicker (verb)","To shine or burn unsteadily; to appear and disappear quickly.","깜박거리다, 불안정하게 빛나다","I waited for the screen to flicker and die.","Educated"],
["folded, impassive","Showing no emotion or reaction; blank, expressionless.","무표정한, 감정을 드러내지 않는","Everyone looked at Dad. His expression was folded, impassive.","Educated"],
["for all my (phrase)","Despite all of (something); even though.","~에도 불구하고.","For all my obsessing over the consequences of that night, I had misunderstood the vital truth: that","Educated"],
["For Pete’s sake","An exclamation expressing frustration, annoyance, or urgency.","제발, 도대체 (짜증·강조 표현)","“For Pete’s sake!” Mother said when she opened the envelope.","Educated"],
["foreman (noun)","A person in charge of a group of workers, especially on a construction site.","현장 감독","…but Shawn was a good foreman, and with him in charge Dad had acquired a reputation for","Educated"],
["forklift tines (noun, plural)","The long metal prongs at the front of a forklift used for lifting and carrying heavy loads.","지게차 날 (지게차 앞에 달린 쇠 막대)","My account of Shawn’s fall is based on the story as it was told to me at the time…standing on a","Educated"],
["formless clunking","No clear shape, structure, or harmony; awkward and unorganized sound.","형체 없는 둔탁한","“The music stopped my breath. I’d heard the piano played countless times before… but when","Educated"],
["fractions (noun)","Mathematical expressions representing parts of a whole (e.g., ½, ¾).","분수","I understood the theory of fractions but struggled to manipulate them…","Educated"],
["fresh batch of","A newly prepared quantity of something (here: herbs).","새로 만든 양, 신선한 분량","“I made a fresh batch of calendula last week,” Mother said.","Educated"],
["fretting","Worrying or showing anxious concern.","걱정하다, 안달하다","…about Grandma fretting about her oldest daughter’s social standing…","Educated"],
["frigid afternoon (adjective + noun)","Extremely cold afternoon.","몹시 추운 오후","It was a frigid afternoon and the wind was fierce…","Educated"],
["frivolous (adjective)","Not serious, silly, or lacking in importance.","경박한, 사소한","“I was losing myself, becoming like other girls, frivolous, manipulative, using how I looked to get","Educated"],
["frothing at the mouth (idiom)","Extremely angry, agitated, or out of control.","입에 거품을 물 정도로 화난","“…that night when Shawn turned up, frothing at the mouth.”","Educated"],
["full throttle (phrase)","At maximum speed or power.","전속력으로, 최대 출력으로","“Dad jammed the forks under the bin, then lifted me and the scrap and began driving, full","Educated"],
["gelding (noun)","A male horse that has been castrated.","거세된 수말","The gelding was a gift from a great-uncle on my mother’s side. / 그 거세된 수말은 외삼촌이","Educated"],
["give under pressure","To yield, bend, or soften when force is applied (literally or figuratively).","압력에 굴복하다,","“I picked up a swan, feeling its soft shape give under pressure from my fingers.”","Educated"],
["given a thought to","To consider or think about something.","~을 생각하다, 고려하다","The midwife looked as though she hadn’t given a thought to her appearance in a decade.","Educated"],
["giving way (phrasal verb)","Starting to collapse, break down, or weaken.","무너지거나 약해지기 시작하다","The old bridge was giving way under the heavy truck.","Educated"],
["glinted off the steel barrel (phrase)","Reflected a small, quick flash of light from a shiny surface.","강철 총열에서 반짝였다","“…where light from passing cars glinted off the steel barrel.”","Educated"],
["glossy (adjective)","Shiny and smooth; often used to describe paper or pictures with a polished surface.","반짝거리는, 윤이 나는","The next day, I drove forty miles to the nearest bookstore and bought a glossy ACT study guide.","Educated"],
["God’s wrath had laid waste to cities","God’s anger had destroyed whole cities; Biblical reference to divine punishment.","하나님의 진노가 도시들을 황폐하게 만들었다","“God’s wrath had laid waste to cities, it had flooded the whole earth.”","Educated"],
["got some tucked away","To have something (often money or valuables) hidden or saved secretly.","(돈이나 귀중품 등을)","“And your mother’s got some tucked away.”","Educated"],
["groped at the door (verb phrase)","To reach out clumsily or blindly, often with difficulty.","더듬거리며 문을 잡다.","I groped at the door, catching hold of the frame, but he lifted me off the ground, flattened my","Educated"],
["grueling","Extremely tiring and demanding.","녹초로 만드는, 힘겨운","The labor had been long, grueling…","Educated"],
["grunts","Low-ranking workers who do hard physical labor, often without much recognition.","허드렛일꾼,","“Richard and I took his place as grunts.”","Educated"],
["gush from the tank (phrase)","To flow out suddenly and forcefully, especially a liquid.","탱크에서 쏟아져 나오다","“Gasoline would gush from the tank, streaming down the spike.”","Educated"],
["had an air of","To seem to have a particular quality, mood, or characteristic.","~한 기운이 풍기다, ~한 느낌이","Her life had an air of intense order, normalcy, and unassailable respectability.","Educated"],
["hallucinating (verb)","Experiencing imagined sights or sounds that aren’t real, often due to stress, illness, or exhaustion.","“나는 환각을 보고 있었다. 타일러는 집에 돌아오지 않았다.”","“I was hallucinating. Tyler never came home.”","Educated"],
["hankered after false idols","To strongly desire or long for things that are not true or worthy; idolatry.","헛된 우상을","…like the ancient Israelites because they’d been given a true religion but hankered after false","Educated"],
["happened by","Came across or arrived by chance.","우연히 지나가다, 들르다","“If Dad happened by he’d turn the light off.”","Educated"],
["harlots","An old-fashioned derogatory word for prostitutes; here used critically to describe the children’s","“나는 그들이 작은 창녀처럼 보인다고 생각했다.”","“I thought they looked like tiny harlots.”","Educated"],
["hasn’t learned a damned thing (idiomatic expression)","Has not gained any wisdom or changed behavior despite past experiences.","아무것도 배우지","Even after losing money twice, he hasn’t learned a damned thing about gambling.","Educated"],
["haul me home (phrasal verb)","To pull or drag someone back home, usually by force.","집으로 끌고 가다","He said one evening he’d just show up at Worm Creek and haul me home.","Educated"],
["He made few excursions back to our side","He rarely returned; he seldom visited again.","거의 돌아오지 않았다, 드물게 왔다","“He made few excursions back to our side.”","Educated"],
["HE WANTED out of his old life (expression)","He wanted to escape or leave his past life behind.","그는 지난 삶에서 벗어나고 싶어했다","Shawn said he wanted out of his old life. / 션은 지난 삶에서 벗어나고 싶다고 말했다.","Educated"],
["head for the hills (idiom)","To run away or escape quickly from danger.","급히 도망치다, 피하다","When the fire alarm rang, people in the building decided to head for the hills.","Educated"],
["hefted (verb – past tense)","Lifted or carried something heavy.","무겁게 들어 올리다","I came home one afternoon from packing macadamias to find Dad and Richard gathered around","Educated"],
["hemorrhage","Heavy or uncontrolled bleeding.","출혈, 대량 출혈","There was blood everywhere. The hemorrhage wouldn’t stop.","Educated"],
["hemorrhages (noun)","Heavy or uncontrollable bleeding from a broken blood vessel.","출혈","“She saw the crimson footprints streaked across the linoleum, she fetched the homeopathic she","Educated"],
["her own say-so","Permission or authority that comes only from oneself.","자기 혼자만의 권위, 자기 결정","She was a midwife entirely by the power of her own say-so…","Educated"],
["her V-neck plunged (phrase)","A description of clothing with a neckline that dips low, emphasizing its revealing nature.","그녀의 브이넥 옷이 깊게 파여 있었다","Shannon waved to me and her V-neck plunged.","Educated"],
["he’d stepped out of himself","To seem detached from one’s own emotions or personality, as if outside of oneself.","자기","His face relaxed and he looked up; it seemed to me that he’d stepped out of himself.","Educated"],
["hitched up (phrasal verb)","To pull up clothing, especially pants or trousers.","(옷을) 끌어올리다","“That morning, like every morning, he had hitched up his trousers with a yard of baling twine.”","Educated"],
["hoard","To collect and store large amounts of something, often secretly or excessively.","(몰래·과도하게)","Then he began to hoard food.","Educated"],
["hoarding my paychecks","Saving and keeping all earnings, often secretly or obsessively, instead of spending them.","월급을 쌓아두다, 모으다","“I was HOARDING MY PAYCHECKS, in case I needed the money for tuition.”","Educated"],
["hollering (verb, present participle)","Shouting or yelling loudly.","고함치다, 외치다","Dad followed, still hollering.","Educated"],
["honed my reflexes","Sharpened or improved quick reactions.","내 반사신경을 연마하다","“A season in the junkyard had honed my reflexes.”","Educated"],
["hotfooting it (idiom / phrasal verb)","To move quickly, often in a hurry.","서둘러 가다, 급히 움직이다","We’ll be driving when everyone else is hotfooting it.","Educated"],
["huffed out","To leave in anger or annoyance, often breathing heavily.","씩씩거리며 나가다","“There were other mornings—mornings that always astonished me—when Dad huffed out the","Educated"],
["hydraulic cylinders (noun)","Mechanical devices that use fluid pressure to create force and motion.","유압 실린더","…the hydraulic cylinders hissed softly…","Educated"],
["hymnal (noun)","A book of religious songs (hymns), used in church.","찬송가 책","“Jeanette waited to bend for that hymnal until I was looking.”","Educated"],
["hypnotically (adverb)","In a way that makes someone feel as if they are under a spell; mesmerizingly.","마치 최면에","Watching the white lines disappear hypnotically beneath the hood. / 흰 선이 보닛 아래로","Educated"],
["ignorance (noun)","Lack of knowledge, understanding, or awareness.","무지, 무식","I suppose I was in shock, but whether it was the shock of learning about something horrific, or","Educated"],
["ignored his counsel and kept her own","She disregarded his advice and followed her own judgment.","그의 조언을 무시하고 자기 뜻을 고수하다","“When she ignored his counsel and kept her own.”","Educated"],
["Illuminati","A group often referred to in conspiracy theories as a secret, powerful society controlling world","그는 할머니가 일루미나티의 알지 못하는 대리인이라고 말했다.","Grandma, he said, was an unknowing agent of the Illuminati.","Educated"],
["immobilized (verb, past participle)","To prevent someone or something from moving.","움직이지 못하게 하다.","“If I fold it any more, you’ll be immobilized.” / “내가 더 접으면, 너는 움직일 수 없게 될","Educated"],
["immodesty, promiscuity","Immodesty = lack of decency or shame, especially in dress or behavior. Promiscuity = engaging","“그것은 춤을 가르친다고 했지만, 사실은 품위 없음과 문란함을 가르쳤다.”","“It claimed to teach dance, but instead it taught immodesty, promiscuity.”","Educated"],
["impish laugh (adjective + noun)","A mischievous or playful laugh, like that of a naughty child.","장난기 어린 웃음","His impish laugh made everyone in the room smile, even though he was up to no good.","Educated"],
["incapacitate (verb)","To make someone unable to move or function properly.","움직이거나 제대로 기능하지 못하게","“You can incapacitate a man with minimal effort.” / “적은 노력으로도 사람을 무력화시킬 수","Educated"],
["incredulous (adjective)","Unwilling or unable to believe something; showing disbelief.","믿을 수 없다는 듯한, 의심하는","She gave him an incredulous look when he claimed he had finished the project in one night.","Educated"],
["indecipherable (adjective)","Impossible to understand, interpret, or decode.","판독할 수 없는, 이해할 수 없는","The advanced algebra was still indecipherable…","Educated"],
["indulgent","Allowing oneself to enjoy something, often excessively or carelessly.","방종한, 제멋대로 하는","“Or maybe that it was utterly unnecessary. It was indulgent. Like a toy, if a toy could take your","Educated"],
["industrial granaries (noun phrase)","Large storage buildings or facilities for storing grain, usually part of agricultural or industrial","산업용 곡물 창고","In October Dad won a contract to build industrial granaries in Malad City…","Educated"],
["infiltrated the church","Secretly entered or gained influence within an organization.","교회에 잠입하다, 교회를","“You don’t think the Illuminati have infiltrated the church?”","Educated"],
["inscrutable, detached, dispassionate","inscrutable – Impossible to understand or interpret.","불가해한, 헤아릴 수 없는","…the only eternal thing, inscrutable, detached, dispassionate.","Educated"],
["insulation (noun)","Material used to prevent heat, sound, or electricity from passing through.","단열재, 절연재","“I found Dad in the field, lighting a fire to burn the insulation from a tangle of copper wires.”","Educated"],
["intimidated","To feel frightened, overpowered, or lacking confidence due to someone or something.","겁먹은,","The midwife intimidated her…","Educated"],
["intoxicated with happiness","Overwhelmed or filled with joy, as if \"drunk\" on happiness.","행복에 취한","They are both intoxicated with happiness, Mother with a relaxed smile, Dad with a grin so large it","Educated"],
["irreproachable","Without fault; perfect or blameless.","나무랄 데 없는, 흠잡을 데 없는","…her eyes so full of surprise they were irreproachable.","Educated"],
["It was just one of those things","A phrase meaning an unavoidable or ordinary event that happens in life, often used to downplay","그건 그냥 그런 일이었을 뿐이다.","It was just one of those things.","Educated"],
["it was the obvious lethality of it","A clear and undeniable deadly danger; the certainty that a mistake could cause death.","그것의 명백한 치명성","“Perhaps it was the obvious lethality of it, the certainty that a wrong move would cost a limb.”","Educated"],
["jaw slackened","The jaw loosened or dropped slightly, often from surprise or trance.","턱이 풀리다, 턱이 축 늘어지다","“His eyes were closed, his jaw slackened, as if he were listening to seraphic voices.”","Educated"],
["jinxed herself","To bring bad luck upon oneself by saying or doing something.","스스로 불운을 불러오다","She’d jinxed herself, thrown her gauntlet before God.","Educated"],
["jocular grin","A playful or joking smile.","농담 섞인 웃음","His lips were often pressed together in a jocular grin…","Educated"],
["jumped a ditch","To go over or across a ditch suddenly, usually uncontrollably.","도랑을 뛰어넘다, 도랑에","The car jumped a ditch, smashed through two utility poles…","Educated"],
["jutted backward","Sticking or projecting sharply in a backward direction.","뒤쪽으로 돌출된","…so that they jutted backward toward the roof of his mouth.","Educated"],
["keep the books (idiom/verb phrase)","To manage financial records of a business.","장부를 관리하다 / 회계 업무를 보다","He taught me how to use his computer to keep the books, process orders, maintain inventory.","Educated"],
["laid siege to the Weavers","To surround a place with armed forces in order to capture it or force surrender; here used","아버지는 마흔 살이 되었을 때 연방 요원들이 위버 가문을 포위 공격했다…","Dad had just turned forty when the Feds laid siege to the Weavers…","Educated"],
["landscape splinter and barb (phrase)","A figurative description of the land breaking into sharp, pointed shapes.","풍경이 갈라지고 뾰족해지다","I watched the landscape splinter and barb, the rolling black summits of the Bear River","Educated"],
["laughed in his face","To openly mock or show scorn directly to someone.","면전에서 비웃다","“The teacher laughed in his face.”","Educated"],
["laying claim to","To assert ownership or possession of something.","~에 대한 권리를 주장하다","…glancing at the vacant Arizona sky, hoping to see her black form swelling out of the earth,","Educated"],
["lectured into a cold stupor","To be numbed or exhausted by a long, boring lecture.","긴 잔소리에 지쳐 멍해지다","…fueled by some internal passion that burned long after the rest of us had been lectured into a","Educated"],
["let him play the hero","Allowing a man to take credit for solving a problem or saving the day.","그가 영웅 역할을","All I had to do was step aside and let him play the hero!","Educated"],
["lewd display","An inappropriate, sexual, or indecent show of behavior.","외설적인, 음탕한 행동","“That fact offended Dad more than anything else: that such a lewd display had taken place in a","Educated"],
["live under my roof","To live in someone’s house, usually implying authority and control from the homeowner.","내 집에서 살다 (내 통제/보호 아래 살다)","“I told her to do it, and she will do it,” Dad said, low and angry. “Or she won’t live under my","Educated"],
["lobelia","A flowering plant used in traditional medicine, sometimes for respiratory issues.","로벨리아","“I also need lobelia and witch hazel.”","Educated"],
["lonely banter (noun phrase)","Light, playful conversation, often to fight boredom.","가볍고 장난스러운 대화, 종종 지루함을","And listen to the lonely banter of truckers stretched out across the interstate. / 그리고","Educated"],
["lucid (adjective)","Clear-headed, able to think and understand despite difficult circumstances.","의식이 또렷한,","“Luke seems lucid. His brain hasn’t processed what’s happened; the pain hasn’t set in.”","Educated"],
["made my heart race (idiom/verb phrase)","To cause someone to feel excited, nervous, or anxious.","심장이 두근거리게 하다","…and seeing a decimal on the page made my heart race.","Educated"],
["manslaughter","The unlawful killing of a person without premeditation or malice.","과실치사, 고의 없는 살인","…a midwife might face charges for practicing medicine without a license; if things went very","Educated"],
["meager profits","Very small or insufficient earnings.","보잘것없는 이익","“He constantly weighed these meager profits against the expense of running the house.”","Educated"],
["mere tremor","A very slight or small shaking or vibration.","단순한 떨림, 미세한 진동","…the unborn baby’s heart rate had dropped dangerously low, to a mere tremor…","Educated"],
["midwife","A person trained to help women give birth.","조산사","Mother didn’t want to be a midwife.","Educated"],
["midwifery","The profession or practice of assisting women in childbirth.","조산술, 조산업","Midwifery had been Dad’s idea…","Educated"],
["midwives were scarce","There were very few midwives available.","조산사가 드물었다","…midwives were scarce: on the day Judy left for Wyoming, Mother became the only midwife for","Educated"],
["modem to dial (verb phrase)","To connect to the internet using a modem, which in older systems required dialing a phone line.","모뎀으로 전화를 걸다 (옛날 인터넷 연결 방식)","…and waited for the modem to dial. Tyler had said something about BYU’s webpage.","Educated"],
["modest","Simple, not showy or extravagant; sometimes refers to dressing in a way that doesn’t attract","“그녀는 내가 돈이 없는 줄 알았다. ‘이건 수수하지 않아,’ 나는 말했다.”","“She’d misunderstood. She thought I didn’t have money. ‘It isn’t modest, ’ I said.”","Educated"],
["more than he’d bargained for (phrase/idiom)","A situation that turns out to be more difficult, complicated, or intense than expected.","예상보다","“Confronting his younger brother—less vicious but powerful in his own way—was more than","Educated"],
["Morse code","A system of communication using sequences of dots and dashes (or short and long signals) to","“열 살이 되었을 때, 내가 체계적으로 배운 유일한 과목은 모스 부호였다.”","“By the time I was ten, the only subject I had studied systematically was Morse code.”","Educated"],
["Mother’s calling as a healer","A phrase describing Mother’s belief (and the family’s claim) that she had a divine or spiritual","어머니의 치유자로서의 소명","“There was a moment that winter. I was kneeling on the carpet, listening to Dad testify","Educated"],
["mouth flew open","To suddenly open one’s mouth in shock, surprise, or strong emotion.","깜짝 놀라 입이 벌어지다","Dad’s mouth flew open and a gust of air rushed out.","Educated"],
["mullein and comfrey salve (noun phrase)","A healing ointment made from mullein and comfrey plants, traditionally used for burns and","“어머니는 자신의 조리법으로 만든 몰린과 컴프리 연고를 루크의 다리에 발랐다.”","“Mother dressed the leg in mullein and comfrey salve, her own recipe.”","Educated"],
["my cohort","A group of people with a shared characteristic (here: test-takers at BYU).","(같은 집단의) 동료, 집단","“BYU was a competitive school. I’d need a high score—a twenty-seven at least, which meant the","Educated"],
["my heart sank (idiom)","To suddenly feel disappointed, worried, or hopeless.","가슴이 철렁 내려앉다, 크게 실망하다","My heart sank when I saw it. Rejection letters are small, I thought.","Educated"],
["nibbled at","To bite gently or take small bites, sometimes used figuratively for irritation.","살짝 갉아먹다,","“Its jagged edges nibbled at my palms.”","Educated"],
["no foothold in between (phrase)","Having no middle ground, no safe place to stand between two extremes.","그 사이에 설 자리가 없다","I could stand with my family, or with the gentiles, on one side or the other, but there was no","Educated"],
["no point dragging it out (idiom)","There is no reason to prolong something unnecessarily; better to finish it quickly.","질질 끌 이유가 없다, 빨리 끝내는 게 낫다","“You’ve already decided,” he said without glancing at me. “No point dragging it out.”","Educated"],
["nodded absently (verb + adverb)","To nod without paying attention; in a distracted way.","건성으로 고개를 끄덕이다, 딴생각하며","“Mother nodded absently while chopping a carrot.”","Educated"],
["obliterate everything I’d known before (phrase)","To completely destroy or wipe out all that was familiar or previously understood.","내가 알고 있던 모든 것을 완전히 없애다 / 지워버리다","Not since Y2K had I felt so certain that something terrible was coming, something that","Educated"],
["oddly dispossessing","Causing a strange feeling of being deprived of ownership or belonging.","기묘하게 박탈감을","It felt oddly dispossessing, being handed this first legal proof of my personhood.","Educated"],
["off the grid","Living without reliance on public utilities such as electricity and water.","공공 전력망·수도망","Dad said one day we would be completely off the grid.","Educated"],
["offset his bulk","To balance or counteract the weight or size of his large body.","그의 큰 몸집을 균형 맞추다","He was a meaty box of flesh, and her torso bent sharply at the waist to offset his bulk.","Educated"],
["on the pretense of","Pretending to do something as an excuse for another action.","~하는 척하면서, 구실로 삼아","…he’d often come into the house, quietly, through the back door, on the pretense of getting","Educated"],
["on the spike (phrase)","Pierced or supported by a sharp iron rod.","쇠꼬챙이에 꽂혀","“If all went well, the car would be impaled on the spike and gasoline would gush from the tank.”","Educated"],
["one lousy test (phrase, informal)","A single test that feels insignificant or not important (but actually carries great weight).","하찮은","“Just pass the ACT. One lousy test.”","Educated"],
["only midwife for a hundred miles","The single available midwife within a hundred miles’ distance.","반경 100 마일 내 유일한","…on the day Judy left for Wyoming, Mother became the only midwife for a hundred miles.","Educated"],
["operations (noun)","Mathematical processes such as addition, subtraction, multiplication, and division.","연산","…and practiced the most basic operations—how to multiply fractions, how to use a reciprocal…","Educated"],
["ordinance (noun)","A local law or regulation, especially passed by a city or town authority.","법령, 조례","“Dad lay on the kitchen floor cracking jokes about an ordinance that had recently passed in our","Educated"],
["orienting (verb, present participle)","Directing or adjusting oneself (or something) in a particular direction or toward a focus point.","방향을 맞추다, 향하다","…often turned his head when people spoke to him, orienting his better ear toward them…","Educated"],
["ornery","Bad-tempered, irritable, and difficult to deal with.","성미가 까다로운, 짜증 잘 내는","…and barked that it was time for Mother to go “play doctor.” She was tired and ornery…","Educated"],
["other world (noun phrase)","A metaphorical or spiritual world different from reality.","다른 세계, 초월적인 세계","The horse could not hear the maddening call of that other world. / 그 말은 저 초월적인 세계의","Educated"],
["otherwise, it’ll bust right off (phrase, informal)","If not, it will break or snap off easily.","그렇지 않으면 금방 부서질 거야","“You need long ones for the wall and grabbers for the door. Otherwise, it’ll bust right off.”","Educated"],
["outcropping of rebar (phrase)","A projecting mass of rebar sticking out, like a rock outcrop.","돌출된 철근","…so that when he struck the concrete wall with its outcropping of rebar, he hit headfirst…","Educated"],
["palliative","A treatment that relieves symptoms without curing the underlying disease.","완화제, 완화 치료","She explained every remedy and palliative.","Educated"],
["panache","Distinctive and stylish elegance; flamboyant confidence.","당당함, 멋, 기품","…back then Dad was bursting with energy, laughter and panache.","Educated"],
["parched Arizona desert","Extremely dry and hot desert area in Arizona.","바싹 마른 애리조나 사막","…until we arrived at the mobile home in the parched Arizona desert…","Educated"],
["peace offering (noun phrase)","Something given or done to show a desire to end a conflict or make peace.","화해의 표시.","Sadie placed the Snickers in his palm like a peace offering and waited, staring at the carpet. /","Educated"],
["pedaled","To ride a bicycle or use pedals to move.","페달을 밟다, 자전거를 타다","“That Wednesday, I left Randy’s early and pedaled to the gas station.”","Educated"],
["Peterbilt with a reefer (noun phrase)","A Peterbilt is a brand of truck; a “reefer” is a refrigerated trailer used to haul perishable goods. /","","There was silence while everybody checked their mirrors for a Peterbilt with a reefer. / 모두가","Educated"],
["pew (noun)","A long wooden bench with a back, usually found in churches for people to sit on during services.","교회 의자, 긴 의자","Because it was a congregation of students, everyone was sitting with their roommates, so I settled","Educated"],
["picnicking in my blind spot (idiom/phrase)","A trucker expression meaning a car has been sitting too long in a spot where the truck driver","","“Been picnicking in my blind spot for a half hour.” / “내 사각지대에서 30 분 동안 소풍이나","Educated"],
["pictured his face falling","To imagine someone’s expression turning sad or disappointed.","얼굴이 어두워지는 것을","“I imagined him calling my name and pictured his face falling when I didn’t answer.”","Educated"],
["piled","To put things in a stack or heap, often in large amounts.","쌓다, 더미로 올리다","“He carried through the house and piled in the basement.”","Educated"],
["pious","Deeply religious and devoted.","독실한, 경건한","…but embedded in a pious Mormon community…","Educated"],
["piston","A mechanical part that moves up and down inside a cylinder to create power in machines.","피스톤","“They bit down, their great jaws propelled by a heavy piston attached to a large iron wheel.”","Educated"],
["pitch myself clear (phrasal verb)","To throw oneself away from danger, usually to avoid harm.","위험에서 벗어나기 위해 몸을","She decided to pitch herself clear of the horse before it fell. / 그녀는 말이 넘어지기 전에","Educated"],
["pitiless, powerful avatars from another world (expression)","Merciless, strong beings, almost otherworldly.","무자비하고 강력한, 다른 세계에서 온 듯한","The wild horses seemed like pitiless, powerful avatars from another world. / 야생마들은 마치","Educated"],
["pitted (verb, past participle)","To remove the stone / seed (pit) from fruit.","씨를 제거하다","My family boiled and skinned peaches, pitted apricots and churned apples into sauce.","Educated"],
["plopped down (phrasal verb)","To sit or drop heavily and casually.","털썩 주저앉다.","Shawn plopped down next to me. / 숀은 내 옆에 털썩 주저앉았다.","Educated"],
["plump","Slightly fat in a pleasant or attractive way.","통통한","She was a short, plump woman in her late forties…","Educated"],
["plundering","To steal goods, often by force, typically during disorder.","약탈하다, 훔치다","…a morning that might otherwise be spent plundering Dad’s junkyard with Luke’s goat.","Educated"],
["pothole (noun)","A deep hole in a surface, usually caused by wear, damage, or collapse.","움푹 패인 구멍","“Dad examined the gash in my leg… It looked like a pothole; the tissue had simply sunk out of","Educated"],
["prance around (phrasal verb)","To move or walk in a showy, exaggerated, or playful way.","으스대며 돌아다니다","“I see you. I see how you prance around with Charles like a prostitute.”","Educated"],
["prancing","Moving in a lively, exaggerated, or showy way, like skipping or dancing.","깡충거리며","“I watched them wiggle and leap through the aisles, prancing for their mothers in red velvet","Educated"],
["precursors (noun, plural)","Things or events that come before and influence later developments.","선구자, 전조, 전임자","“This speech would stay with me in a way that a hundred of its precursors had not.”","Educated"],
["predetermined loss (noun phrase)","A loss that is seen as already decided or inevitable.","미리 정해진 손실, 피할 수 없는 상실","“…my rage turned to fear, of some predetermined loss, and I forgave Shawn.”","Educated"],
["preparedness mode (noun phrase)","A state of being fully ready and alert for something, especially for a possible danger or crisis.","대비 태세, 철저한 준비 상태","My father was in serious preparedness mode.","Educated"],
["prepositions and gerunds","Grammar terms—prepositions are words like in, on, by, and gerunds are -ing forms used as nouns","전치사와 동명사","“...I was learning, beginning with nouns and moving on to prepositions and gerunds.”","Educated"],
["prim","Very proper, formal, or easily shocked by improper behavior.","새침한, 고지식한","…imagining our prim, professorial uncle meeting Dad’s unruly crew.","Educated"],
["propped open (phrase)","To hold something (like a book or door) in an open position.","펼쳐 놓다, 열어 두다","“I chose a Sunday evening, when Dad was resting on the couch, his Bible propped open in his","Educated"],
["proselytizing","Attempting to convert someone to a religion, belief, or opinion.","전도하다, 개종을 권하다","…and spent two years proselytizing in Florida.","Educated"],
["protract (verb)","To lengthen or extend in time or space.","연장하다, 늘이다","…the hydraulic cylinders hissed softly to protract.","Educated"],
["pry loose","To force something free that is stuck or tightly fixed.","억지로 떼어내다, 비집어 떼다","“I tried to pry loose the small length of copper tubing.”","Educated"],
["pumped me full of bile (idiomatic phrase)","Filled me with anger, bitterness, or hatred.","분노로 가득 차게 하다.","It pumped me full of bile.","Educated"],
["pursed her lips (verb phrase)","To press lips tightly together, often showing disapproval or concentration.","입술을 오므리다 (불만이나 생각할 때)","Mother pursed her lips, then said, “There’s one more place we can try.”","Educated"],
["put her on bed rest (phrase/medical term)","To order someone to stay in bed and rest for health reasons.","건강상의 이유로 누워서 쉬도록","The doctor she consulted put her on bed rest. / 그녀가 상담한 의사가 그녀에게 침상 안정을","Educated"],
["putter around","To spend time doing small, unimportant tasks in a relaxed way.","빈둥거리며 소일하다","“The boys would putter around the kitchen.”","Educated"],
["Pythagorean theorem (noun)","A fundamental principle in geometry stating that in a right triangle, the square of the hypotenuse","피타고라스의 정리","I was drawn to the Pythagorean theorem and its promise of a universal…","Educated"],
["quarreled with (phrasal verb)","To argue angrily with someone.","~와 말다툼하다","She quarreled with her sister over who should use the computer first.","Educated"],
["quiet sigh of supplication","A soft exhale like a prayer or plea.","간청하는 듯한 조용한 한숨","“There was something in the hard line of my father’s face, in the quiet sigh of supplication he","Educated"],
["quitting time (noun phrase, idiom)","The time at the end of the workday when people stop working.","퇴근 시간, 일을 끝내는 시간.","Sadie started dropping by the junkyard around quitting time, usually with a milkshake for Shawn,","Educated"],
["rank (adjective)","Having a strong, unpleasant smell.","고약한 냄새가 나는","“It was splattered with bits of rotted food, so rank we kept it shut away in a closet.”","Educated"],
["raucous music","Loud, harsh, and disorderly sounds.","시끄럽고 거친 음악","He was deaf to the raucous music of our lives.","Educated"],
["rear (noun)","The back part of something, often referring to a person’s backside.","엉덩이, 뒤쪽","I saw the word “Juicy” written across her rear.","Educated"],
["rear (verb)","When a horse stands up on its back legs.","말이 뒷다리로 일어서다","The horse reared suddenly, frightening everyone. / 말이 갑자기 뒷다리로 일어서며 모두를","Educated"],
["rebar jutting outward like blunt skewers (phrase)","Rebar = steel reinforcing bars in concrete; here described as sticking out dangerously like","뭉툭한 꼬치처럼 돌출된 철근","…a half-finished concrete wall, with rebar jutting outward like blunt skewers.","Educated"],
["reciprocal (noun/adjective)","In math, the reciprocal of a number is 1 divided by that number (e.g., the reciprocal of 2 is ½).","역수","…how to multiply fractions, how to use a reciprocal…","Educated"],
["relishing the moment","Greatly enjoying or savoring a particular experience.","그 순간을 즐기다","…relishing the moment she’d been pulled over by the policeman…","Educated"],
["remained entwined","Stayed twisted or wrapped together.","서로 얽힌 상태로 남다","“If the fingers remained entwined that meant yes; if they parted it was no.”","Educated"],
["repertoire (noun)","A collection of works, songs, or skills that a performer can do.","레퍼토리, 공연 가능한 곡/작품 모음","Sometimes he suggested songs for my repertoire.","Educated"],
["right hand","A trusted helper or closest assistant.","오른팔, 가장 믿을 만한 조수","“Luke, at sixteen, became the eldest son, my father’s right hand.”","Educated"],
["righted (verb, past tense of \"right\")","To set something upright again after it has been tipped over.","바로 세우다","“With the last bit of slop blasted away, I righted the bin and filled it with water.”","Educated"],
["righteous woman","A morally upright or virtuous woman, often with religious connotations.","의로운 여자","“Dad said a righteous woman never shows anything above her ankle.”","Educated"],
["roughhousing","Playing in a rough, noisy, or physical way, often like wrestling or horsing around.","떠들썩하게","…Dad’s cousins were roughhousing the way they did after a harvest.","Educated"],
["row-crop tractor","A tractor designed for use in planting and cultivating crops grown in rows.","줄 작물을 재배할","…only when it collided with a row-crop tractor.","Educated"],
["rowdy","Noisy, rough, and likely to cause trouble.","소란스러운, 난폭한","I was as rowdy as any of my brothers, but when I was with Tyler I transformed.","Educated"],
["run and fetch it","An imperative expression meaning “go quickly and bring it back.”","가서 빨리 가져와라","“Tara, run and fetch it.”","Educated"],
["rustle","A soft, light sound made by things gently moving against each other (like papers or leaves).","바스락거리는 소리","“...who couldn’t divert her attention from the rustle of turning pages and the scratch of pencils on","Educated"],
["sanctioned","Formally approved or authorized.","공인된, 허가된","Midwifery was not illegal in the state of Idaho, but it had not yet been sanctioned.","Educated"],
["scalpel (noun)","A small, sharp knife used by doctors for surgery.","외과용 메스","“Dad carried Luke inside and Mother fetched her scalpel.”","Educated"],
["scarcely move, scarcely breathe (adverb phrase)","Barely able to move or breathe; almost not at all.","거의 움직일 수 없고, 거의 숨쉴 수 없다.","I could scarcely move, scarcely breathe, without breaking my own wrist.","Educated"],
["scatterbrained-woman routine","Acting like a forgetful or silly woman to avoid suspicion or responsibility.","정신 산만한 여자의","“I slipped into the scatterbrained-woman routine,” she told me and Audrey…","Educated"],
["schemes for self-reliance","Plans or strategies designed to make someone independent and not reliant on others.","자립을","…his schemes for self-reliance.","Educated"],
["screamed himself hoarse (phrase)","To shout or yell so much that one’s voice becomes rough and nearly lost.","목이 쉬도록 소리 지르다","Shawn… started screaming at Dad about everything—the equipment, the granary designs, his","Educated"],
["seasoned as old leather (simile/expression)","Very tough, strong, and experienced, like something worn over time.","오래 사용된 가죽처럼","The horses were seasoned as old leather, showing their strength and endurance. / 그 말들은","Educated"],
["segregated by gender (phrase)","Separated according to male and female.","성별에 따라 분리된","I knew they would be women because at BYU all housing was segregated by gender.","Educated"],
["sensation of conformity","The feeling of belonging by acting or appearing the same as others.","순응의 감각, 동조하는","“I loved the sensation of conformity. Learning to dance felt like learning to belong.”","Educated"],
["sense of sovereignty","A feeling of independence, freedom, and control over one’s own life.","자주권·독립성에 대한","There’s a sense of sovereignty that comes from life on a mountain…","Educated"],
["seraphic voices","Voices like those of angels (seraphs), heavenly and pure.","천사 같은 목소리","“...as if he were listening to seraphic voices.”","Educated"],
["serene polyphony","A calm and harmonious blend of multiple different voices or sounds.","평온한 다성(여러 소리가","…and we were deaf to the serene polyphony of his.","Educated"],
["Served him right, we thought, for his meddling","An expression meaning that someone got what they deserved because they interfered. /","참견하다가 당한 건 당연하다고 우리는 생각했다.","Served him right, we thought, for his meddling.","Educated"],
["sewed this detailing (verb phrase)","Stitched or added decorative elements by sewing.","이 장식을 꿰매다, 바느질하다","Grandma sewed this detailing.","Educated"],
["sheer","Very thin, almost transparent (when describing fabric).","(직물이) 얇은, 비치는","“The girls in red velvet hats and skirts sparkling with sequins of deep scarlet. I watched them","Educated"],
["sheer tonnage of conviction (phrase)","The overwhelming force or weight of someone’s determination and belief.","엄청난 확신의 무게","…the only one whose sheer tonnage of conviction could make Dad give way.","Educated"],
["She’s made of strong stuff","A phrase meaning someone is tough, resilient, and able to endure hardship.","강인한 사람이다","“She’s made of strong stuff,” Dad said, winking at me.","Educated"],
["shibboleth (noun)","A custom, word, or practice that distinguishes one group of people from another; often used to","관습적 표어, 집단을 구분하는 특징","Her clothes were a kind of shibboleth to me; they signaled that she was not a gentile.","Educated"],
["shuttered the windows (verb phrase)","Closed the window shutters, often blocking light.","창문 덧문을 닫다","The lecture began when an old man with small eyes and a sharp nose shuttered the windows.","Educated"],
["skeptical / skepticism","Doubting, questioning whether something is true.","회의적인, 의심","“If I was skeptical, my skepticism was not entirely my fault.”","Educated"],
["skittered","To move lightly and quickly, often with nervous energy.","잽싸게 달리다, 종종걸음을 치다","“If Dad had caught me with a book when I was supposed to be working, I’d have skittered.”","Educated"],
["slide-bolt lock (noun)","A type of lock that secures a door with a sliding metal bolt.","빗장 자물쇠","“The next day I drove to the hardware store in town and bought a slide-bolt lock for my bedroom","Educated"],
["slip into despondency (phrasal verb + noun phrase)","To gradually fall into a state of deep sadness or hopelessness.","점점 깊은 슬픔이나 절망","After losing his job, he slipped into despondency and rarely left the house.","Educated"],
["slop (noun)","Dirty or waste liquid, often unpleasant.","더러운 액체, 잡탕물","“With the last bit of slop blasted away, I righted the bin and filled it with water.”","Educated"],
["small provocations (noun phrase)","Minor actions intended to annoy or anger someone.","작은 도발, 사소한 자극","His behavior wasn’t violent, just small provocations. / 그의 행동은 폭력적이지 않았고 단지","Educated"],
["snarl (noun/verb)","(n.) a low, angry growl or harsh sound showing anger; (v.) to growl or speak angrily.","(명사)","“If Dad came through again, a snarl would sound through the house, and Mother would have to","Educated"],
["sniff the lie (idiom)","To detect dishonesty or falsehood, often instinctively or easily.","거짓을 간파하다, 거짓말을嗅어내다","We both know that if I ever again find Shawn on the highway, soaked in crimson, I will do exactly","Educated"],
["so enraptured","Filled with great delight or intense joy, often to the point of being unaware of danger.","황홀해하는, 넋을 잃은","“Dad couldn’t suppress his grin. I’d never seen him so enraptured.”","Educated"],
["So here we are","A phrase used to acknowledge or resign to the current situation.","결국 이렇게 됐다, 이 상황에","“Obviously I should have registered her when she was born, but I didn’t. So here we are.”","Educated"],
["So-and-so’s","A placeholder name for a person when the actual name is not used or remembered.","아무개,","If So-and-so’s blood pressure was high, she should be given hawthorn…","Educated"],
["solace (noun)","Comfort or consolation in a time of distress or sadness.","위안, 위로","I began to study trigonometry. There was solace in its strange formulas and equations.","Educated"],
["sparse (adjective)","Thinly spread, not much or not enough.","부족한, 드문드문한","Christmas was sparse that year.","Educated"],
["sped down the interstate (phrase)","Drove quickly along a major highway.","고속도로를 빠르게 달리다","As we sped down the interstate I watched the landscape splinter and barb.","Educated"],
["speech impediment","A physical condition that makes speaking clearly difficult.","언어 장애","Tyler’s speech impediment kept him quiet, made his tongue heavy.","Educated"],
["spurting","Gushing or shooting out quickly in a sudden stream, usually liquid like blood.","뿜어져 나오다, 솟구치다","“Five minutes later Luke’s arm was gashed to the bone and he was running toward the house,","Educated"],
["squared my stance","To take a firm or determined position, physically or mentally, often before a confrontation. /","“나는 자세를 바로잡고, 다시 한번 우리는 비누를 쓰지 않는다고 할 준비를 했다.”","“I squared my stance, ready to argue, to tell Grandma again that we didn’t use soap.”","Educated"],
["stand still (verb phrase)","To stop moving and remain completely still.","가만히 서 있다, 멈추다","“Dad chases him, orders him to stand still.”","Educated"],
["stay vigilant (verb phrase)","To remain watchful and alert to danger.","경계를 늦추지 않고 주의 깊게 지내다","“Dad said we should stay vigilant …”","Educated"],
["steep ravines (noun phrase)","Deep, narrow valleys with very steep sides.","가파른 협곡.","while going down steep ravines or how to squeeze my thighs when the horse leapt over a branch.","Educated"],
["stirrups (noun)","Metal loops on a saddle that hold the rider’s feet.","등자 (말안장에 달린 발걸이)","Shawn brought out the saddle and adjusted the stirrups. / 션은 안장을 꺼내어 등자를","Educated"],
["strained tinctures of goldenseal and blessed thistle","Herbal extracts (goldenseal and blessed thistle) prepared by filtering or squeezing liquid through","…엄마는 요리하고 청소하면서도, 골든씰과 성스러운 엉겅퀴의 팅크를 거르며 똑같은","…she cooked, cleaned, and strained tinctures of goldenseal and blessed thistle, while having the","Educated"],
["strung-out wannabe (slang/expression)","A desperate person, often in a bad state (sometimes linked to drugs or obsession), trying hard to","그는 마치 지쳐 있는 모방꾼처럼 너무 애써 록스타처럼 행동하려 했다.","He looked like a strung-out wannabe, trying too hard to act like a rock star.","Educated"],
["stucco ceiling","A ceiling finished with plaster (stucco), often with ridges or decorative patterns.","회반죽 천장","…staring blankly at the stucco ceiling with its intricate pattern of ridges and veins.","Educated"],
["stuff of legend (idiom/expression)","Something so remarkable that it becomes famous, almost like a myth.","전설처럼 유명하고","Grandpa’s ranching horses were the stuff of legend. / 할아버지의 목장 말들은 전설 같은","Educated"],
["subordinate","A person under the authority or control of another; a junior or lower-ranking worker.","부하 직원,","“I’ve already told you—and your subordinate, and your subordinate’s subordinate, and fifty other","Educated"],
["subvert the Medical Establishment","To undermine or challenge the authority and accepted practices of mainstream medicine.","의학","Mother’s being a midwife would subvert the Medical Establishment…","Educated"],
["succumbing to","Giving in or yielding to something stronger (pressure, desire, illness, etc.).","굴복하다, 지다","…so that finally, succumbing to either the woman’s desperation or to Dad’s elation, or to both,","Educated"],
["summer waned","To decline, diminish, or gradually come to an end.","여름이 서서히 사라졌다, 저물다","“Summer waned, seeming to evaporate in its own heat.”","Educated"],
["supper","An evening meal, usually lighter than dinner.","저녁 식사","“I was babysitting from eight until noon Monday to Friday, then going to Randy’s to pack","Educated"],
["suspected that","Believed or thought something might be true without being certain.","~라고 의심했다","“When it was over I suspected that I’d failed the math...”","Educated"],
["suturing","The act of stitching up a wound or surgical cut.","봉합하기, 꿰매기","…and she took a suturing class so she could stitch the women who tore.","Educated"],
["swept aside by the force of her","Overpowered or displaced by her strength, determination, or influence.","그녀의 힘에 의해","…charismatic gale of a man that he was—was temporarily swept aside by the force of her.","Educated"],
["systematic education","Formal, organized, and structured education.","체계적인 교육","“I had never taken an exam, and had only recently undertaken anything like a systematic","Educated"],
["taken the trouble to","To make the effort to do something.","굳이 애써 ~하다","Now that I’m older and I’ve taken the trouble to get to know her…","Educated"],
["talked it over","To discuss something thoroughly before making a decision.","상의하다, 충분히 논의하다","I don’t know if she talked it over with Dad first.","Educated"],
["tattered (adjective)","Old, torn, and in poor condition.","누더기가 된, 해진","“His footwear didn’t help, either: bulbous steel-toed boots so tattered that for weeks he’d been","Educated"],
["tattered bathrobe (adjective + noun)","Worn out, torn, or shabby robe.","해지고 너덜너덜한 목욕 가운","“When I opened my eyes, Mother and Shawn were facing each other, Mother wearing only","Educated"],
["taut, undefeated woman (adjective phrase)","A woman who remains firm, strong, and unbroken despite difficulties.","어려움에도 굴하지","Despite the illness, she stood as a taut, undefeated woman in the eyes of her family.","Educated"],
["telescopic arm (noun)","A mechanical arm that can extend and retract, often used in heavy machinery.","신축식","“A massive forklift with a telescopic arm and wide, black wheels that were taller than I was.”","Educated"],
["tend them","To look after or take care of someone or something.","돌보다, 보살피다","It was arranged; I would tend them during the birth.","Educated"],
["That is to say","A phrase used to clarify or explain something in another way.","즉, 다시 말해","That is to say, my mother responded willfully to the respectability heaped upon her.","Educated"],
["the concepts took hold (phrase)","An idea or understanding began to firmly establish itself in one’s mind.","개념이 자리 잡다","After a few weeks of this, by magic or miracle, the concepts took hold.","Educated"],
["the goings-on around him","Activities or events happening nearby.","주변에서 일어나는 일들","…to become aware of the goings-on around him…","Educated"],
["the massif","A compact group of connected mountains.","산괴, 큰 산 덩어리","…for the sight of the Princess etched in pine across the massif.","Educated"],
["the odds (noun phrase)","The likelihood or probability of something happening.","확률, 가능성","I wanted more, some statement of the odds, even if it was just so I could reason against them.","Educated"],
["The seed of curiosity had been planted","A desire to learn or know had begun to grow.","호기심의 씨앗이 심어졌다","“The seed of curiosity had been planted; it needed nothing more than time and boredom to grow.”","Educated"],
["the time of preparation has passed (expression)","The opportunity to prepare is over; now one must face the challenge.","준비의 시간이 지났다","“When the hour of need arises,” Dad said, “the time of preparation has passed.”","Educated"],
["their domain (noun phrase)","Their territory or area of control.","그들의 영역, 지배하는 구역","To step into the mountain was to enter their domain. / 산에 들어간다는 것은 그들의 영역에","Educated"],
["their power to bestow order and symmetry (phrase)","Their ability to provide structure, balance, and harmony.","질서와 대칭을 부여하는 힘","…could sense their power to bestow order and symmetry, but I couldn’t unlock it.","Educated"],
["their sorrel bodies arching for that final collision","Describes reddish-brown horses bending forward in their last desperate leap.","적갈색 말들이","…their sorrel bodies arching for that final collision.","Educated"],
["they whore after it","(Biblical / figurative) To pursue something obsessively or idolatrously, often used to mean chasing","“의사와 약,” 아버지가 거의 소리치듯 말했다. “그게 그들의 신이고, 그들은 그것만 좇는다.”","“Doctors and pills,” Dad said, nearly shouting. “That’s their god, and they whore after it.”","Educated"],
["throw my weight behind a punch (idiom/phrase)","To put the full force of one’s body into a punch.","주먹에 온몸의 힘을 실어 치다.","He taught me how to throw my weight behind a punch. / 그는 내게 주먹에 온몸의 힘을 실어","Educated"],
["thrown her gauntlet before God","An idiom meaning to boldly challenge or defy, especially in a serious or sacred way.","하나님","She’d jinxed herself, thrown her gauntlet before God.","Educated"],
["tied up with","Busy or occupied with something.","~에 바쁘다, 얽매이다","“He wished he could hire some kids but they were all tied up with football and band.”","Educated"],
["tincture","A liquid extract of a plant or herb, usually dissolved in alcohol for medicinal use.","팅크, 약초의","I retrieved the tincture, and my mother packed it in a plastic grocery bag with the dried herbs.","Educated"],
["took on","To accept responsibility for something or someone; to begin working with or employing.","맡다,","Mother took on an assistant.","Educated"],
["torrid afternoon (phrase)","Extremely hot, dry, and uncomfortable afternoon.","몹시 덥고 건조한 오후","“FOR EIGHTEEN YEARS I never thought of that day, not in any probing way. The few times","Educated"],
["toting","Carrying something heavy or bulky, often with effort.","들고 다니다, 짊어지다","…still toting the baby on her hip.","Educated"],
["translucent","Allowing light to pass through but not detailed shapes; semi-transparent.","반투명한","…so pale she seemed translucent…","Educated"],
["tremendous clamor (phrase)","A very loud and overwhelming noise.","엄청난 소음","“The bin rained down into the trailer with a tremendous clamor.”","Educated"],
["trifling dramas (adjective + noun)","Unimportant or trivial problems or events.","하찮은 드라마, 사소한 일들","“…the trifling dramas of my own life.”","Educated"],
["trigonometry (noun)","A branch of mathematics dealing with the relationships between angles and sides of triangles.","삼각법","I began to study trigonometry. There was solace in its strange formulas and equations.","Educated"],
["trudged down the hall","Walked slowly and heavily, often due to tiredness or reluctance.","무겁게, 터벅터벅 걸어가다","I trudged down the hall to my room, alone…","Educated"],
["tucked in my chin","To pull the chin down toward the chest, often as part of correcting posture.","턱을 안으로 당기다","“She straightened my posture by pulling the hair at the base of my neck until I’d tucked in my","Educated"],
["tumid","Swollen, enlarged, often abnormally.","부풀어 오른, 종창된","…but every morning it was somehow darker, more tumid.","Educated"],
["Tyler’s guilt was all-consuming","Tyler’s feelings of guilt were so overwhelming that they took over all of his thoughts and","타일러의 죄책감은 모든 것을 집어삼킬 정도로 강했다.","Tyler’s guilt was all-consuming.","Educated"],
["unfinished computations (noun phrase)","Incomplete mathematical calculations.","미완성 계산","…comparing the clean, balanced equation to the mayhem of unfinished computations…","Educated"],
["unrestrained","Not controlled or limited; free and unchecked, often in a negative or chaotic sense.","억제되지 않은, 제약 없는","“They shouted at each other for fifteen minutes. It was different from the fights they’d had","Educated"],
["usher in (phrasal verb)","To mark the beginning of something new or important.","~의 시작을 알리다, ~을 도래하게 하다","This would usher in the Second Coming of Christ.","Educated"],
["utility poles of thick cedar","Wooden poles made of strong cedar wood, used to support power or telephone lines.","두꺼운","…smashed through two utility poles of thick cedar…","Educated"],
["veneer of constraints and observances (noun phrase)","A thin surface or appearance of strict rules and religious practices, hiding what is underneath. /","“가치가 있는 것은 나 자신이 아니라, 나를 가린 제약과 의식의 허울이었다.”","“But what was of worth was not me, but the veneer of constraints and observances that obscured","Educated"],
["vexed glare she throws the clock","An annoyed or irritated look directed at the clock.","짜증 섞인 노려봄","…except for the occasional vexed glare she throws the clock when it tells her it’s still too early","Educated"],
["vindicated (verb – past tense)","To be proven right or justified after being doubted or criticized.","정당함이 입증되다, 옳음이 증명되다","Tonight he would be vindicated.","Educated"],
["violate the Sabbath (phrase)","To break or disrespect the religious rule of resting and avoiding work on the Sabbath.","안식일을 어기다","Everything had to be finished that day because I could not violate the Sabbath.","Educated"],
["waded toward (phrasal verb)","To walk with effort through water, snow, or another substance.","힘겹게 걸어 나아가다 (물이나","He waded toward the shore through waist-deep water.","Educated"],
["wafted","To drift or move lightly through the air.","(공중을) 흘러가다, 퍼지다","Then she wafted through the back door, so pale she seemed translucent…","Educated"],
["wallop me","To hit or strike very hard, often used informally.","세게 때리다, 혼내주다","I tried to run, because I thought he might wallop me for being in his room…","Educated"],
["warehouse was backed up (phrasal verb phrase)","When operations are delayed or blocked due to too much load.","물류 창고가 과부하되어","Near Albuquerque, the Walmart warehouse was backed up and couldn’t unload us for two days. /","Educated"],
["wary (adjective)","Careful and cautious because of possible danger.","조심스러운, 경계하는","At first Shawn watched the boys with wary concentration. / 처음에 션은 소년들을 조심스럽게","Educated"],
["was bled of my bitterness (phrase, figurative)","To feel as though negative emotions such as resentment or anger have been drained away, often","내 쓴 감정이 빠져나가다 (원한/분노가 사라지다)","I stared at his face, at the bandages wrapped around his forehead and over his ears, and was","Educated"],
["was positive that","Was completely sure about something.","~임을 확신했다","“...and I was positive that I’d failed the science.”","Educated"],
["We don’t dare move him (phrase)","Expressing fear or caution about taking an action, because it might be dangerous.","감히 그를 움직이지 못하다","“It’s so dark tonight, he didn’t even see it. We’ve called an ambulance. We don’t dare move","Educated"],
["weaving through traffic (phrasal verb)","Moving in and out of lanes quickly and dangerously.","교통 속에서 차선을 위험하게 왔다 갔다","About a red Ferrari that was weaving through traffic at 120 miles per hour. / 시속 120 마일로","Educated"],
["wedged between (phrasal verb)","Stuck tightly between two things.","사이에 끼이다","“I ran to Tyler’s car, which was wedged between Shawn’s truck and the chicken coop.”","Educated"],
["weighing my options","Thinking carefully about different choices before making a decision.","선택지를 저울질하다","“I’d been standing in the kitchen, weighing my options, thinking about how I’d just given Dad","Educated"],
["well cared for","Maintained with attention and effort, kept in good condition.","잘 관리된, 정성스럽게 돌본","“The decor was not expensive but it was well cared for.”","Educated"],
["were of two minds","To be divided in opinion; to disagree.","의견이 갈리다","“...she and her father were of two minds.”","Educated"],
["wheat from the tares","A biblical metaphor meaning to separate the good from the bad, the faithful from the unfaithful. /","…곡식과 가라지를 구분하는 영적 교리였다…","…a spiritual doctrine that separated the wheat from the tares…","Educated"],
["When the hour of need arises (expression)","A phrase meaning “if or when a critical or urgent moment comes.”","필요의 순간이 오면","“When the hour of need arises,” Dad said, “the time of preparation has passed.”","Educated"],
["white gurney (noun phrase)","A wheeled stretcher used in hospitals to transport patients, described here as white.","흰 들것","I imagined Shawn on a white gurney, the life leaking out of him.","Educated"],
["who knows what kind of people","An expression used to show suspicion or distrust, suggesting that the people in question might be","“아버지는 내가 시내에서 혼자, 어떤 사람들과 함께 있을지 알 수 없는 상황을 절대","“Dad would never allow me to spend time in town, alone, with who knows what kind of","Educated"],
["wholly absorbed in","Completely focused on or involved in something.","~에 완전히 몰두한","…she was wholly absorbed in listening to her mother…","Educated"],
["wide-brimmed","Describes a hat with a large, extended brim.","챙이 넓은","“He wore an Aussie outback hat, which was large, wide-brimmed, and made of chocolate-brown","Educated"],
["winded","Out of breath, usually from physical exertion.","숨이 찬, 숨이 가쁜","Grandma was winded after a few minutes, so she sat on a flat red stone…","Educated"],
["wishful thinking","Believing something because you want it to be true, not because of evidence.","희망적 사고,","“She’d dismissed both as wishful thinking.”","Educated"],
["witch hazel","A shrub whose extract is used in skincare and herbal medicine.","위치하젤 (약용 관목)","“I also need lobelia and witch hazel.”","Educated"],
["won’t do a damned thing (idiom)","Will not help or have any effect at all.","전혀 도움이 되지 않다, 아무 소용이 없다","All the advice in the world won’t do a damned thing if you don’t act on it.","Educated"],
["work at breakneck speed","To work extremely fast, often recklessly or dangerously.","매우 빠른 속도로 일하다, 목숨을 건","“He figured that to keep the lights on, he needed to work at breakneck speed.”","Educated"],
["working up the courage (verb phrase)","Gradually building the bravery to do something difficult.","용기를 내다","“I saw Charles at the first rehearsal and spent half the evening working up the courage to talk to","Educated"],
["worn out","Extremely tired or exhausted.","지쳐버린","“I was worn out from scrapping.”","Educated"],
["worth that was inherent and unshakable (phrase)","A deep, natural, and unquestionable value or dignity that cannot be taken away.","타고난,","“A kind of worth that was inherent and unshakable.”","Educated"],
["wrapped in gauze (phrase)","Covered with thin, loosely woven medical fabric, typically used to protect wounds or surgical","거즈로 감싸인","I vaguely recall that his head was wrapped in gauze…","Educated"],
["wrestle meaning from (verb phrase)","To struggle to understand or extract sense from something difficult or complex.","어렵게 의미를 짜내다, 이해하려 애쓰다","For two days I tried to wrestle meaning from the textbook’s dense passages.","Educated"],
["allegiance","Loyalty or support for a leader, country, or group","충성, 충성심","The soldiers swore allegiance to their country.","Lessons 25-1"],
["astutely observe","To notice something in a clever, insightful way","통찰력 있게 관찰하다, 날카롭게 지적하다","She astutely observed that the real issue was poor communication.","Lessons 25-1"],
["be itching to","To be very eager or impatient to do something","~하고 싶어서 안달이다","You must be itching to get the second podcast filmed.","Lessons 25-1"],
["best practice","Most effective way of doing something based on industry standards","최선의 방법, 모범 사례","Best practices for data security include using strong passwords.","Lessons 25-1"],
["bite the bullet","To force yourself to do something difficult","이를 악물고 하다","I bit the bullet and enrolled in the advanced course.","Lessons 25-1"],
["bloat","To swell or become excessively large","부풀다, 비대해지다","Feature bloat makes the app harder to use.","Lessons 25-1"],
["capitalize on","To take advantage of an opportunity","~을 이용하다, 활용하다","He capitalized on the pandemic.","Lessons 25-1"],
["cater to","To provide what is wanted; satisfy demands","~의 요구를 맞추다","Why are they catering to the minority?","Lessons 25-1"],
["customer churn","The loss of customers over time","고객 이탈","The company is trying to reduce customer churn.","Lessons 25-1"],
["doomed to","Certain to experience something bad","~할 운명이다","The project is doomed to fail without proper planning.","Lessons 25-1"],
["dud","A failure; something that doesn't work","실패작, 불량품","My show was a total dud.","Lessons 25-1"],
["embody","To represent or express something in a clear way","구현하다, 상징하다","She embodies the spirit of generosity.","Lessons 25-1"],
["entrench","To firmly establish so it is hard to change","확고히 자리 잡게 하다, 고착시키다","Traditional values are deeply entrenched in that society.","Lessons 25-1"],
["garner feedback","To gather or collect responses","피드백을 모으다","We need to garner feedback before launching.","Lessons 25-1"],
["go off on a tangent","To deviate from the main topic","옆길로 새다, 주제에서 벗어나다","I went off on a tangent again.","Lessons 25-1"],
["going through the motions","Doing something without enthusiasm or effort","형식적으로 하다, 그저 몸만 움직이다","He was just going through the motions at work.","Lessons 25-1"],
["half-heartedly","Without enthusiasm or commitment","마지못해, 성의 없이","If Netflix wants this to succeed, they cannot do it half-heartedly.","Lessons 25-1"],
["hallmark","A feature or quality typical of someone or something","특징, 특질","Creativity is the hallmark of a great designer.","Lessons 25-1"],
["have a lot riding on","To have much depending on something","~에 많은 것이 걸려 있다","There is a lot riding on this podcast.","Lessons 25-1"],
["hindsight","Understanding of a situation only after it has happened","뒤늦은 깨달음, 사후 판단","In hindsight, it was good for me.","Lessons 25-1"],
["I bit the bullet and enrolled","I forced myself to do something difficult, unpleasant, or that I was hesitant about.","이를 악물고 등록했다 / 망설였지만 결국 결심하고 등록했다","I bit the bullet and enrolled in the advanced course, even though I was nervous.","Lessons 25-1"],
["I'm paying out of pocket for this course","I’m covering the cost of this course with my own money, without reimbursement or financial","이 강의는 내 사비로 내고 있어요 / 내 돈으로 부담하고 있어요","Since my company doesn’t reimburse training fees, I’m paying out of pocket for this course.","Lessons 25-1"],
["incendiary","Causing heated debate or controversy","논쟁을 일으키는","It's an incendiary situation.","Lessons 25-1"],
["knack","A natural skill or talent for something","재주, 요령","She has a knack for making people feel comfortable.","Lessons 25-1"],
["leaves a lot to be desired","Unsatisfactory; not good enough","아쉬운 점이 많다, 부족하다","The presentation left a lot to be desired.","Lessons 25-1"],
["litigious","Tending to take legal action","소송을 좋아하는","Scientology is a litigious organization.","Lessons 25-1"],
["magnified","Made something appear larger or more important","확대된, 과장된","Her small mistake was magnified by the media.","Lessons 25-1"],
["mediocrity","The state of being average or not very good","평범함, 그저 그런 상태","He was frustrated by the mediocrity of his work.","Lessons 25-1"],
["mixed messaging","Sending contradictory signals","혼합된 메시지, 엇갈린 신호","They are sending mixed messages.","Lessons 25-1"],
["of paramount importance","Of the greatest importance","최우선의, 가장 중요한","It is of paramount importance that I finish the edit by Friday.","Lessons 25-1"],
["off-the-cuff","Without preparation; spontaneous","즉석에서, 즉흥적으로","How much of a typical podcast is preplanned, and how much is off-the-cuff?","Lessons 25-1"],
["Original sentence:","I consistently released episodes for years, but it took a long time before people started noticing","(정당의) 간부회의 / 당원 집회","I published my weekly podcast for many years before I began to gain traction.","Lessons 25-1"],
["out of pocket","Paying with your own money","사비로, 자기 돈으로","I'm paying out of pocket for this course.","Lessons 25-1"],
["out of the blue","Unexpectedly; suddenly","갑자기, 예상 밖에","He contacted me out of the blue.","Lessons 25-1"],
["over the top","Exaggerated; excessive","지나친, 과장된","Their presenting style is over the top.","Lessons 25-1"],
["peckish","Slightly hungry","약간 배고픈","I'm peckish - shall we grab a snack?","Lessons 25-1"],
["pigeon-holed","Unfairly categorized or labeled, limiting perceived abilities","틀에 박힌","I feel pigeon-holed by my coworkers as a podcast creator.","Lessons 25-1"],
["poach","To recruit or steal talent from competitors","빼앗다, 빼내가다 (인재)","YouTube tries to poach creators from other platforms.","Lessons 25-1"],
["poaching","","밀렵, 불법 사냥","","Lessons 25-1"],
["probing questions","Deep, searching questions to get detailed information","탐색적 질문, 심층 질문","The interviewer asked probing questions about his career.","Lessons 25-1"],
["pump out","To produce rapidly and in large quantities","대량 생산하다","You can pump out podcast content at a fast rate.","Lessons 25-1"],
["seasoned","Experienced and skilled","경험이 풍부한, 노련한","She is a seasoned professional in the field.","Lessons 25-1"],
["set my sights on","To decide to achieve a particular goal","~을 목표로 삼다","I've set my sights on successfully pitching as many ideas as possible.","Lessons 25-1"],
["shortlist","A final list of candidates or options","최종 후보 목록","We need to finalize the shortlist before the next meeting.","Lessons 25-1"],
["sporadically","Inconsistently; infrequently","산발적으로, 드물게","We make content sporadically.","Lessons 25-1"],
["sugar coat","To make something seem less unpleasant than it really is","듣기 좋게 말하다, 포장하다","I don't sugar coat what I say.","Lessons 25-1"],
["sunk cost fallacy","Continuing something because of invested effort, not value","매몰 비용의 오류","Don't let the sunk cost fallacy make you stay in a bad situation.","Lessons 25-1"],
["vicious cycle","A repeating negative loop where problems worsen","악순환","It's a vicious cycle of stress and insomnia.","Lessons 25-1"],
["virtuous cycle","A positive feedback loop of continuous improvement","선순환","Investment leads to growth - it's a virtuous cycle.","Lessons 25-1"],
["10. Cursor","A movable indicator on a computer screen.","커서","Click the icon when your cursor is over it.","Lessons 25-2"],
["12. Profound","Very deep, intense, or meaningful.","심오한, 깊은","Her speech had a profound effect on me.","Lessons 25-2"],
["15. Information Overload","When too much information is presented, making it hard to process.","정보 과부하","Too many pop-ups cause information overload.","Lessons 25-2"],
["15. Insight","A clear, deep understanding of a situation or problem.","통찰, 이해","User interviews provided valuable insights.","Lessons 25-2"],
["18. Curiosities","Unusual or interesting things that attract attention.","호기심을 불러일으키는 것, 진기한 것","The museum is full of ancient curiosities.","Lessons 25-2"],
["21. Emphasize","To give special importance to something.","강조하다","Use bold text to emphasize key points.","Lessons 25-2"],
["21. Mitigate","To reduce the negative effects of something.","완화하다, 줄이다","Remote testing can mitigate the Hawthorne Effect.","Lessons 25-2"],
["27. Crucial","Extremely important or essential.","매우 중요한, 결정적인","Understanding user behavior is crucial for good UX.","Lessons 25-2"],
["27. User-Friendly","Easy to use and understand.","사용자 친화적인","The new website is very user-friendly.","Lessons 25-2"],
["3. Behavior","The way a person acts or responds in certain situations.","행동","Their behavior changed once they knew they were being watched.","Lessons 25-2"],
["3. Capacity","The maximum amount that something can contain or handle.","용량, 능력","The human brain has a limited capacity for attention.","Lessons 25-2"],
["4. Error Rate","The frequency at which mistakes occur.","오류율","Small buttons lead to higher error rates.","Lessons 25-2"],
["9. Retain","To keep or remember information.","유지하다, 기억하다","It’s hard to retain too many details at once.","Lessons 25-2"],
["9. True Environment","A real or natural setting, not influenced by outside factors.","실제 환경","Testing in a true environment provides more reliable data.","Lessons 25-2"],
["A flurry of","A sudden, busy burst of activity.","갑작스러운 활동 / 소동","A flurry of brainstorming among staffers began, and in 2005, NPR launched Press Start…","Lessons 25-2"],
["a very clear mandate","A strong and specific directive or order.","매우 분명한 지시 / 명확한 임무","…to have a very clear mandate for yourself, and that extends to podcasting, too.","Lessons 25-2"],
["ahead of the curve","More advanced or innovative than others.","앞서 있는 / 선도적인","Holt believed they were ahead of the curve.","Lessons 25-2"],
["Bride","wife","","","Lessons 25-2"],
["call it a day","To stop working for the day","오늘은 그만하다","Let's call it a day. We've done enough.","Lessons 25-2"],
["call time on","To decide to end something permanently","끝내다, 종지부를 찍다","They called time on their ten-year marriage.","Lessons 25-2"],
["called more into the need","Increased the urgency or emphasis for something.","필요성을 더 강하게 요구하다","…that's even called more into the need to have a very clear mandate…","Lessons 25-2"],
["case in point","A specific example that proves a general point","적절한 사례, 좋은 예","The success of Serial is a case in point.","Lessons 25-2"],
["collusion","Secret cooperation to deceive others","공모, 결탁","The companies were accused of collusion to fix prices.","Lessons 25-2"],
["conceive of","To imagine or think of something","상상하다, 생각하다","I tried everything I could conceive of.","Lessons 25-2"],
["consults with","Discusses or seeks advice from.","상담하다 / 상의하다","When Nissenblatt consults with people about what they want their podcast to sound like…","Lessons 25-2"],
["credentials","Qualifications proving suitability","자격, 자격 증명서","She has impressive credentials in marketing.","Lessons 25-2"],
["credentials (자격","documents, qualifications, or achievements that prove someone is suitable for a job or position","자격 증명서 / 경력)","She has impressive credentials in marketing and management.","Lessons 25-2"],
["credits NPR as a big part of","Acknowledges NPR’s major influence.","NPR 을 큰 부분으로 인정하다","…Nissenblatt credits NPR as a big part of why she got into the podcast space…","Lessons 25-2"],
["debilitating","Making someone very weak or unable to function","심신을 약화시키는, 쇠약하게 만드는","He suffered from a debilitating illness.","Lessons 25-2"],
["do come up every so often","Appear or happen occasionally.","가끔 나타나다 / 이따금 생기다","They still do come up every so often and climb the charts…","Lessons 25-2"],
["double-edged sword","Something that has both advantages and disadvantages","양날의 검","Social media is a double-edged sword.","Lessons 25-2"],
["early aughts","The early 2000s (2000–2005).","2000 년대 초반","When NPR stepped into podcasting in the early aughts, the work was largely experimental.","Lessons 25-2"],
["eat into market share","To reduce a company's share of customers","시장 점유율을 잠식하다","Competitors want to eat into our market share.","Lessons 25-2"],
["eat into our market share","To reduce or take away part of a company’s share of customers or sales.","시장 점유율을 잠식하다","I think there's lots of other people that want to come and eat into our market share…","Lessons 25-2"],
["Expression: trawl through","","(많은 양의 자료를) 샅샅이 뒤지다 / 꼼꼼히 살펴보다","I had to trawl through 10 hours of footage.","Lessons 25-2"],
["fact-checked piece","A work that has been verified for accuracy.","사실 확인된 글 / 검증된 자료","…it's harder to make an investigative, fact-checked piece than it is to sit down with a","Lessons 25-2"],
["fallen down the charts","Declined in ranking or popularity.","차트 순위가 떨어지다","…journalistic podcasts of all stripes have fallen down the charts…","Lessons 25-2"],
["fettered by","Restricted, limited, or held back by something","~에 얽매이다, 속박된","She felt fettered by social expectations.","Lessons 25-2"],
["first-world problems","Minor complaints that seem trivial compared to real hardship","사소한 불평, 사치스러운 고민","My Wi-Fi is slow - total first-world problem.","Lessons 25-2"],
["genuflecting","Showing excessive deference or obedience","굽실거리다, 복종하다","Stop genuflecting to authority.","Lessons 25-2"],
["growing pains","Temporary problems during the early stages of development.","성장통 / 초기의 어려움","Innovation doesn't come without growing pains, though.","Lessons 25-2"],
["growth spurt","A period of rapid growth","급격한 성장기","He had a growth spurt in high school.","Lessons 25-2"],
["had this run of hits","Experienced a period of repeated success.","히트작이 연속으로 나왔다 / 성공 행진을 했다","\"We just had this run of hits for several years. And people were asking, 'How did that happen?'\"","Lessons 25-2"],
["has shaped much of the podcast world","Has greatly influenced or formed the podcast industry.","팟캐스트 세계의 많은 부분을 형성했다","NPR's podcast vibe has shaped much of the podcast world.","Lessons 25-2"],
["have their books featured","To have one’s books shown, highlighted, or promoted.","책이 소개되다 / 책이 실리다","Much like every author and publisher wants to have their books featured on one of NPR's","Lessons 25-2"],
["highly produced","Carefully and professionally made","매우 정교하게 제작된","The podcast is highly produced with great audio quality.","Lessons 25-2"],
["imposter syndrome","Feeling like a fraud despite evidence of success","가면 증후군, 사기꾼 증후군","Many high achievers experience imposter syndrome.","Lessons 25-2"],
["in hindsight","Looking back at a past event with better understanding","돌이켜 보니, 지나고 보니","In hindsight, it was good for me.","Lessons 25-2"],
["in part","Partially; not completely.","부분적으로 / 어느 정도는","His job is, in part, to ensure that the network reaches the largest audience possible.","Lessons 25-2"],
["in the long run","Over a long period of time; eventually.","결국 / 장기적으로 보면","…that, in the long run, became very difficult.","Lessons 25-2"],
["keep on top of","To stay in control of; manage well","잘 파악하다, 관리하다","Are you managing to keep on top of the workload?","Lessons 25-2"],
["Korean","","한국어:","","Lessons 25-2"],
["mainstream in a way that it wasn't before","Something that has become part of ordinary, widely accepted culture compared to the past.","이전에는 아니었던 방식으로 주류가 되었다","Nuzum said the podcast world today is mainstream in a way that it wasn't before.","Lessons 25-2"],
["making an impact","Creating a strong effect or influence.","영향을 주다 / 큰 효과를 내다","What they mean is making an impact.","Lessons 25-2"],
["Meaning","","의미:","","Lessons 25-2"],
["milk them dry","To exploit someone for all their resources","끝까지 짜내다, 착취하다","The corporation milked its customers dry.","Lessons 25-2"],
["morphed","Gradually changed or transformed.","변하다 / 변화하다","Every couple of years, he said, podcasting has morphed and changed…","Lessons 25-2"],
["nerve-wracking","Extremely stressful or anxiety-inducing","초조하게 하는, 불안한","Was it nerve-wracking to sing in front of others?","Lessons 25-2"],
["non-intrusive","Not bothersome; blending in naturally","거슬리지 않는, 불편하지 않은","I want the camera to be as non-intrusive as possible.","Lessons 25-2"],
["noughties","The early 2000s decade","2000년대 초반","Low-rise jeans were popular in the early noughties.","Lessons 25-2"],
["of all stripes","Of all types or kinds","모든 종류의","People of all stripes attended the event.","Lessons 25-2"],
["Of NPR's early podcast presence","Referring to NPR’s initial involvement in podcasting.","NPR 의 초기 팟캐스트 존재감에 대해","Of NPR's early podcast presence, Holt believed they were ahead of the curve.","Lessons 25-2"],
["on the periphery","On the edge; not centrally involved","주변에, 가장자리에","I was on the periphery of the event.","Lessons 25-2"],
["operating at a breakneck speed","Moving or working extremely fast.","매우 빠른 속도로 운영하다","They were operating at a breakneck speed, Nuzum said.","Lessons 25-2"],
["paved the way for","To make progress possible for something in the future.","~을 위한 길을 열다 / 토대를 마련하다","These early efforts paved the way for programs that would expand NPR's brand identity…","Lessons 25-2"],
["pop psychology","Simplified psychological ideas popular in media","팝 심리학","The book is full of pop psychology tips.","Lessons 25-2"],
["potent mix","A powerful or effective combination","강력한 조합","It's a potent mix of humor and insight.","Lessons 25-2"],
["relay","To pass on information","전달하다","I want to relay my quarterly objectives to you.","Lessons 25-2"],
["scored","Successfully obtained or achieved something.","얻다 / 따내다","They were granted access to gatherings for game enthusiasts and scored interviews with gaming","Lessons 25-2"],
["self-sustaining business","A business that can support itself without external help.","자생적인 / 스스로 유지되는 사업","…Nuzum added, provided proof that podcasting was a self-sustaining business for NPR…","Lessons 25-2"],
["Sentence","","문장:","","Lessons 25-2"],
["separates us from","Distinguishes or makes us different.","우리를 ~와 구별하다","What separates us from anyone else, and what can we do different than everyone else?","Lessons 25-2"],
["serve","To provide or deliver something to people.","제공하다 / 봉사하다","…allowing it to serve large-scale audiences on digital platforms and bring in money as well.","Lessons 25-2"],
["shamefully","in a way that causes shame or embarrassment / 부끄럽게도","","Shamefully, I once worked on a gambling podcast.","Lessons 25-2"],
["skim","To read quickly, focusing on main ideas","대충 훑어보다","Sometimes I just skim the articles.","Lessons 25-2"],
["sort of see if","To tentatively check or test whether something will happen.","어찌 보면 ~인지 확인하다","…and sort of see if they can persuade our listeners to go somewhere else.","Lessons 25-2"],
["spout","To say something in a forceful, careless way","마구 쏟아내다","He was constantly spouting hate speech.","Lessons 25-2"],
["stepped into","To begin or enter into a new activity.","새로 시작하다 / 발을 들이다","When NPR stepped into podcasting in the early aughts, the work was largely experimental.","Lessons 25-2"],
["taken a toll on","To have a harmful effect over time","~에 피해를 주다, 타격을 입히다","The stress has taken a toll on my health.","Lessons 25-2"],
["tasked with","Given the responsibility to do something.","~의 임무를 맡다","Eric Nuzum, at the time NPR's director of programming and acquisitions at NPR, was tasked","Lessons 25-2"],
["that extends to","Something that also applies to.","~에도 적용되다 / 확장되다","…to have a very clear mandate for yourself, and that extends to podcasting, too.","Lessons 25-2"],
["the biggest shift","The most significant change.","가장 큰 변화","YouTube's growth as a podcasting platform is the biggest shift in the last two years…","Lessons 25-2"],
["the brain behind","The person responsible for creating something","~의 주역, 두뇌","She is the brain behind the successful startup.","Lessons 25-2"],
["the fact is that","Used to emphasize the truth of something.","사실은 ~이다","…but the fact is that it's harder to make an investigative, fact-checked piece…","Lessons 25-2"],
["to be pissed off","to be very annoyed or angry (informal) / 몹시 화가 나다, 짜증나다","","Are you pissed off about the way you were made redundant at work?","Lessons 25-2"],
["to browse","to look through things casually, without a specific goal / 둘러보다, 훑어보다","","I like to browse books at the bookstore before deciding what to buy.","Lessons 25-2"],
["to call it a day","to stop working (or doing an activity), usually because you’re tired or it’s the end of the work","오늘은 그만하다 / 일을 마무리하다","","Lessons 25-2"],
["to perform ancestral rites","","제사를 지내다","","Lessons 25-2"],
["took advantage of it","Used a situation to one’s benefit.","그것을 이용하다 / 활용하다","And we took advantage of it, and NPR took a chance on that.","Lessons 25-2"],
["trawl through","To search through carefully","샅샅이 뒤지다, 꼼꼼히 살펴보다","I spent hours trawling through old documents.","Lessons 25-2"],
["tremendous pressure to get podcasting right","A huge amount of stress to succeed in podcasting.","팟캐스트를 제대로 하라는 엄청난 압박","He recounted the tremendous pressure to get podcasting right for NPR.","Lessons 25-2"],
["way ahead of the game","Much more advanced or prepared than others.","훨씬 앞서 있는 / 훨씬 더 준비된","We were way ahead of the game, and we knew it.","Lessons 25-2"],
["Word: 인연","","","우리 인연이 이렇게 다시 이어질 줄은 몰랐어요.","Lessons 25-2"],
["area of expertise","A subject one is very knowledgeable about","전문 분야","This is my area of expertise.","Lessons 25-3"],
["biological agent","","생물학적 작용제","","Lessons 25-3"],
["blunted affect","Reduced emotional expression","둔마된 정서","The patient showed a blunted affect during the interview.","Lessons 25-3"],
["cash rich","","현금이 풍부한","","Lessons 25-3"],
["composure","The state of being calm and in control","평정심, 침착함","I lost my composure during the interview.","Lessons 25-3"],
["confide in","To tell someone a secret or personal matter","(비밀을) 털어놓다","She confided in her best friend about her worries.","Lessons 25-3"],
["culprit","The cause of a problem; the guilty party","범인, 원인","Lack of sleep was the main culprit behind poor performance.","Lessons 25-3"],
["delve into","To examine closely and in detail","깊이 탐구하다","Let's delve into the topic further.","Lessons 25-3"],
["draw a line underneath","To finish and move on from something","마무리하고 넘어가다","Sorting my belongings helped me draw a line underneath this chapter.","Lessons 25-3"],
["fallen on one's shoulders","To become one's responsibility","책임이 ~에게 떨어지다","It's fallen on my shoulders to find a solution.","Lessons 25-3"],
["fight, flight, freeze","Basic stress responses to threats","싸움-도피-경직 반응","Under extreme stress, people react with fight, flight, or freeze.","Lessons 25-3"],
["go through phases","To experience different periods of interest","여러 단계를 거치다","I go through phases of being deeply interested then losing interest.","Lessons 25-3"],
["go with the flow","To accept situations as they come","상황에 맞춰 흘러가다","I'm trying not to get stressed and just go with the flow.","Lessons 25-3"],
["graze","","살짝 긁히다, 까지다","","Lessons 25-3"],
["I have been put in a bad position","","저는 곤란한 상황에 놓였어요.","","Lessons 25-3"],
["impregnable","Impossible to break through","난공불락의, 뚫을 수 없는","The fortress was considered impregnable.","Lessons 25-3"],
["it's jargon heavy","","전문 용어가 많이 들어 있어요","","Lessons 25-3"],
["jargon","","전문 용어","","Lessons 25-3"],
["knock up","To prepare something quickly (British)","급하게 만들다","I will knock up the document.","Lessons 25-3"],
["loose ends to tie up","Small remaining tasks to complete","마무리해야 할 자잘한 일들","I've left my job but there are some loose ends to tie up.","Lessons 25-3"],
["making waves","Causing a big reaction or attention","큰 반향을 일으키다, 화제를 만들다","This game has been making waves recently.","Lessons 25-3"],
["medical complication","","의학적 합병증","","Lessons 25-3"],
["mind reader","","상대의 마음을 읽는 사람","I’m not a mind reader—you have to tell me what you want. /","Lessons 25-3"],
["nagging feeling","A persistent, bothersome feeling","계속 신경 쓰이는 느낌, 찝찝한 감정","There's a nagging feeling I can't shake off.","Lessons 25-3"],
["post","","게시글","","Lessons 25-3"],
["push through","To continue despite difficulty","밀고 나가다, 견디고 해내다","She decided to push through the pain.","Lessons 25-3"],
["put forth","To propose, suggest, or present formally","제시하다, 내놓다","She put forth a compelling argument during the meeting.","Lessons 25-3"],
["put oneself down","To criticize yourself","스스로를 깎아내리다","I shouldn't put myself down.","Lessons 25-3"],
["rebel","","반항아, 반체제 인물","","Lessons 25-3"],
["remaining holiday","","남은 휴가","","Lessons 25-3"],
["resistance is futile","It's useless to resist","저항해도 소용없다","Resistance is futile.","Lessons 25-3"],
["right out of the gate","From the very beginning","시작부터, 처음부터","We've got an interesting expression right out of the gate.","Lessons 25-3"],
["rubs me the wrong way","Irritates or bothers me","신경을 거슬리게 하다","He rubs me the wrong way for some reason.","Lessons 25-3"],
["sabbatical","","안식년, 장기 휴직","She took a sabbatical to focus on her health. /","Lessons 25-3"],
["see eye to eye","To agree with someone","의견이 맞다","We don't see eye to eye on this issue.","Lessons 25-3"],
["self-deprecating","Showing modesty about oneself, often humorously","자기비하적인","He has a self-deprecating sense of humor.","Lessons 25-3"],
["severance pay","Money paid when leaving a job","퇴직금","He received a generous severance package.","Lessons 25-3"],
["stumble across","To find by chance","우연히 발견하다","I stumbled across this episode by searching on Spotify.","Lessons 25-3"],
["tax return","","세금 환급","","Lessons 25-3"],
["the world is your oyster","Limitless possibilities are available","세상은 네 마음대로야","You're young - the world is your oyster.","Lessons 25-3"],
["think things through","To consider carefully before acting","충분히 생각하다, 숙고하다","Take your time and think things through.","Lessons 25-3"],
["this game has been making waves recently","","이 게임은 최근에 큰 화제를 일으키고 있어요.","","Lessons 25-3"],
["to be put in a bad position","","곤란한 상황에 놓이다","","Lessons 25-3"],
["to be put up","","숙박 제공을 받다, 묵게 해주다","","Lessons 25-3"],
["to deduct","","공제하다","","Lessons 25-3"],
["to make waves","","큰 반향을 일으키다, 화제를 만들다","","Lessons 25-3"],
["to turn one’s attention to","","towards / ~에 주의를 돌리다","","Lessons 25-3"],
["triage","To sort by priority","우선순위 분류","I got better at triaging my emails.","Lessons 25-3"],
["underlying feeling","","속에 깔린 감정, 근본적인 느낌","","Lessons 25-3"],
["unwavering support","Steady, constant support","흔들림 없는 지지","I appreciated my wife's unwavering support.","Lessons 25-3"],
["Was the turnout poor?","","참석률이 저조했나요?","","Lessons 25-3"],
["windfall","A sudden, unexpected amount of money","뜻밖의 큰돈, 횡재","I received a windfall from the investment.","Lessons 25-3"],
["year-end tax settlement","","연말 정산","","Lessons 25-3"]
];

const VOCAB = D.map(([w, m, k, e, c]) => ({
  word: w,
  meaning: m,
  korean: k,
  example: e,
  category: c,
}));

// Category colors
const CATEGORY_COLORS = {
  "Big Little Lies": "rose",
  "Educated": "sky",
  "Atomic Habits": "amber",
  "Lessons 25-1": "emerald",
  "Lessons 25-2": "violet",
  "Lessons 25-3": "cyan",
};

const getBgColor = (category) => {
  const color = CATEGORY_COLORS[category] || "gray";
  const colorMap = {
    rose: "bg-rose-100 text-rose-900",
    sky: "bg-sky-100 text-sky-900",
    amber: "bg-amber-100 text-amber-900",
    emerald: "bg-emerald-100 text-emerald-900",
    violet: "bg-violet-100 text-violet-900",
    cyan: "bg-cyan-100 text-cyan-900",
    gray: "bg-gray-100 text-gray-900",
  };
  return colorMap[color];
};

const getCategoryBgDark = (category) => {
  const color = CATEGORY_COLORS[category] || "gray";
  const colorMap = {
    rose: "bg-rose-950 border-rose-700",
    sky: "bg-sky-950 border-sky-700",
    amber: "bg-amber-950 border-amber-700",
    emerald: "bg-emerald-950 border-emerald-700",
    violet: "bg-violet-950 border-violet-700",
    cyan: "bg-cyan-950 border-cyan-700",
    gray: "bg-gray-800 border-gray-700",
  };
  return colorMap[color];
};

const getCategoryTextColor = (category) => {
  const color = CATEGORY_COLORS[category] || "gray";
  const colorMap = {
    rose: "text-rose-200",
    sky: "text-sky-200",
    amber: "text-amber-200",
    emerald: "text-emerald-200",
    violet: "text-violet-200",
    cyan: "text-cyan-200",
    gray: "text-gray-200",
  };
  return colorMap[color];
};

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [expandedWords, setExpandedWords] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizSetup, setQuizSetup] = useState({
    step: "setup",
    categories: new Set(),
    count: 10,
    direction: "en-kr",
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
  });

  // Get all categories
  const categories = useMemo(
    () => [...new Set(VOCAB.map((v) => v.category))].sort(),
    []
  );

  // Filtered vocabulary based on search and category
  const filteredVocab = useMemo(() => {
    return VOCAB.filter((v) => {
      const matchesSearch =
        v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.korean.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.size === 0 || selectedCategories.has(v.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  // Statistics
  const stats = useMemo(() => {
    const total = VOCAB.length;
    const learned = learnedWords.size;
    const accuracy =
      learned > 0 ? Math.round((learned / total) * 100) : 0;
    const categoryStats = categories.reduce((acc, cat) => {
      acc[cat] = VOCAB.filter((v) => v.category === cat).length;
      return acc;
    }, {});
    return { total, learned, accuracy, categoryStats };
  }, [learnedWords, categories]);

  // Toggle learned word
  const toggleLearned = useCallback((word) => {
    setLearnedWords((prev) => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      return next;
    });
  }, []);

  // Toggle expanded word in browse
  const toggleExpanded = useCallback((word) => {
    setExpandedWords((prev) => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else {
        next.add(word);
      }
      return next;
    });
  }, []);

  // Toggle category selection
  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  // Flashcard navigation
  const flashcardVocab = useMemo(() => {
    return VOCAB.filter(
      (v) =>
        selectedCategories.size === 0 || selectedCategories.has(v.category)
    );
  }, [selectedCategories]);

  const handleFlashcardNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcardVocab.length);
    setIsFlipped(false);
  };

  const handleFlashcardPrev = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + flashcardVocab.length) % flashcardVocab.length
    );
    setIsFlipped(false);
  };

  const handleFlashcardShuffle = () => {
    setCurrentCardIndex(Math.floor(Math.random() * flashcardVocab.length));
    setIsFlipped(false);
  };

  // Quiz setup and generation
  const handleQuizSetupCategoryToggle = (category) => {
    setQuizSetup((prev) => {
      const categories = new Set(prev.categories);
      if (categories.has(category)) {
        categories.delete(category);
      } else {
        categories.add(category);
      }
      return { ...prev, categories };
    });
  };

  const handleStartQuiz = () => {
    const quizVocab = VOCAB.filter((v) =>
      quizSetup.categories.has(v.category)
    );
    if (quizVocab.length === 0) return;

    const selectedVocab = quizVocab
      .sort(() => Math.random() - 0.5)
      .slice(0, quizSetup.count);

    const questions = selectedVocab.map((v) => {
      const correctIndex = Math.floor(Math.random() * 4);
      const choices = [];

      const otherWords = VOCAB.filter((w) => w.word !== v.word);
      for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
          choices.push(
            quizSetup.direction === "en-kr" ? v.korean : v.meaning
          );
        } else {
          const randomWord =
            otherWords[Math.floor(Math.random() * otherWords.length)];
          choices.push(
            quizSetup.direction === "en-kr"
              ? randomWord.korean
              : randomWord.meaning
          );
        }
      }

      return {
        vocab: v,
        correctIndex,
        choices,
      };
    });

    setQuizSetup((prev) => ({
      ...prev,
      step: "quiz",
      questions,
      currentIndex: 0,
      answers: [],
      score: 0,
    }));
  };

  const handleQuizAnswer = (choiceIndex) => {
    const currentQuestion = quizSetup.questions[quizSetup.currentIndex];
    const isCorrect = choiceIndex === currentQuestion.correctIndex;

    setQuizSetup((prev) => {
      const answers = [
        ...prev.answers,
        {
          vocab: currentQuestion.vocab,
          selected: choiceIndex,
          correct: currentQuestion.correctIndex,
          isCorrect,
        },
      ];
      const newScore = isCorrect ? prev.score + 1 : prev.score;

      if (prev.currentIndex + 1 < prev.questions.length) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          answers,
          score: newScore,
        };
      } else {
        return {
          ...prev,
          step: "results",
          answers,
          score: newScore,
        };
      }
    });
  };

  const handleRestartQuiz = () => {
    setQuizSetup({
      step: "setup",
      categories: new Set(),
      count: 10,
      direction: "en-kr",
      questions: [],
      currentIndex: 0,
      answers: [],
      score: 0,
    });
  };

  // Render tabs
  const renderHome = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          형모님의 영어 학습
        </h1>
        <p className="text-gray-400">영어 어휘를 마스터하세요!</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {stats.total}
          </div>
          <div className="text-sm text-gray-400">Total Words</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {stats.learned}
          </div>
          <div className="text-sm text-gray-400">Learned</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {stats.accuracy}%
          </div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-3">
          Category Breakdown
        </h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBgColor(cat)}`}>
                {cat}
              </span>
              <span className="text-gray-300">
                {stats.categoryStats[cat]} words
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search words..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategories.has(cat)
                ? getBgColor(cat)
                : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredVocab.map((vocab) => (
          <div
            key={vocab.word}
            className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleExpanded(vocab.word)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-800 transition"
            >
              <div className="text-left">
                <div className="font-bold text-white">{vocab.word}</div>
                <div className="text-sm text-gray-400">{vocab.meaning}</div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getBgColor(vocab.category)}`}
                >
                  {vocab.category}
                </span>
                {expandedWords.has(vocab.word) ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </div>
            </button>

            {expandedWords.has(vocab.word) && (
              <div className="bg-gray-800 border-t border-gray-700 p-3 space-y-2">
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase">
                    Korean
                  </div>
                  <div className="text-white">{vocab.korean}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase">
                    Example
                  </div>
                  <div className="text-gray-300 text-sm italic">
                    {vocab.example || "No example provided"}
                  </div>
                </div>
                <button
                  onClick={() => toggleLearned(vocab.word)}
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    learnedWords.has(vocab.word)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  }`}
                >
                  {learnedWords.has(vocab.word) ? "✓ Learned" : "Mark as Learned"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFlashcard = () => {
    if (flashcardVocab.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">Please select a category first</p>
        </div>
      );
    }

    const currentVocab = flashcardVocab[currentCardIndex];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategories((prev) => {
                  const next = new Set(prev);
                  if (next.has(cat)) {
                    next.delete(cat);
                  } else {
                    next.add(cat);
                  }
                  return next;
                });
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedCategories.has(cat)
                  ? getBgColor(cat)
                  : "bg-gray-800 text-gray-300 border border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full max-w-md aspect-video flex flex-col items-center justify-center rounded-xl border-2 font-bold text-2xl cursor-pointer transition transform hover:scale-105 ${
              isFlipped
                ? `${getCategoryBgDark(currentVocab.category)} ${getCategoryTextColor(currentVocab.category)} border-transparent`
                : "bg-gray-900 border-gray-700 text-white"
            }`}
          >
            <div className="text-center">
              {!isFlipped ? (
                <>
                  <div className="text-sm font-semibold text-gray-400 mb-2">
                    English
                  </div>
                  <div>{currentVocab.word}</div>
                </>
              ) : (
                <>
                  <div className="text-lg mb-4">
                    {currentVocab.meaning}
                  </div>
                  <div className="text-sm font-normal text-gray-300">
                    {currentVocab.korean}
                  </div>
                  <div className="text-xs font-normal text-gray-400 mt-4 italic">
                    {currentVocab.example}
                  </div>
                </>
              )}
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleFlashcardPrev}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition"
          >
            <ArrowLeft size={18} />
            Prev
          </button>
          <div className="text-gray-400 text-sm">
            {currentCardIndex + 1} / {flashcardVocab.length}
          </div>
          <button
            onClick={handleFlashcardNext}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition"
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFlashcardShuffle}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition"
          >
            <Shuffle size={18} />
            Shuffle
          </button>
          <button
            onClick={() => toggleLearned(currentVocab.word)}
            className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
              learnedWords.has(currentVocab.word)
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-200"
            }`}
          >
            {learnedWords.has(currentVocab.word) ? "✓ Got it" : "Practice"}
          </button>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (quizSetup.step === "setup") {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">
              Select Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleQuizSetupCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    quizSetup.categories.has(cat)
                      ? getBgColor(cat)
                      : "bg-gray-800 text-gray-300 border border-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3">
              Number of Questions
            </h2>
            <div className="flex gap-2">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() =>
                    setQuizSetup((prev) => ({ ...prev, count }))
                  }
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                    quizSetup.count === count
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 border border-gray-700"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3">Direction</h2>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setQuizSetup((prev) => ({
                    ...prev,
                    direction: "en-kr",
                  }))
                }
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  quizSetup.direction === "en-kr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 border border-gray-700"
                }`}
              >
                English → Korean
              </button>
              <button
                onClick={() =>
                  setQuizSetup((prev) => ({
                    ...prev,
                    direction: "kr-en",
                  }))
                }
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  quizSetup.direction === "kr-en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 border border-gray-700"
                }`}
              >
                Korean → English
              </button>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={quizSetup.categories.size === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (quizSetup.step === "quiz") {
      const currentQuestion = quizSetup.questions[quizSetup.currentIndex];
      const isEn = quizSetup.direction === "en-kr";

      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-gray-400 text-sm">
              Question {quizSetup.currentIndex + 1} of{" "}
              {quizSetup.questions.length}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all"
                style={{
                  width: `${((quizSetup.currentIndex + 1) / quizSetup.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">
              {isEn ? "English" : "Korean"}
            </div>
            <div className="text-2xl font-bold text-white">
              {isEn
                ? currentQuestion.vocab.word
                : currentQuestion.vocab.korean}
            </div>
          </div>

          <div className="space-y-2">
            {currentQuestion.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-3 font-medium transition text-left border border-gray-700"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (quizSetup.step === "results") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <div className="text-4xl font-bold text-green-400">
              {quizSetup.score} / {quizSetup.questions.length}
            </div>
            <div className="text-gray-400 mt-2">
              {Math.round((quizSetup.score / quizSetup.questions.length) * 100)}%
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Wrong Answers</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quizSetup.answers
                .filter((a) => !a.isCorrect)
                .map((answer, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-3"
                  >
                    <div className="font-bold text-white">
                      {answer.vocab.word}
                    </div>
                    <div className="text-sm text-red-400">
                      Your answer:{" "}
                      {answer.choices
                        ? answer.choices[answer.selected]
                        : "Unknown"}
                    </div>
                    <div className="text-sm text-green-400">
                      Correct:{" "}
                      {answer.choices
                        ? answer.choices[answer.correct]
                        : answer.vocab.korean}
                    </div>
                  </div>
                ))}
              {quizSetup.answers.filter((a) => !a.isCorrect).length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  Perfect score! No wrong answers.
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <RotateCcw size={18} />
            Take Another Quiz
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {currentTab === "home" && renderHome()}
          {currentTab === "browse" && renderBrowse()}
          {currentTab === "flashcard" && renderFlashcard()}
          {currentTab === "quiz" && renderQuiz()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-800 bg-gray-950 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-around">
          <button
            onClick={() => setCurrentTab("home")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              currentTab === "home"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">홈</span>
          </button>
          <button
            onClick={() => setCurrentTab("browse")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              currentTab === "browse"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Book size={24} />
            <span className="text-xs font-medium">단어장</span>
          </button>
          <button
            onClick={() => setCurrentTab("flashcard")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              currentTab === "flashcard"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Zap size={24} />
            <span className="text-xs font-medium">플래시카드</span>
          </button>
          <button
            onClick={() => setCurrentTab("quiz")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              currentTab === "quiz"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs font-medium">퀴즈</span>
          </button>
        </div>
      </div>
    </div>
  );
}
