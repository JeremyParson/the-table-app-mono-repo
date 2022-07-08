export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
    }
  }

  namespace Express {
    export interface Request {
      currentUser: User;
    }

    type User = {
      role: String;
      _id: import("mongoose").Types.ObjectId;
    };
  }
}
