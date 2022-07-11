import { detailCharacter, indexCharacter, createCharacter, deleteCharacter, updateCharacter } from "../Data/character/DataStore";
import {
  authenticateUser,
  createUser,
  deleteUser,
  logoutUser,
} from "../Data/user/DataStore";
import { LocalStorageMock } from "./MockLocalStorage";

describe("", () => {
  let user: User;
  let user2: User;

  let character: Character;

  const EMAIL = "johndoe@gmail.com";
  const USERNAME = "FooBar";
  const PASSWORD = "HelloWorld";

  const EMAIL_2 = "Jenny@gmail.com";
  const USERNAME_2 = "Doodles";
  const PASSWORD_2 = "HelloWorld";

  const characterData = {
    name: 'Gerald',
    level: 18,
    experience: 0,
    race: 'Human',
    classes: ['Fighter', 'Monk'],
    alignment: 'NG',
    inspiration: 2,
  }

  beforeEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    character = await createCharacter(characterData);
    logoutUser();
  });

  // log the user out after each test
  afterEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    await deleteCharacter(character._id);
    logoutUser();
  });

  // Create a test user
  beforeAll(async () => {
    user = await createUser(EMAIL, USERNAME, PASSWORD);
    user2 = await createUser(EMAIL_2, USERNAME_2, PASSWORD_2);
    Object.defineProperty(window, "localStorage", {
      value: new LocalStorageMock(),
    });
  });

  // Delete the user after
  afterAll(async () => {
    await authenticateUser("jsbparson@gmail.com", "qwerty132");
    if (user) {
      await deleteUser(user._id);
    }

    if (user2) {
      await deleteUser(user2._id);
    }
  });

  it("lists all characters", async () => {
    const characters = await indexCharacter();
    expect(characters).toBeTruthy();
    expect(characters?.error).toBeFalsy();
  });

  it("details a character", async () => {
    const characterDetail = await detailCharacter(character._id);
    expect(characterDetail).toBeTruthy();
    expect(characterDetail?.name).toBeTruthy();
    expect(characterDetail?.error).toBeFalsy();
  });

  it("creates a new character and deletes a character if logged in", async () => {
    const characterDetail = await detailCharacter(character._id);
    expect(characterDetail?.name).toBeTruthy();
    await authenticateUser(EMAIL, PASSWORD);
    const status = await deleteCharacter(character._id);
    expect(status?.message).toBeTruthy();
  });

  it("Does not create a new character if not logged in", async () => {
    const character = await createCharacter(characterData)
    expect(character?.error).toBeTruthy();
  });

  it("does not delete a character if not logged in", async () => {
    const status = await deleteCharacter(character._id);
    expect(status?.error).toBeTruthy();
  });

  it("does not delete a character that does not belong to the current user", async () => {
    await authenticateUser(EMAIL_2, PASSWORD_2);
    const status = await deleteCharacter(character._id);
    expect(status?.error).toBeTruthy();
  });

  it("updates a character when logged in", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const updatedCharacter = await updateCharacter(character._id, {
      name: "Jaimee",
    });
    expect(updatedCharacter.name).toBe("Jaimee");
  });

  it("does not update a character if not logged in", async () => {
    const status = await updateCharacter(character._id, {
      name: "Jaimee",
    });
    expect(status?.error).toBeTruthy();
  });

  it("does not update a character that does not belong to the current user", async () => {
    await authenticateUser(EMAIL_2, PASSWORD_2);
    const status = await updateCharacter(character._id, {
      name: "Jaimee",
    });
    expect(status?.error).toBeTruthy();
  });
});
