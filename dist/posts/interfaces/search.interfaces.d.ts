export interface filterPosts {
    category?: string;
    author?: string;
}
export interface MongoQuery {
    $or: ({
        [key: string]: {
            $regex: RegExp;
        };
    })[];
}
