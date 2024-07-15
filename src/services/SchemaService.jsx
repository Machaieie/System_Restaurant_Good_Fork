import * as yup from "yup"

const REQUIRED_FIELD_MESSAGE = "Campo obrigatório";
const INVALID_PASSWORD_MESSAGE = "A senha deve conter letras e numeros";

const loginRules = yup.object({
    password: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE),
  
    username: yup.string().required(REQUIRED_FIELD_MESSAGE)
  });
  const ReservationSchema = yup.object({
    date: yup.date().required(REQUIRED_FIELD_MESSAGE).typeError("Data inválida"),
    time: yup.string().required(REQUIRED_FIELD_MESSAGE),
    numberPeople: yup
      .number()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(1, "Deve ser pelo menos 1 pessoa")
      .typeError("Número inválido"),
    observations: yup.string(),
    firstName: yup.string().required(REQUIRED_FIELD_MESSAGE),
    lastName: yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: yup.string().email("Email inválido").required(REQUIRED_FIELD_MESSAGE),
    phone: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .matches(/^(82|83|84|85|86|87)\d{7}$/, "Número de telefone inválido. Deve ter 9 dígitos e começar com 82, 83, 84, 85, 86 ou 87"),
  });
  

  export {
    loginRules,
    ReservationSchema
  }