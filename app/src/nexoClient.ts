import { createClient } from "./libs/nexo/clientApp";

const nexo = createClient({
  clientId: "123",
  log: true,
});

export default nexo;
