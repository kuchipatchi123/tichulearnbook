"use client";
import { siteAsset } from "@/lib/site-asset";
import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { c, special } from '@/original/data/guide';
import { ExchangeMotion } from './ExchangeMotion';
import { StaticBoard } from './StaticBoard';
import { CardImage } from './GuideVisuals';
export type BoardKind='teams'|'deal8'|'deal6'|'exchange'|'score'|'collect'|'dragon'|'end'|'start';
const positions=[{x:50,y:8},{x:92,y:50},{x:50,y:92},{x:8,y:50}];
const center={x:50,y:50};
const stages:Record<BoardKind,string[]>={teams:['같은 팀끼리 마주 앉아요'],deal8:['각자 뒷면으로 8장씩 나눠 받아요'],deal6:['기존 8장 유지','3장씩 추가','6장씩 추가 · 각자 14장'],exchange:['모두 보낼 3장을 먼저 골라요','전달 방향: 팀원에게 1장','전달 방향: 상대 두 명에게 1장씩','네 명 모두 동시에 전달해요','교환 완료! 이제 받은 카드를 확인해요'],score:['우리 팀의 획득 카드','두 사람의 점수를 합쳐요','우리 팀 60점 · 상대 팀 40점'],collect:['A가 3을 내요','D가 5를 내요','C가 6을 내요','B가 7을 내요','A: 패스!','D: 패스!','C: 패스!','B가 전부 가져가 따로 모아요'],dragon:['용이 이겨요 · 폭탄이 없는 예시','용과 나온 카드 → 상대 B','다음 시작은 A · 카드가 남아 있다면'],end:['세 번째 사람이 카드를 다 냈어요','마지막 D의 손에 남은 카드 → 상대 팀','D의 획득 카드 → 1등 A','이제 팀 점수를 계산해요'],start:['참새를 가진 사람이 먼저 시작해요']};
function AnimatedBoard({kind,players=4}:{kind:BoardKind;players?:number}){
 const reduced=true;const [step,setStep]=useState(0),[run,setRun]=useState(0),[paused,setPaused]=useState(false);
 const isStatic=['deal8','deal6','exchange','score','end'].includes(kind);const last=isStatic?0:stages[kind].length-1;const visible=reduced?last:step;
 useEffect(()=>{setStep(0);setPaused(false);},[kind,run]);
 useEffect(()=>{if(reduced||paused||step>=last)return;const timer=setTimeout(()=>setStep(s=>s+1),kind==='collect'?1400:950);return()=>clearTimeout(timer);},[kind,step,last,paused,reduced]);
 const caption=players===6&&kind==='teams'?'세 명씩 두 팀으로 나뉘어요':stages[kind][visible];
 const pts=players===6?Array.from({length:6},(_,i)=>({x:50+42*Math.sin(i*Math.PI/3),y:50-42*Math.cos(i*Math.PI/3)})):positions;
 const labels=kind==='collect'?['A','B','C','D']:kind==='dragon'?['C · 팀원','B · 상대','A · 나','D · 상대']:kind==='end'?['A · 1등','B · 2등','C · 3등','D · 마지막']:pts.map((_,i)=>i%2===0?'우리 팀':'상대 팀');
 let main:ReactNode=null;
 if(kind==='teams')main=<><b>{players===6?'3 : 3':'2 : 2'}</b><small>{players===6?'각 팀 3명':'마주 앉으면 같은 팀'}</small></>;
 if(kind==='deal8')main=<><b>8</b><small>각자 8장씩</small></>;
 if(kind==='deal6')main=<><b>{visible===2?'14':'8 + 6'}</b><small>{visible===2?'8 + 6 = 14':'8 + 6'}</small></>;
 if(kind==='exchange')main=<><b>{visible===4?'14장':'3장 ↔ 3장'}</b><small>모두 3장 주고 · 3장 받기</small></>;
 if(kind==='score')main=<><b>{visible===0?'25 + 35':'60점'}</b><small>{visible===2?'상대 팀 100 − 60 = 40점':'예시 · 우리 팀의 카드 점수'}</small></>;
 if(kind==='end')main=<><b>게임 끝!</b><small>이번 라운드 종료</small></>;
 if(kind==='start')main=<><CardImage src={special('mahjong')}/><small>첫 시작 · 반시계 방향 ↺</small></>;
 const card=(src:string,from:{x:number;y:number},to:{x:number;y:number},key:string,delay=0)=> <motion.div key={`${run}-${key}`} className="board-flight" initial={reduced?false:{left:`${from.x}%`,top:`${from.y}%`}} animate={{left:`${to.x}%`,top:`${to.y}%`}} transition={{duration:reduced?0:.65,delay:reduced?0:delay}}><CardImage src={src}/></motion.div>;
 const back=(from:{x:number;y:number},to:{x:number;y:number},key:string)=> <motion.div key={`${run}-${key}`} className="board-flight" initial={reduced?false:{left:`${from.x}%`,top:`${from.y}%`}} animate={{left:`${to.x}%`,top:`${to.y}%`}} transition={{duration:reduced?0:.65}}><span className="deck-back black"><img src={siteAsset("/cards/card-backs-original.png")} alt="카드 뒷면"/></span></motion.div>;
 const inner=(i:number)=>({x:50+(pts[i].x-50)*.65,y:50+(pts[i].y-50)*.65});
 if(isStatic)return <StaticBoard kind={kind}/>;
 return <figure className={`game-board-demo board-kind-${kind}`}>
 <div className="game-board" role="img" aria-label={`${players}명 게임판. ${caption}`}>
 <div className="game-board-ring"/>
 {pts.map((p,i)=><div key={i} className={`game-seat ${i%2===0?'our-seat':''} ${kind==='collect'&&i===1&&visible>=3?'active-seat':''}`} style={{left:`${p.x}%`,top:`${p.y}%`}}><span>{labels[i]}</span>{kind==='deal8'&&<strong>8장</strong>}{kind==='deal6'&&<strong>{[8,11,14][visible]}장</strong>}{kind==='exchange'&&<strong>{visible===0||visible===4?'14장':'전달 중'}</strong>}{kind==='score'&&<strong>{i===0?'25점':i===2?'35점':visible===2?'합계 40점':''}</strong>}{kind==='collect'&&<strong>{((i===0&&visible>=4)||(i===3&&visible>=5)||(i===2&&visible>=6))?'패스!':i===1&&visible===7?'획득 카드':[0,3,2,1].indexOf(i)<=visible?'카드를 냄':''}</strong>}{kind==='dragon'&&<strong>{i===1&&visible>=1?'획득 카드':i===2&&visible===2?'다음 시작':''}</strong>}</div>)}
 <div className="game-board-center">{main}</div>
 {kind==='deal8'&&pts.map((_,i)=>(
  <div key={`stack-${i}`} className="board-card-stack" style={{left:`${inner(i).x}%`,top:`${inner(i).y}%`}}>
   {Array.from({length:8},(_,k)=>(
    <div
     key={k}
     className="stacked-card"
     style={{
      transform:`translate(${(k-3.5)*1.8}px, ${(k-3.5)*-0.6}px) rotate(${(k-3.5)*1.2}deg)`,
      zIndex:k+1
     }}
    >
     <span className="deck-back black">
      <img src={siteAsset("/cards/card-backs-original.png")} alt="카드 뒷면"/>
     </span>
    </div>
   ))}
  </div>
 ))}
 {kind==='deal6'&&visible===0&&back(center,center,'deck')}
 {kind==='deal6'&&visible>0&&pts.map((_,i)=>back(center,inner(i),`deal-${visible}-${i}`))}
 {kind==='exchange'&&visible>0&&visible<4&&<><svg className="board-arrows" viewBox="0 0 100 100" aria-hidden="true"><defs><marker id="tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#a0a0a0"/></marker></defs>{(visible===1?[0]:visible===2?[1,3]:[0,1,3]).map(i=><line key={i} x1="50" y1="78" x2={inner(i).x} y2={inner(i).y} stroke="#a0a0a0" strokeWidth=".5" markerEnd="url(#tip)"/>)}</svg>{visible<3?(visible===1?[0]:[1,3]).map(i=>back(inner(2),inner(i),`send-${i}`)):pts.flatMap((_,from)=>pts.filter((_,to)=>from!==to).map((_,j)=>{const to=[0,1,2,3].filter(i=>i!==from)[j];return back(inner(from),inner(to),`${from}-${to}`);} ))}</>}
 {kind==='exchange'&&visible===4&&pts.map((_,i)=>card(c(String(i+2),['sword','star','house','crescent'][i]),inner(i),inner(i),`received-${i}`))}
 {kind==='score'&&[0,2].map((i,n)=><motion.span key={`${run}-${i}`} className="score-flight" initial={reduced?false:{left:`${inner(i).x}%`,top:`${inner(i).y}%`,opacity:1}} animate={{left:'50%',top:visible>=1?'50%':`${inner(i).y}%`,opacity:visible>=1?0:1}} transition={{duration:reduced?0:.8}}>{n===0?'25':'35'}</motion.span>)}
 {kind==='score'&&visible===0&&[0,2].map((i,n)=>card(n===0?special('dragon'):c('K','star'),inner(i),inner(i),`score-card-${i}`))}
 {kind==='collect'&&[c('3'),c('5','star'),c('6','crescent'),c('7','house')].map((src,i)=>visible>=i?card(src,visible===7?{x:32+i*12,y:49}:inner([0,3,2,1][i]),visible===7?{x:68+i*4,y:37}:{x:32+i*12,y:49},`played-${i}-${visible===7?'won':'table'}`):null)}
 {kind==='dragon'&&[c('5','star'),c('K','house'),special('dragon')].map((src,i)=>card(src,{x:43+i*14,y:50},visible>=1?{x:67+i*5,y:37}:{x:43+i*14,y:50},`dragon-${i}`))}
 {kind==='dragon'&&visible===2&&<span className="next-lead">↓ 시작은 나에게</span>}
 {kind==='end'&&<>{card(c('2','house'),inner(3),visible>=1?inner(2):{x:25,y:43},'remaining')}{card(c('K','star'),{x:25,y:59},visible>=2?inner(0):{x:25,y:59},'collected')}</>}
 </div>
 <figcaption aria-live="polite">{caption}</figcaption>
 {!reduced&&last>0&&<div className="motion-controls"><button onClick={()=>{setRun(r=>r+1);}}>모션 다시 보기 ↻</button>{!reduced&&step<last&&<button onClick={()=>setPaused(p=>!p)}>{paused?'재생':'일시정지'}</button>}<span>{visible+1}/{last+1}</span></div>}
 </figure>;
}

export function GameBoard(props:{kind:BoardKind;players?:number}){return props.kind==='exchange'?<ExchangeMotion/>:<AnimatedBoard {...props}/>;}
