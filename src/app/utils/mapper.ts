export function mapper<T>(obj1: T, obj2: Object): T {
    Object.entries(obj2).map((item: string[]) => {
        console.log(item);
        
        //obj1[item[0]] = obj2[item[0]];
    });
    return obj1;
}