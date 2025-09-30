// main.js - popula a lista de produtos e adiciona ao carrinho
const products = [
  { id:1, name: "Paracetamol 500mg", price: 10, img: "assets/img/screenshot1.png" },
  { id:2, name: "Dipirona 1g", price: 8, img: "assets/img/screenshot2.png" },
  { id:3, name: "Ibuprofeno 600mg", price: 15, img: "assets/img/screenshot3.png" }
];

function renderProducts(){
  const el = document.getElementById('products-list');
  if(!el) return;
  el.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"/><h3>${p.name}</h3><p>R$ ${p.price.toFixed(2)}</p><button onclick="addToCart(${p.id})">Adicionar</button>`;
    el.appendChild(div);
  });
}

let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function addToCart(id){
  const prod = products.find(p=>p.id===id);
  if(!prod) return alert('Produto não encontrado');
  cart.push({id:prod.id,name:prod.name,price:prod.price});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(prod.name + ' adicionado ao carrinho');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
});
