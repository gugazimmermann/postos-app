const cpf = (value) => {
  return value
    .substring(0, 14)
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2");
};

const masks = { cpf };

const utils = { masks };

export default utils;
