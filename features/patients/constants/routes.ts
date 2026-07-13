
//this file prevents us from writing router.push(`/patients/${id}`) scattered everywhere.
// it makes the code more cleaner when writing something like router.push(patientRoutes.details(patient.id))
export const patientRoutes = {
    list: "/patients",
    register:"/patients/register",
    details:(id:string) => `/patients/${id}`,
    edit:(id:string) => `/patients/${id}/edit`,
}