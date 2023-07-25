import { Document } from "langchain/document";
import { BaseDocumentLoader } from "langchain/document_loaders/base";
import type { readFile as ReadFileT } from "node:fs/promises";
import { simpleParser } from "mailparser"

export class EmailLoader extends BaseDocumentLoader {
    constructor(public filePathOrBlob: string | Blob) {
        super();
    }

    protected async parse(raw: string): Promise<Document[]> {
        let metadata: Record<string, any>;
        const parsed = await simpleParser(raw)
        metadata = {
            from: parsed.from,
            to:parsed.to,
            cc:parsed.cc,
            bcc:parsed.bcc,
            subject: parsed.subject,
            date:parsed.date,
            messageId:parsed.messageId,
            replyTo:parsed.replyTo,
            inReplyTo:parsed.inReplyTo,
            references:parsed.references,
            attachments:parsed.attachments
        }
        const document = new Document({
            pageContent: parsed.text?parsed.text:"",
            metadata: metadata
        })
        return [document];
    }

    public async load(): Promise<Document[]> {

        let text: string;

        if (typeof this.filePathOrBlob === "string") {
            const { readFile } = await EmailLoader.imports();
            text = await readFile(this.filePathOrBlob, "utf8");
        } else {
            text = await this.filePathOrBlob.text();
        }
        return await this.parse(text);
    }

    static async imports(): Promise<{
        readFile: typeof ReadFileT;
    }> {
        try {
            const { readFile } = await import("node:fs/promises");
            return { readFile };
        } catch (e) {
            console.error(e);
            throw new Error(
                `Failed to load fs/promises. EmailLoader available only on environment 'node'. See https://<link to docs> for alternatives.`
            );
        }
    }
}
