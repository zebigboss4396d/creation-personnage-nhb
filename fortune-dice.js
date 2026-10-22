export function fortuneSetup(profile,tirelaine=false){
 const fixedGold=profile.origin==='Semi-homme de la Loi'?300:null;
 const noble=profile.job==='Bourgeois / Noble';
 const goldDice=fixedGold!==null?[]:[6,6,...(noble?[6,6]:[]),...(tirelaine?[20]:[])];
 return {fixedGold,noble,tirelaine:fixedGold===null&&tirelaine,goldDice,signature:JSON.stringify([fixedGold,goldDice])};
}
const face=(value,sides)=>Number.isInteger(value)&&value>=1&&value<=sides?value:null;
export function syncFortuneDice(saved,setup){
 const old=saved?.version===1?saved:null;
 return {version:1,gold:{signature:setup.signature,values:setup.goldDice.map((sides,i)=>old?.gold?.signature===setup.signature?face(old.gold.values?.[i],sides):null)},destiny:{values:[face(old?.destiny?.values?.[0],4)]}};
}
export function fortuneTotal(state,setup,kind){
 if(kind==='destiny')return face(state?.destiny?.values?.[0],4)?state.destiny.values[0]-1:null;
 if(setup.fixedGold!==null)return setup.fixedGold;
 const values=state?.gold?.values;
 if(!values||values.length!==setup.goldDice.length||values.some((v,i)=>!face(v,setup.goldDice[i])))return null;
 return values.reduce((sum,value,i)=>sum+value*(setup.goldDice[i]===6?10:1),0);
}
export function recordFortuneDie(state,setup,kind,index,value){
 const sides=kind==='gold'?setup.goldDice:kind==='destiny'?[4]:[];
 if(!Number.isInteger(index)||index<0||index>=sides.length)throw Error('Dé de fortune indisponible.');
 const slot=state[kind].values;
 if(slot[index]!==null)return {status:'locked'};
 if(!face(value,sides[index]))throw Error('Résultat de dé invalide.');
 slot[index]=value;return {status:'accepted',total:fortuneTotal(state,setup,kind)};
}
export function fortuneFormula(state,setup,kind){
 const total=fortuneTotal(state,setup,kind);if(total===null)return '';
 if(kind==='destiny')return `${state.destiny.values[0]} − 1 = ${total} PD`;
 if(setup.fixedGold!==null)return `${total} PO de départ selon votre profil`;
 const dice=state.gold.values,base=dice.slice(0,setup.noble?4:2);
 return `(${base.join(' + ')}) × 10${setup.tirelaine?' + '+dice.at(-1)+' (Tire-laine)':''} = ${total} PO`;
}
