import s from './Terminal.module.css';
export default function Terminal() {
  const lines = ['Agentic AI','RAG Pipelines','LLM Fine-tuning','NL2SQL'];
  return (
    <div className={s.terminal}>
      <div className={s.bar}>
        <span className={s.dotR}/><span className={s.dotY}/><span className={s.dotG}/>
        <span className={s.title}>sazid@portfolio ~ bash</span>
      </div>
      <div className={s.body}>
        <div><span className={s.prompt}>❯ </span>whoami</div>
        <div className={s.out}>&nbsp;AIML Associate @ Tiger Analytics</div>
        <br/>
        <div><span className={s.prompt}>❯ </span>cat stack.json</div>
        <div><span className={s.key}>&nbsp;"specialties"</span><span className={s.out}>: [</span></div>
        {lines.map((l,i) => (
          <div key={l}><span className={s.str}>&nbsp;&nbsp;"{l}"</span>{i<lines.length-1&&<span className={s.out}>,</span>}</div>
        ))}
        <div className={s.out}>&nbsp;]</div>
        <br/>
        <div><span className={s.prompt}>❯ </span>./solve --platform leetcode</div>
        <div className={s.out}>&nbsp;700+ problems solved ✓</div>
        <br/>
        <div><span className={s.prompt}>❯ </span>_<span className={s.cursor}/></div>
      </div>
    </div>
  );
}
