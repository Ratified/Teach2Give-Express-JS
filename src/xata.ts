import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      {
        name: "displayName",
        type: "text",
      },
      {
        name: "username",
        type: "text",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        defaultValue: "now()",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        defaultValue: "now()",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        defaultValue: "0",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://RatifiedGeorge-s-workspace-bn1c1h.us-east-1.xata.sh/db/ratified",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH || 'main', 
  });

  return instance;
};