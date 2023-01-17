import { Page } from "./page";

export class Link {
    public constructor(page: Page, link: string, uiText: string) {
        this.page = page;
        this.url = link;
        this.uiText = uiText;
    }

    public isEqual(other: Link): boolean {
        return this.url === other.url;
    }
        
    
    public page: Page;
    public url: string;
    public uiText: string;    
}