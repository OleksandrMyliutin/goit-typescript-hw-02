export interface Result {
    id: string;
    slug: string;
    alt_description: string | undefined;
    alternative_slugs: {
        en: string;
        [key: string]: string;
    };
    asset_type: string;
    blur_hash: string;
    breadcrumbs: any[];
    color: string;
    created_at: string;
    current_user_collections: any[];
    description: string | null;
    height: number;
    width: number;
    liked_by_user: boolean;
    likes: number;
    location?: string | null;
    links: {
        self: string;
        html?: string;
        download?: string;
        download_location?: string;
    };
    promoted_at: string | null;
    sponsorship: any | null;
    topic_submissions: {
        [topic: string]: {
        status: string;
        approved_on: string;
        };
    };
    updated_at: string;
    urls: {
        raw?: string;
        full?: string;
        regular?: string;
        small?: string;
        thumb?: string;
        small_s3?: string;
    };
    user: {
        id: string;
        updated_at: string;
        username: string;
        [key: string]: any;
    };
}
