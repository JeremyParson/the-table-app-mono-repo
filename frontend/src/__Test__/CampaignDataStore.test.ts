import {
  indexCampaigns,
  createCampaign,
  detailCampaign,
  deleteCampaign,
  updateCampaign,
} from "../Data/campaign/DataStore";
import {
  authenticateUser,
  createUser,
  deleteUser,
  logoutUser,
} from "../Data/user/DataStore";
import { LocalStorageMock } from "./MockLocalStorage";

describe("Campaign data store", () => {
  let user: User;
  let user2: User;

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

  // Create a test user
  beforeAll(async () => {
    user = await createUser(EMAIL, USERNAME, PASSWORD);
    user2 = await createUser(EMAIL_2, USERNAME_2, PASSWORD_2);
    Object.defineProperty(window, "localStorage", {
      value: new LocalStorageMock(),
    });
  });

  beforeEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    campaign = await createCampaign(
      TITLE,
      PORTRAIT,
      DESCRIPTION,
      IS_PUBLIC
    );
    logoutUser();
  });

  // log the user out after each test
  afterEach(async () => {
    await authenticateUser(EMAIL, PASSWORD);
    await deleteCampaign(campaign._id);
    logoutUser();
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

  it("lists all campaigns", async () => {
    const campaigns = await indexCampaigns();
    expect(campaigns).toBeTruthy();
    expect(campaigns?.error).toBeFalsy();
  });

  it("details a campaign", async () => {
    const campaignDetail = await detailCampaign(campaign._id);
    expect(campaignDetail).toBeTruthy();
    expect(campaignDetail?.title).toBeTruthy();
    expect(campaignDetail?.error).toBeFalsy();
  });

  it("creates a new campaign and deletes a campaign if logged in", async () => {
    const campaignDetail = await detailCampaign(campaign._id);
    expect(campaignDetail?.title).toBeTruthy();
    await authenticateUser(EMAIL, PASSWORD);
    const status = await deleteCampaign(campaign._id);
    expect(status?.message).toBeTruthy();
  });

  it("Does not create a new campaign if not logged in", async () => {
    const campaign = await createCampaign(
      TITLE,
      PORTRAIT,
      DESCRIPTION,
      IS_PUBLIC
    );
    expect(campaign?.error).toBeTruthy();
  });

  it("does not delete a campaign if not logged in", async () => {
    const status = await deleteCampaign(campaign._id);
    expect(status?.error).toBeTruthy();
  });

  it("does not delete a campaign that does not belong to the current user", async () => {
    await authenticateUser(EMAIL_2, PASSWORD_2);
    const status = await deleteCampaign(campaign._id);
    expect(status?.error).toBeTruthy();
  });

  it("updates a campaign when logged in", async () => {
    await authenticateUser(EMAIL, PASSWORD);
    const updatedCampaign = await updateCampaign(campaign._id, {
      title: "Saga of the Storm Giants",
    });
    expect(updatedCampaign.title).toBe("Saga of the Storm Giants");
  });

  it("does not update a campaign if not logged in", async () => {
    const status = await updateCampaign(campaign._id, {
      title: "Saga of the Storm Giants",
    });
    expect(status?.error).toBeTruthy();
  });

  it("does not update a campaign that does not belong to the current user", async () => {
    await authenticateUser(EMAIL_2, PASSWORD_2);
    const status = await updateCampaign(campaign._id, {
      title: "Saga of the Storm Giants",
    });
    expect(status?.error).toBeTruthy();
  });
});
