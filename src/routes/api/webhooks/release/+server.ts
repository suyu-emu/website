import { json } from "$lib/server/util/index.js";
import { createHmac } from "crypto";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export interface Release {
  id: number;
  created_at: string;
  description: string;
  name: string;
  released_at: string;
  tag: string;
  object_kind: string;
  project: Project;
  url: string;
  action: string;
  assets: Assets;
  commit: Commit;
}

export interface Assets {
  count: number;
  links: Array<(string | null)[]>;
  sources: Array<(string | null)[]>;
}

export interface Commit {
  id: string;
  message: string;
  title: string;
  timestamp: Date;
  url: string;
  author: Author;
}

export interface Author {
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: null;
  web_url: string;
  avatar_url: null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export async function POST({ request }) {
  const body = await request.text();
  const headers = request.headers;

  const signature = headers.get("X-Hub-Signature-256");
  const computedSignature = `sha256=${createHmac("sha256", GITHUB_TOKEN!)
    .update(body)
    .digest("hex")}`;

  if (signature !== computedSignature) {
    return json({
      success: false,
      message: "Invalid signature!",
    });
  }

  return json({ success: true, message: "Webhook verified successfully!" });
}
