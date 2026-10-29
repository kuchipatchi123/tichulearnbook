"use client";
import { useRef, useState } from 'react';
import { c, special } from '@/original/data/guide';
import { CardImage } from './GuideVisuals';
import { GameBoard } from './GameBoard';
const seats=[{x:50,y:9,label:'우리 팀'},{x:91,y:50,label:'상대 팀'},{x:50,y:91,label:'우리 팀 · 나'},{x:9,y:50,label:'상대 팀'}];
export function PreparationSteps({step,grand,small,onGrand,onSmall}:{step:number;grand:boolean|null;small:boolean|null;onGrand:(v:boolean)=>void;onSmall:(v:boolean)=>void}){
 const help=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
 const [helpKind,setHelpKind]=useState<'guide'|'good'|'discard'>('guide');
 const [helpPage,setHelpPage]=useState(0),[ability,setAbility]=useState<string|null>(null);
 const choicePage=step===7||step===9, grandPage=step===2||step===7;
 const points=grandPage?200:100,choice=grandPage?grand:small;
 const count=step===1||grandPage?8:14;
 const groups=[{name:'페어',cards:[c('Q','house'),c('Q','star')]},{name:'스트레이트',cards:['3','4','5','6','7'].map((n,i)=>c(n,['sword','crescent','house','star','sword'][i]))},{name:'폭탄',cards:['sword','crescent','star','house'].map(s=>c('8',s))}];
 return <section className={`preparation-step compact-preparation ${choicePage?'grand-combined declaration-step':''}`}>
 <div className="preparation-copy">
 {step===0&&<p>4명이 두 팀으로 나뉘어요.<br/>같은 팀끼리 마주 앉으세요.</p>}
 {step===1&&<><p><strong>한 명이 카드를 나눠주면 됩니다!</strong></p><p>카드를 잘 섞은 후, 뒷면이 보이도록<br/>각자 <strong>8장씩</strong> 나눠주세요.</p></>}
 {step===3&&<p>기존 8장에 <strong>6장씩 추가</strong>로 받아요.<br/>이제 각자 14장이에요.</p>}
 {step===4&&<><p><strong>팀원과 상대 두 명에게 각각 1장.</strong></p><p className="prep-secondary">모두 보낼 3장을 정한 뒤 동시에 교환해요. 받은 카드는 교환이 끝난 뒤 확인해요.</p><p className="exchange-tip">💡 팀원에게는 <button onClick={e=>{trigger.current=e.currentTarget;setHelpKind('good');help.current?.showModal();}}>좋은 카드</button>, 상대에게는 <button onClick={e=>{trigger.current=e.currentTarget;setHelpKind('discard');help.current?.showModal();}}>떨거지</button>를!</p></>}
 {step===8&&<><p>모두 보낼 카드를 정한 뒤 <strong>동시에 교환</strong>해요. 받은 카드는 그다음 확인하세요.</p><p className="prep-secondary">팀원에게는 도움이 되는 카드, 상대에게는 내게 덜 필요한 카드를 보내세요.</p></>}
 {(step===2||step===5)&&<><p><strong>“내가 가장 먼저 카드를 다 내겠다!”</strong><br/>점수를 걸고 1등에 도전하는 선언이에요.</p><p>성공하면 우리 팀 +{points}점, 실패하면 −{points}점.</p><p className="prep-secondary">팀원이 1등이어도 내가 1등이 아니면 실패예요. 라운드 끝에 점수에 반영해요.</p></>}
 {choicePage&&<>
 <div className="tichu-score-pair" aria-label={`성공하면 ${points}점 추가, 실패하면 ${points}점 차감`}><div><span>✓ 성공할 시</span><strong>+{points}점!!</strong></div><div><span>✕ 실패할 시</span><strong>−{points}점!!</strong></div></div>
 <div className="tichu-definition"><h3>💡 {grandPage?'라지':'스몰'} 티츄란?</h3><p>{grandPage?'8장만 보고, 나머지 6장을 받기 전에 ':''}내가 가장 먼저 카드를 모두 내겠다는 선언이에요. 선언하지 않아도 괜찮아요.</p>
 {!grandPage&&<><h3>라지 티츄와 다른 점!</h3><p><strong>라지</strong> · 8장만 보고, 나머지 6장을 받기 전.<br/><strong>스몰</strong> · 게임이 시작돼도 내 첫 카드를 내기 전까지.</p></>}
 <p className="prep-secondary">내가 1등이어야 성공해요. {!grandPage?'라지를 선언했다면 스몰은 선언할 수 없어요.':'라운드 끝에 우리 팀 점수에 반영해요.'}</p></div>
 {choicePage&&<button className="tichu-help-button" ref={trigger} onClick={()=>{setHelpKind('guide');setHelpPage(0);help.current?.showModal();}}>어떤 카드가 유리할까요? ↗</button>}
 </>}
 {step===6&&<><p>참새를 가진 사람부터 반시계 방향으로 진행해요.</p><p className="prep-secondary">💡 참새부터 낼 필요는 없어요. 내 카드를 빨리 줄일 수 있도록 낼 때를 판단하세요.</p></>}
 </div>
 {!choicePage&&<GameBoard kind={step===0?'teams':step===1?'deal8':step===3?'deal6':step===6?'start':'exchange'}/>}
 <dialog className="special-summary-dialog preparation-help-dialog" ref={help} aria-labelledby="good-card-title" onKeyDown={e=>e.stopPropagation()} onTouchStart={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()} onClose={()=>trigger.current?.focus()}>
 <header><h2 id="good-card-title">{helpKind==='good'?'좋은 카드':helpKind==='discard'?'떨거지란?':'어떤 카드가 유리할까요?'}</h2><button onClick={()=>help.current?.close()} aria-label="카드 도움말 닫기">닫기 ×</button></header>
 <div className="summary-help-cards">{(helpKind==='discard'?[c('2','star'),c('3','house')]:[c('Q','house'),c('A','crescent'),special('phoenix'),special('dragon')]).map(src=><CardImage key={src} src={src}/>)}</div>
 {helpKind==='guide'?<div className="summary-copy"><p>J·Q·K·A 같은 높은 카드, 봉황·용 같은 특수카드가 유리해요. 여러 장을 함께 낼 수 있는 조합도 살펴보세요.</p><p>높은 카드만으로 승리가 보장되지는 않아요. 남은 카드의 조합도 살펴보세요.</p></div>:<div className="summary-copy"><p>{helpKind==='discard'?'낮은 숫자나 내 조합에 필요하지 않은 카드예요.':'J·Q·K·A 같은 높은 카드, 봉황·용 같은 특수카드가 유리해요. 여러 장을 함께 낼 수 있는 조합도 살펴보세요.'}</p><p>{helpKind==='discard'?'낮은 카드도 조합에는 유용할 수 있어요. 내 카드에 맞게 판단하세요.':helpKind==='good'?'팀원의 조합에 도움이 되는지도 생각해 보세요.':'높은 카드만으로 승리가 보장되지는 않아요. 남은 카드의 조합도 살펴보세요.'}</p></div>}
 </dialog></section>;
}
