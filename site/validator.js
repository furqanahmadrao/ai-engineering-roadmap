/* Minimal client-side validator for Phase 0
 * - Mirrors the canonical schema structure in code (no external libs)
 * - Validates shape and required fields; not a full JSON Schema engine
 */
(function(){
  const $ = (sel)=>document.querySelector(sel);

  const schema = {
    requiredRoot: ["version","topics","capstones"],
    categories: ["Core","High ROI","Optional","Advanced","LLM","MLOps"],
    levels: ["Beginner","Intermediate","Advanced"],
    resourceTypes: ["course","doc","repo","article","video"]
  };

  function isObject(x){return x && typeof x === 'object' && !Array.isArray(x);}

  function validateResource(r, path){
    const errs=[];
    if(!isObject(r)) return [`${path} must be object`];
    if(!schema.resourceTypes.includes(r.type)) errs.push(`${path}.type must be one of ${schema.resourceTypes.join(', ')}`);
    if(typeof r.title !== 'string' || !r.title) errs.push(`${path}.title required string`);
    if(typeof r.url !== 'string' || !/^https?:\/\//.test(r.url)) errs.push(`${path}.url must be http(s) URL`);
    return errs;
  }

  function validateRubric(rb, path){
    const errs=[];
    const req=["functionality","reproducibility","tests","writeup"];
    if(!isObject(rb)) return [`${path} must be object`];
    for(const k of req){
      if(typeof rb[k] !== 'number' || rb[k] < 0) errs.push(`${path}.${k} must be non-negative number`);
    }
    return errs;
  }

  function validateProject(p, path){
    const errs=[];
    if(!isObject(p)) return [`${path} must be object`];
    if(typeof p.title !== 'string' || !p.title) errs.push(`${path}.title required string`);
    if(!Array.isArray(p.deliverables) || p.deliverables.length < 1) errs.push(`${path}.deliverables must be non-empty array`);
    errs.push(...validateRubric(p.rubric, `${path}.rubric`));
    return errs;
  }

  function validateAssessments(arr, path){
    const errs=[];
    if(!Array.isArray(arr)) return [`${path} must be array`];
    for(let i=0;i<arr.length;i++){
      const a=arr[i];
      if(!isObject(a)) {errs.push(`${path}[${i}] must be object`); continue;}
      if(!["quiz","checkpoint","review"].includes(a.type)) errs.push(`${path}[${i}].type invalid`);
      if(typeof a.description !== 'string') errs.push(`${path}[${i}].description required string`);
      if(a.answer_key_url && !/^https?:\/\//.test(a.answer_key_url)) errs.push(`${path}[${i}].answer_key_url must be URL`);
    }
    return errs;
  }

  function validateTopic(t, idx){
    const path = `topics[${idx}]`;
    const errs=[];
    if(!isObject(t)) return [`${path} must be object`];
    const req=["id","title","category","level","estimated_hours","prerequisites","learning_objectives","resources","project","assessments","tags","role_mapping"];
    for(const k of req){ if(!(k in t)) errs.push(`${path}.${k} is required`); }
    if(typeof t.id !== 'string' || !/^[a-z0-9-]+$/.test(t.id)) errs.push(`${path}.id must be kebab-case`);
    if(!schema.categories.includes(t.category)) errs.push(`${path}.category invalid`);
    if(!schema.levels.includes(t.level)) errs.push(`${path}.level invalid`);
    if(typeof t.estimated_hours !== 'number' || t.estimated_hours < 1) errs.push(`${path}.estimated_hours must be >=1`);
    if(!Array.isArray(t.prerequisites)) errs.push(`${path}.prerequisites must be array`);
    if(!Array.isArray(t.learning_objectives) || t.learning_objectives.length < 3) errs.push(`${path}.learning_objectives needs >=3`);
    if(!Array.isArray(t.resources) || t.resources.length < 2 || t.resources.length > 4) errs.push(`${path}.resources needs 2–4 items`);
    else t.resources.forEach((r,i)=> errs.push(...validateResource(r, `${path}.resources[${i}]`)));
    errs.push(...validateProject(t.project, `${path}.project`));
    errs.push(...validateAssessments(t.assessments, `${path}.assessments`));
    if(!Array.isArray(t.tags)) errs.push(`${path}.tags must be array`);
    if(!isObject(t.role_mapping)) errs.push(`${path}.role_mapping must be object`);
    return errs;
  }

  function validateCapstone(c, idx){
    const path = `capstones[${idx}]`;
    const errs=[];
    if(!isObject(c)) return [`${path} must be object`];
    const req=["id","title","roles","project"];
    for(const k of req){ if(!(k in c)) errs.push(`${path}.${k} is required`); }
    if(typeof c.id !== 'string' || !/^[a-z0-9-]+$/.test(c.id)) errs.push(`${path}.id must be kebab-case`);
    if(!Array.isArray(c.roles) || c.roles.length < 1) errs.push(`${path}.roles must be non-empty array`);
    errs.push(...validateProject(c.project, `${path}.project`));
    if(c.rubric_url && !/^https?:\/\//.test(c.rubric_url)) errs.push(`${path}.rubric_url must be URL`);
    return errs;
  }

  function validate(data){
    const errors=[];
    if(!isObject(data)) return {ok:false, errors:["Root must be object"]};
    for(const k of schema.requiredRoot){ if(!(k in data)) errors.push(`root.${k} is required`); }
    if(typeof data.version !== 'string') errors.push('root.version must be string');
    if(!Array.isArray(data.topics) || data.topics.length < 1) errors.push('root.topics must be non-empty array');
    else data.topics.forEach((t,i)=> errors.push(...validateTopic(t,i)));
    if(!Array.isArray(data.capstones) || data.capstones.length < 1) errors.push('root.capstones must be non-empty array');
    else data.capstones.forEach((c,i)=> errors.push(...validateCapstone(c,i)));
    return {ok: errors.length===0, errors};
  }

  async function fetchJSON(url){
    const res = await fetch(url, {cache:'no-store'});
    if(!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.json();
  }

  function render(result, src){
    const resultEl = $('#result');
    const logEl = $('#log');
    if(result.ok){
      resultEl.innerHTML = `<p class="ok">✔ Validation passed for <code>${src}</code></p>`;
      logEl.hidden = true;
    } else {
      resultEl.innerHTML = `<p class="err">✖ Validation failed for <code>${src}</code> — ${result.errors.length} issue(s)</p>`;
      logEl.textContent = result.errors.map((e,i)=>`${i+1}. ${e}`).join('\n');
      logEl.hidden = false;
    }
  }

  $('#btn-validate')?.addEventListener('click', async ()=>{
    try {
      const data = await fetchJSON('roadmap.json');
      render(validate(data), 'site/roadmap.json');
    } catch (e){
      render({ok:false, errors:[String(e.message||e)]}, 'site/roadmap.json');
    }
  });

  $('#btn-sample')?.addEventListener('click', async ()=>{
    try {
      const data = await fetch('../seed/seed-example.json');
      const json = await data.json();
      render(validate(json), 'seed/seed-example.json');
    } catch (e){
      render({ok:false, errors:[String(e.message||e)]}, 'seed/seed-example.json');
    }
  });

  $('#file')?.addEventListener('change', async (ev)=>{
    const file = ev.target.files?.[0];
    if(!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      render(validate(json), file.name);
    } catch (e){
      render({ok:false, errors:[`Parse error: ${String(e.message||e)}`]}, file?.name||'uploaded file');
    }
  });
})();
