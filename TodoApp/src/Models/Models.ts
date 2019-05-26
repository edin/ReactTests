declare type IObserverHandler = (event: any) => void;

export class Observable {
    private observers: IObserverHandler[] = [];

    public subscribe(observer: IObserverHandler) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    public unsubscribe(observer: IObserverHandler) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    public publish(event: any) {
        for(const observer of this.observers) {
            observer(event);
        }
    }
}

export class Collection<T> extends Observable {

    private items: T[] = [];

    public getItems(): T[] {
        return this.items;
    }

    public save(item: T) {
        const e = this.items.find(e => e === item);
        if (!e) {
            this.items.push(item);
        }
        this.publish({event: 'saved', item })
    }

    public remove(item: T) {
        const e = this.items.find(e => e === item);
        if (e) {
            const index = this.items.indexOf(e);
            this.items.splice(index, 1);
            this.publish({event: 'removed', item})
        }
    }
}