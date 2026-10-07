export type DataSchema =
  | { type: "string" }
  | { type: "integer" }
  | { type: "number" }
  | { type: "boolean" }
  | { type: "array"; items: DataSchema }
  | {
      type: "object";
      properties?: Record<string, DataSchema>;
      required?: string[];
    };

export type PayloadCodec = "json" | "messagepack";

export type OperationBinding = {
  type: "http";
  method: "GET" | "POST";
  path: string;
  codecs: PayloadCodec[];
};

export type OperationContract = {
  id: string;
  description?: string;
  input: DataSchema | null;
  output: DataSchema | null;
  binding: OperationBinding;
};

export type ModuleDescriptor = {
  id: string;
  name: string;
  description?: string;
  version: string;
  healthOperation?: string;
  operations: OperationContract[];
};
