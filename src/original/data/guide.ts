export type Selection = { players: number; mode: 'team' | 'individual' };
export type ExampleGroup = { label: string; cards: string[] };
export type Slide = {
 setup?: number; phase?: '게임 준비' | '게임 시작';
 title: string; paragraphs: string[]; cards?: string[]; note?: string; stat?: string;
 action?: boolean; seats?: boolean; examples?: ExampleGroup[]; verdict?: '가능!' | '불가능!';
 visual?: 'exchange' | 'hand' | 'trick' | 'scores' | 'overview' | 'combinations' | 'team-score' | 'dragon-win' | 'round-end' | 'six-team' | 'turn-examples' | 'special-overview'; emphasis?: string;
};
export type Tab = 'home' | 'cards' | 'rules';
export const c = (rank: string, suit = 'sword') => `/cards/${suit}/${rank}.png`;
export const special = (name: string) => `/cards/special/${name}.png`;
const pair = (rank: string) => [c(rank),c(rank,'star')];
const triple = (rank: string) => [...pair(rank),c(rank,'crescent')];
const run = (start: number) => Array.from({length:5},(_,i)=>c(String(start+i),['sword','star','house','crescent','sword'][i]));
export function preparationFor(s: Selection): Slide {
 if(s.players===4) return {title:'시작하기 전,\n잠깐!',paragraphs:['카드 뭉치가 두 개 있나요?','회색과 검은색 묶음은 같은 구성이에요.\n둘 중 한 묶음만 사용해 주세요!'],stat:'4 PLAYERS = 1 DECK',emphasis:'총 56장',note:'일반카드 52장 + 특수카드 4장'};
 if(s.players===5) return {title:'시작하기 전, 잠깐!',paragraphs:['5명도 한 묶음만 사용하세요!','개 한 장을 빼고 55장으로 시작해요.'],stat:'1 SET · 55 CARDS'};
 return {title:s.players>=7?'시작하기 전, 잠깐!':`${s.players}인용 카드를 확인해요`,paragraphs:s.players>=7?['7명 이상은 두 묶음을 모두 사용하세요!','사용할 특수카드와 분배 방법은\n선택한 변형 규칙을 먼저 확인하세요.']:['6인 팀전과 개인전은 준비 방법이 달라요.','사용할 카드와 분배 방법은\n선택한 변형 규칙을 먼저 확인하세요.'],stat:s.players>=7?'2 SETS':s.mode==='team'?'3 : 3 TEAM':'6 PLAYERS · INDIVIDUAL',note:'현재 이 인원의 세부 규칙은 준비 중이에요. 4인의 56장·14장 분배를 그대로 적용하지 마세요.'};
}
export const home4: Slide[] = [
 {title:'티츄는 4명이 두 명씩 팀을 이뤄 대결하는 카드게임입니다.',paragraphs:['01. 내 차례에 카드를 내거나 패스해요.','02. 이긴 사람이 낸 카드를 가지고 점수를 계산해요.'],emphasis:'1000점에 먼저 도달하는 팀이 승리!',action:true}
];
export const cards4: Slide[] = [
 {title:'네 가지 무늬,\n52장의 일반카드.',paragraphs:['칼 · 초승달 · 별 · 집','각 무늬에 2~10, J, Q, K, A가 있어요.'],cards:[c('3'),c('3','crescent'),c('3','star'),c('3','house')]},
 {title:'무늬보다, 숫자.',paragraphs:['색상과 무늬의 강함은 같아요.\n숫자와 문자의 크기로 비교해요.'],stat:'2 < 3 < 4 < 5 < 6 < 7 < 8 < 9\n< 10 < J < Q < K < A',examples:[{label:'파란색 3',cards:[c('3','house')]},{label:'빨간색 4',cards:[c('4','star')]}],verdict:'가능!',note:'색이 달라도 더 높은 숫자를 낼 수 있어요. 같은 무늬가 필요한 폭탄은 뒤에서 알아봐요.'},
 {title:'참새는 어떻게\n사용하나요?',paragraphs:['숫자 1의 역할을 해요.\n한 장만 내면 싱글이에요.','참새를 가진 사람이 게임을 시작해요.\n참새를 먼저 낼 필요는 없어요.'],cards:[special('mahjong')],emphasis:'참새 한 장 = 싱글 1 · 가능!'},
 {title:'참새로\n스트레이트 만들기',paragraphs:['연속된 숫자 5장 이상을\n함께 내는 조합이 스트레이트예요.','참새를 1로 사용해 2·3·4·5와\n함께 낼 수 있어요.'],cards:[special('mahjong'),c('2'),c('3','star'),c('4','house'),c('5','crescent')],emphasis:'1 + 2 + 3 + 4 + 5 · 가능!'},
 {title:'참새의 특수 능력,\n숫자 요청하기',paragraphs:['참새를 낼 때 2~A 중\n원하는 숫자 하나를 요청할 수 있어요.','다른 사람은 자기 차례에 그 숫자를\n규칙에 맞게 낼 수 있다면 반드시 내야 해요.'],cards:[special('mahjong'),c('8','star')],emphasis:'예: “8을 내 주세요!”',note:'낼 수 없다면 다른 카드를 내거나 패스해요. 요청은 누군가 이룰 때까지 유지돼요. 특수카드는 요청할 수 없어요.'},
 {title:'개',paragraphs:['새 대결을 시작할 때만 내요.\n마주 앉은 팀원에게 시작할 차례를 넘겨요.','팀원이 이미 손에 있는 카드를 모두 냈다면, 그 다음 순서에 남아 있는 사람이 시작해요.'],cards:[special('dog')],note:'다른 카드 위에 내거나 폭탄으로 개를 이길 수는 없어요.'},
 {title:'봉황',paragraphs:['조합에서 다른 숫자 한 장을 대신해요.','싱글로 내면 직전 카드보다 0.5 높아요. 처음 내면 1.5이며, 용은 이길 수 없어요.'],cards:[special('phoenix')],note:'폭탄에는 사용할 수 없어요. 카드 점수는 −25점.'},
 {title:'용',paragraphs:['가장 강한 싱글 카드예요.\n다만 폭탄에는 집니다.','용으로 대결을 이기면 나온 카드 전부를\n상대 팀 한 명에게 주세요.'],cards:[special('dragon')],note:'용의 +25점도 함께 넘겨요. 다음 대결은 내가 시작해요. 용이 폭탄에 지면 폭탄을 낸 사람이 가져갑니다.'},
 {title:'한 대결에서는\n같은 조합으로.',paragraphs:['싱글은 한 장, 페어는 같은 숫자 두 장.\n처음 나온 종류와 장수를 유지해요.','새 대결이 시작되면\n다른 조합으로 시작할 수 있어요.'],emphasis:'단, 폭탄은 예외!',note:'모두 패스하면 마지막으로 낸 사람이 나온 카드를 가져가요.'},
 {title:'싱글 → 싱글',paragraphs:['한 장으로 시작했으니\n다음 사람도 더 높은 한 장을 내요.'],examples:[{label:'3',cards:[c('3')]},{label:'5',cards:[c('5','star')]},{label:'7',cards:[c('7','crescent')]},{label:'8',cards:[c('8','house')]}],verdict:'가능!'},
 {title:'페어 → 페어',paragraphs:['같은 숫자 2장으로 시작했으니\n더 높은 숫자의 2장을 함께 내요.'],examples:['3','5','7'].map((rank,i)=>({label:rank+rank,cards:[['sword','house'],['crescent','star'],['house','crescent']][i].map(suit=>c(rank,suit))})),verdict:'가능!'},
 {title:'싱글 → 페어?',paragraphs:['숫자가 높아도 낼 수 없어요.\n한 장으로 시작한 대결이기 때문이에요.'],examples:[{label:'싱글 3',cards:[c('3')]},{label:'페어 55',cards:pair('5')}],verdict:'불가능!',emphasis:'싱글에는 싱글로!',note:'페어는 새 대결을 시작할 때 낼 수 있어요.'},
 {title:'연속 페어',paragraphs:['숫자가 이어지는 페어 두 쌍 이상.\n같은 쌍 수의 더 높은 조합을 내세요.'],examples:[{label:'33 · 44',cards:[c('3','sword'),c('3','house'),c('4','crescent'),c('4','star')]},{label:'10 10 · J J',cards:[c('10','star'),c('10','crescent'),c('J','house'),c('J','sword')]}],verdict:'가능!',note:'주의! 페어의 숫자가 연속되어야 해요. 33 · 55처럼 숫자가 이어지지 않으면 낼 수 없어요.'},
 {title:'트리플 → 트리플',paragraphs:['같은 숫자 3장으로 시작했다면\n다음 사람도 더 높은 숫자의 3장을 내요.'],examples:['3','5','8'].map(rank=>({label:rank.repeat(3),cards:triple(rank)})),verdict:'가능!'},
 {title:'풀하우스',paragraphs:['트리플 한 벌 + 페어 한 벌.\n세 장짜리 숫자로 강함을 비교해요.'],examples:[{label:'333 · KK',cards:[...triple('3'),...pair('K')]},{label:'444 · 22',cards:[...triple('4'),...pair('2')]}],verdict:'가능!'},
 {title:'스트레이트',paragraphs:['연속된 숫자 5장 이상.\n같은 장수의 더 높은 조합을 내세요.'],examples:[2,3,4].map(n=>({label:Array.from({length:5},(_,i)=>n+i).join(''),cards:run(n)})),verdict:'가능!',note:'5장에는 5장, 6장에는 6장. A는 가장 높은 수이며 K–A–2로 이어지지 않아요.'},
 {title:'폭탄 ①\n같은 숫자 4장',paragraphs:['같은 숫자의 카드 4장을 모으면 폭탄!','다른 종류의 조합 위에도,\n내 차례가 아니어도 낼 수 있어요.'],cards:[...triple('7'),c('7','house')],note:'더 높은 숫자의 4장 폭탄으로 이길 수 있어요. 봉황은 폭탄에 쓸 수 없어요.'},
 {title:'폭탄 ②\n같은 무늬 스트레이트',paragraphs:['같은 무늬로 이어지는 숫자 5장 이상.\n4장 폭탄보다 강해요.'],cards:[2,3,4,5,6].map(n=>c(String(n),'star')),note:'장수가 많은 쪽이 강해요. 같은 장수면 숫자가 높은 쪽이 이겨요. 아직 아무도 카드를 내지 않았다면 끼어들 수 없어요.'}
];
const ruleContent: Slide[] = [
 {title:'카드 종류와 점수',paragraphs:[],visual:'overview',phase:'게임 준비'},
 {title:'카드 조합 한눈에 보기',paragraphs:[],visual:'combinations',phase:'게임 준비'},
 {title:'내 차례에는?',paragraphs:[],visual:'turn-examples',phase:'게임 시작'},
 {title:'특수카드 알아보기',paragraphs:[],visual:'special-overview',phase:'게임 준비'},
 {title:'우리 팀 점수 모으기',paragraphs:['팀원 두 사람의 획득 카드 점수를 합쳐요.'],visual:'team-score',note:'💡 카드 점수는 총 100점! 상대 팀은 100 − 우리 팀 점수예요. 원투 200점과 티츄 선언 점수는 별도예요.',phase:'게임 준비'},
 {title:'우리 팀이 1·2등이면?',paragraphs:['라운드가 즉시 끝나고, 카드 점수 대신 200점을 얻어요.'],stat:'+200점',note:'티츄 선언 점수는 별도로 더하거나 빼요.',phase:'게임 준비'},
 ...[{title:'팀 나누기',setup:0},{title:'카드 나누기 (1차)',setup:1},{title:'라지 티츄 선언하기!',setup:7},{title:'카드 나누기 (2차)',setup:3},{title:'카드 교환하기',setup:4},{title:'스몰 티츄 선언하기!',setup:9},{title:'이제 게임을 시작해 볼까요?',setup:6}].map(s=>({...s,paragraphs:[],phase:s.setup===6?'게임 시작' as const:'게임 준비' as const})),

 {title:'손에 있는 카드와 획득 카드,\n섞지 마세요!',paragraphs:[],visual:'hand',emphasis:'내려놓는 카드와 모으는 카드는 달라요.'},

 {title:'나온 카드는 누가\n가져가나요?',paragraphs:['모두 패스하면 마지막으로 낸 사람이\n나온 카드를 모두 가져가요.'],visual:'trick',note:'획득 카드는 손에 있는 카드와 따로 모아요.'},
 {title:'용으로 이겼다면?',paragraphs:['내가 용으로 이기면 상대편에게 모은 카드를 다 넘겨줘야 해요!','이번 대결에서 모은 카드와 용의 +25점을 상대 팀 한 명에게 줘요. 다음 시작은 나에게!'],visual:'dragon-win',note:'💡 폭탄은 용을 이겨요. 폭탄으로 이긴 사람이 카드를 가져가요. 내 카드가 없다면 다음 남은 사람이 시작해요.'},
 {title:'라운드 종료 · 점수 계산',paragraphs:[],visual:'round-end',note:'💡 같은 팀이 1·2등이면 위 정산 대신 200점! 티츄 선언 점수는 별도예요.'},
 {title:'1000점을\n향해 한 판 더!',paragraphs:['라운드마다 팀 점수를 누적해요.\n1000점에 먼저 도달한 팀이 승리해요.','같은 라운드에 둘 다 도달했다면\n더 높은 점수의 팀이 이겨요.'],emphasis:'동점이면 다음 라운드로!',note:'팀 나누기를 제외한 준비·분배부터 반복하세요.'}
];
// Keep the original introductory information before the game preparation steps.
export const rules4 = [ruleContent[0], ruleContent[1], ruleContent[3], ...ruleContent.slice(6)];
export const ruleReferences = [0,1,3].map(i=>ruleContent[i]);
const fiveHome: Slide[] = [{title:'다섯 명,\n각자의 승부.',paragraphs:['쟁상유는 팀 없이 즐기는 개인전이에요.','점수 대신 카드를 모두 낸 순위로\n다음 라운드의 신분을 정합니다.'],stat:'황제 · 재상 · 장군 · 평민 · 천민'},{title:'개는 잠시\n쉬어갈게요.',paragraphs:['팀원에게 선을 넘기는 개는 빼세요.\n55장을 다섯 명이 11장씩 나눠요.','팀전 점수와 티츄 선언은 사용하지 않아요.'],cards:[special('dog')],stat:'55 ÷ 5 = 11'},{title:'다음 판에는\n순위가 힘이 돼요.',paragraphs:['두 번째 라운드부터\n순위에 따라 카드를 교환해요.','황제 · 재상 · 장군 · 평민 · 천민\n내 카드를 모두 내려놓아 높은 순위를 노리세요.'],action:true}];
const fiveRules: Slide[] = [
 {title:'11장씩 나누기',paragraphs:['개를 뺀 55장을 잘 섞어\n각자 11장씩 받으세요.','첫 판에는 카드 교환이 없어요.'],stat:'55 CARDS / 5 PLAYERS'},
 {title:'참새부터 시작',paragraphs:['참새를 가진 사람부터\n반시계 방향으로 진행해요.','같은 종류 · 같은 장수의 더 높은 조합을 내거나 패스하세요.'],cards:[special('mahjong')]},
 {title:'대결을 이어가기',paragraphs:['마지막으로 낸 사람 외에 패가 남은 모두가 연속 패스하면 대결이 끝나요.','카드를 치우고 이긴 사람이 새 조합을 내요. 이미 나갔다면 다음 남은 사람이 시작해요.'],note:'개인전은 나온 카드의 점수를 모으지 않아요.'},
 {title:'순위 정하기',paragraphs:['한 명만 패가 남으면 라운드 종료.\n먼저 손을 비운 순서로 순위를 정해요.','1등 황제 · 2등 재상 · 3등 장군\n4등 평민 · 5등 천민'],note:'다음 판에는 황제 왼쪽부터 재상, 장군, 평민, 천민 순으로 앉아요.'},
 {title:'두 번째 판,\n세금과 하사.',paragraphs:['천민 → 황제: 가장 강한 카드 2장\n평민 → 재상: 가장 강한 카드 1장','황제와 재상은 원하는 카드를 같은 수만큼 돌려줘요. 장군은 교환하지 않아요.'],note:'받을 카드를 보기 전에 보낼 카드를 정해 동시에 교환하세요.'},
 {title:'세금 카드의 순서',paragraphs:['용 > 봉황 > 참새 > A > K > … > 2','이 순서는 세금을 고를 때만 사용해요.\n플레이할 때 참새는 여전히 1이에요.'],cards:[special('dragon'),special('phoenix'),special('mahjong')],note:'정해진 목표 점수는 없어요. 종료할 라운드는 시작 전에 함께 정하세요.'}
];
export function guideFor(selection: Selection): Record<Tab, Slide[]> {
 if(selection.players === 4) return {home:home4,cards:cards4,rules:rules4};
 if(selection.players === 5) return {home:fiveHome,rules:fiveRules.map((s,i)=>({...s,phase:i===0?'게임 준비':'게임 시작'})),cards:cards4.map(s => s.title === '개' ? {...s,paragraphs:['5인 쟁상유에서는 사용하지 않아요.\n게임을 시작하기 전에 개를 빼세요.'],note:undefined} : s.title === '용' ? {...s,paragraphs:['가장 강한 싱글 카드예요.\n폭탄만 용을 이길 수 있어요.','5인 개인전에서는 나온 카드를 치우고, 점수를 계산하거나 상대에게 주지 않아요.'],note:'싱글로만 낼 수 있어요.'} : s.title === '봉황' ? {...s,note:'폭탄에는 사용할 수 없어요. 개인전에서는 점수를 계산하지 않아요.'} : s)};
 const team = selection.mode === 'team';
 const pending: Slide = {phase:'게임 준비',title:'시작 전,\n규칙을 정해주세요.',paragraphs:['이 인원의 세부 변형 규칙은\n아직 확정되지 않았어요.','사용할 특수카드, 분배 방법, 선의 이동과 종료 조건을 확인한 뒤 플레이하세요.'],note:'4인 규칙을 자동으로 적용하지 않습니다. 확정된 설명서를 받으면 전용 진행 카드를 추가할 수 있어요.'};
 return {home:[{title:`${selection.players}명이 함께하는\n${team?'3 : 3 팀전':'쟁상유 개인전'}.`,paragraphs:team?['두 팀으로 나누어 1000점을 목표로 해요.','6인 전용 분배·교환·종료 규칙은 추가 확인이 필요해요.']:['팀 없이 카드를 모두 낸 순위로 진행해요.',selection.players>=7?'카드 두 묶음을 모두 사용해요.':'6인 개인전의 세부 규칙은 추가 확인이 필요해요.'],stat:team?'3 : 3':`${selection.players}인 쟁상유`,action:true},pending],cards:[{title:'사용 카드\n확인하기',paragraphs:[selection.players>=7?'두 묶음을 사용해요. 동일 카드와 특수카드 처리 방법은 먼저 정해야 해요.':'사용할 카드 수와 특수카드의 포함 여부는 변형 규칙 확정 후 안내합니다.'],cards:[c('3'),c('3','star'),c('3','crescent'),c('3','house')],note:'기본 카드의 숫자와 무늬는 같지만, 조합·능력의 적용은 선택한 변형 규칙에 따릅니다.'}],rules:team?[{title:'팀 나누기',paragraphs:['세 명씩 두 팀으로 나뉘어 앉으세요.'],visual:'six-team',phase:'게임 준비'},pending]:[{title:`${selection.players}인 쟁상유`,paragraphs:[selection.players>=7?'카드 두 묶음을 모두 사용해요.':'카드 묶음 수와 분배 방법을 확인해 주세요.','팀 점수 없이 개인 순위로 진행해요.'],phase:'게임 준비'},pending]};
}
