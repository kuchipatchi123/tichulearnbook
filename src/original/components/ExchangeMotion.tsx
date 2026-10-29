"use client";
import { siteAsset } from "@/lib/site-asset";
import {useEffect,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {c} from '@/original/data/guide';
import {CardImage} from './GuideVisuals';
const seats=[{x:50,y:21,label:'우리 팀'},{x:78,y:50,label:'상대 팀'},{x:50,y:79,label:'우리 팀 · 나'},{x:22,y:50,label:'상대 팀'}];
const transfers=seats.flatMap((_,from)=>seats.flatMap((_,to)=>from===to?[]:[{from,to}]));
export function ExchangeMotion(){const reduced=true;const [phase,setPhase]=useState(0),[run,setRun]=useState(0);useEffect(()=>{if(reduced||phase===2)return;const id=setTimeout(()=>setPhase(p=>p+1),phase===0?1800:2800);return()=>clearTimeout(id);},[phase,run,reduced]);const stage=reduced?2:phase;
 const slot=(seat:number,other:number)=>{const n=[0,1,2,3].filter(i=>i!==seat).indexOf(other);return {x:seats[seat].x+(n-1)*7,y:seats[seat].y};};
 return <figure className="game-board-demo exchange-motion"><div className="game-board" aria-label="네 명이 각각 세 장을 동시에 보내고 받는 카드 교환"><div className="game-board-ring"/>{seats.map((s,i)=><div key={s.label+i} className={`exchange-person person-${i}`}><span>{s.label}</span><strong>14장</strong></div>)}<div className="exchange-center">3장 보내고,<br/>3장 받기</div>{transfers.map(({from,to})=>{const start=slot(from,to),end=slot(to,from);return <motion.div key={`${run}-${from}-${to}`} className="exchange-card" initial={false} animate={{left:`${stage===0?start.x:end.x}%`,top:`${stage===0?start.y:end.y}%`}} transition={{duration:stage===1?2.2:0,ease:'easeInOut'}} data-from={from} data-to={to}>{stage===2?<CardImage src={c(String(from+to+2),['sword','star','house','crescent'][from])}/>:<span className="deck-back black"><img src={siteAsset("/cards/card-backs-original.png")} alt="교환할 카드 뒷면"/></span>}</motion.div>;})}</div><figcaption aria-live="polite">{['각자 보낼 카드 3장을 먼저 골라요.','네 명 모두 동시에 1장씩 전달해요.','교환 완료! 이제 받은 카드를 확인해요.'][stage]}</figcaption><div className="motion-controls"><button onClick={()=>{setPhase(0);setRun(r=>r+1);}}>모션 다시 보기 ↻</button><span>{stage+1}/3</span></div></figure>;
}
