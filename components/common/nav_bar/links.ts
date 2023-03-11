import { Link } from "./link";
import { Page } from "./page";

export const links: Map<Page, Link> = new Map(
    [
        [Page.home, new Link(Page.home, "/", "HOME")],
        [Page.ourStory, new Link(Page.ourStory, "/our-story", "OUR STORY")],
        [Page.shop, new Link(Page.shop, "/shop", "SHOP")],
        [Page.contact, new Link(Page.shop, "/#footer", "CONTACT")]
    ]
);