function isRequired(valor, nomeCampo) {
  if (valor === undefined || valor === null) {
    return `${nomeCampo} é obrigatório`;
  }
  if (typeof valor === "string" && valor.trim() === "") {
    return `${nomeCampo} não pode ser vazio`;
  }
  return null;
}

function isEmail(valor) {
  if (!valor) return null;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(valor)) {
    return "E-mail inválido";
  }

  return null;
}

function isPositiveInteger(valor, nomeCampo) {
  if (valor === undefined || valor === null) return null;

  if (!Number.isInteger(valor) || valor <= 0) {
    return `${nomeCampo} deve ser um número inteiro positivo`;
  }

  return null;
}

function minLength(valor, min, nomeCampo) {
  if (!valor) return null;

  if (typeof valor === "string" && valor.trim().length < min) {
    return `${nomeCampo} deve ter pelo menos ${min} caracteres`;
  }

  return null;
}

function validar(validacoes) {
  const erros = validacoes.filter((erro) => erro !== null);
  return erros.length > 0 ? erros : null;
}

module.exports = {
  isRequired,
  isEmail,
  isPositiveInteger,
  minLength,
  validar,
};