const express = require("express");
const router = express.Router();
const db = require("../model/helper");

router.get("/", async (req, res) => {
  try {
    const result = await db("SELECT * from lists");
    const lists = result.data;

    res.send(lists);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db(`SELECT * from lists WHERE id = ${id}`);
    const lists = result.data;
    const list = lists[0];

    if (!list) {
      res.status(404).send();
      return;
    }
    const presentId = req.params.id;
    const presentResult = await db(
      `SELECT * from presents WHERE list_id = ${presentId};`
    );
    list.presents = presentResult.data;

    res.send(list);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

router.post("/create", async (req, res) => {
  console.log("Backend recebeu request");
  const owner = req.body.owner;
  const name = req.body.name; //name of the ocasion
  const addPerson = await db(
    `INSERT INTO lists (owner, name) VALUES ("${owner}", "${name}");`
  );
  //now I need to add the presents to the list

  const insertId = addPerson.insertId;
  const presentName = req.body.presentName;
  const url = req.body.url;
  await db(
    `INSERT INTO presents (name, url, list_id) VALUES ("${presentName}", "${url}", ${insertId});`
  );
  res.send({ listId: insertId });
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db(`delete from presents where list_id = ${id}`);
    await db(`delete from lists where id = ${id}`);
    
    res.send(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
