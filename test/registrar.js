const Registrar = artifacts.require("Registrar");

contract("Registrar", (accounts) => {
  let registrar;

  before("gets deployed instance", async () => {
    registrar = await Registrar.deployed();
  });

  it("sets and retrieves correctly", async () => {
    let registry = "set-test";

    const key = "current-location";
    const whereAmI = "DappCon Berlin 2018";

    await registrar.set(registry, key, whereAmI);

    let record = await registrar.get(registry, key);

    assert.equal(record.value, whereAmI);
    assert.equal(record.createdAt, record.updatedAt);
  });

  it("fails to get a non-existent key", async () => {
    let registry = "get-test";

    try {
      let record = await registrar.get(registry, "fake-key");
      assert.ok(false, "Non-existent key should throw error");
    } catch (e) {
      // expected error
    }
  });

  it("lists registry keys", async () => {
    let registry = "list-test";

    await registrar.set(registry, "current-location", "dappcon");
    await registrar.set(registry, "is-berlin-cool", "jawohl!");

    let num = await registrar.size(registry);
    let keys = [];
    for (var i = 0; i < num; i++) {
      keys.push(await registrar.list(registry, i));
    }

    assert.deepEqual(keys, ["current-location", "is-berlin-cool"]);
  });

  it("first account to set a record for a particular registry becomes the owner", async () => {
    let registry = "set-owner2";

    let owner = await registrar.getOwner(registry);
    assert.equal(owner, '0x0000000000000000000000000000000000000000');
    
    const { tx } = await registrar.set(registry, "first-record", "dappcon");
    console.log('set tx', tx)

    owner = await registrar.getOwner(registry);
    assert.equal(owner, accounts[0]);
  });
});
