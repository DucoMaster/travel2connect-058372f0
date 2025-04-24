import { TabType } from ".";

export interface EventPackageDetails {
    id: string;
    title: string;
    description: string;
    category: TabType;
    location: string;
    price: number;
    capacity: number;
    start_date: string;
    end_date: string;
    image_urls: string[];
    is_open_for_planning: boolean;
    creator_id: string;
    created_at: string;
    updated_at: string;
}
