export const shortenText = (text, n) => {
  if (text?.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};
// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
};
export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null; // Retorna null se o cookie não for encontrado
};
export function primeiroNome(nomeCompleto) {
  const palavras = nomeCompleto.split(" ");
  const primeiroNome = palavras[0];
  if (primeiroNome.length > 10) {
    return primeiroNome.slice(0, 10) + "...";
  } else {
    return primeiroNome;
  }
}
