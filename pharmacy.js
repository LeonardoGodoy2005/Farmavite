// pharmacy.js - estoque simples e pedidos
let pharmacyProducts = JSON.parse(localStorage.getItem('fv_pharmacy_products')||'[{"name":"Paracetamol 500mg","stock":50},{"name":"Dipirona 1g","stock":40}]');
const phProductsEl = document.getElementById('pharmacy-products');

function renderPharmacy(){
  if(!phProductsEl) return;
  phProductsEl.innerHTML = '';
  pharmacyProducts.forEach((p,idx)=>{
    const li = document.createElement('li');
    li.textContent = `${p.name} - Estoque: ${p.stock}`;
    const btn = document.createElement('button');
    btn.textContent = 'Remover 1';
    btn.onclick = ()=>{ changeStock(idx, -1); };
    li.appendChild(btn);
    phProductsEl.appendChild(li);
  });
}

function changeStock(idx, delta){
  pharmacyProducts[idx].stock += delta;
  localStorage.setItem('fv_pharmacy_products', JSON.stringify(pharmacyProducts));
  renderPharmacy();
}

function addProduct(){
  const name = prompt('Nome do produto:');
  const stock = parseInt(prompt('Quantidade:'),10) || 0;
  pharmacyProducts.push({name,stock});
  localStorage.setItem('fv_pharmacy_products', JSON.stringify(pharmacyProducts));
  renderPharmacy();
}

document.addEventListener('DOMContentLoaded', renderPharmacy);
