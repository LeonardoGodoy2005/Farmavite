// auth.js - cadastro e login simples usando localStorage
function saveUser(user){ localStorage.setItem('fv_user', JSON.stringify(user)); }
function getUser(){ return JSON.parse(localStorage.getItem('fv_user')||'null'); }

const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = registerForm.querySelector('input[type=text]').value;
    const email = registerForm.querySelector('input[type=email]').value;
    const password = registerForm.querySelector('input[type=password]').value;
    saveUser({name,email,password,role:'client'});
    alert('Cadastro realizado com sucesso');
    window.location.href = 'login.html';
  });
}

const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = loginForm.querySelector('input[type=email]').value;
    const password = loginForm.querySelector('input[type=password]').value;
    const u = getUser();
    if(u && u.email===email && u.password===password){
      localStorage.setItem('fv_logged', JSON.stringify(u));
      alert('Login realizado');
      window.location.href = 'index.html';
    } else {
      alert('Credenciais inválidas');
    }
  });
}
