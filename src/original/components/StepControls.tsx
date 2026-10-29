export function StepControls({index,total,title,onPrevious,onNext,nextLabel='다음 단계',nextDisabled=false}:{index:number;total:number;title:string;onPrevious:()=>void;onNext:()=>void;nextLabel?:string;nextDisabled?:boolean}){
return <nav className="step-controls" aria-label="단계별 이동"><button aria-label="이전 단계" disabled={index===0} onClick={onPrevious}>←</button><div aria-live="polite"><strong>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</strong></div><button disabled={nextDisabled} aria-label={nextLabel} onClick={onNext}>→</button></nav>
}
