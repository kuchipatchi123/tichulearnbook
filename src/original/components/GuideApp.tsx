"use client";
import { siteAsset } from "@/lib/site-asset";
import {ruleReferences} from '@/original/data/guide';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { guideFor, preparationFor, Selection, Tab } from '@/original/data/guide';
import { PlayExamples, ExchangeDiagram, HandDiagram, ScoreDiagram, TrickDemo } from './GuideVisuals';
import { PreparationSteps } from './PreparationSteps';
import { GameBoard } from './GameBoard';
import { RuleOverview, CombinationOverview, TurnExamples } from './RuleOverview';
import { CardIntroduction } from './CardIntroduction';
import {GuideSearch} from '@/components/GuideSearch';
import {FitContent} from './FitContent';

type Section='home'|'cards'|'rules'|'score';
export default function GuideApp({initialTab='cards',requestId,initialStep,onHome}:{initialTab?:Section;requestId:number;initialStep?:number;onHome:()=>void}){
 const selection:Selection={players:4,mode:'team'};
 const [tab,setTab]=useState<Section>(initialTab==='home'?'cards':initialTab);
 const [positions,setPositions]=useState({home:0,cards:0,rules:0,score:0});
 const [indexOpen,setIndexOpen]=useState(false);
 const referenceDialog=useRef<HTMLDialogElement>(null);const [reference,setReference]=useState(0);
 useEffect(()=>{setTab(initialTab==='home'?'cards':initialTab);setIndexOpen(false);if(initialStep!==undefined)setPositions(p=>({...p,rules:initialStep}))},[initialTab,requestId,initialStep]);
 const [grand,setGrand]=useState<boolean|null>(null),[small,setSmall]=useState<boolean|null>(null);
 const touch=useRef<{x:number;y:number}|null>(null);
 const heading=useRef<HTMLHeadingElement>(null);
 const slideWindow=useRef<HTMLDivElement>(null);
 const focusNext=useRef(false);

 const guides=guideFor(selection??{players:4,mode:'team'});
 const slides=guides[tab==='score'?'rules':tab], index=Math.min(positions[tab],slides.length-1), slide=slides[index]??slides[0];
 useEffect(()=>{slideWindow.current?.scrollTo({top:0});if(focusNext.current){heading.current?.focus({preventScroll:true});focusNext.current=false}},[tab,index]);
 const isSetup=selection?.players===4&&tab==='rules'&&slide.setup!==undefined;
 const move=(delta:number)=>{setIndexOpen(false);const next=Math.max(0,Math.min(slides.length-1,index+delta));if(next===index)return;focusNext.current=true;setPositions(p=>({...p,[tab]:next}));};
 const switchTab=(next:Section)=>{setTab(next);setIndexOpen(false);};
 const startGame=()=>{setPositions(p=>({...p,rules:0}));switchTab('rules');};
 return <div className="guide-shell restored-guide">
   <dialog ref={referenceDialog} className="special-summary-dialog" aria-labelledby="reference-title" onKeyDown={e=>e.stopPropagation()}><header><h2 id="reference-title">{ruleReferences[reference].title}</h2><button onClick={()=>referenceDialog.current?.close()}>닫기 ×</button></header>{reference===1?<CombinationOverview/>:<RuleOverview specialOnly={reference===2}/>}</dialog><header className="top-navigation"><button className="brand-home" onClick={onHome} aria-label="티츄 홈"><span className="brand-wordmark">TICHU</span></button><GuideSearch onSelect={(section,index)=>{switchTab(section);if(index!==undefined)setPositions(p=>({...p,rules:index}))}}/><nav aria-label="주 메뉴">{(['rules','cards','score'] as const).map(t=><button key={t} aria-current={tab===t?'page':undefined} onClick={()=>switchTab(t)}>{{cards:'카드',rules:'규칙',score:'점수'}[t]}</button>)}</nav></header>
   <div className="preserved-cards" hidden={tab!=='cards'}><CardIntroduction selection={selection} onComplete={()=>switchTab('rules')}/></div>
   {tab==='score'&&<main id="home" className="score-reference reader"><h1>점수 계산</h1><section><h2>01. 카드별 점수</h2><ScoreDiagram/><p>나머지 카드는 0점이에요. 전체 카드 점수의 합은 100점입니다.</p></section><section><h2>02. 같은 팀이 1·2등이면</h2><p>카드 점수 대신 우리 팀 200점, 상대 팀 0점을 받아요.</p></section><section><h2>03. 티츄 선언 결과 더하기</h2><p>라지 티츄 ±200점 · 스몰 티츄 ±100점</p><p>선언한 본인이 1등이면 성공, 아니면 실패예요. 원투 점수와도 별도로 계산합니다.</p></section><section><h2>04. 누적 1000점이면 승리</h2><p>두 팀 모두 1000점 이상이면 높은 팀이 승리하고, 동점이면 한 라운드 더 진행합니다.</p></section></main>}
   {(tab==='rules'||tab==='home')&&<main id="home" className="reader" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;touch.current=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)move(dx<0?1:-1);}} onKeyDown={e=>{if(e.target instanceof HTMLElement&&e.target.closest('button,input,select,textarea'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>

   {tab==='rules'&&<div className="lesson-toolbar"><span>게임 진행 안내</span><button aria-expanded={indexOpen} onClick={()=>setIndexOpen(!indexOpen)}>단계 바로 찾기 {indexOpen?'−':'+'}</button></div>}
   <div className="slide-window" ref={slideWindow}>
   {indexOpen&&<nav className="lesson-index" aria-label="규칙 단계">{slides.map((s,i)=><button key={i} className={s.setup===7||s.setup===9?'declaration-index-step':undefined} aria-current={i===index?'step':undefined} onClick={()=>{setPositions(p=>({...p,rules:i}));setIndexOpen(false)}}><span>{String(i+1).padStart(2,'0')}</span>{s.title.replace(/\n/g,' ')}</button>)}<h2>카드 참고 자료</h2>{ruleReferences.map((s,i)=><button key={s.title} onClick={()=>{setReference(i);referenceDialog.current?.showModal()}}>{s.title} ↗</button>)}</nav>}
   <div hidden={indexOpen} className="step-title-bar"><button aria-label="제목에서 이전 단계" disabled={index===0} onClick={()=>move(-1)}>‹</button><h1 ref={heading} tabIndex={-1}>{String(index+1).padStart(2,'0')} {slide.title.replace(/\n/g,' ')}</h1><button aria-label="제목에서 다음 단계" disabled={index===slides.length-1} onClick={()=>move(1)}>›</button></div>
   <FitContent hidden={indexOpen}><article hidden={indexOpen} className={`guide-slide visual-${slide.visual??'text'} ${tab==='home'&&selection?.players===4?'home-overview':''}`}>
   {isSetup?<PreparationSteps key={`${selection?.players}-${index}`} step={slide.setup!} grand={grand} small={small} onGrand={v=>{setGrand(v);if(v)setSmall(null);}} onSmall={setSmall}/>:<>
   {slide.seats&&<div className="seating" aria-label="같은 팀끼리 마주 앉기"><span className="seat top">우리 팀</span><span className="seat left">상대 팀</span><span className="table-center">TICHU<br/><small>↺</small></span><span className="seat right">상대 팀</span><span className="seat bottom">우리 팀</span></div>}
   {slide.cards&&<div className={`example-cards ${slide.cards.length===1?'single-card':''}`}>{slide.cards.map((src,i)=><Image unoptimized key={`${src}-${i}`} src={`${siteAsset(src)}?v=original-20261019`} alt={src.includes('/special/')?({mahjong:'참새',dog:'개',dragon:'용',phoenix:'봉황'}[src.split('/').pop()!.replace('.png','')]??'특수 카드'):`${({sword:'칼',star:'별',house:'집',crescent:'초승달'} as Record<string,string>)[src.split('/')[2]]} ${src.split('/').pop()?.replace('.png','')}`} width={160} height={245} sizes={slide.cards?.length===1?'130px':'90px'} />)}</div>}
   {slide.examples&&<PlayExamples groups={slide.examples} verdict={slide.verdict}/>}
   {slide.visual==='exchange'&&<ExchangeDiagram/>}{slide.visual==='hand'&&<HandDiagram/>}{slide.visual==='trick'&&<GameBoard kind="collect"/>}{slide.visual==='scores'&&<ScoreDiagram/>}
   {slide.visual==='turn-examples'&&<TurnExamples/>}{slide.visual==='overview'&&<RuleOverview/>}{slide.visual==='special-overview'&&<RuleOverview specialOnly/>}{slide.visual==='combinations'&&<CombinationOverview/>}{slide.visual==='team-score'&&<GameBoard key={`score-${index}`} kind="score"/>}{slide.visual==='dragon-win'&&<GameBoard kind="dragon"/>}{slide.visual==='round-end'&&<GameBoard kind="end"/>}{slide.visual==='six-team'&&<GameBoard kind="teams" players={6}/>}

   {slide.stat&&<p className="slide-stat">{slide.stat}</p>}
   <div className="slide-copy">{slide.paragraphs.map((p,i)=>tab==='home'&&selection?.players===4?<section className="home-core" key={p}><h2>{p.split('\n')[0]}</h2>{p.includes('\n')&&<p>{p.split('\n').slice(1).join(' ')}</p>}<p className="home-analogy">{i===0?'루미큐브처럼, 손에 있는 카드를 줄여요.':'할리갈리처럼, 나온 카드를 가져와 모아요.'}</p></section>:<p key={p} className={slide.visual==='dragon-win'&&i===0?'dragon-transfer-warning':undefined}>{p}</p>)}</div>
   {slide.emphasis&&<strong className="slide-emphasis">{slide.emphasis}</strong>}
   {slide.note&&<p className="slide-note">{slide.note}</p>}
   {slide.action&&<div className="slide-actions"><button onClick={()=>switchTab('cards')}>카드 먼저 알아보기 <span>↗</span></button><button onClick={startGame}>게임 시작하기 <span>→</span></button></div>}
   </>}
   </article></FitContent></div>

   </main>}
 </div>;
}
