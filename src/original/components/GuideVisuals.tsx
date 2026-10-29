"use client";
import { siteAsset } from "@/lib/site-asset";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { c, special, ExampleGroup } from '@/original/data/guide';
export function CardImage({src}:{src:string}) {
 const parts=src.split('/');
 const suit:Record<string,string>={sword:'칼',star:'별',house:'집',crescent:'초승달'};
 const names:Record<string,string>={mahjong:'참새',dog:'개',dragon:'용',phoenix:'봉황'};
 const rank=parts[3].replace('.png','');
 return <Image unoptimized src={`${siteAsset(src)}?v=original-20261019`} alt={parts[2]==='special'?names[rank]:`${suit[parts[2]]} ${rank}`} width={160} height={245} sizes="(max-width: 400px) 100px, 140px"/>;
}
export function PlayExamples({groups,verdict}:{groups:ExampleGroup[];verdict?:string}) {
 const stacked=groups.some(g=>g.cards.length>=3);
 return <figure className={`play-examples ${stacked?'stacked':'horizontal'}`} aria-label="카드를 내는 순서">
 <div className="example-sequence">{groups.map((g,i)=><div className="play-step" key={i}>
 {i>0&&<span className="play-arrow" aria-hidden="true">{stacked?'↓':'→'}</span>}
 <div className="play-group"><span className="play-caption">{g.label}</span><div className="mini-cards">{g.cards.map((src,j)=><CardImage src={src} key={`${src}-${j}`}/>)}</div></div>
 </div>)}</div>{verdict&&<figcaption className="example-verdict">{verdict==='가능!'?'✓':'×'} {verdict}</figcaption>}
 </figure>;
}
export function ExchangeDiagram(){return <figure className="exchange-diagram" aria-label="내 카드 3장 중 한 장씩 팀원과 두 상대에게 전달">
 <figcaption>내 카드 중 고른 3장</figcaption><div className="exchange-paths">{['상대 팀','같은 팀원','상대 팀'].map((label,i)=><div key={i}><CardImage src={[c('2','house'),c('A','crescent'),c('4','star')][i]}/><span aria-hidden="true">↓</span><strong>{label}</strong><small>1장</small></div>)}</div><p>교환할 카드의 예시예요.</p>
 </figure>}
export function HandDiagram(){return <div className="hand-diagram"><section><div className="mini-cards"><CardImage src={c('3')}/><CardImage src={c('8','house')}/><CardImage src={c('Q','crescent')}/></div><div><span className="visual-kicker">HAND</span><h2>손에 있는 카드</h2><p>처음 나눠 받은 카드. 게임 중 모두 내려놓는 것이 목표예요.</p></div></section><section><div className="mini-cards collected-pile"><CardImage src={c('5','star')}/><CardImage src={c('10','crescent')}/><CardImage src={c('K','house')}/></div><div><span className="visual-kicker">COLLECTED</span><h2>획득한 카드</h2><p>대결에서 이겨 가져온 카드. 내 앞에 따로 모아 라운드 끝에 점수를 세요.</p></div></section></div>}
export function ScoreDiagram(){const items=[{src:c('5','star'),label:'5',points:'+5'},{src:c('10','crescent'),label:'10',points:'+10'},{src:c('K','house'),label:'K',points:'+10'},{src:special('dragon'),label:'용',points:'+25'},{src:special('phoenix'),label:'봉황',points:'−25'}];return <div className="score-diagram">{items.map(i=><figure key={i.label}><CardImage src={i.src}/><figcaption><span>{i.label}</span><strong>{i.points}점</strong></figcaption></figure>)}</div>}
const stages=['A가 3을 냅니다.','B가 더 높은 5를 냅니다.','C가 더 높은 7을 냅니다.','D가 패스합니다.','A도 패스합니다.','B도 패스합니다.','D · A · B가 연속 패스! C가 3·5·7을 가져갑니다.'];
export function TrickDemo(){
 const reduced=true;
 const [step,setStep]=useState(0);
 const [playing,setPlaying]=useState(true);
 const visibleStep=reduced?6:step;
 useEffect(()=>{if(reduced||!playing||step>=6)return;const timer=setTimeout(()=>setStep(n=>n+1),1400);return()=>clearTimeout(timer);},[step,playing,reduced]);
 return <figure className="trick-demo" aria-label="A 3, B 5, C 7, D 패스, A 패스, B 패스. C가 나온 카드를 가져오는 예시">
 <div className="trick-players">{['A','B','C','D'].map((p,i)=><span className={visibleStep===6&&p==='C'?'winner':''} key={p}>PLAYER {p}{i<3&&<small>→</small>}</span>)}</div>
 <div className="trick-table"><div className="trick-played">{[c('3'),c('5','star'),c('7','crescent')].map((src,i)=><motion.div key={src} initial={false} animate={{opacity:visibleStep>=i?1:0,x:visibleStep===6?(1-i)*28:0,y:visibleStep===6?20:0,rotate:visibleStep===6?(i-1)*8:0}} transition={{duration:reduced?0:.35}}><CardImage src={src}/></motion.div>)}</div><strong className="collect-label">{visibleStep===6?'C의 획득 카드':'테이블에 낸 카드'}</strong></div>
 <figcaption>{stages[visibleStep]}</figcaption>
 {!reduced&&<div className="demo-controls"><button onClick={()=>{if(step===6){setStep(0);setPlaying(true);}else setPlaying(p=>!p);}}>{step===6?'다시 보기':playing?'일시정지':'재생'}</button><span>{visibleStep+1} / 7</span><button disabled={step===6} onClick={()=>{setPlaying(false);setStep(n=>Math.min(6,n+1));}}>한 단계씩 →</button></div>}
 </figure>;
}
