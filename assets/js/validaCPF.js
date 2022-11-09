//705.484.450-52
class ValidaCPF {
  constructor(cpf) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpf.replace(/\D+/g, ""), //representa tudo que não é um number
    });
  }

  sequencia() {
    //ou usar 11, que seria a mesma coisa
    return (
      this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    );
  }

  novoCPF() {
    const cpfParcial = this.cpfLimpo.slice(0, -2); //para retornar os 9 dígitos
    const digito1 = ValidaCPF.criaDigito(cpfParcial);
    const digito2 = ValidaCPF.criaDigito(cpfParcial + digito1);

    this.completoCPF = cpfParcial + digito1 + digito2;
  }

  valida() {
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length != 11) return false;
    if (this.sequencia()) return false;
    this.novoCPF();

    return this.completoCPF === this.cpfLimpo;
  }

  //como não se utiliza o this para se referir a propriedade ou instância da classe, pode ser um
  //método estático
  static criaDigito(parcialCPF) {
    const cpfArray = Array.from(parcialCPF);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((acc, value) => {
      acc += regressivo * Number(value);
      regressivo--;
      return acc;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }
}
