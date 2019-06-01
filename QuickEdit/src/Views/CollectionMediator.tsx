import React from 'react';


export abstract class CollectionMediator extends React.Component<any, any> {
    protected collection: any = null;

    private changeHandler: any;

    constructor(props: any) {
        super(props);

        this.collection = this.getCollection();
        const model = this.collection.createNewItem();

        this.state = {
            model: model,
            search: "",
            items: this.collection.getItems()
        }

        this.changeHandler = (event) => {
            this.setState({
                ... this.state,
                items : this.collection.getItems()
            })
        }

        this.collection.subscribe(this.changeHandler);
    }

    componentWillUnmount() {
        this.collection.unsubscribe(this.changeHandler);
    }

    getCollection(): any {
        return this.props.collection || null;
    }

    getValueByPath(model: any, path: string): any {
        const parts = path.split(".")
        let value = model;

        for (const prop of parts) {
            value = value[prop];
        }
        return value;
    }

    setMode(name) {
        this.setState({mode: name})
    }

    bindTo(path: string) {

        const modelValue = this.getValueByPath(this.state, path);

        return {
            value: modelValue,
            onChange: (e: any) => {

                const parts = path.split(".")
                let model = this.state;
                let propertyName = parts[parts.length-1]

                for (let i = 0; i < parts.length-1; i++){
                    model = model[parts[i]];
                }

                (model as any)[propertyName as any] = e.target.value;
                this.forceUpdate();
            }
        }
    }

    clearSearch() {
        return () => { this.setState({search: ""}) };
    }

    saveItem() {
        const model = this.collection.createFromData(this.state.model)
        this.collection.save(model);
        this.setState({model: this.collection.createNewItem(), mode: "list"});
    }

    editItem(item) {
        this.setState({model: item, mode: "edit"});

    }

    removeItem(item) {
        this.collection.remove(item)
    }
}