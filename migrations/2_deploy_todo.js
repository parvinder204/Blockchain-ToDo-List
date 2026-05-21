const TodoList = artifacts.require("TodoList");

module.exports = async function (deployer) {
  await deployer.deploy(TodoList);
  const todo = await TodoList.deployed();
  console.log("✅ TodoList contract deployed at:", todo.address);
  console.log("📋 Paste this address into frontend/.env.local");
};
