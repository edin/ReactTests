import React from 'react';

export abstract class CollectionMediator extends React.Component<any, any> {
    protected collection: any = null;

    private changeHandler: any;

    constructor(props: any) {
        super(props);

        this.collection = this.getCollection();
        const model = this.getModel();

        this.state = {
            model: model,
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

    abstract getCollection(): any;
    abstract getModel(): any;

    onModelChange(name) {
        return (e) => {
            this.setState({
                ...this.state,
                model: {
                    ...this.state.model,
                    [name] : e.target.value
                }
            })
        }
    }

    saveItem() {
        this.collection.save(this.state.model)
        this.setState({
            ...this.state,
            model: this.getModel()
        })
    }

    removeItem(item) {
        this.collection.remove(item)
    }
}