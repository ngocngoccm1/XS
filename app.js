const categories = [
 {name:'Kunstnagels handen',dual:true,rows:[['Acryl naturel',42,32],['Solar naturel',47,37],['French tips, parelmoer tips',47,null],['Roze poeder',52,42],['Wit poeder v.a.',52,42],['Babyboom v.a.',57,47],['Witte rand',62,52],['Cateyes',58,48],['Nieuwe set acryl naturel incl. gellak',52,null],['Opvullen acryl naturel incl. gellak',42,null],['Nieuwe set acryl naturel incl. normale lak',47,null],['Opvullen acryl naturel incl. normale lak',37,null]]},
 {name:'BIAB',dual:true,rows:[['Naturel roze',49,44],['Naturel met gellak',54,49],['Naturel met gellak cateyes',59,54],['Witte rand',67,62]]},
 {name:'Manicure',rows:[['Spa manicure',20],['Manicure met normale lak',30],['Manicure met gellak',40],['Manicure met gellak witte rand, cat eyes',46]]},
 {name:'Pedicure',rows:[['Spa pedicure',37],['Pedicure met normale lak',44],['Pedicure met gellak',50],['Pedicure met gellak witte rand, cat eyes',55]]},
 {name:'Kunstnagels voeten',rows:[['Nieuwe set acryl teennagels naturel v.a.',52],['Nieuwe set acryl teennagels met gellak',62],['Nieuwe set teennagel roze poeder',62],['Nieuwe set teennagels en witte rand',72]]},
 {name:'Lakken',rows:[['Normale lak handen',17],['Normale lak voeten',17],['Gellak',25],['Gellak, Hard Base (stevige nagel)',30],['Gellak witte rand, cat eyes',30]]},
 {name:'Divers & nail art',rows:[['BIAB, gel poeder, acryl verwijderen',15],['Gellak verwijderen',10],['Reparatie (per nagel)',5],['Nail art (per nagel) v.a.',2.5],['Steentjes per stuk v.a.',.5]]}
];
const priceNav=document.querySelector('.price-nav');
const panel=document.querySelector('#price-panel');
const money=v=>v===null?'–':'€'+new Intl.NumberFormat('nl-NL',{minimumFractionDigits:Number.isInteger(v)?0:2,maximumFractionDigits:2}).format(v);
categories.forEach((category,i)=>{const button=document.createElement('button');button.type='button';button.id='category-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls','price-panel');button.textContent=category.name;const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');button.append(arrow);button.addEventListener('click',()=>showCategory(i));priceNav.append(button);});
function showCategory(i){const category=categories[i];priceNav.querySelectorAll('button').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});panel.setAttribute('aria-labelledby','category-'+i);panel.innerHTML=`<h3>${category.name}</h3><table><caption class="sr-only">Prijzen ${category.name}, geldig vanaf 1 juli 2026</caption><thead><tr><th scope="col">Behandeling</th><th scope="col">${category.dual?'Nieuwe set':'Prijs'}</th>${category.dual?'<th scope="col">Opvullen</th>':''}</tr></thead><tbody>${category.rows.map(row=>`<tr><td>${row[0]}</td><td>${money(row[1])}</td>${category.dual?`<td>${money(row[2])}</td>`:''}</tr>`).join('')}</tbody></table>`;}
showCategory(0);
priceNav.addEventListener('keydown',event=>{const current=[...priceNav.children].indexOf(document.activeElement);let next=current;if(['ArrowDown','ArrowRight'].includes(event.key))next=(current+1)%categories.length;else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(current+categories.length-1)%categories.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=categories.length-1;else return;event.preventDefault();showCategory(next);priceNav.children[next].focus();});
document.querySelectorAll('[data-category]').forEach(a=>a.addEventListener('click',()=>showCategory(Number(a.dataset.category))));
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Menu openen');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menu sluiten':'Menu openen');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
