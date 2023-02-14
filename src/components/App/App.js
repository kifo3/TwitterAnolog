import AppHeader from "../AppHeader"
import SearchPanel from "../SearchPanel"
import PostStatusFilter from "../PostStatusFilter"
import PostList from "../PostList"
import PostAddForm from "../PostAddForm"

import './App.css'
import React from "react"

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {lebel: 'Going to learn React JS', important: true, like: true, id: 1},
                {lebel: 'That is so good', important: false, like: false, id: 2},
                {lebel: 'I need a beak..', important: false, like: false, id: 3},
            
            ],
            term: '',
            filter: 'all'
        }

        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLike = this.onToggleLike.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)

        this.maxId = 4;
    }


    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            lebel: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id);
            const oldItem = data[index]
            const newItem = {...oldItem, important: !oldItem.important}

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id);
            const oldItem = data[index]
            const newItem = {...oldItem, like: !oldItem.like}

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term){
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.lebel.indexOf(term) > -1
        })
    }

    filterPost(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like)
        }else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state
        const liked = data.filter(item => item.like).length;
        const allPosts =data.length;

        const visiblPost = this.filterPost(this.searchPost(data, term), filter)
        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts} />
            <div className="search-panel d-flex">
                <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
            </div>
            <PostList 
                posts={visiblPost} 
                onDelete={this.deleteItem} 
                onToggleImportant={this.onToggleImportant}
                onToggleLike={this.onToggleLike}
                />
            <PostAddForm onAdd={this.addItem} />
            </div>
        )
    }

}

