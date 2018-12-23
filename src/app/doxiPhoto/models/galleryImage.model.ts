import { Observable } from "rxjs";

export interface GalleryImage {
    $key?: string;
    name?: string;
    url?: Observable<string | null>;
    caption?: string;
    filter?: Array<string>
}