"use client";
import { useRef, useState } from 'react';
import { c, Selection, guideFor } from '@/original/data/guide';
import { CardImage, PlayExamples } from './GuideVisuals';
import { specialLessons, SpecialLesson } from './SpecialLessons';
import {StepControls} from './StepControls';
const ranks=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
export function CardIntroduction({selection,onComplete}:{selection:Selection;onComplete:()=>void}){
 const [page,setPage]=useState<'ordinary'|'combinations'|'bombs'|'special'>('ordinary');
 const [comboIndex,setComboIndex]=useState(0);
 const [specialIndex,setSpecialIndex]=useState(0);
 const [bombIndex,setBombIndex]=useState(0);
 const content=useRef<HTMLElement>(null);
 const touch=useRef<{x:number;y:number}|null>(null);
 const lessons=specialLessons(selection);
 const lesson=lessons[specialIndex];
 const sameCard=lessons.filter(l=>l.card===lesson.card);
 const cardStep=sameCard.indexOf(lesson)+1;
 const navigate=(next:typeof page)=>{setPage(next);content.current?.scrollTo({top:0});};
 const move=(direction:number)=>{
  if(page==='ordinary'){if(direction>0)navigate('combinations');}
  else if(page==='combinations'){if(direction<0&&comboIndex===0)navigate('ordinary');else if(direction>0&&comboIndex===5)navigate('bombs');else setComboIndex(i=>Math.max(0,Math.min(5,i+direction)));}
  else if(page==='bombs'){if(direction<0&&bombIndex===0)navigate('combinations');else if(direction>0&&bombIndex===2)navigate('special');else setBombIndex(i=>Math.max(0,Math.min(2,i+direction)));}
  else if(direction<0&&specialIndex===0)navigate('bombs');else setSpecialIndex(i=>Math.max(0,Math.min(lessons.length-1,i+direction)));
  content.current?.scrollTo({top:0});
 };
 const slides=guideFor(selection).cards;
 const titles=['싱글 → 싱글','페어 → 페어','트리플 → 트리플','연속 페어','풀하우스','스트레이트','폭탄 ①\n같은 숫자 4장','폭탄 ②\n같은 무늬 스트레이트'];
 const current=page==='ordinary'?0:page==='combinations'?1+comboIndex:page==='bombs'?7+bombIndex:10+specialIndex;
 const stageTitle=page==='ordinary'?'일반 카드':page==='combinations'?titles[comboIndex].replace(/\n/g,' '):page==='bombs'?`폭탄 ${bombIndex+1}`:lesson.name;
 return <div className="card-reader"><nav className="step-title-bar card-stage-bar" aria-label="카드 설명 이동"><button aria-label="이전 카드 설명" disabled={current===0} onClick={()=>move(-1)}>‹</button><h2>{stageTitle}</h2><button aria-label={current===9+lessons.length?'규칙 알아보기':'다음 카드 설명'} onClick={()=>current===9+lessons.length?onComplete():move(1)}>›</button></nav><main id="cards-content" ref={content} className={`card-introduction card-page-${page}`} onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;touch.current=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)move(dx<0?1:-1);}} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>
 {page==='ordinary'&&<><h1 className="sr-only">일반 카드</h1><section className="ordinary-section"><div className="intro-card-row">{['sword','crescent','star','house'].map(suit=><CardImage key={suit} src={c('3',suit)}/>)}</div><h2>일반 카드</h2><p>네 가지 무늬 · 각 13장, 총 52장</p><p className="rank-description">무늬와 색상에 관계없이<br/><strong>숫자가 높을수록 강해요.</strong></p><div className="rank-fan" role="img" aria-label="2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A 순으로 강해져요.">{ranks.map((rank,i)=><div key={rank} className="rank-fan-card" style={{left:`${i*7.05}%`,zIndex:i}} aria-hidden="true"><CardImage src={c(rank,['sword','crescent','star','house'][i%4])}/></div>)}</div><div className="rank-direction"><span>2 · 낮음</span><span aria-hidden="true">⟶</span><span>A · 높음</span></div></section><button className="combinations-link" onClick={()=>navigate('combinations')}>카드 조합 알아보기 <span>→</span></button></>}
 {page==='combinations'&&<><button className="back-to-cards" onClick={()=>navigate('ordinary')}>← 일반 카드</button>
 {selection.players<=5?(()=>{const slide=slides.find(s=>s.title===titles[comboIndex]);if(!slide)return null;return <><section className="single-combo-page" key={comboIndex}><h1 className="learning-title">{comboIndex<3?['싱글','페어','트리플'][comboIndex]:titles[comboIndex]}</h1>{slide.examples&&<PlayExamples groups={slide.examples} verdict={slide.verdict}/>}<p className="single-combo-copy">{slide.paragraphs.join('\n')}</p>{comboIndex===1&&<p className="combo-note">싱글 위에 페어는 낼 수 없어요.</p>}{slide.note&&<p className="combo-note">{slide.note}</p>}</section>{comboIndex===5&&<p className="combo-next-hint">다음은 폭탄을 알아볼게요.</p>}</>;})():<><p className="pending-copy">{selection.players}인 변형의 조합 규칙은 준비 중이에요.</p><button className="combinations-link" onClick={()=>navigate('bombs')}>폭탄 알아보기 →</button></>}
 </>}
 {page==='bombs'&&<><button className="back-to-cards" onClick={()=>navigate('combinations')}>← 카드 조합</button>{selection.players<=5?<><section className="single-combo-page"><p className="lesson-position">폭탄 {bombIndex+1}/3</p><h1 className="learning-title">{['같은 숫자 네 장','같은 무늬로 이어지는 다섯 장 이상','진행 중인 대결에 끼어들 수 있어요'][bombIndex]}</h1>{bombIndex<2?<><div className="example-cards">{slides.find(s=>s.title===titles[6+bombIndex])?.cards?.map(src=><CardImage key={src} src={src}/>)}</div><p className="single-combo-copy">{bombIndex===0?'서로 다른 네 무늬의 같은 숫자를 모으면 폭탄! 더 높은 숫자의 네 장 폭탄이 이겨요.':'같은 무늬의 스트레이트는 네 장 폭탄보다 강해요. 장수가 많으면 더 강하고, 같으면 높은 숫자가 이겨요.'}</p></>:<><div className="example-cards">{['sword','star','house','crescent'].map(s=><CardImage key={s} src={c('7',s)}/>)}</div><p className="single-combo-copy">다른 조합 위에도, 내 차례가 아니어도 낼 수 있어요. 새 대결은 시작할 차례인 사람만 열 수 있어요.</p><p className="combo-note">봉황으로 폭탄을 만들 수 없어요. 개 위에도 낼 수 없어요.</p></>}</section></>:<p className="pending-copy">{selection.players}인 폭탄 규칙은 준비 중이에요.</p>}</>}
 {page==='special'&&<><button className="back-to-cards" onClick={()=>navigate('bombs')}>← 폭탄</button><nav className="special-tabs" aria-label="특수카드 선택">{Array.from(new Set(lessons.map(l=>l.card))).map(card=>{const index=lessons.findIndex(l=>l.card===card);return <button key={card} aria-current={lesson.card===card?'step':undefined} onClick={()=>{setSpecialIndex(index);content.current?.scrollTo({top:0});}}>{lessons[index].name}</button>;})}</nav><p className="lesson-position" aria-live="polite">{lesson.name} {cardStep}/{sameCard.length}</p><SpecialLesson key={specialIndex} lesson={lesson}/>{specialIndex===lessons.length-1&&<p className="lesson-finish">특수카드를 모두 살펴봤어요. 상단 규칙 메뉴에서 게임의 흐름을 이어서 확인하세요.</p>}</>}
 </main></div>;
}
