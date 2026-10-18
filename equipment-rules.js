import {MAGIC_DISCIPLINES,PRIEST_DEITIES,PALADIN_DEITIES} from './affiliations.js';
export const MOOTE_PROFILES=['Semi-homme de la Loi','Mage culinaire hobbit','Paladin semi-homme de Picrate','Paladin semi-homme de Jord’hun'];
export const isMooteProfile=profile=>MOOTE_PROFILES.includes(profile.origin)||MOOTE_PROFILES.includes(profile.job);
export const equipmentPriceLimit=profile=>profile.job==='Bourgeois / Noble'?36000:20000;
const normalized=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const servesNiourgl=profile=>['Prêtre','Paladin'].includes(profile.job)&&normalized(profile.affiliation).trim()==='niourgl';
export const isTzinntchMage=profile=>profile.job==='Mage / Sorcier'&&normalized(profile.affiliation).trim()==='magie noire de tzinntch';
export function equipmentTabs(profile){
 const tabs=['Armes','Protections','Divers'];
 if(['Prêtre','Paladin'].includes(profile.job))tabs.push('Prêtres et Paladins');
 if(profile.job==='Mage / Sorcier')tabs.push('Mages et Sorciers');
 if(servesNiourgl(profile))tabs.push('NIOURGL');
 if(isMooteProfile(profile))tabs.push('CAMHiF');
 return tabs;
}
export function startingManual(profile){
 if(isMooteProfile(profile)||!profile.affiliation)return null;
 const mage=profile.job==='Mage / Sorcier',divine=['Prêtre','Paladin'].includes(profile.job);
 if(!mage&&!divine)return null;
 const choices=mage?MAGIC_DISCIPLINES:profile.job==='Prêtre'?PRIEST_DEITIES:PALADIN_DEITIES;
 if(!choices.some(choice=>normalized(choice.name).trim()===normalized(profile.affiliation).trim()))return null;
 const slug=normalized(profile.affiliation).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 return {id:`manuel-depart-${mage?'mage':'divin'}-${slug}`,name:mage?`Grimoire des Ordres Néfastes — ${profile.affiliation} — niveau 1`:`Prodiges des Novices de ${profile.affiliation} — niveaux 1 à 3`,pricePc:0,currency:'PO',kind:'book',category:mage?'Mages et Sorciers':'Prêtres et Paladins',section:mage?'Livres de sorcellerie':'Livre du culte',catalog:'standard',source:'Manuel de départ gratuit',notes:'Manuel nécessaire à l’apprentissage de votre spécialité ou de votre culte. Offert à la création, sans dépense du budget d’équipement.',unique:true};
}
export function catalogForProfile(items,profile){
 const tabs=equipmentTabs(profile),limit=equipmentPriceLimit(profile),moote=isMooteProfile(profile);
 const allowed=items.filter(item=>{
  if(item.starterAvailable===false||item.pricePc>limit)return false;
  if(item.section==='Livres ordinaires et connaissances')return false;
  if(['Reliques et objets de culte','Bagues, médaillons et accessoires divins'].includes(item.section))return false;
  if(/tzinntch/i.test(item.name||'')&&!isTzinntchMage(profile))return false;
  if(item.catalog==='camhif')return moote;
  // Les autres livres des rayons de magie et de culte ne sont pas proposés au départ.
  if(item.kind==='book'&&(item.categories||[item.category]).some(c=>['Mages et Sorciers','Prêtres et Paladins','NIOURGL'].includes(c)))return false;
  return (item.categories||[item.category]).some(category=>tabs.includes(category));
 });
 const manual=startingManual(profile);
 if(manual)allowed.push(manual);
 return allowed.map(item=>item.kind==='armor'&&item.pr==null?{...item,pr:0}:item);
}

export function weaponForms(item){
 const name=item?.name||'';
 if(/^Épée, rapière, sabre 1 main\b/.test(name))return ['Épée','Sabre','Rapière'];
 if(/^Marteau, masse\b/.test(name))return ['Marteau','Masse'];
 return [];
}
export function resolveEquipmentItem(saved,catalog){
 const base=catalog.get(saved.baseId||saved.id);if(!base)return null;
 if(saved.baseId&&weaponForms(base).includes(saved.weaponForm))return {...base,id:saved.id,baseId:base.id,weaponForm:saved.weaponForm,name:weaponChoiceName(base,saved.weaponForm)};
 return {...saved,...base};
}
export function weaponChoiceName(base,form){
 if(!weaponForms(base).includes(form))return base.name;
 if(/^Marteau, masse d.artisan nain/.test(base.name))return base.name.replace(/^Marteau, masse/,form);
 const quality=base.name.replace(/^(?:Épée, rapière, sabre|Marteau, masse) 1 main\s*/, '');
 const suffix=quality==='correcte'?'de qualité correcte':quality==='bonne qualité'?'de bonne qualité':quality;
 return form+' à une main '+suffix;
}
