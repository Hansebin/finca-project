const isValidName = (name: string) => {
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
  return regex.test(name);
};

const isValidAccountNumber = (accountNumber: string) => {
  const regex = /^\d{12}$/;
  return regex.test(accountNumber);
};

const isValidBankingNumber = (bankingNumber: string) => {
  const regex = /^\d{6}$/;
  return regex.test(bankingNumber);
};

const isValidEmail = (id: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(id);
};

const isValidPassword = (password: string) => {
  const regex = /^[\d\W]+$/;
  return regex.test(password);
};

export {
  isValidName,
  isValidAccountNumber,
  isValidBankingNumber,
  isValidEmail,
  isValidPassword,
};
