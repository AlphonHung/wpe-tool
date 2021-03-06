class Storage {
    KEYS = {
        TODO_LIST: 'todo_list',
        IMAGE_SLIDE: 'image_slide'
    };
    constructor() {}

    fetch(key: string) {
        return localStorage.getItem(key);
    }

    save(key: string, data: any) {
        localStorage.setItem(key, data);
    }

    delete(key: string) {
        localStorage.removeItem(key);
    }
}
export default new Storage();