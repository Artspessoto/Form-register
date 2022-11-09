class ValidForm {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.events();
  }

  events() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //checar se os campos estão vazios
    const validFields = this.checkFields();
    const validPass = this.checkPassword();

    if(validFields && validPass){
      alert('Formulário enviado!');
      this.formulario.submit();
    }
  }

  checkPassword(){
    let valid = true;

    const pass = this.formulario.querySelector('.senha');
    const repeatPass = this.formulario.querySelector('.repetir-senha');

    //senha e repetir senha sendo iguais
    if(pass.value !== repeatPass.value){
      valid = false;
      this.createError(pass, 'As senhas não coincidem!');
      this.createError(repeatPass, 'As senhas não coincidem!');
      console.log(pass.value, repeatPass.value)
    }

    ///quantidade de caracteres esperados da senha
    if(pass.value.length < 6 || pass.value.length > 12){
      valid = false;
      this.createError(pass, 'Senha precisa ter entre 6 e 12 caracteres!')
    }
    return valid;
  }

  checkFields() {
    let valid = true; //assumindo que os campos já são válidos

    //para não exibir mais de 1x o erro na tela
    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove(); //assim, no momento do envio do formulário, é limpado os erros exibidos
    }

    //olhar cada campo e capturar os inputs
    for (let field of this.formulario.querySelectorAll(".validar")) {
      const label = field.previousElementSibling.innerText; //elemento anterior e irmão do input(campo)
      //a ideia é capturar o irmão do input, para colocar ele na msg de erro
      if (!field.value) {
        this.createError(field, `Campo ${label} não pode estar em branco`);
        valid = false;
      }

      //validação do CPF
      if (field.classList.contains("cpf")) {
        if (!this.validCPF(field)) valid = false;
      }

      //validação do usuário
      if (field.classList.contains("usuario")) {
        if (!this.validUser(field)) valid = false;
      }
    }

    return valid;
  }

  //tratamento de entrada para nome de usuário
  validUser(field){
     const user = field.value;
     let valid = true;

     if(user.length < 3 || user.length > 12) {
      this.createError(field, 'Nome de usuário precisa ter entre 3 e 12 caracteres');
      valid = false;
     }
    
     //se o nome do usuário não conter letras e números, ele recebe um aviso 
     if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números!');
      console.log(user);
      valid = false;
     }

    return valid;
  }

  //tratamento para validação de CPF do usuário
  validCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if (!cpf.valida()) {
      this.createError(field, "CPF inválido!");
      return false;
    } 
    
    return true;
  }

  createError(field, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    field.insertAdjacentElement("afterend", div);
  }
}

const form = new ValidForm();
