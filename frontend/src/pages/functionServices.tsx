// import { ListaAgencias } from "@/components/listaAgencia";
// import { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { HandCoins, Handshake, RefreshCcw, PiggyBank } from "lucide-react";

// //card Deposite
// export const DepositoCard = () => {
//   const [agenciaSelecionada, setAgenciaSelecionada] = useState<string | null>(
//     null
//   );
//   const handleOperacao = (tipo: string) => {
//     console.log(`Operação: ${tipo}, Agência: ${agenciaSelecionada}`);
//     // assunto fila
//   };

//   return (
//     <Card className="shadow-md">
//       <CardHeader className="flex items-center gap-2">
//         <PiggyBank className="text-blue-600 w-6 h-6" />
//         <CardTitle className="text-base">Depósitos</CardTitle>
//       </CardHeader>
//       <CardContent className="text-sm text-gray-600 flex flex-col gap-3">
//         <p>
//           Gerencie seus depósitos diários com facilidade. Transferências,
//           extratos e mais.
//         </p>

//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="outline" className="w-fit">
//               Depositar
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Escolha o local de depósito</AlertDialogTitle>
//               <AlertDialogDescription>
//                 agencias mas proximas.
//               </AlertDialogDescription>
//             </AlertDialogHeader>

//             <ListaAgencias onSelect={setAgenciaSelecionada} />
//             <AlertDialogFooter>
//               <Button
//                 onClick={() => handleOperacao("Numerário")}
//                 disabled={!agenciaSelecionada}
//               >
//                 NUMERÁRIO
//               </Button>
//               <Button
//                 onClick={() => handleOperacao("Cheque")}
//                 disabled={!agenciaSelecionada}
//               >
//                 CHEQUE
//               </Button>
//               <AlertDialogCancel>Fechar</AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>
//   );
// };

// // Card: Levantamentos
// export const LevantamentoCard = () => {
//   const [agenciaSelecionada, setAgenciaSelecionada] = useState<string | null>(null);

//   const handleOperacao = (tipo: string) => {
//     console.log(`Levantamento: ${tipo}, Agência: ${agenciaSelecionada}`);
//     // Aqui pode redirecionar, abrir outro modal ou chamar API
//   };

//   return (
//     <Card className="shadow-md">
//       <CardHeader className="flex items-center gap-2">
//         <HandCoins className="text-purple-600 w-6 h-6" />
//         <CardTitle className="text-base">Levantamentos</CardTitle>
//       </CardHeader>

//       <CardContent className="text-sm text-gray-600 flex flex-col gap-3">
//         <p>Limites personalizados, controle pelo app e fatura digital.</p>

//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="outline" className="w-fit">
//               Levantar
//             </Button>
//           </AlertDialogTrigger>

//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Escolha o local do levantamento</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Selecione a agência onde deseja levantar o valor.
//               </AlertDialogDescription>
//             </AlertDialogHeader>

//             {/* Lista de agências com callback */}
//             <ListaAgencias onSelect={setAgenciaSelecionada} />

//             <AlertDialogFooter>
//               <Button
//                 onClick={() => handleOperacao("Numerário")}
//                 disabled={!agenciaSelecionada}
//               >
//                 NUMERÁRIO
//               </Button>
//               <Button
//                 onClick={() => handleOperacao("Cheque")}
//                 disabled={!agenciaSelecionada}
//               >
//                 CHEQUE
//               </Button>
//               <AlertDialogCancel>Fechar</AlertDialogCancel>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </CardContent>
//     </Card>
//   );
// };

// // Card: Atualizar Dados
// export const AtualizacaoCard = () => (
//   <Card className="shadow-md">
//     <CardHeader className="flex items-center gap-2">
//       <RefreshCcw className="text-gray-600 w-6 h-6" />
//       <CardTitle className="text-base">Atualizar Dados</CardTitle>
//     </CardHeader>
//     <CardContent className="text-sm text-gray-600 flex flex-col gap-3">
//       <p>Proteção de dados, autenticação 2FA e suporte 24h para sua conta.</p>

//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button variant="outline" className="w-fit">
//             Atualizar Agora
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Atualizar Informações?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Deseja atualizar seus dados bancários agora?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancelar</AlertDialogCancel>
//             <AlertDialogAction>Atualizar</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </CardContent>
//   </Card>
// );
