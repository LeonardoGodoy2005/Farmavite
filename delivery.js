// delivery.js - lista pedidos e upload de documentos
let deliveryOrders = JSON.parse(localStorage.getItem('orders')||'[]').filter(o=>o.status==='pendente');
const deliveryList = document.getElementById('delivery-orders');

function renderDelivery(){
  if(!deliveryList) return;
  deliveryList.innerHTML = '';
  deliveryOrders.forEach(o=>{
    const li = document.createElement('li');
    li.textContent = `Pedido ${o.id} - Total: R$ ${o.total.toFixed(2)} - ${o.address || ''}`;
    const btn = document.createElement('button');
    btn.textContent = 'Aceitar';
    btn.onclick = ()=>{ acceptOrder(o.id); };
    li.appendChild(btn);
    deliveryList.appendChild(li);
  });
}

function acceptOrder(id){
  let orders = JSON.parse(localStorage.getItem('orders')||'[]');
  const ord = orders.find(x=>x.id===id);
  if(ord){ ord.status = 'em entrega'; localStorage.setItem('orders', JSON.stringify(orders)); alert('Pedido aceito'); renderDelivery(); }
}

function uploadDoc(){
  const f = document.getElementById('docfile').files[0];
  if(!f) return alert('Escolha um arquivo');
  const reader = new FileReader();
  reader.onload = function(e){
    let deliverers = JSON.parse(localStorage.getItem('fv_deliverers')||'[]');
    deliverers.push({id:Date.now(),file:e.target.result, status:'pendente'});
    localStorage.setItem('fv_deliverers', JSON.stringify(deliverers));
    alert('Documento enviado para validação');
  };
  reader.readAsDataURL(f);
}

document.addEventListener('DOMContentLoaded', renderDelivery);
