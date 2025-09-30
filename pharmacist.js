// pharmacist.js - salvar prescrições rapidamente
const prescForm = document.getElementById('prescForm');
if(prescForm){
  prescForm.addEventListener('submit', e=>{
    e.preventDefault();
    const client = prescForm.querySelector('input').value;
    const text = prescForm.querySelector('textarea').value;
    let prescs = JSON.parse(localStorage.getItem('fv_prescriptions')||'[]');
    prescs.push({id:Date.now(),client,text,created:new Date().toISOString()});
    localStorage.setItem('fv_prescriptions', JSON.stringify(prescs));
    alert('Prescrição salva');
  });
}
