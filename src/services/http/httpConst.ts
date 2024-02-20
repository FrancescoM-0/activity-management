const ip: string = "http://127.0.0.1";
const port: string = "4000";

const address: string = ip + ":" + port;

const addressTasks: string = address + "/tasks";
const addressUsers: string = address + "/users";

export { addressTasks, addressUsers };
