import { Observable } from "rxjs";

export class Upload {
    $key: string;
    file: File;
    url: any//Observable<string | null>;
    // progress: Observable<number>;
    progress: number;
    createdOn: Date= new Date()
    name: string;
    caption: string
    filter:string[]
    pairOf:string

    constructor(file: File){
        this.file=file;
    }
}
export class UploadBlob {
    $key: string;
    blob: Blob;
    url: any//Observable<string | null>;
    // progress: Observable<number>;
    progress: number;
    createdOn: Date= new Date()
    name: string;
    caption: string
    filter:string[]
    pairOf:string

    constructor(blob: Blob, details){
        this.blob=blob;
    }
}