'use client';
import {useRef,useState} from 'react';
import {Search} from 'lucide-react';
import {rules4} from '@/original/data/guide';
export function GuideSearch({onSelect}:{onSelect:(section:'cards'|'rules'|'score',index?:number)=>void}){
 const [query,setQuery]=useState('');const dialog=useRef<HTMLDialogElement>(null);
 const items=[{title:'카드 · 일반 카드와 조합',text:'싱글 페어 트리플 풀하우스 스트레이트 폭탄 특수카드',section:'cards' as const},...rules4.map((s,index)=>({title:s.title.replace(/\n/g,' '),text:s.paragraphs.join(' ')+' '+(s.note??''),section:'rules' as const,index})),{title:'점수 계산',text:'카드 점수 200점 티츄 선언 1000점 승리',section:'score' as const}];
 const results=items.filter(x=>(x.title+' '+x.text).replace(/\s/g,'').includes(query.replace(/\s/g,'')));
 return <><button className="header-search search-icon-button" aria-label="설명서 검색 열기" aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}><Search aria-hidden="true"/></button><dialog ref={dialog} className="guide-search-dialog"><header><h2>설명서 검색</h2><button onClick={()=>dialog.current?.close()} aria-label="검색 닫기">닫기 ×</button></header><input aria-label="검색어" placeholder="카드, 티츄, 점수…" value={query} onChange={e=>setQuery(e.target.value)}/><div className="search-results">{results.length?results.map((item,i)=><button key={i} onClick={()=>{onSelect(item.section,'index' in item?item.index:undefined);dialog.current?.close()}}><span>{{cards:'카드',rules:'규칙',score:'점수'}[item.section]}</span><strong>{item.title}</strong><span aria-hidden="true">→</span></button>):<p>검색 결과가 없어요. 다른 단어로 찾아보세요.</p>}</div></dialog></>
}
