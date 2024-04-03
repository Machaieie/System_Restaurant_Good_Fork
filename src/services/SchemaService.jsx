import * as yup from "yup"

const REQUIRED_FIELD_MESSAGE = "Campo obrigatório";
const INVALID_PASSWORD_MESSAGE = "A senha deve conter letras e numeros";

const loginRules = yup.object({
    password: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE),
  
    username: yup.string().required(REQUIRED_FIELD_MESSAGE)
  });

  export {
    loginRules,
  }