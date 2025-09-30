// cart.js - renderiza e gerencia o carrinho
let cart = JSON.parse(localStorage.getItem('cart')||'[]');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

function renderCart(){
  if(!cartItemsEl) return;
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} `;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = ()=>{ removeFromCart(idx); };
    li.appendChild(btn);
    cartItemsEl.appendChild(li);
  });
  cartTotalEl.textContent = total.toFixed(2);
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

const checkoutForm = document.getElementById('checkout-form');
if(checkoutForm){
  checkoutForm.addEventListener('submit', function(e){
    e.preventDefault();
    const addr = document.getElementById('addr').value || 'Não informado';
    const pm = document.getElementById('pm').value || 'Não informado';
    const order = { id: Date.now(), items: cart, total: cart.reduce((s,i)=>s+i.price,0), address: addr, payment: pm, status: 'pendente' };
    let orders = JSON.parse(localStorage.getItem('orders')||'[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Pedido confirmado!');
    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', renderCart);
