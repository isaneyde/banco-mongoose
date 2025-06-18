interface Appointment {
  name: string;
  service: string;
  branchId: string;
}
export const scheduleAppointment = async (data: Appointment): Promise<void> => {
  const res = await fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao agendar atendimento.");
  }
};
