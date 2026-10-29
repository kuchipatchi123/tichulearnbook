"use client";
import { c, special, Selection } from '@/original/data/guide';
import { CardImage } from './GuideVisuals';

type Lesson = {card:string;name:string;title:string;copy:string;visual:string};
export function specialLessons(selection:Selection):Lesson[]{
 const five=selection.players===5;
 if(selection.players>5)return [{card:'mahjong',name:'특수카드',title:'변형 규칙을 확인해 주세요',copy:`${selection.players}인 특수카드 규칙은 준비 중이에요.`,visual:'hero'}];
 return [
 {card:'mahjong',name:'참새',title:'참새를 가진 사람이 먼저 시작해요',copy:'첫 카드가 꼭 참새일 필요는 없어요. 내 카드에 맞는 조합으로 시작하세요.',visual:'start'},
 {card:'mahjong',name:'참새',title:'참새는 숫자 1이에요',copy:'한 장으로 내거나, 1부터 이어지는 숫자 5장 이상에 사용해요.',visual:'one'},
 {card:'mahjong',name:'참새',title:'“3을 내 주세요!”',copy:'참새를 낼 때 원하는 일반카드 숫자 하나를 요청할 수 있어요. 2~A만 가능해요.',visual:'wish'},
 {card:'mahjong',name:'참새',title:'요청은 테이블에 내는 거예요',copy:'다른 사람은 자기 차례에 요청한 숫자를 규칙에 맞게 낼 수 있다면 반드시 내야 해요.',visual:'fulfill'},
 {card:'mahjong',name:'참새',title:'누군가 낼 때까지 요청은 유지돼요',copy:'현재 조합에 맞게 낼 수 있어야 해요. 특수카드는 요청할 수 없어요.',visual:'wish-rule'},
 ...(five? [{card:'dog',name:'개',title:'5인 개인전에서는 빼주세요',copy:'개 한 장을 빼고 시작해요.',visual:'hero'}]:[
 {card:'dog',name:'개',title:'시작할 기회를 팀원에게 넘겨요',copy:'내가 새 대결을 시작할 차례에 개 한 장만 내세요.',visual:'hero'},
 {card:'dog',name:'개',title:'A가 개를 내면, C가 시작해요',copy:'맞은편 C는 같은 팀원이에요. C가 원하는 카드나 조합으로 새 대결을 시작해요.',visual:'dog-pass'},
 {card:'dog',name:'개',title:'이미 시작한 대결에는 낼 수 없어요',copy:'처음부터 쓸 필요는 없어요. 나중에 새 대결을 시작할 차례에 사용해도 돼요.',visual:'dog-rule'},
 {card:'dog',name:'개',title:'팀원이 이미 카드를 다 냈다면?',copy:'팀원 다음 순서의, 카드가 남아 있는 사람이 시작해요. 개 위에 폭탄을 낼 수는 없어요.',visual:'dog-out'}]),
 {card:'phoenix',name:'봉황',title:'없는 숫자 한 장을 대신해요',copy:'6이 없어도 3·4·5·봉황·7로 스트레이트 완성!',visual:'fill'},
 {card:'phoenix',name:'봉황',title:'폭탄에는 사용할 수 없어요',copy:'일반카드 한 장의 역할만 대신해요. 봉황을 넣은 네 장은 폭탄이 아니에요.',visual:'no-bomb'},
 {card:'phoenix',name:'봉황',title:'한 장으로 내면 0.5 높아요',copy:'8 위에 내면 8.5가 돼요. 다음 사람은 9 이상으로 이길 수 있어요.',visual:'half'},
 {card:'phoenix',name:'봉황',title:'처음 내면 1.5예요',copy:'A 위에 낼 수 있지만, 용은 이길 수 없어요.',visual:'half-first'},
 {card:'phoenix',name:'봉황',title:five?'여러 장을 함께 줄여 보세요':'가져간 팀이 −25점을 받아요',copy:five?'5인 개인전에서는 카드 점수를 계산하지 않아요.':'낸 사람이 아니라, 봉황을 획득한 팀의 점수예요. 획득 카드는 내 카드와 따로 모아요.',visual:five?'fill':'minus'},
 ...(!five?[{card:'phoenix',name:'봉황',title:'언제 쓰면 좋을까요?',copy:'여러 장을 한 번에 줄이거나, 나온 카드의 점수가 적을 때 고려하세요. 누가 가져갈지도 살펴보세요.',visual:'strategy'}]:[]),
 {card:'dragon',name:'용',title:'가장 강한 한 장 카드예요',copy:'A와 봉황보다 강해요. 용은 한 장으로만 내며, 조합에는 넣을 수 없어요.',visual:'strong'},
 {card:'dragon',name:'용',title:'폭탄에는 질 수 있어요',copy:'폭탄이 이기면 그 사람이 나온 카드를 가져가요. 이때는 상대에게 주지 않아요.',visual:'dragon-bomb'},
 {card:'dragon',name:'용',title:five?'이기면 다음 대결을 시작해요':'이긴 카드는 상대에게 줘요',copy:five?'나온 카드를 치우세요. 5인 개인전에서는 카드 점수를 계산하지 않아요.':'용으로 이기면 이번에 나온 카드 전부와 용의 +25점을 상대 팀 한 명에게 줘요.',visual:five?'hero':'dragon-give'},
 {card:'dragon',name:'용',title:'다음 시작은 내 차례예요',copy:'카드가 남아 있다면 원하는 카드나 조합으로 새 대결을 시작해요.',visual:five?'hero':'dragon-lead'},
 ];
}
function Row({cards,labels}:{cards:string[];labels?:string[]}){return <div className="lesson-cards">{cards.map((src,i)=><div key={`${src}-${i}`}><CardImage src={src}/>{labels?.[i]&&<small>{labels[i]}</small>}</div>)}</div>}
function Table({kind}:{kind:'dog'|'give'|'lead'}){return <figure className={`lesson-table table-${kind}`} aria-label={kind==='dog'?'A가 개를 내려놓고 맞은편 C에게 시작 차례를 넘깁니다':kind==='give'?'테이블에 나온 카드와 용을 상대 B의 획득 카드로 전달합니다':'카드는 상대 B가 획득하고 다음 시작 차례는 A에게 있습니다'}><span className="seat seat-top">C · 같은 팀{kind==='dog'&&<strong>새 대결 시작</strong>}</span><span className="seat seat-left">D · 상대</span><span className="seat seat-right">B · 상대{kind!=='dog'&&<strong>획득 카드</strong>}</span><div className="table-center">{kind==='dog'?<><CardImage src={special('dog')}/><span className="lead-arrow">↑</span><small>시작 차례 A → C</small></>:<><div className="moving-pile"><CardImage src={c('5','star')}/><CardImage src={special('dragon')}/></div><small>{kind==='give'?'나온 카드 전부 → B':'카드는 B에게 · 시작은 A'}</small></>}</div><span className="seat seat-bottom">A · 나{kind==='lead'&&<strong>↓ 다음 대결 시작</strong>}</span></figure>}
export function SpecialLesson({lesson}:{lesson:Lesson}){
 const v=lesson.visual;
 return <section className="special-lesson" aria-labelledby="lesson-title"><h1 id="lesson-title" className="learning-title">{lesson.title}</h1><div className="lesson-visual" key={v}>
 {v==='hero'&&<Row cards={[special(lesson.card)]}/>}
 {v==='start'&&<><Row cards={[special('mahjong')]}/><div className="lesson-equation">참새를 가진 나 <span>→</span> 첫 시작</div></>}
 {v==='one'&&<><Row cards={[special('mahjong')]} labels={['싱글 · 1']}/><Row cards={[special('mahjong'),c('2','house'),c('3','crescent'),c('4','star'),c('5')]} labels={['1','2','3','4','5']}/><small>스트레이트</small></>}
 {v==='wish'&&<><div className="lesson-equation">참새를 내며 “3을 요청!”</div><div className="lesson-cards wish-visual"><div><CardImage src={c('2','crescent')}/></div><div className="missing-card">3</div><div><CardImage src={c('4','star')}/></div></div><small>2와 4는 있지만 3이 없는 상황의 예시</small></>}
 {v==='fulfill'&&<><Row cards={[special('mahjong'),c('3','house')]} labels={['내가 1을 냄','상대가 3을 냄']}/><div className="lesson-equation">상대의 3 <span>↓</span> 테이블</div><small>요청한 카드를 내 손으로 받는 기능이 아니에요.</small></>}
 {v==='wish-rule'&&<><div className="lesson-equation">3 요청 <span>→</span> 다음 차례 <span>→</span> 계속</div><Row cards={[c('3','house')]}/><small>누군가 규칙에 맞게 3을 내면 요청 완료</small></>}
 {v==='dog-pass'&&<Table kind="dog"/>}
 {v==='dog-rule'&&<><Row cards={[c('5','star'),special('dog')]} labels={['진행 중인 대결','여기에 낼 수 없음']}/><div className="lesson-equation">새 대결에서만 · 개 한 장</div></>}
 {v==='dog-out'&&<><div className="lesson-equation">A <span>→</span> C · 카드 없음 <span>→</span> 다음 사람</div><Row cards={[special('dog')]}/></>}
 {(v==='fill'||v==='strategy')&&<><div className="lesson-cards">{[c('3'),c('4','star'),c('5','house'),special('phoenix'),c('7','crescent')].map((src,i)=><div className={i===3?'phoenix-slot':''} key={src}>{i===3&&<span className="slot-six">6</span>}<CardImage src={src}/><small>{i===3?'6 대신':['3','4','5','','7'][i]}</small></div>)}</div><div className="lesson-equation">5장을 한 번에 내려놓기</div></>}
 {v==='no-bomb'&&<><Row cards={[c('7'),c('7','house'),c('7','star'),special('phoenix')]}/><div className="lesson-equation">폭탄 불가능</div></>}
 {v==='half'&&<><Row cards={[c('8','crescent'),special('phoenix'),c('9','house')]} labels={['8','8.5','9']}/><div className="lesson-equation">8 <span>→</span> 8.5 <span>→</span> 9</div></>}
 {v==='half-first'&&<><Row cards={[special('phoenix')]} labels={['처음 내면 1.5']}/><div className="lesson-equation">A &lt; 봉황 14.5 &lt; 용</div></>}
 {v==='minus'&&<><Row cards={[special('phoenix')]} labels={['획득한 카드']}/><div className="lesson-score">−25<span>점</span></div><small>라운드가 끝나면 획득한 팀의 점수에 반영</small></>}
 {v==='strong'&&<><Row cards={[c('A','crescent'),special('phoenix'),special('dragon')]} labels={['A','A 위의 봉황','용']}/><div className="lesson-equation">A &lt; 봉황 &lt; 용</div></>}
 {v==='dragon-bomb'&&<><Row cards={[special('dragon')]}/><div className="lesson-equation">↓ 폭탄이 이겨요</div><Row cards={['sword','star','house','crescent'].map(s=>c('7',s))}/></>}
 {v==='dragon-give'&&<Table kind="give"/>}
 {v==='dragon-lead'&&<Table kind="lead"/>}
 </div><p className="lesson-copy">{lesson.copy}</p></section>;
}
