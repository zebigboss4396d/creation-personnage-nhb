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
 return {id:`manuel-depart-${mage?'mage':'divin'}-${slug}`,name:mage?`Grimoire des Ordres Néfastes — ${profile.affiliation} — niveau 1`:`Prodiges des Novices de ${profile.affiliation} — niveaux 1 à 3`,pricePc:0,currency:'PO',kind:'book',category:mage?'Mages et Sorciers':'Prêtres et Paladins',section:mage?'Grimoire de spécialité · Niveau 1':'Prodiges des Novices · Niveaux 1 à 3',catalog:'standard',source:'Manuel de départ gratuit',notes:'Manuel nécessaire à l’apprentissage de votre spécialité ou de votre culte. Offert à la création, sans dépense du budget d’équipement.',unique:true};
}
export function catalogForProfile(items,profile){
 const tabs=equipmentTabs(profile),limit=equipmentPriceLimit(profile),moote=isMooteProfile(profile);
 const allowed=items.filter(item=>{
  if(item.starterAvailable===false||item.pricePc>limit)return false;
  if(/tzinntch/i.test(item.name||'')&&!isTzinntchMage(profile))return false;
  if(item.catalog==='camhif')return moote;
  // Les autres livres des rayons de magie et de culte ne sont pas proposés au départ.
  if(item.kind==='book'&&(item.categories||[item.category]).some(c=>['Mages et Sorciers','Prêtres et Paladins','NIOURGL'].includes(c)))return false;
  return (item.categories||[item.category]).some(category=>tabs.includes(category));
 });
 const manual=startingManual(profile);
 if(manual)allowed.push(manual);
 return allowed;
}
