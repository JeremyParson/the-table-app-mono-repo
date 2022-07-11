import { detailHandout, indexHandouts, createHandout, deleteHandout, updateHandout } from "../Data/handout/DataStore";
import { createCampaign, deleteCampaign } from "../Data/campaign/DataStore";
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

  let handout: Handout;
  let campaign: Campaign;

  const EMAIL = "johndoe@gmail.com";
  const USERNAME = "FooBar";
  const PASSWORD = "HelloWorld";

  const EMAIL_2 = "Jenny@gmail.com";
  const USERNAME_2 = "Doodles";
  const PASSWORD_2 = "HelloWorld";

  const TITLE = "My First Adventure!";
  const PORTRAIT = "https://static.dw.com/image/55401238_101.jpg";
  const DESCRIPTION = "This is my first adventure on The Table App!";
  const IS_PUBLIC = true;

  const handoutData = {
    name: 'Map of the sword coast',
    description: 'A worn piece of parchment presenting an aged inky image of the sword coast.'
  }

  beforeEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    handout = await createHandout(campaign._id, handoutData.name, '', handoutData.description, '');
    logoutUser();
  });

  // log the user out after each test
  afterEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    await deleteHandout(handout._id);
    logoutUser();
  });

  // Create a test user
  beforeAll(async () => {
    user = await createUser(EMAIL, USERNAME, PASSWORD);
    user2 = await createUser(EMAIL_2, USERNAME_2, PASSWORD_2);
    Object.defineProperty(window, "localStorage", {
      value: new LocalStorageMock(),
    });
    await authenticateUser(EMAIL, PASSWORD);
    campaign = await createCampaign(TITLE, PORTRAIT, DESCRIPTION, IS_PUBLIC);
});

  // Delete the user after
  afterAll(async () => {
    await authenticateUser("jsbparson@gmail.com", "qwerty132");
    await deleteCampaign(campaign._id);
    if (user) {
      await deleteUser(user._id);
    }

    if (user2) {
      await deleteUser(user2._id);
    }
  });

  it("lists all handouts", async () => {
    const handouts = await indexHandouts();
    expect(handouts).toBeTruthy();
    expect(handouts?.error).toBeFalsy();
  });

  it("details a handout", async () => {
    const handoutDetail = await detailHandout(handout._id);
    expect(handoutDetail).toBeTruthy();
    expect(handoutDetail?.name).toBeTruthy();
    expect(handoutDetail?.error).toBeFalsy();
  });

  it("creates a new handout and deletes a handout if logged in", async () => {
    const handoutDetail = await detailHandout(handout._id);
    expect(handoutDetail?.name).toBeTruthy();
    await authenticateUser(EMAIL, PASSWORD);
    const status = await deleteHandout(handout._id);
    expect(status?.message).toBeTruthy();
  });

  it("Does not create a new handout if not logged in", async () => {
    const handout = await createHandout(campaign._id, handoutData.name, '', handoutData.description, '');
    expect(handout?.error).toBeTruthy();
  });

  it("does not delete a handout if not logged in", async () => {
    const status = await deleteHandout(handout._id);
    expect(status?.error).toBeTruthy();
  });

  it("does not delete a handout that does not belong to the current user", async () => {
    await authenticateUser(EMAIL_2, PASSWORD_2);
    const status = await deleteHandout(handout._id);
    expect(status?.error).toBeTruthy();
  });

//   it("updates a handout when logged in", async () => {
//     await authenticateUser(EMAIL, PASSWORD);
//     const updatedhandout = await updateHandout(handout._id, {
//       name: "Old Map",
//     });
//     expect(updatedhandout.name).toBe("Old Map");
//   });

//   it("does not update a handout if not logged in", async () => {
//     const status = await updateHandout(handout._id, {
//       name: "Old Map",
//     });
//     expect(status?.error).toBeTruthy();
//     console.log(status)
//   });

//   it("does not update a handout that does not belong to the current user", async () => {
//     await authenticateUser(EMAIL_2, PASSWORD_2);
//     const status = await updateHandout(handout._id, {
//       name: "Old Map",
//     });
//     expect(status?.error).toBeTruthy();
//   });
});
