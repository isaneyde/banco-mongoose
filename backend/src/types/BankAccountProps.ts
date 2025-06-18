export type BankAccountProps = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  identityNumber: string;
  accountType: "poupança" | "corrente" | "salário";
  initialDeposit: number;
  createdAt: Date;
};
