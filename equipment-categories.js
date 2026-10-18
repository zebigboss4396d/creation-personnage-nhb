export const EQUIPMENT_CATEGORIES=['Armes','Protections','Divers','Prêtres et Paladins','Mages et Sorciers'];
const sections={
 'Armes':['Lames courtes','Épées, rapières et sabres à une main','Épées à deux mains','Haches à une main','Haches à deux mains','Haches de jet','Marteaux et masses à une main','Marteaux à deux mains','Bâtons et gourdins ordinaires','Lances, piques et armes d’hast','Javelots','Arcs','Arbalètes','Armes à poudre','Armes bizarres','Munitions · Flèches','Munitions · Carreaux','Munitions · Autres projectiles','Munitions · Poudre et clous','Accessoires de tir'],
 'Protections':['Vestes renforcées et gambisons','Plastrons de cuir','Plastrons métalliques','Cottes de mailles','Protections des bras, mains et jambes','Casques et heaumes','Bottes et chaussures de protection','Armures complètes','Boucliers','Protections pour semi-hommes','Protections pour gnomes','Protections pour ogres'],
 'Divers':['Vêtements ordinaires','Sacs et contenants','Camping et couchage','Éclairage et feu','Outils et matériel d’aventure','Cuisine et vaisselle ordinaires','Nourriture et rations','Boissons','Hygiène et soins courants','Potions et onguents','Poisons et antidotes','Animaux et véhicules','Instruments · Instruments à cordes','Instruments · Instruments à vent','Instruments · Percussions','Livres ordinaires et connaissances','Objets enchantés utilisables par tous'],
 'Prêtres et Paladins':['Vêtements et protections sacerdotales','Chapeaux et couvre-chefs','Armes et bâtons de culte','Munitions bénies','Livres de prières et de prodiges','Reliques et objets de culte','Bagues, médaillons et accessoires divins','Équipement spécifique de Niourgl'],
 'Mages et Sorciers':['Robes et vêtements de mage','Chapeaux et couvre-chefs','Bâtons, crosses et armes de sorcier','Grimoires et livres de magie','Livres de potions, alchimie et invocation','Bagues et accessoires de pratique magique','Baguettes, parchemins et objets à charges','Ingrédients magiques · Première colonne','Matériel d’alchimie']
};
export function compareSections(category,a,b){
 const order=sections[category]||[],index=s=>{const i=order.indexOf(s);return i<0?order.length:i;};
 return index(a)-index(b)||a.localeCompare(b,'fr');
}
// Le rangement dans le catalogue est indépendant du rôle de l'objet sur la fiche PDF.
export function equipmentKind(item){
 if(item.kind)return item.kind;
 const section=item.section||'',category=item.category||'',name=item.name||'';
 if(/Munitions/.test(section))return 'munition';
 if(category==='Armes'||section.startsWith('Armes régionales')||category==='CAMHiF'&&/Dagues|Hachoirs|Poëles|Brochettes|Marteaux|Louches de combat/i.test(section))return 'weapon';
 if(category==='Protections'||category==='Fernol-Caladie'&&/Casques|Vestes|Robes|Étoles|Gantelets|Chaussant/i.test(section))return 'armor';
 if(/Nourriture|Denrées|Manger boire/.test(section+' '+item.source))return 'food';
 if(/Poisons/.test(section))return 'poison';
 if(/Potions/.test(section))return 'potion';
 if(/Livres|Grimoires|Recueil/.test(section+' '+name))return 'book';
 if(/Véhicules et animaux/.test(section))return 'mount';
 if(/Ingrédients/.test(section))return 'ingredient';
 if(/Sacs et transport/.test(section))return 'bag';
 return 'misc';
}
