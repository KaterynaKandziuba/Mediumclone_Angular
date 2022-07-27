import { PopularTagsType } from "src/app/shared/types/popularTags.type";

export interface PopularTagsStateInterface {
    isLoading: boolean,
    error: string | null,
    data: PopularTagsType[]
}
