interface Keys {
  PORT: string | number;
  MONGODB_URI: string;
  LOGS_MONGO_URI: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  RESET_PASSWORD_TOKEN_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  COINBASE_API_KEY: string;
  COINBASE_API_SECRET: string;
}

const defaults: Keys = {
  PORT: process.env.PORT! || 4000,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
  RESET_PASSWORD_TOKEN_SECRET: process.env.RESET_PASSWORD_TOKEN_SECRET!,
  MONGODB_URI: process.env.MONGODB_URI!,
  LOGS_MONGO_URI: process.env.LOGS_MONGO_URI!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  COINBASE_API_KEY: process.env.COINBASE_API_KEY!,
  COINBASE_API_SECRET: process.env.COINBASE_API_SECRET!,
};

const ciKeys: Keys = {
  ...defaults,
  MONGODB_URI: "mongodb://127.0.0.1:27017/ci_database",
};

let keys: Keys = {
  ...defaults,
};

switch (process.env.NODE_ENV) {
  case "ci":
    keys = ciKeys;
    break;
  default:
    keys;
    break;
}

export default keys;
