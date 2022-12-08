import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;
const database = await notion.databases.query({
  database_id: String(databaseId),
  filter: {
    property: "Status",
    select: {
      equals: "Fais",
    },
  },
});
// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });
const mdblocks = await n2m.pageToMarkdown(database.results[0].id);
const mdString = n2m.toMarkdownString(mdblocks);
console.log(mdString);
